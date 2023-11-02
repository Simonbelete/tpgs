import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/layouts";
import { HDEPGuidelineForm } from "@/features/hdep-guidelines";
import { SeoHead } from "@/seo";

const HDEPGuidelineCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Create HDEP guideline" />
      <CreateLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <HDEPGuidelineForm />
      </CreateLayout>
    </>
  );
};

export default HDEPGuidelineCreatePage;
