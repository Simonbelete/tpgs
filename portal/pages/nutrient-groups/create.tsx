import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/layouts";
import {
  NutrientGroupForm,
} from "@/features/nutrient-group";
import { SeoHead } from "@/seo";

const NutrientGroupCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Create Nutrient Group" />
      <CreateLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Create Nutrient Group</Typography>}
      >
        <NutrientGroupForm />
      </CreateLayout>
    </>
  );
};

export default NutrientGroupCreatePage;
