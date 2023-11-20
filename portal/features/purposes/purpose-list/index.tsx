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
  ExportModal,
} from "@/lib/crud";
import {
  purposeApi,
  exportPurposesCSV,
  exportPurposesXLS,
  exportPurposesXLSX,
  importPurposesCSV,
  importPurposesXLS,
  importPurposesXLSX,
} from "../services";
import { Purpose } from "@/models";
import { Typography } from "@mui/material";
import Link from "next/link";

export const PurposeList = () => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
  ];

  const beforeExportSubmit = (values: any) => values;

  return (
    <ListLayout<Purpose>
      title="Purpose"
      columns={columns}
      actions={[EditAction, HistoryAction, PermanentlyDeleteAction]}
      getEndpoint={purposeApi.endpoints.getPurposes}
      deleteEndpoint={purposeApi.endpoints.deletePurpose}
      filters={{}}
      menus={
        <>
          <CreateButton />
          <ExportModal
            url="/purposes"
            fields={{}}
            beforeSubmit={beforeExportSubmit}
          />
          <ImportButton
            importCsv={importPurposesCSV}
            importXls={importPurposesXLS}
            importXlsx={importPurposesXLSX}
          />
        </>
      }
    />
  );
};
