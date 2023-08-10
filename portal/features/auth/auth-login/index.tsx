import { signIn } from "next-auth/react";
import Layout from "../components/Layout";
import LoginForm from "../components/LoginForm";
import { Button, Divider, Box, Stack } from "@mui/material";
import Link from "next/link";

const AuthLogin = () => {
  return (
    <Layout>
      <Stack>
        <LoginForm />
        <Stack sx={{ my: 3 }} gap={1}>
          <Divider></Divider>
          <Link href="sing-up">
            <Button fullWidth>Sign up</Button>
          </Link>
        </Stack>
      </Stack>
    </Layout>
  );
};

export default AuthLogin;
