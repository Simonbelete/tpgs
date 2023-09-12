import React, { ReactElement } from "react";
import dynamic from "next/dynamic";
import { Button, Typography, Box, Container } from "@mui/material";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { UnitForm } from "@/features/units";
import { CreateLayout } from "@/layouts";
import SaveIcon from "@mui/icons-material/Save";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

const UnitCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <CreateLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      header={<Typography variant="title">Create New Unit</Typography>}
      actions={<Actions />}
    >
      <UnitForm />
    </CreateLayout>
  );
};

const Actions = (): ReactElement => {
  return (
    <>
      {/* <Box>
        <Button variant="contained" startIcon={<SaveIcon />}>
          Create
        </Button>
      </Box>
      <Box>
        <Button variant="outlined" startIcon={<LibraryAddIcon />}>
          Create and New
        </Button>
      </Box> */}
    </>
  );
};

export default UnitCreatePage;
