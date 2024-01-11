import React, { useEffect, useState } from "react";
import { ToolbarList, EditAction, BasicToolbar } from "@/lib/crud";
import { weightApi } from "@/features/weights/services";
import { Weight, Chicken } from "@/models";
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
import { Box, Button, Typography } from "@mui/material";

const columns: GridColDef[] = [
  { field: "week", headerName: "Week", flex: 1, minWidth: 150 },
  { field: "weight", headerName: "Weight (g)", flex: 1, minWidth: 150 },
];

const CustomEditAction: typeof EditAction = ({ ...props }) => {
  return <EditAction {...props} path="/weights" />;
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
        <Link href="/weights/create?chicken=">
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

const WeightList = ({ data }: { data: Chicken }) => {
  return (
    <ToolbarList<Weight>
      getQuery={{ chicken: data?.id }}
      actions={[CustomEditAction]}
      toolbar={CustomToolbar}
      columns={columns}
      getEndpoint={weightApi.endpoints.getWeights}
    />
  );
};

export default WeightList;
