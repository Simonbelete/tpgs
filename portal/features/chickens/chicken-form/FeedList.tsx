import React, { useEffect, useState } from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Chicken, Feed } from "@/models";
import { ToolbarList, EditAction, BasicToolbar } from "@/lib/crud";
import { Stack, Chip } from "@mui/material";
import { feedApi } from "@/features/feeds/services";

const columns: GridColDef[] = [
  { field: "week", headerName: "Week", flex: 1, minWidth: 150 },
  { field: "weight", headerName: "Weight (g)", flex: 1, minWidth: 150 },
  {
    field: "parent",
    headerName: "Feeding Type",
    flex: 1,
    minWidth: 150,
    renderCell: (params: GridRenderCellParams<any>) => {
      if (params.row.parent) {
        return (
          <Chip
            variant="outlined"
            label={"Batch"}
            size="small"
            color={"warning"}
          />
        );
      } else {
        return (
          <Chip
            variant="outlined"
            label={"Individual"}
            size="small"
            color={"info"}
          />
        );
      }
    },
  },
];

const FeedList = ({ data }: { data: Chicken }) => {
  return (
    <ToolbarList<Feed>
      getQuery={{ chicken: data?.id }}
      actions={[EditAction]}
      toolbar={BasicToolbar}
      columns={columns}
      getEndpoint={feedApi.endpoints.getFeeds}
    />
  );
};

export default FeedList;
