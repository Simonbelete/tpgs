import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { IngredientTypeForm } from "@/features/ingredient-types";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/components/layouts";

const IngredientTypeCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <CreateLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      header={<Typography variant="title">Create Ingredient Type</Typography>}
    >
      <IngredientTypeForm />
    </CreateLayout>
  );
};

export default IngredientTypeCreatePage;
