import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import {
  IngredientList,
  IngredientListFilter,
  IngredientImportExport,
} from "@/features/ingredients";
import { SeoHead } from "@/seo";

const IngredientPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Ingredients"/>
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Ingredients</Typography>}
        actions={<IngredientImportExport />}
        filter={<IngredientListFilter />}
      >
        <IngredientList />
      </ListLayout>
    </>
  );
};



export default IngredientPage;