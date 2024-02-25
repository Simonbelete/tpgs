import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
  ListLayout,
  DashboardAction,
  PermanentlyDeleteAction,
  EditAction,
  HistoryAction,
  CreateButton,
  ExportModal,
  ImportButton,
} from "@/lib/crud";
import { importjobApi, URL } from "./services";
import { ImportJob } from "@/models";

export const ImportJobList = () => {
  const columns: GridColDef[] = [
    { field: "resource", headerName: "Name", flex: 1 },
    {
      field: "processing_initiated",
      headerName: "processing_initiated",
      flex: 1,
    },
    { field: "format", headerName: "format", flex: 1 },
    { field: "job_status", headerName: "job_status", flex: 1 },
    { field: "uploaded_on", headerName: "uploaded_on", flex: 1 },
  ];
  return (
    <ListLayout<ImportJob>
      title="Import"
      columns={columns}
      actions={[EditAction, HistoryAction, PermanentlyDeleteAction]}
      getEndpoint={importjobApi.endpoints.getImportJobs}
      deleteEndpoint={importjobApi.endpoints.deleteImportJob}
      filters={{}}
      menus={
        <>
          <CreateButton />
        </>
      }
    />
  );
};
