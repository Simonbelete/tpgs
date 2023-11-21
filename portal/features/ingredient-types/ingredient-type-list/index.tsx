import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
  ListLayout,
  DashboardAction,
  PermanentlyDeleteAction,
  EditAction,
  HistoryAction,
  CreateButton,
  ImportButton,
  ExportModal,
} from "@/lib/crud";
import { ingredientTypeApi, URL } from "../services";
import { IngredientType } from "@/models";
import { Typography } from "@mui/material";
import Link from "next/link";

export const IngredientTypeList = () => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
  ];
  return (
    <ListLayout<IngredientType>
      title="IngredientType"
      columns={columns}
      actions={[EditAction, HistoryAction, PermanentlyDeleteAction]}
      getEndpoint={ingredientTypeApi.endpoints.getIngredientTypes}
      deleteEndpoint={ingredientTypeApi.endpoints.deleteIngredientType}
      filters={{}}
      menus={
        <>
          <CreateButton />
          <ExportModal
            url={URL}
            fields={{}}
            beforeSubmit={(values) => values}
          />
          <ImportButton url={URL} />
        </>
      }
    />
  );
};
