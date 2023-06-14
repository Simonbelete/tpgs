import React, { useEffect, ReactElement } from "react";
import { NutrientGroupForm } from "@/features/nutrient-group";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/components/layouts";
import { Button, Typography, Box, Container } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

const NutrientGroupCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <CreateLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      header={<Typography variant="title">Create Nutrients Group</Typography>}
      actions={<Actions />}
    >
      <Container maxWidth="md">
        <NutrientGroupForm />
      </Container>
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

export default NutrientGroupCreatePage;
