import { signIn } from "next-auth/react";
import Layout from "../components/Layout";
import LoginForm from "../components/LoginForm";
import { Button, Divider, Box, Stack } from "@mui/material";
import Link from "next/link";
import { ContactUsForm } from "@/features/contact-us";

const AuthSignUp = () => {
  return (
    <Layout>
      <Stack sx={{ mx: 5 }}>
        <Box>
          <ContactUsForm message={"Request for account"} />
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

export default AuthSignUp;
