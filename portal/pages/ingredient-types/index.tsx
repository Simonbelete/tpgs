import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import {
  IngredientTypeList,
  IngredientTypeListFilter,
  IngredientTypeImportExport,
} from "@/features/ingredient-types";
import { SeoHead } from "@/seo";

const IngredientTypePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Ingredient Types"/>
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Ingredient Types</Typography>}
        actions={<IngredientTypeImportExport />}
        filter={<IngredientTypeListFilter />}
      >
        <IngredientTypeList />
      </ListLayout>
    </>
  );
};



export default IngredientTypePage;