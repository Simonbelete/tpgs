import React, { ReactElement } from "react";
import { DefaultLayout } from "@/components/layouts";
import { AuthLogin } from "@/features/auth";

const LoginPage = () => {
  return (
    <>
      <AuthLogin />
    </>
  );
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default LoginPage;
