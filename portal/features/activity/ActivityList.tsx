import React, { useEffect, useState } from "react";
import {
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { Activity } from "@/models";
import _ from "lodash";
import { useGetActivitiesQuery, activityApi } from "./services";
import buildQuery from "@/util/buildQuery";
import buildPage from "@/util/buildPage";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ListLayout, ViewAction } from "@/lib/crud";

dayjs.extend(relativeTime);

const columns: GridColDef[] = [
  {
    field: "__str__",
    headerName: "Message",
    minWidth: 400,
    valueGetter: (params) => params.row["__str__"],
  },
  {
    field: "user",
    headerName: "User",
    flex: 1,
    valueGetter: (params) => params.row.user.display_name,
  },
  {
    field: "action_time",
    headerName: "Action Time",

    renderCell: (params: GridRenderCellParams<any>) => {
      if (params.row.action_time == null) return <></>;
      return (
        <Typography color={"link.primary"} variant="body2">
          {dayjs(params.row.action_time).format(
            process.env.NEXT_PUBLIC_DATETIME_FORMAT
          )}
        </Typography>
      );
    },
  },
  { field: "action_flag", headerName: "Action Type", flex: 1 },
];

export const ActivityList = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const { data, isLoading, refetch } = useGetActivitiesQuery(
    buildQuery({ ...buildPage(paginationModel) })
  );

  return (
    <ListLayout<Activity>
      title="Activites"
      columns={columns}
      actions={[ViewAction]}
      getEndpoint={activityApi.endpoints.getActivities}
      filters={{}}
      menus={<></>}
    />
  );
};
