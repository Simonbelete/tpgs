import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/layouts";
import { PenForm } from "@/features/pen";
import { SeoHead } from "@/seo";

const PenCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Create Pen" />
      <CreateLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Create Pen</Typography>}
      >
        <PenForm />
      </CreateLayout>
    </>
  );
};

export default PenCreatePage;
