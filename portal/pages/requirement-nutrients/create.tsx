import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/layouts";
import { RequirementNutrientForm } from "@/features/requirement-nutrients";
import { SeoHead } from "@/seo";

const PenCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Create Pen" />
      <CreateLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <RequirementNutrientForm />
      </CreateLayout>
    </>
  );
};

export default PenCreatePage;
