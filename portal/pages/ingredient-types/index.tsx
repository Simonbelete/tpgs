import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { IngredientTypeList } from "@/features/ingredient-types";
import { SeoHead } from "@/seo";

const IngredientTypePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Ingredient Groups" />
      <ListLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <IngredientTypeList />
      </ListLayout>
    </>
  );
};

export default IngredientTypePage;
