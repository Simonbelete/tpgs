import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import {
  ChickenList,
  ChickenListFilter,
  ChickenImportExport,
} from "@/features/chickens";
import { SeoHead } from "@/seo";

const ChickenPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Chickens"/>
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Chickens</Typography>}
        actions={<ChickenImportExport />}
        filter={<ChickenListFilter />}
      >
        <ChickenList />
      </ListLayout>
    </>
  );
};



export default ChickenPage;