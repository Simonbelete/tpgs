import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { IngredientTypeForm } from "@/features/ingredient-types";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/layouts";
import {
  HouseForm,
} from "@/features/houses";

const HouseCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <CreateLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      header={<Typography variant="title">Create House</Typography>}
    >
      <HouseForm />
    </CreateLayout>
  );
};

export default HouseCreatePage;
