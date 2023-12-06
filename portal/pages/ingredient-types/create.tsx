import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/layouts";
import { IngredientTypeForm } from "@/features/ingredient-types";
import { SeoHead } from "@/seo";

const IngredientTypeCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Ingredient Group - Create" />
      <CreateLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <IngredientTypeForm />
      </CreateLayout>
    </>
  );
};

export default IngredientTypeCreatePage;
