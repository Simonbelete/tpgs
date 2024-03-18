import React, { ReactElement } from "react";
import { DefaultLayout } from "@/layouts";
import { ResetPassword } from "@/features/auth";
import Head from "next/head";
import { SeoHead } from "@/seo";

const ResetPasswordPage = () => {
  return (
    <>
      <SeoHead title="Reset Password" />
      <ResetPassword />
    </>
  );
};

ResetPasswordPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default ResetPasswordPage;
