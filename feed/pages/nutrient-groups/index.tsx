import React, { ReactElement } from "react";
import Link from "next/link";
import { ListLayout } from "@/components/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { NutrientGroupList } from "@/features/nutrient-group";

const NutrientGroupPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <ListLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      header={<Typography variant="title">Nutrients Group</Typography>}
      actions={<Actions />}
    >
      <NutrientGroupList />
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

export default NutrientGroupPage;
