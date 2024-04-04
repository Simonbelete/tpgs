import React, { ReactElement } from "react";
import { SeoHead } from "@/seo";
import { QR } from "@/features/qr";

const QRPage = () => {
  return (
    <>
      <SeoHead title="Scan QR Code" />
      <QR />
    </>
  );
};

QRPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default QRPage;
