import React, { ReactElement } from "react";
import { DefaultLayout } from "@/layouts";
import { ForgotPassword } from "@/features/auth";
import Head from "next/head";
import { SeoHead } from "@/seo";

const ForgotPasswordPage = () => {
  return (
    <>
      <SeoHead title="Forgot Password" />
      <ForgotPassword />
    </>
  );
};

ForgotPasswordPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default ForgotPasswordPage;
