import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { HistoryList } from "@/lib/crud";
import { ingredientNutrientApi } from "../services";
import { IngredientNutrient, IngredientNutrientHistory } from "@/models";
import { IconButton, Tooltip, Typography, Button } from "@mui/material";
import Link from "next/link";

export const IngredientNutrientHistoryList = ({
  data,
}: {
  data: IngredientNutrient;
}) => {
  const columns: GridColDef[] = [{ field: "name", headerName: "Name" }];
  return (
    <HistoryList<IngredientNutrientHistory>
      columns={columns}
      getHistoryQuery={{ id: data.id, query: {} }}
      getHistoryEndpoint={
        ingredientNutrientApi.endpoints.getIngredientNutrientHistory
      }
    />
  );
};
