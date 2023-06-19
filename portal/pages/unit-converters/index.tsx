import React, { ReactElement } from "react";
import Link from "next/link";
import { Typography, Button, Stack } from "@mui/material";
import { useBreadcrumbs } from "@/hooks";
import { ListLayout, Breadcrumbs } from "@/components";
import { UnitConvertersList } from "@/features/unit-converters";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const UnitConvertersPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <ListLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      header={<Typography variant="title">Unit Converters</Typography>}
      actions={<Actions />}
    >
      <UnitConvertersList />
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
      <Link href="/unit-converters/create">
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

export default UnitConvertersPage;
