import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Link from "next/link";
import {
  GridColDef,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { HatcheryEgg, Hatchery, Chicken } from "@/models";
import { ToolbarList, EditAction, BasicToolbar } from "@/lib/crud";
import { Box, Button } from "@mui/material";
import { EditMode } from "@/types";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import { chickenApi } from "../services";
import dayjs from "dayjs";

const columns: GridColDef[] = [
  {
    field: "tag",
    headerName: "Tag",
    minWidth: 200,
    renderCell: (params: GridRenderCellParams<any>) => {
      return (
        <Typography color={"link.primary"} variant="body2">
          <Link target="_blank" href={`/chickens/${params.row.id}`}>
            {params.row.display_name}
          </Link>
        </Typography>
      );
    },
  },
  {
    field: "breed",
    headerName: "Breed",

    renderCell: (params: GridRenderCellParams<any>) => {
      if (params.row.breed == null) return <></>;
      return (
        <Typography color={"link.primary"} variant="body2">
          <Link href={`/breeds/${params.row.breed.id}`}>
            {params.row.breed.display_name}
          </Link>
        </Typography>
      );
    },
  },
  {
    field: "pen",
    headerName: "Pen",
    renderCell: (params: GridRenderCellParams<any>) => {
      if (params.row.pen == null) return <></>;
      return (
        <Typography color={"link.primary"} variant="body2">
          <Link href={`/pen/${params.row.pen.id}`}>
            {params.row.pen.display_name}
          </Link>
        </Typography>
      );
    },
  },
  { field: "sex", headerName: "Tag", flex: 1 },
  {
    field: "hatcher",
    headerName: "Batch",
    renderCell: (params: GridRenderCellParams<any>) => {
      if (params.row.hatchery == null) return <></>;
      return (
        <Typography color={"link.primary"} variant="body2">
          <Link href={`/hatchery/${params.row.hatchery.id}`}>
            {params.row.hatchery.display_name}
          </Link>
        </Typography>
      );
    },
  },
  {
    field: "reduction_date",
    headerName: "Mortality",
    valueGetter: (value, row) =>
      row.reduction_date
        ? dayjs(row.reduction_date).format(process.env.NEXT_PUBLIC_DATE_FORMAT)
        : "",
  },
];

const OffspringList = ({ data }: { data: Chicken }) => {
  return (
    <ToolbarList<Chicken>
      getQuery={{ id: data?.id, query: {} }}
      actions={[EditAction]}
      toolbar={BasicToolbar}
      columns={columns}
      getEndpoint={chickenApi.endpoints.getChickenOffspring}
    />
  );
};

export default OffspringList;
