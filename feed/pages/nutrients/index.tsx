import React, { ReactElement } from "react";
import { IngredientTypeList } from "@/features/ingredient-types";
import Link from "next/link";
import { ListLayout } from "@/components/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { NutrientsList } from "@/features/nutrients";

const NutrientsPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <ListLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      header={<Typography variant="h3">Nutrients</Typography>}
      actions={<Actions />}
    >
      <NutrientsList />
    </ListLayout>
  );
};

const Actions = (): ReactElement => {
  return (
    <>
      <Link href="/nutrients/create">
        <Button variant="contained" startIcon={<AddIcon />}>
          Create New Nutrients
        </Button>
      </Link>
    </>
  );
};

export default NutrientsPage;
