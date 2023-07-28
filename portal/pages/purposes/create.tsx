import React, { useEffect, ReactElement } from "react";
import { PurposeForm } from "@/features/purposes";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/components/layouts";
import { Button, Typography, Box, Container } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

const PurposeCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <CreateLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      header={
        <Typography variant="title">Create Production Purpose</Typography>
      }
      actions={<Actions />}
    >
      <Container maxWidth="md">
        <PurposeForm />
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

export default PurposeCreatePage;
