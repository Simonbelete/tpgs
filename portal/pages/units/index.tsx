import React, { ReactElement } from "react";
import Link from "next/link";
import { Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useBreadcrumbs } from "@/hooks";
import { ListLayout, Breadcrumbs } from "@/components";

const DashboardLayout = dynamic(
  () => import("../components/layouts/DashboardLayout"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

const UnitsPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <ListLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      header={<Typography variant="title">Nutrients Group</Typography>}
      actions={<Actions />}
    ></ListLayout>
  );
};

const Actions = (): ReactElement => {
  return (
    <>
      <Link href="/nutrient-groups/create">
        <Button variant="contained" startIcon={<AddIcon />}>
          Create
        </Button>
      </Link>
    </>
  );
};

export default UnitsPage;
