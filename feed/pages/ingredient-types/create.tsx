import React, { useEffect } from "react";
import { IngredientTypeForm } from "@/features/ingredient-types";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/components/layouts";

const IngredientTypeCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <CreateLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
      <IngredientTypeForm />
    </CreateLayout>
  );
};

export default IngredientTypeCreatePage;
