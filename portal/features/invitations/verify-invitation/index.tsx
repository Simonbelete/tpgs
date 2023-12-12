import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import Layout from "../layouts/Layout";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  Button,
  Divider,
  Box,
  Stack,
  Typography,
  Alert,
  Grid,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { LabeledInput } from "@/components/inputs";
import LoadingButton from "@mui/lab/LoadingButton";
import service from "../services/invitation_service";
import { useGetInvitationDetailQuery } from "../services";
import errorToForm from "@/util/errorToForm";
import { Invitation, VerifyInvitation } from "@/models";
import { CountryDropdown } from "@/features/countries";
import _ from "lodash";

type Inputs = VerifyInvitation & {
  confirm_password?: string | null;
};

const schema = yup.object({
  password: yup.string().length(6).required(),
  confirm_password: yup
    .string()
    .label("confirm password")
    .required()
    .oneOf([yup.ref("password"), ""], "Passwords must match"),
  name: yup.string().required(),
  country: yup.object(),
  company: yup.string(),
});

const VerifyInvitation = ({
  token,
  data,
}: {
  token: string;
  data: Invitation;
}) => {
  const router = useRouter();
  const [error, setErrorMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, watch, control, setError } = useForm<Inputs>({
    // @ts-ignore
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await service.verify({
        password: data.password,
        token: (router.query.token as string) || "",
        name: data.name,
        country: _.get(data.country, "id", null),
        company: data.company,
      });

      if (response.status == 201) {
        setSuccess("Creating account...");
        router.push({
          pathname: "/login",
          query: { email: encodeURIComponent(response.data.email) },
        });
      }
    } catch (ex: any) {
      if (ex.status == 400) {
        setErrorMessage(
          `Please check your data and try again, ${ex.data.message}`
        );
        errorToForm(ex.data, setError);
      } else
        setErrorMessage(
          "Server error, please check your connection and try again"
        );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Stack>
        <Box
          sx={{ mb: 4, width: "100%" }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
            <Link href="/">
              <img src="/images/ilri_logo.png" height={50} />
            </Link>
          </Box>
          <Typography color={"primary.dark"} variant="h6" fontWeight={600}>
            Join via invitation
          </Typography>
          {error && (
            <Box sx={{ mt: 1, width: 267 }}>
              <Alert variant="outlined" severity="error">
                {error}
              </Alert>
            </Box>
          )}
          {success && (
            <Box sx={{ mt: 1 }}>
              <Alert variant="outlined" severity="success">
                {success}
              </Alert>
            </Box>
          )}
        </Box>
        {/* <Box height="10vh" mr={4}> */}
        <Box sx={{ width: "100%" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} direction="column">
              <Grid item xs={12}>
                <LabeledInput
                  disabled={true}
                  fullWidth
                  size="small"
                  value={_.get(data, "email", "")}
                  label={"Email *"}
                  placeholder={"Email *"}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name={"name"}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { invalid, isTouched, isDirty, error },
                  }) => (
                    <LabeledInput
                      error={!!error?.message}
                      helperText={error?.message}
                      onChange={onChange}
                      fullWidth
                      size="small"
                      value={value}
                      label={"Full name *"}
                      placeholder={"Full name *"}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name={"password"}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { invalid, isTouched, isDirty, error },
                  }) => (
                    <LabeledInput
                      error={!!error?.message}
                      helperText={error?.message}
                      onChange={onChange}
                      fullWidth
                      size="small"
                      value={value}
                      label={"Password *"}
                      placeholder={"Password *"}
                      type="password"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name={"confirm_password"}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { invalid, isTouched, isDirty, error },
                  }) => (
                    <LabeledInput
                      error={!!error?.message}
                      helperText={error?.message}
                      onChange={onChange}
                      fullWidth
                      size="small"
                      value={value}
                      label={"Confirm Password *"}
                      placeholder={"Confirm Password *"}
                      type="password"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name={"country"}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { invalid, isTouched, isDirty, error },
                  }) => (
                    <CountryDropdown
                      onChange={(_, data) => onChange(data)}
                      value={value}
                      error={!!error?.message}
                      helperText={error?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name={"company"}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { invalid, isTouched, isDirty, error },
                  }) => (
                    <LabeledInput
                      error={!!error?.message}
                      helperText={error?.message}
                      onChange={onChange}
                      fullWidth
                      size="small"
                      value={value}
                      label={"Company"}
                      placeholder={"Company"}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <LoadingButton
                  loading={isLoading}
                  type="submit"
                  fullWidth
                  variant="contained"
                  loadingPosition="start"
                  sx={{ color: "white" }}
                >
                  Create new account
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </Box>
        <Stack sx={{ my: 3 }} gap={1}>
          <Divider></Divider>
          <Link href="/login">
            <Button fullWidth>Login</Button>
          </Link>
        </Stack>
      </Stack>
    </Layout>
  );
};

export default VerifyInvitation;
