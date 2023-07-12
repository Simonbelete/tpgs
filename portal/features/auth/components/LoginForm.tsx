import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { TextField, Box, Grid, Button } from "@mui/material";

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
    <Box height="10vh" mr={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4} direction="column">
          <Grid item xs={12}>
            <Controller
              name={"email"}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  onChange={onChange}
                  value={value}
                  label={"Email Address"}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name={"password"}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  onChange={onChange}
                  value={value}
                  label={"Password"}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit">SIGN IN</Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default LoginForm;
