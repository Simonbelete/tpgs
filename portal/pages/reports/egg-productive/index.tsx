import React from "react";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { SeoHead } from "@/seo";
import { EggProductive } from "@/features/analyses";
import { Typography } from "@mui/material";
import { ReportingLayout } from "@/layouts";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const EggProductivePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Pen" />
      <ReportingLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={
          <Typography variant="title">
            Chickens Egg Production Productivity
          </Typography>
        }
      >
        <EggProductive />
      </ReportingLayout>
    </>
  );
};

export default EggProductivePage;
