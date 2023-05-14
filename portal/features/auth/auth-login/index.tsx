import { signIn } from "next-auth/react";
import Layout from "../components/Layout";
import LoginForm from "../components/LoginForm";

const AuthLogin = () => {
  return (
    <Layout>
      <LoginForm />
    </Layout>
  );
};

export default AuthLogin;
