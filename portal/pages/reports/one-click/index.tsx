import React from "react";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { SeoHead } from "@/seo";
import { WeightGraphAnalyses } from "@/features/analyses";
import { Typography } from "@mui/material";
import { ReportingLayout } from "@/layouts";
import { OneClickReport } from "@/features/one-click-report";

const ReportOneClickPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="HHEP" />
      <ReportingLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">One Click report</Typography>}
      >
        <OneClickReport />
      </ReportingLayout>
    </>
  );
};

export default ReportOneClickPage;
