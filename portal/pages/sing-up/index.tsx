import React, { ReactElement } from "react";
import { DefaultLayout } from "@/layouts";
import { AuthSignUp } from "@/features/auth";
import Head from "next/head";

const SingUpPage = () => {
  return (
    <>
      <Head>
        <title>ILRI TPGS - Sign up</title>
      </Head>
      <AuthSignUp />
    </>
  );
};

SingUpPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default SingUpPage;
