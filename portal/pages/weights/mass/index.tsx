import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import {
  WeightList,
  WeightListFilter,
  WeightImportExport,
  MassWeightImportExport
} from "@/features/weights";
import { SeoHead } from "@/seo";

const WeightMassPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Mass Body Weight"/>
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Mass Body Weight</Typography>}
        actions={<MassWeightImportExport />}
        filter={<WeightListFilter />}
      >
        <WeightList mass />
      </ListLayout>
    </>
  );
};



export default WeightMassPage;