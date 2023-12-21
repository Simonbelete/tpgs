import React from "react";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { SeoHead } from "@/seo";
import { MortalityAnalyses } from "@/features/analyses";
import { Typography } from "@mui/material";
import { ReportingLayout } from "@/layouts";

const LivabilityPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Livability" />
      <ReportingLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Livability</Typography>}
      >
        <MortalityAnalyses livability={true} />
      </ReportingLayout>
    </>
  );
};

export default LivabilityPage;
