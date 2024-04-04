import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/layouts";
import { SeoHead } from "@/seo";
import { GenerateBarcode } from "@/features/qr";

const PurposeCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Generate QR Codes" />
      <CreateLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <GenerateBarcode />
      </CreateLayout>
    </>
  );
};

export default PurposeCreatePage;
