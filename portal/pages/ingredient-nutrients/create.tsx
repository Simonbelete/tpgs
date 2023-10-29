import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/layouts";
import { IngredientNutrientForm } from "@/features/ingredient-nutrients";
import { SeoHead } from "@/seo";

const IngredientNutrientCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Create Ingredient Nutrients" />
      <CreateLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={
          <Typography variant="title">Create Ingredient Nutrients</Typography>
        }
      >
        <IngredientNutrientForm />
      </CreateLayout>
    </>
  );
};

export default IngredientNutrientCreatePage;
