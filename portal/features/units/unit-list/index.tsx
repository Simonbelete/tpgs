import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
  ListLayout,
  DashboardAction,
  PermanentlyDeleteAction,
  EditAction,
  HistoryAction,
  CreateButton,
  ExportButton,
  ImportButton,
} from "@/lib/crud";
import {
  unitApi,
  exportUnitsCSV,
  exportUnitsXLS,
  exportUnitsXLSX,
  importUnitsCSV,
  importUnitsXLS,
  importUnitsXLSX,
} from "../services";
import { Unit } from "@/models";
import { houseApi } from "@/features/houses/services";
import { Typography } from "@mui/material";
import Link from "next/link";

export const UnitList = () => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
  ];
  return (
    <ListLayout<Unit>
      title="Unit"
      columns={columns}
      actions={[EditAction, HistoryAction, PermanentlyDeleteAction]}
      getEndpoint={unitApi.endpoints.getUnits}
      deleteEndpoint={unitApi.endpoints.deleteUnit}
      filters={{}}
      menus={
        <>
          <CreateButton />
          <ExportButton
            exportCsv={exportUnitsCSV}
            exportXls={exportUnitsXLS}
            exportXlsx={exportUnitsXLSX}
          />
          <ImportButton
            importCsv={importUnitsCSV}
            importXls={importUnitsXLS}
            importXlsx={importUnitsXLSX}
          />
        </>
      }
    />
  );
};
