import React, { useEffect, useState } from "react";
import {
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { Typography, Chip } from "@mui/material";
import { Activity } from "@/models";
import _ from "lodash";
import { useGetActivitiesQuery, activityApi } from "./services";
import buildQuery from "@/util/buildQuery";
import buildPage from "@/util/buildPage";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ListLayout, ViewAction } from "@/lib/crud";
import Link from "next/link";

dayjs.extend(relativeTime);

const modelToUrl = {
  breeds: "breeds",
};

const mapAppLabelToURL = (app_label: string, object_id: string) => {
  return _.get(modelToUrl, app_label, app_label) + "/" + object_id;
};

const typeMapper = {
  "1": {
    label: "Addition",
    color: "success",
  },
  "2": {
    label: "Change",
    color: "info",
  },
  "3": {
    label: "Deletion",
    color: "error",
  },
};

const columns: GridColDef[] = [
  {
    field: "__str__",
    headerName: "Message",
    minWidth: 400,
    renderCell: (params: GridRenderCellParams<any>) => {
      if (params.row["__str__"] == null) return <></>;
      return (
        <Link
          href={mapAppLabelToURL(
            params.row?.content_type.app_label,
            params.row.object_id
          )}
        >
          <Typography color={"link.primary"} variant="body2">
            {params.row["__str__"]}
          </Typography>
        </Link>
      );
    },
  },
  {
    field: "user",
    headerName: "User",
    flex: 1,
    valueGetter: (value, row) => row.user.display_name,
  },
  {
    field: "action_time",
    headerName: "Action Time",

    renderCell: (params: GridRenderCellParams<any>) => {
      if (params.row.action_time == null) return <></>;
      return (
        <Typography variant="body2">
          {dayjs(params.row.action_time).format(
            process.env.NEXT_PUBLIC_DATETIME_FORMAT
          )}
        </Typography>
      );
    },
  },
  {
    field: "action_flag",
    headerName: "Action Type",
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderCell: (params: GridRenderCellParams<any>) => {
      if (params.row.action_flag == null) return <></>;
      return (
        <Chip
          variant="outlined"
          // @ts-ignore
          label={typeMapper[params.row.action_flag].label}
          size="small"
          // @ts-ignore
          color={typeMapper[params.row.action_flag].color}
        />
      );
    },
  },
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
      actions={[]}
      getEndpoint={activityApi.endpoints.getActivities}
      filters={{}}
      menus={<></>}
    />
  );
};
