import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/layouts";
import { FlockReductionForm } from "@/features/flocks";
import { SeoHead } from "@/seo";

const FlockReductionPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Batch Cull" />
      <CreateLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Batch Cull</Typography>}
      >
        <FlockReductionForm />
      </CreateLayout>
    </>
  );
};

export default FlockReductionPage;
