import React, { useState } from "react";
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
import { useRouter } from "next/navigation";
import { LabeledInput } from "@/components/inputs";
import LoadingButton from "@mui/lab/LoadingButton";
import service from "../services/invitation_service";
import { isAxiosError } from "axios";
import errorToForm from "@/util/errorToForm";
import { VerifyInvitation } from "@/models";

type Inputs = VerifyInvitation

const schema = yup
  .object({
    password: yup.string().required(),
    name: yup.string().required(),
  })
  .required();

const ResetPassword = () => {
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
        token: "",
        name: data.name
      });
      if (response.status == 200) {
        setSuccess(
          "Password reset email sent, please check your email to reset your password"
        );
      }
    } catch (ex: any) {
      if (ex.status == 400) {
        setErrorMessage("Error check if your email address is correct");
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
        <Box sx={{ mb: 4 }} justifyContent={"center"} alignItems={"center"}>
          <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
            <Link href="/">
              <img src="/images/ilri_logo.png" height={50} />
            </Link>
          </Box>
          <Typography color={"primary.dark"} variant="h6" fontWeight={600}>
            Join Invitation
          </Typography>
          {error && (
            <Box sx={{ mt: 1 }}>
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
            <Grid container spacing={4} direction="column">
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
                        label={"Full Name"}
                        placeholder={"Full Name"}
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
                      label={"New Password"}
                      placeholder={"New Password"}
                      type="password"
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

export default ResetPassword;
