import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography, Grid } from "@mui/material";
import { PenList } from "@/features/pen";
import { SeoHead } from "@/seo";

import {
  List,
  DashboardAction,
  PermanentlyDeleteAction,
  Form,
  FormLayout,
} from "@/lib/crud";
import { GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { nutrientApi } from "@/features/nutrients/services";
import { Nutrient } from "@/models";

import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required(),
});

const PenPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
  ];

  return (
    <>
      <SeoHead title="Pen" />
      <ListLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <PenList />
      </ListLayout>
    </>
  );
};

export default PenPage;
