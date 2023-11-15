import React from "react";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { SeoHead } from "@/seo";
// import { EggGradingPageAnalyses } from "@/features/analyses";
import { Typography } from "@mui/material";
import { ReportingLayout } from "@/layouts";

const EggGradingPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="HHEP" />
      <ReportingLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Egg Grading</Typography>}
      >
        <></>
      </ReportingLayout>
    </>
  );
};

export default EggGradingPage;
