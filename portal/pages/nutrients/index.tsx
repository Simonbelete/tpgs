import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import {
  NutrientList,
  NutrientListFilter,
  NutrientImportExport,
} from "@/features/nutrients";
import { SeoHead } from "@/seo";

const NutrientPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Nutrients"/>
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Nutrients</Typography>}
        actions={<NutrientImportExport />}
        filter={<NutrientListFilter />}
      >
        <NutrientList />
      </ListLayout>
    </>
  );
};



export default NutrientPage;