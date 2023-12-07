import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/layouts";
import { RequirementIngredientForm } from "@/features/requirement-ingredient";
import { SeoHead } from "@/seo";

const PenCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Requirement Min & Max - Create" />
      <CreateLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <RequirementIngredientForm />
      </CreateLayout>
    </>
  );
};

export default PenCreatePage;
