import React, { useEffect, useState } from "react";
import {
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { Typography, Chip } from "@mui/material";
import Link from "next/link";
import { DataTable } from "@/components/tables";
import { Notification } from "@/models";
import _ from "lodash";
import { useGetNotificationsQuery } from "../services";
import buildQuery from "@/util/buildQuery";
import buildPage from "@/util/buildPage";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const columns: GridColDef[] = [
  { field: "verb", headerName: "Action", flex: 1 },
  {
    field: "level",
    headerName: "Level",
    flex: 1,
    renderCell: (params: GridRenderCellParams<any>) => {
      if (params.row.level == null) return <></>;
      return <Chip label={params.row.level} variant="outlined" />;
    },
  },
  { field: "description", headerName: "description", flex: 1 },
  {
    field: "timestamp",
    headerName: "Date",
    flex: 1,
    renderCell: (params: GridRenderCellParams<any>) => {
      if (params.row.timestamp == null) return <></>;
      return (
        <Typography color={"link.primary"} variant="body2">
          {dayjs(params.row.timestamp).fromNow()}
        </Typography>
      );
    },
  },
];

const NotificationList = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const { data, isLoading, refetch } = useGetNotificationsQuery(
    buildQuery({ ...buildPage(paginationModel) })
  );

  return (
    <DataTable
      rows={(data?.results ?? []) as GridRowsProp<Notification>}
      columns={columns}
      rowCount={data?.count || 0}
      loading={isLoading}
      pageSizeOptions={[5, 10, 25, 50, 100]}
      paginationModel={paginationModel}
      paginationMode="server"
      onPaginationModelChange={setPaginationModel}
    />
  );
};

export default NotificationList;
