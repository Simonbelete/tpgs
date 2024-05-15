import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ListLayout, ViewAction, CreateButton } from "@/lib/crud";
import { exportjobApi } from "./services";
import { ExportJob } from "@/models";
import {
  Stack,
  Chip,
  Link,
  Tooltip,
  IconButton,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import _ from "lodash";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

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

const DownloadAction: React.FC<GridRenderCellParams> = ({ id, ...params }) => {
  // TODO: use passed basePath
  if (params.row.file_exists)
    return (
      <Link
        href={`${process.env.NEXT_PUBLIC_API_URL}/export/jobs/${id}/download`}
        data-testid="data-table-view"
      >
        <Tooltip title="Download">
          <IconButton aria-label="View">
            <CloudDownloadIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Link>
    );
  else return <></>;
};

export const ExportJobList = () => {
  const columns: GridColDef[] = [
    { field: "resource", headerName: "Name", minWidth: 200 },
    {
      field: "processing_initiated",
      headerName: "Processing Inititated",
      valueGetter: (value, row) =>
        row.processing_initiated
          ? dayjs(row.processing_initiated).format(
              process.env.NEXT_PUBLIC_API_DATETIME_FORMAT
            )
          : "",
    },
    { field: "format", headerName: "format", flex: 1 },
    {
      field: "error",
      headerName: "Job Status",
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
    { field: "errors", headerName: "Errors" },
    {
      field: "process_finished",
      headerName: "Processing Time",
      align: "center",
      renderCell: (params: GridRenderCellParams<any>) => {
        if (
          params.row.processing_initiated != null &&
          params.row.process_finished != null
        ) {
          return (
            <Typography variant="caption">
              {dayjs(params.row.process_finished).diff(
                params.row.processing_initiated,
                "minutes"
              )}{" "}
              minutes
            </Typography>
          );
        } else return <></>;
      },
    },
  ];
  return (
    <ListLayout<ExportJob>
      title="Export"
      columns={columns}
      actions={[DownloadAction, ViewAction]}
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
