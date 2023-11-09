import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { IngredientList } from "@/features/ingredients";
import { SeoHead } from "@/seo";

const IngredientPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Ingredients" />
      <ListLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <IngredientList />
      </ListLayout>
    </>
  );
};

export default IngredientPage;
