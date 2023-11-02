import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/layouts";
import { WeightGuidelineForm } from "@/features/weight-guidelines";
import { SeoHead } from "@/seo";

const WeightGuidelineCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Create body weight guideline" />
      <CreateLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <WeightGuidelineForm />
      </CreateLayout>
    </>
  );
};

export default WeightGuidelineCreatePage;
