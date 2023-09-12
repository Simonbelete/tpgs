import React, { ReactElement } from "react";
import { DefaultLayout } from "@/layouts";
import { AuthLogin } from "@/features/auth";
import Head from "next/head";
import { getServerSession } from "next-auth/next";
import { NextPageContext } from "next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

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

export async function getServerSideProps(context: NextPageContext) {
  // @ts-ignore
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default LoginPage;
