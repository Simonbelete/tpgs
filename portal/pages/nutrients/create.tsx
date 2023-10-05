import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/layouts";
import {
  NutrientForm,
} from "@/features/nutrients";
import { SeoHead } from "@/seo";

const NutrientCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Create Nutrient" />
      <CreateLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Create Nutrient</Typography>}
      >
        <NutrientForm />
      </CreateLayout>
    </>
  );
};

export default NutrientCreatePage;
