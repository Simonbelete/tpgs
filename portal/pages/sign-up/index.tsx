import React, { ReactElement } from "react";
import { DefaultLayout } from "@/layouts";
import { AuthSignUp } from "@/features/auth";
import Head from "next/head";
import { SeoHead } from "@/seo";

const SingUpPage = () => {
  return (
    <>
      <SeoHead title="Sign-up" />
      <AuthSignUp />
    </>
  );
};

SingUpPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default SingUpPage;
