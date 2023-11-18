import React, { useState } from "react";
import * as yup from "yup";
import {
  GridRowsProp,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { Feed } from "@/models";
import { ToolbarList } from "@/lib/crud";
import { Box, Typography, Button, Tooltip, IconButton } from "@mui/material";
import Link from "next/link";
import { feedApi } from "../services";
import RefreshIcon from "@mui/icons-material/Refresh";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { useRouter } from "next/router";

const BasicToolbar = ({
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
      </Box>
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
};

const EditAction: React.FC<GridRenderCellParams> = ({ id }) => {
  // TODO: use passed basePath
  const router = useRouter();
  return (
    <Link href={`/feeds/${id}/edit`} id="data-table-edit">
      <Tooltip title="Edit">
        <IconButton aria-label="edit">
          <DriveFileRenameOutlineIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Link>
  );
};

export const ChickenFeed = ({ data }: { data: Feed }) => {
  const columns: GridColDef[] = [
    {
      field: "chicken",
      headerName: "Chicken",
      flex: 1,
      renderCell: (params: GridRenderCellParams<any>) => {
        if (params.row.chicken == null) return <></>;
        return (
          <Typography color={"link.primary"} variant="body2">
            <Link href={`/chickens/${params.row.chicken.id}`}>
              {params.row.chicken.display_name}
            </Link>
          </Typography>
        );
      },
    },
    { field: "week", headerName: "Week", flex: 1, minWidth: 150 },
    {
      field: "weight",
      headerName: "Feed intake weight (g)",
      flex: 1,
      minWidth: 150,
    },
  ];

  return (
    <ToolbarList<Feed>
      getQuery={{ id: data?.id, query: {} }}
      actions={[EditAction]}
      columns={columns}
      toolbar={BasicToolbar}
      getEndpoint={feedApi.endpoints.getBatchChildrenFeeds}
    />
  );
};
