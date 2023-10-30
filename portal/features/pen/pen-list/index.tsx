import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import {
  ListLayout,
  DashboardAction,
  PermanentlyDeleteAction,
  EditAction,
  HistoryAction,
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
import { Pen } from "@/models";
import { houseApi } from "@/features/houses/services";

export const PenList = () => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
  ];
  return (
    <ListLayout<Pen>
      baseUrl="/pen"
      title="Pen"
      columns={columns}
      actions={[
        DashboardAction,
        EditAction,
        HistoryAction,
        PermanentlyDeleteAction,
      ]}
      getEndpoint={penApi.endpoints.getPens}
      deleteEndpoint={penApi.endpoints.deletePen}
      filters={{
        house: {
          label: "House",
          dataDisplayKey: "name",
          endpoint: houseApi.endpoints.getHouses,
        },
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
