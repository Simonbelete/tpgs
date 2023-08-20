import React, { ReactElement } from "react";
import { IngredientTypeList } from "@/features/ingredient-types";
import Link from "next/link";
import { ListLayout } from "@/components/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { NutrientsList, NutrientListActions, NutrientFilter } from "@/features/nutrients";

const NutrientsPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <ListLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      header={<Typography variant="title">Nutrients</Typography>}
      actions={<NutrientListActions />}
      filter={<NutrientFilter />}
    >
      <NutrientsList />
    </ListLayout>
  );
};

export default NutrientsPage;
