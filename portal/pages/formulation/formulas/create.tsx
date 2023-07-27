import React, { ReactElement } from "react";
import { Button, Typography, Box, Container, Stack } from "@mui/material";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { FormulaForm } from "@/features/formula";
import { CreateLayout, ActionLayout } from "@/components/layouts";
import FunctionsIcon from "@mui/icons-material/Functions";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";

const FormulaCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <ActionLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      header={<Typography variant="title">Create New Formula</Typography>}
      actions={<Actions />}
    >
      <FormulaForm />
    </ActionLayout>
  );
};

const Actions = () => {
  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          startIcon={<FunctionsIcon />}
          // size="small"
          disableElevation
          // onClick={handleOnFormulate}
        >
          Formulate
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<SaveIcon />}
          disableElevation
          // onClick={handleOnFormulate}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<SaveIcon />}
          disableElevation
          // onClick={handleOnFormulate}
        >
          Print
        </Button>
      </Stack>
    </Box>
  );
};

export default FormulaCreatePage;
