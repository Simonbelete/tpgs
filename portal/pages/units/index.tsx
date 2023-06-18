import React, { ReactElement } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Typography, Button, IconButton, Stack } from "@mui/material";
import { useBreadcrumbs } from "@/hooks";
import { ListLayout, Breadcrumbs, Loading } from "@/components";
import { UnitsList } from "@/features/units";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const DashboardLayout = dynamic(
  () => import("../../components/layouts/DashboardLayout"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

const UnitsPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <DashboardLayout>
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Units</Typography>}
        actions={<Actions />}
      >
        <UnitsList />
      </ListLayout>
    </DashboardLayout>
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
      <Link href="/units/create">
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

export default UnitsPage;
