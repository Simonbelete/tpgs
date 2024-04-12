import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { LabeledInput } from "@/components/inputs";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  TextField,
  Box,
  Grid,
  Button,
  Container,
  Typography,
  Alert,
  Divider,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import Image from "next/image";

type Inputs = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

// TODO: Move the logic to auth-login
const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, watch, control, setValue } = useForm<Inputs>({
    // @ts-ignore
    resolver: yupResolver(schema),
    defaultValues: {
      email: decodeURIComponent((router.query.email as string) || "") || "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (response?.error) {
        setError("Please either check your email or password!");
      } else {
        router.push("dashboard");
      }
    } catch (ex) {
      setError("Server error, please check your connection and try again");
    } finally {
      setIsLoading(false);
      setValue("password", "");
    }
  };

  return (
    <>
      <Box sx={{ mb: 4 }} justifyContent={"center"} alignItems={"center"}>
        <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
          <Link href="/">
            {/* <img src="/images/ilri_logo.png" height={50} /> */}
            <Image
              alt="ilri cgiar logo"
              src="/images/ilri_logo.png"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "200px", height: "auto" }} // optional
            />
          </Link>
        </Box>
        <Typography color={"primary.dark"} variant="h6" fontWeight={600}>
          Login in to your account
        </Typography>
        {error && (
          <Box sx={{ mt: 1, maxWidth: 250 }}>
            <Alert variant="outlined" severity="error">
              {error}
            </Alert>
          </Box>
        )}
      </Box>
      {router.query.email && (
        <Box sx={{ mt: 1, mb: 2, maxWidth: 250 }}>
          <Alert variant="outlined" severity="success">
            Account created successfully
          </Alert>
        </Box>
      )}
      {/* <Box height="10vh" mr={4}> */}
      <Box sx={{ width: "100%" }}>
        <form method="POST" onSubmit={handleSubmit(onSubmit)}>
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
                    name="email"
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
                    label={"Password"}
                    placeholder={"Password"}
                    type="password"
                    name="password"
                  />
                )}
              />
            </Grid>
            <Grid xs={12} sx={{ textAlign: "right", mt: 1 }}>
              <Link href="forgot-password" id="forgot-password">
                <Typography variant="caption">Forgot Password?</Typography>
              </Link>
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                loading={isLoading}
                type="submit"
                fullWidth
                variant="contained"
                loadingPosition="start"
                sx={{ color: "white" }}
                id="login"
              >
                SIGN IN
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default LoginForm;
