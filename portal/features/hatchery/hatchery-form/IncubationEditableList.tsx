import React, { useState } from "react";
import {
  GridColDef,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { HatcheryEgg, Hatchery } from "@/models";
import { ToolbarList, EditAction } from "@/lib/crud";
import { Box, Button } from "@mui/material";
import { EditMode } from "@/types";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import { hatcheryApi } from "../services";

export interface EditableHatcheryEgg extends HatcheryEgg, EditMode {}

const HatcheryEggToolbar = ({
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
        <Link href="/candling/create">
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

const HatcheryEggEditableList = ({ data }: { data: Hatchery }) => {
  const columns: GridColDef[] = [
    {
      field: "nutrient__name",
      headerName: "Name",
      filterable: false,
      valueGetter: (params) =>
        params.row.nutrient ? params.row.nutrient.name : "",
    },
    {
      field: "nutrient__abbreviation",
      headerName: "Abbreviation",
      flex: 1,
      minWidth: 50,
      filterable: false,
      valueGetter: (params) =>
        params.row.nutrient ? params.row.nutrient.abbreviation : "",
    },
    {
      field: "value",
      headerName: "Value [%]",
      minWidth: 100,
      filterable: false,
      editable: true,
      type: "number",
    },
    {
      field: "nutrient__unit",
      headerName: "Unit",
      flex: 1,
      filterable: false,
      valueGetter: (params) =>
        params.row.nutrient ? params.row.nutrient.unit.name : "",
    },
  ];

  return (
    <ToolbarList<HatcheryEgg>
      getQuery={{ id: data?.id, query: {} }}
      actions={[EditAction]}
      toolbar={HatcheryEggToolbar}
      columns={columns}
      getEndpoint={hatcheryApi.endpoints.getEggsOfHatchery}
    />
  );
};

export default HatcheryEggEditableList;
