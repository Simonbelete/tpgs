import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/layouts";
import { EggGuidelineForm } from "@/features/egg-guidelines";
import { SeoHead } from "@/seo";

const EggGuidelineCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Create egg production guideline" />
      <CreateLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <EggGuidelineForm />
      </CreateLayout>
    </>
  );
};

export default EggGuidelineCreatePage;
