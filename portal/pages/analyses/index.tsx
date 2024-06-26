import React from "react";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { SeoHead } from "@/seo";
import { OneClickAnalyses } from "@/features/analyses";
import { Typography } from "@mui/material";
import { ReportingLayout } from "@/layouts";

const AnalysesPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Reports" />
      <ReportingLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Reports</Typography>}
      >
        <OneClickAnalyses />
      </ReportingLayout>
    </>
  );
};

export default AnalysesPage;
