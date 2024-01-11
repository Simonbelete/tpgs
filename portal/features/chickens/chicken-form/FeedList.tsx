import React, { useEffect, useState } from "react";
import { Chicken, Feed } from "@/models";
import { ToolbarList, EditAction, BasicToolbar } from "@/lib/crud";
import { feedApi } from "@/features/feeds/services";

import {
  GridColDef,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import { Box, Button, Typography, Chip } from "@mui/material";

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

const CustomEditAction: typeof EditAction = ({ ...props }) => {
  return <EditAction {...props} path="/feeds" />;
};

const CustomToolbar = ({
  setRows,
  rows,
  refetch,
}: {
  setRows: any;
  rows: any;
  refetch: () => void;
}) => {
  return (
    <GridToolbarContainer
      sx={{ display: "flex", justifyContent: "space-between" }}
    >
      <Box>
        <GridToolbarColumnsButton />
        <GridToolbarDensitySelector />
        <Button
          color="primary"
          startIcon={<RefreshIcon />}
          variant="text"
          onClick={() => refetch()}
          size={"small"}
        >
          Refresh
        </Button>
        <Link href="/feeds/create?chicken=">
          <Button
            color="primary"
            startIcon={<AddIcon />}
            variant="text"
            size={"small"}
          >
            Add new
          </Button>
        </Link>
      </Box>
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
};

const FeedList = ({ data }: { data: Chicken }) => {
  return (
    <ToolbarList<Feed>
      getQuery={{ chicken: data?.id }}
      actions={[CustomEditAction]}
      toolbar={CustomToolbar}
      columns={columns}
      getEndpoint={feedApi.endpoints.getFeeds}
    />
  );
};

export default FeedList;
