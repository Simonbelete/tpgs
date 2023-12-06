import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/layouts";
import { IngredientForm } from "@/features/ingredients";
import { SeoHead } from "@/seo";

const IngredientCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Create Ingredient" />
      <CreateLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <IngredientForm />
      </CreateLayout>
    </>
  );
};

export default IngredientCreatePage;
