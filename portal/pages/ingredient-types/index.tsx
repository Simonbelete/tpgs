import React, { ReactElement } from "react";
import { IngredientTypeList } from "@/features/ingredient-types";
import Link from "next/link";
import { ListLayout } from "@/components/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Button, Typography, Stack } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const IngredientTypePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <ListLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      header={<Typography variant="title">Ingredient Types</Typography>}
      actions={<Actions />}
    >
      <IngredientTypeList />
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
      <Link href="/ingredient-types/create">
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

export default IngredientTypePage;
