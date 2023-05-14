import { signIn } from "next-auth/react";

const AuthLogin = () => {
  const login = async () => {
    const response = await signIn("credentials", {
      username: "",
      password: "",
      redirect: false,
    });
    console.log(response);
  };
  return <button onClick={login}>Sign in</button>;
};

export default AuthLogin;
