import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/layouts";
import { StageForm } from "@/features/stage";
import { SeoHead } from "@/seo";

const PenCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Create Stage" />
      <CreateLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <StageForm />
      </CreateLayout>
    </>
  );
};

export default PenCreatePage;
