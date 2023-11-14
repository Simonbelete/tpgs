import React from "react";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { SeoHead } from "@/seo";
import { FeedByWeightAnalyses } from "@/features/analyses";
import { Typography } from "@mui/material";
import { ReportingLayout } from "@/layouts";

const EggMassPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="HHEP" />
      <ReportingLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={
          <Typography variant="title">
            Feed consumption by body weight
          </Typography>
        }
      >
        <FeedByWeightAnalyses />
      </ReportingLayout>
    </>
  );
};

export default EggMassPage;
