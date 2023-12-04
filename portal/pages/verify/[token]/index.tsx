import React, { ReactElement } from "react";
import { VerifyInvitation } from "@/features/invitations";
import Head from "next/head";
import { SeoHead } from "@/seo";

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

export default VerifyInvitationPage;
