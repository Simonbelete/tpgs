import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import {
  FlockList,
  FlockListFilter,
  FlockImportExport,
} from "@/features/flocks";
import { SeoHead } from "@/seo";

const FlockPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Flocks"/>
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Flocks</Typography>}
        actions={<FlockImportExport />}
        filter={<FlockListFilter />}
      >
        <FlockList />
      </ListLayout>
    </>
  );
};



export default FlockPage;