import React, { ReactElement } from "react";
import { IngredientTypeList } from "@/features/ingredient-types";
import Link from "next/link";
import { ListLayout } from "@/components/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const IngredientTypePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <ListLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      header={<Typography variant="h3">Ingredient Types</Typography>}
      actions={<Actions />}
    >
      <IngredientTypeList />
    </ListLayout>
  );
};

const Actions = (): ReactElement => {
  return (
    <>
      <Link href="/ingredient-types/create">
        <Button variant="contained" startIcon={<AddIcon />}>
          Create New Ingredient Type
        </Button>
      </Link>
    </>
  );
};

export default IngredientTypePage;
