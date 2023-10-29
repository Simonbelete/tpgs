import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { PenList, PenListFilter, PenImportExport } from "@/features/pen";
import { SeoHead } from "@/seo";

import { List, DashboardAction, PermanentlyDeleteAction } from "@/lib/crud";
import { GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { nutrientApi } from "@/features/nutrients/services";
import { Nutrient } from "@/models";

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
        <List<Nutrient>
          columns={columns}
          actions={[DashboardAction, PermanentlyDeleteAction]}
          getEndpoint={nutrientApi.endpoints.getNutrients}
          deleteEndpoint={nutrientApi.endpoints.deleteNutrient}
        />
      </ListLayout>
    </>
  );
};

export default PenPage;
