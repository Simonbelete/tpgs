import Layout from "../components/Layout";
import LoginForm from "../components/LoginForm";
import { Divider, Stack } from "@mui/material";
import SignUpButton from "../components/SignUpButton";

const AuthLogin = () => {
  return (
    <Layout>
      <Stack>
        <LoginForm />
        <Stack sx={{ my: 3 }} gap={1}>
          <Divider></Divider>
          <SignUpButton />
        </Stack>
      </Stack>
    </Layout>
  );
};

export default AuthLogin;
