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
import dayjs from "dayjs";

export const IngredientTypeList = () => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "created_at",
      headerName: "Create at",
      flex: 1,
      minWidth: 150,
      valueGetter: (value, row) =>
        row.created_at
          ? dayjs(row.created_at).format(process.env.NEXT_PUBLIC_DATE_FORMAT)
          : "",
    },
  ];
  return (
    <ListLayout<IngredientType>
      title="Ingredient Group"
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
