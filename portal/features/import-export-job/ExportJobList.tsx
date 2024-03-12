import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ListLayout, ViewAction, CreateButton } from "@/lib/crud";
import { exportjobApi } from "./services";
import { ExportJob } from "@/models";
import { Stack, Chip } from "@mui/material";
import dayjs from "dayjs";
import _ from "lodash";

const typeMapper = {
  DONE: {
    label: "Done",
    color: "success",
  },
  EXPORTING: {
    label: "Exporting",
    color: "warning",
  },
  START: {
    label: "Start",
    color: "info",
  },
  ERROR: {
    label: "Error",
    color: "error",
  },
};

export const ExportJobList = () => {
  const columns: GridColDef[] = [
    { field: "resource", headerName: "Name", flex: 1, minWidth: 150 },
    {
      field: "processing_initiated",
      headerName: "Processing Inititated",
      flex: 1,
      minWidth: 150,
      valueGetter: (params) =>
        params.row.processing_initiated
          ? dayjs(params.row.processing_initiated).format(
              process.env.NEXT_PUBLIC_API_DATETIME_FORMAT
            )
          : "",
    },
    { field: "format", headerName: "format", flex: 1 },
    {
      field: "error",
      headerName: "Job Status",
      flex: 1,
      minWidth: 80,
      renderCell: (params: GridRenderCellParams<any>) => {
        return (
          <Stack direction="row" spacing={1}>
            {params.row.job_status.length > 0 && (
              <Chip
                variant="outlined"
                // @ts-ignore
                label={_.get(typeMapper[params.row.job_status], "label", "")}
                size="small"
                color={_.get(
                  // @ts-ignore
                  typeMapper[params.row.job_status],
                  "color",
                  "default"
                )}
              />
            )}
          </Stack>
        );
      },
    },
    { field: "errors", headerName: "Errors", flex: 1, minWidth: 200 },
    { field: "file", headerName: "File", flex: 1, minWidth: 200 },
  ];
  return (
    <ListLayout<ExportJob>
      title="Export"
      columns={columns}
      actions={[ViewAction]}
      getEndpoint={exportjobApi.endpoints.getExportJobs}
      deleteEndpoint={exportjobApi.endpoints.deleteExportJob}
      filters={{}}
      menus={
        <>
          <CreateButton />
        </>
      }
    />
  );
};
