import React, { ReactElement } from "react";
import { Button, Typography, Box } from "@mui/material";
import { NutrientForm } from "@/features/nutrients";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { CreateLayout } from "@/components/layouts";
import SaveIcon from "@mui/icons-material/Save";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

const NutrientCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <CreateLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      header={<Typography variant="title">Create New Nutrients</Typography>}
      actions={<Actions />}
    >
      <NutrientForm />
    </CreateLayout>
  );
};

const Actions = (): ReactElement => {
  return (
    <>
      <Box>
        <Button variant="contained" startIcon={<SaveIcon />}>
          Create
        </Button>
      </Box>
      <Box>
        <Button variant="outlined" startIcon={<LibraryAddIcon />}>
          Create and New
        </Button>
      </Box>
    </>
  );
};

export default NutrientCreatePage;
