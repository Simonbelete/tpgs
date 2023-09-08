import React, { ReactElement } from "react";
import { VerifyInvitation } from "@/features/invitations";
import Head from "next/head";

const VerifyInvitationPage = () => {
  return (
    <>
      <Head>
        <title>ILRI TPGS - Reset Password</title>
      </Head>
      <VerifyInvitation />
    </>
  );
};

VerifyInvitationPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default VerifyInvitationPage;
