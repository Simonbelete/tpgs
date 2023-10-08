import React, { ReactElement } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Typography, Button, IconButton, Stack } from "@mui/material";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs, Loading } from "@/components";
import { ListLayout } from '@/layouts';
import { FormulaList } from "@/features/formula";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const FormulasPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <ListLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      header={<Typography variant="title">Feed Formulas</Typography>}
      actions={<Actions />}
    >
      <FormulaList />
    </ListLayout>
  );
};

const Actions = (): ReactElement => {
  return (
    <Stack
      spacing={2}
      direction={"row"}
      justifyContent="flex-start"
      alignItems="center"
    >
      <Link href="/formulation/formulas/create">
        <Button variant="contained" startIcon={<AddIcon />}>
          Create
        </Button>
      </Link>
      <Button startIcon={<DownloadIcon />} size="small">
        Export
      </Button>
      <Button startIcon={<FileUploadIcon />} size="small">
        Import
      </Button>
    </Stack>
  );
};

export default FormulasPage;
