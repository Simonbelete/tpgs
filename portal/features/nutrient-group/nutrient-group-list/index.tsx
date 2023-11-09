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
  nutrientGroupApi,
  exportNutrientGroupsCSV,
  exportNutrientGroupsXLS,
  exportNutrientGroupsXLSX,
  importNutrientGroupsCSV,
  importNutrientGroupsXLS,
  importNutrientGroupsXLSX,
} from "../services";
import { NutrientGroup } from "@/models";
import { Typography } from "@mui/material";
import Link from "next/link";

export const NutrientGroupList = () => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
  ];
  return (
    <ListLayout<NutrientGroup>
      title="NutrientGroup"
      columns={columns}
      actions={[EditAction, HistoryAction, PermanentlyDeleteAction]}
      getEndpoint={nutrientGroupApi.endpoints.getNutrientGroups}
      deleteEndpoint={nutrientGroupApi.endpoints.deleteNutrientGroup}
      filters={{}}
      menus={
        <>
          <CreateButton />
          <ExportButton
            exportCsv={exportNutrientGroupsCSV}
            exportXls={exportNutrientGroupsXLS}
            exportXlsx={exportNutrientGroupsXLSX}
          />
          <ImportButton
            importCsv={importNutrientGroupsCSV}
            importXls={importNutrientGroupsXLS}
            importXlsx={importNutrientGroupsXLSX}
          />
        </>
      }
    />
  );
};
