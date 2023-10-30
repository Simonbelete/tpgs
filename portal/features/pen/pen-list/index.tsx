import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import {
  ListLayout,
  DashboardAction,
  PermanentlyDeleteAction,
} from "@/lib/crud";
import { penApi } from "../services";

export const PenList = () => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
  ];
  return (
    <ListLayout
      title="Pen"
      columns={columns}
      actions={[DashboardAction, PermanentlyDeleteAction]}
      getEndpoint={penApi.endpoints.getPens}
      deleteEndpoint={penApi.endpoints.deletePen}
      filters={{
        is_active: { label: "Active" },
      }}
    />
  );
};
