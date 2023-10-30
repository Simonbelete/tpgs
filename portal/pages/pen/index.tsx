import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography, Grid } from "@mui/material";
import { PenList, PenListFilter, PenImportExport } from "@/features/pen";
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
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Pen</Typography>}
        actions={<PenImportExport />}
        filter={<PenListFilter />}
      >
        {/* <PenList /> */}
        {/* <List<Nutrient>
          columns={columns}
          actions={[DashboardAction, PermanentlyDeleteAction]}
          getEndpoint={nutrientApi.endpoints.getNutrients}
          deleteEndpoint={nutrientApi.endpoints.deleteNutrient}
        /> */}
        <FormLayout<Nutrient>
          baseUrl="/pen"
          schema={schema}
          createEndpoint={nutrientApi.endpoints.createNutrient}
          updateEndpoint={nutrientApi.endpoints.updateNutrient}
          fields={[
            {
              name: "name",
              label: "Name",
              xs: 12,
              md: 6,
            },
          ]}
        />
      </ListLayout>
    </>
  );
};

export default PenPage;
