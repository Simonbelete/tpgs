import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { HistoryList } from "@/lib/crud";
import { requirementIngredientApi } from "../services";
import { RequirementIngredient, RequirementIngredientHistory } from "@/models";
import { IconButton, Tooltip, Typography, Button } from "@mui/material";
import Link from "next/link";

export const RequirementIngredientHistoryList = ({
  data,
}: {
  data: RequirementIngredient;
}) => {
  const columns: GridColDef[] = [];
  return (
    <HistoryList<RequirementIngredientHistory>
      columns={columns}
      getHistoryQuery={{ id: data.id, query: {} }}
      getHistoryEndpoint={
        requirementIngredientApi.endpoints.getRequirementIngredientHistory
      }
    />
  );
};
