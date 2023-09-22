import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import {
  BreedList,
  BreedListFilter,
  BreedImportExport,
} from "@/features/breeds";
import { SeoHead } from "@/seo";

const BreedPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="House"/>
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Breed</Typography>}
        actions={<BreedImportExport />}
        filter={<BreedListFilter />}
      >
        <BreedList />
      </ListLayout>
    </>
  );
};



export default BreedPage;