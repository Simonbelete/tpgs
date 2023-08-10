import React, { ReactElement } from "react";
import { DefaultLayout } from "@/components/layouts";
import { ForgotPassword } from "@/features/auth";
import Head from "next/head";

const ForgotPasswordPage = () => {
  return (
    <>
      <Head>
        <title>ILRI TPGS - Forgot Password</title>
      </Head>
      <ForgotPassword />
    </>
  );
};

ForgotPasswordPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default ForgotPasswordPage;
