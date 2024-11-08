import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ListLayout, ViewAction, CreateButton } from "@/lib/crud";
import { importjobApi } from "./services";
import { ImportJob } from "@/models";
import { Stack, Chip } from "@mui/material";
import dayjs from "dayjs";
import _ from "lodash";

const typeMapper = {
  DONE: {
    label: "Done",
    color: "success",
  },
  COMMIT: {
    label: "Commit",
    color: "primary",
  },
  "DRY RUN": {
    label: "Dry Run",
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

export const ImportJobList = () => {
  console.log(process.env.NEXT_PUBLIC_API_DATETIME_FORMAT);
  const columns: GridColDef[] = [
    { field: "resource", headerName: "Name", flex: 1, minWidth: 150 },
    {
      field: "processing_initiated",
      headerName: "Processing Inititated",
      flex: 1,
      minWidth: 150,
      valueGetter: (value, row) =>
        row.processing_initiated
          ? dayjs(row.processing_initiated).format(
              process.env.NEXT_PUBLIC_API_DATETIME_FORMAT
            )
          : "",
    },
    { field: "format", headerName: "format", flex: 1 },
    {
      field: "uploaded_on",
      headerName: "Uploaded on",
      flex: 1,
      minWidth: 150,
      valueGetter: (value, row) =>
        row.uploaded_on
          ? dayjs(row.uploaded_on).format(
              process.env.NEXT_PUBLIC_API_DATETIME_FORMAT
            )
          : "",
    },
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
                label={_.get(
                  // @ts-ignore
                  typeMapper[params.row.job_status],
                  "label",
                  "Started"
                )}
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
    // { field: "errors", headerName: "Errors", flex: 1, minWidth: 200 },
  ];
  return (
    <ListLayout<ImportJob>
      title="Import"
      columns={columns}
      actions={[ViewAction]}
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
