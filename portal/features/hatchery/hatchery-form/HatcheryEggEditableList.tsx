import React, { useState } from "react";
import {
  GridColDef,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { HatcheryEgg, Hatchery } from "@/models";
import { ToolbarList, EditAction } from "@/lib/crud";
import { Box, Button, Typography } from "@mui/material";
import { EditMode } from "@/types";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import { hatcheryApi } from "../services";
import dayjs from "dayjs";

export interface EditableHatcheryEgg extends HatcheryEgg, EditMode {}

const CustomEditAction: typeof EditAction = ({ ...props }) => {
  return <EditAction {...props} path="/candling" />;
};

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
      field: "hatchery",
      headerName: "Hatchery",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams<any>) => {
        if (params.row.hatchery == null) return <></>;
        return (
          <Typography color={"link.primary"} variant="body2">
            <Link href={`/nutrient-groups/${params.row.hatchery.id}`}>
              {params.row.hatchery.name}
            </Link>
          </Typography>
        );
      },
    },
    {
      field: "egg",
      headerName: "Egg",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams<any>) => {
        if (params.row.egg == null) return <></>;
        return (
          <Typography color={"link.primary"} variant="body2">
            <Link href={`/eggs/${params.row.egg.id}`}>
              {params.row.egg.display_name}
            </Link>
          </Typography>
        );
      },
    },
    {
      field: "no_eggs",
      headerName: "No of eggs",
      flex: 1,
    },
    {
      field: "canndle_date",
      headerName: "Canndle Date",
      flex: 1,
      valueGetter: (params) =>
        params.row.date_time
          ? dayjs(params.row.date_time).format(
              process.env.NEXT_PUBLIC_DATE_FORMAT
            )
          : "",
    },
    {
      field: "candled_eggs",
      headerName: "Candled Eggs",
      flex: 1,
    },
  ];

  return (
    <ToolbarList<HatcheryEgg>
      getQuery={{ id: data?.id, query: {} }}
      actions={[CustomEditAction]}
      toolbar={HatcheryEggToolbar}
      columns={columns}
      getEndpoint={hatcheryApi.endpoints.getEggsOfHatchery}
    />
  );
};

export default HatcheryEggEditableList;
