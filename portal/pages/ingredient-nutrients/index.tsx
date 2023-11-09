import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { IngredientNutrientList } from "@/features/ingredient-nutrients";
import { SeoHead } from "@/seo";

const IngredientNutrientPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Ingredient Nutrient" />
      <ListLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <IngredientNutrientList />
      </ListLayout>
    </>
  );
};

export default IngredientNutrientPage;
