import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import {
  IngredientNutrientList,
  IngredientNutrientListFilter,
  IngredientNutrientImportExport,
} from "@/features/ingredient-nutrients";
import { SeoHead } from "@/seo";

const IngredientNutrientPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Ingredient Nutrient" />
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Ingredient Nutrient</Typography>}
        actions={<IngredientNutrientImportExport />}
        filter={<IngredientNutrientListFilter />}
      >
        <IngredientNutrientList />
      </ListLayout>
    </>
  );
};

export default IngredientNutrientPage;
