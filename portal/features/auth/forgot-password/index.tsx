import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Layout from "../components/Layout";
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
import auth_service from "../services/auth_service";
import { isAxiosError } from "axios";
import errorToForm from "@/util/errorToForm";

type Inputs = {
  email: string;
};

const schema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();

const AuthLogin = () => {
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
      console.log("------------");
      const response = await auth_service.reset_password({ email: data.email });
      console.log("MMMM");
      console.log(response);
      if (response.status == 201) {
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
            Rest Password
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
                  name={"email"}
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
                      label={"Email Address"}
                      placeholder={"Email Address"}
                      type="email"
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
                  Reset
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </Box>
        <Stack sx={{ my: 3 }} gap={1}>
          <Divider></Divider>
          <Link href="/sing-up">
            <Button fullWidth>Sign up</Button>
          </Link>
        </Stack>
      </Stack>
    </Layout>
  );
};

export default AuthLogin;
