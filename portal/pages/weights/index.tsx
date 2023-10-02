import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import {
  WeightList,
  WeightListFilter,
  WeightImportExport,
} from "@/features/weights";
import { SeoHead } from "@/seo";

const WeightPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Body Weight"/>
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Body Weight</Typography>}
        actions={<WeightImportExport />}
        filter={<WeightListFilter />}
      >
        <WeightList />
      </ListLayout>
    </>
  );
};



export default WeightPage;