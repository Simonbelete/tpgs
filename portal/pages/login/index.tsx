import React, { ReactElement } from "react";
import { DefaultLayout } from "@/components/layouts";
import { AuthLogin } from "@/features/auth";
import Head from "next/head";

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>ILRI TPGS - Login</title>
      </Head>
      <AuthLogin />
    </>
  );
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default LoginPage;
