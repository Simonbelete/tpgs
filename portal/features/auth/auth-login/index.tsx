import { signIn } from "next-auth/react";

const AuthLogin = () => {
  return <button onClick={() => signIn()}>Sign in</button>;
};

export default AuthLogin;
