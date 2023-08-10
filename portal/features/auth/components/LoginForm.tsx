import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
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

  const { handleSubmit, watch, control } = useForm<Inputs>({
    // @ts-ignore
    resolver: yupResolver(schema),
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
    }
  };

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ mb: 2 }}>
          <Link href="/">
            <img src="/images/ilri_logo.png" height={50} />
          </Link>
        </Box>
        <Typography color={"primary.dark"} variant="h6" fontWeight={600}>
          Login in to your account
        </Typography>
        {error && (
          <Box sx={{ mt: 1 }}>
            <Alert variant="outlined" severity="error">
              {error}
            </Alert>
          </Box>
        )}
      </Box>
      {/* <Box height="10vh" mr={4}> */}
      <Box mr={4}>
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
                  />
                )}
              />
            </Grid>
            <Grid xs={12} sx={{ textAlign: "right", mt: 1 }}>
              <Link href="forgot-password">
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
