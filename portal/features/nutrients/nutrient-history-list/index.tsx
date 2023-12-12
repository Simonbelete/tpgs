import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { HistoryList } from "@/lib/crud";
import { nutrientApi } from "../services";
import { Nutrient, NutrientHistory } from "@/models";
import { IconButton, Tooltip, Typography, Button } from "@mui/material";
import Link from "next/link";
import dayjs from "dayjs";

export const NutrientHistoryList = ({ data }: { data: Nutrient }) => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
    {
      field: "abbreviation",
      headerName: "Abbreviation",
      flex: 1,
      minWidth: 150,
    },
    // { field: "description", headerName: "Description", flex: 1, minWidth: 150 },
    {
      field: "nutrient_group",
      headerName: "Nutrient Group",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams<any>) => {
        return (
          <Typography color={"link.primary"} variant="body2">
            <Link href={`/nutrient-groups/${params.row.nutrient_group}`}>
              {params.row.nutrient_group}
            </Link>
          </Typography>
        );
      },
    },
    {
      field: "unit",
      headerName: "Unit",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams<any>) => {
        return (
          <Typography color={"link.primary"} variant="body2">
            <Link href={`/units/${params.row.unit}`}>{params.row.unit}</Link>
          </Typography>
        );
      },
    },
    { field: "order", headerName: "Order", flex: 1, minWidth: 100 },
    {
      field: "created_at",
      headerName: "Create at",
      flex: 1,
      minWidth: 150,
      valueGetter: (params) =>
        params.row.created_at
          ? dayjs(params.row.created_at).format(
              process.env.NEXT_PUBLIC_DATE_FORMAT
            )
          : "",
    },
  ];
  return (
    <HistoryList<NutrientHistory>
      columns={columns}
      getHistoryQuery={{ id: data.id, query: {} }}
      getHistoryEndpoint={nutrientApi.endpoints.getNutrientHistory}
    />
  );
};
