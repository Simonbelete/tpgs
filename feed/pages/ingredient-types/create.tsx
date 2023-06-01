import React, { useEffect } from "react";
import { IngredientTypeForm } from "@/features/ingredient-types";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";

const IngredientTypeCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <IngredientTypeForm />
    </>
  );
};

export default IngredientTypeCreatePage;
