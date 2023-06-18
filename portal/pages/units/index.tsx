import React, { ReactElement } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Typography, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useBreadcrumbs } from "@/hooks";
import { ListLayout, Breadcrumbs, Loading } from "@/components";
import { UnitsList } from "@/features/units";

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
    <>
      <Link href="/units/create">
        <Button variant="contained" startIcon={<AddIcon />}>
          Create
        </Button>
        <IconButton></IconButton>
      </Link>
    </>
  );
};

export default UnitsPage;
