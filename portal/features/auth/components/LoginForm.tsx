import React from "react";
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
} from "@mui/material";

type Inputs = {
  email: string;
  password: string;
};

// TODO: Move the logic to auth-login
const LoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (response?.error) {
    } else {
      router.push("dashboard");
    }
  };

  return (
    <div>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ mb: 2 }}>
          <img src="/images/ilri_logo.png" height={50} />
        </Box>
        <Typography color={"primary.dark"} variant="h6" fontWeight={600}>
          Login in to your account
        </Typography>
      </Box>
      <Box height="10vh" mr={4}>
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
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained">
                SIGN IN
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
};

export default LoginForm;
