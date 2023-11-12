import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
  ListLayout,
  DashboardAction,
  PermanentlyDeleteAction,
  EditAction,
  HistoryAction,
} from "@/lib/crud";
import { groupApi } from "../services";
import { Group } from "@/models";
import { Typography } from "@mui/material";
import Link from "next/link";

export const GroupList = () => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "house",
      headerName: "House",
      flex: 1,
      minWidth: 150,
      valueGetter: (params) =>
        params.row.nutrient_group ? params.row.nutrient_group.name : "",
      renderCell: (params: GridRenderCellParams<any>) => {
        if (params.row.house == null) return <></>;
        return (
          <Typography color={"link.primary"} variant="body2">
            <Link href={`/houses/${params.row.house.id}`}>
              {params.row.house.name}
            </Link>
          </Typography>
        );
      },
    },
  ];
  return (
    <ListLayout<Group>
      title="Group"
      columns={columns}
      actions={[]}
      getEndpoint={groupApi.endpoints.getGroups}
      filters={{}}
      menus={<></>}
    />
  );
};
