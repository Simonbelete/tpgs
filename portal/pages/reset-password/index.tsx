import React, { ReactElement } from "react";
import { DefaultLayout } from "@/components/layouts";
import { ResetPassword } from "@/features/auth";
import Head from "next/head";

const ResetPasswordPage = () => {
  return (
    <>
      <Head>
        <title>ILRI TPGS - Reset Password</title>
      </Head>
      <ResetPassword />
    </>
  );
};

ResetPasswordPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default ResetPasswordPage;
