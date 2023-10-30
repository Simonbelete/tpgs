import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import {
  ListLayout,
  DashboardAction,
  PermanentlyDeleteAction,
} from "@/lib/crud";
import {
  penApi,
  exportPensCSV,
  exportPensXLS,
  exportPensXLSX,
  importPensCSV,
  importPensXLS,
  importPensXLSX,
} from "../services";

export const PenList = () => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
  ];
  return (
    <ListLayout
      baseUrl="/pen"
      title="Pen"
      columns={columns}
      actions={[DashboardAction, PermanentlyDeleteAction]}
      getEndpoint={penApi.endpoints.getPens}
      deleteEndpoint={penApi.endpoints.deletePen}
      filters={{
        is_active: { label: "Active" },
      }}
      exportCsv={exportPensCSV}
      exportXls={exportPensXLS}
      exportXlsx={exportPensXLSX}
      importCsv={importPensCSV}
      importXls={importPensXLS}
      importXlsx={importPensXLSX}
    />
  );
};
