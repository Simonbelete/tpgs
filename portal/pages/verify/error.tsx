import React, { ReactElement } from "react";
import { SeoHead } from "@/seo";

const VerifyErrorPage = () => {
  return (
    <>
      <SeoHead title="Token error" />
      <h1>Token Error</h1>
    </>
  );
};

VerifyErrorPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default VerifyErrorPage;
