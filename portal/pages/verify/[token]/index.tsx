import React, { ReactElement } from "react";
import { VerifyInvitation } from "@/features/invitations";
import Head from "next/head";
import { SeoHead } from "@/seo";
import { getSession } from "next-auth/react";
import { NextPageContext } from "next";

const VerifyInvitationPage = () => {
  return (
    <>
      <SeoHead title="Join" />
      <VerifyInvitation />
    </>
  );
};

VerifyInvitationPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default VerifyInvitationPage;
