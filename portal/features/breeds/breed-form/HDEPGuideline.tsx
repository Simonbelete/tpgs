import React, { useState } from "react";
import {
  GridColDef,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { Breed, HDEPGuideline } from "@/models";
import { ToolbarList, EditAction } from "@/lib/crud";
import { Box, Button } from "@mui/material";
import { EditMode } from "@/types";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import { breedApi } from "../services";

export interface EditableHDEPGuideline extends HDEPGuideline, EditMode {}

const HDEPGuidelineToolbar = ({
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
        <Link href="/guidelines/hdep/create">
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

const HDEPGuideline = ({ data }: { data: Breed }) => {
  const columns: GridColDef[] = [
    {
      field: "week",
      headerName: "Week",
      filterable: false,
    },
    {
      field: "hdep",
      headerName: "HDEP (%)",
      flex: 1,
      minWidth: 50,
      filterable: false,
    },
  ];

  return (
    <ToolbarList<HDEPGuideline>
      getQuery={{ id: data?.id, query: {} }}
      actions={[EditAction]}
      toolbar={HDEPGuidelineToolbar}
      columns={columns}
      getEndpoint={breedApi.endpoints.getHDEPGuidelineOfBreed}
    />
  );
};

export default HDEPGuideline;
