import React from "react";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { SeoHead } from "@/seo";
import { GenderPercentageDistribution } from "@/features/analyses";
import { Typography } from "@mui/material";
import { ReportingLayout } from "@/layouts";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const EggProductivePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Chicken Sex Percentage Distribution" />
      <ReportingLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={
          <Typography variant="title">
            Chickens Sex Percentage Distribution
          </Typography>
        }
      >
        <GenderPercentageDistribution />
      </ReportingLayout>
    </>
  );
};

export default EggProductivePage;
