import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/layouts";
import { HHEPGuidelineForm } from "@/features/hhep-guidelines";
import { SeoHead } from "@/seo";

const HHEPGuidelineCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Create HHEP guideline" />
      <CreateLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <HHEPGuidelineForm />
      </CreateLayout>
    </>
  );
};

export default HHEPGuidelineCreatePage;
