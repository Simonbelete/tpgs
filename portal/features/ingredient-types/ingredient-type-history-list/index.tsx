import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { HistoryList } from "@/lib/crud";
import { ingredientTypeApi } from "../services";
import { IngredientType, IngredientTypeHistory } from "@/models";
import { IconButton, Tooltip, Typography, Button } from "@mui/material";
import Link from "next/link";

export const IngredientTypeHistoryList = ({
  data,
}: {
  data: IngredientType;
}) => {
  const columns: GridColDef[] = [{ field: "name", headerName: "Name" }];
  return (
    <HistoryList<IngredientTypeHistory>
      columns={columns}
      getHistoryQuery={{ id: data.id, query: {} }}
      getHistoryEndpoint={ingredientTypeApi.endpoints.getIngredientTypeHistory}
    />
  );
};
