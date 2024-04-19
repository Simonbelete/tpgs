import React, { ReactElement } from "react";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { SeoHead } from "@/seo";
import { Typography } from "@mui/material";
import { ReportingLayout } from "@/layouts";
import { ChickenRecordSetView } from "@/features/chicken-record-set";

const ChickenDataViewPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Chickens summary" />
      <ReportingLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Chickens Summary</Typography>}
      >
        <ChickenRecordSetView />
      </ReportingLayout>
    </>
  );
};

export default ChickenDataViewPage;
