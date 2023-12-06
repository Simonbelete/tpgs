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
import { ingredientApi, URL } from "../services";
import { Ingredient } from "@/models";
import { Typography } from "@mui/material";
import Link from "next/link";
import { ingredientTypeApi } from "@/features/ingredient-types/services";
import dayjs from "dayjs";

export const IngredientList = () => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1, minWidth: 200 },
    { field: "dm", headerName: "Dry Matter (%)", flex: 1 },
    { field: "price", headerName: "Price (/kg)", flex: 1 },
    {
      field: "ingredient_type",
      headerName: "Ingredient Group",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams<any>) => {
        if (params.row.ingredient_type == null) return <></>;
        return (
          <Typography color={"link.primary"} variant="body2">
            <Link href={`/ingredient-types/${params.row.ingredient_type.id}`}>
              {params.row.ingredient_type.name}
            </Link>
          </Typography>
        );
      },
    },
    { field: "min", headerName: "Min (%)", flex: 1 },
    { field: "max", headerName: "Max (%)", flex: 1 },
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
    <ListLayout<Ingredient>
      title="Ingredient"
      columns={columns}
      actions={[
        DashboardAction,
        EditAction,
        HistoryAction,
        PermanentlyDeleteAction,
      ]}
      getEndpoint={ingredientApi.endpoints.getIngredients}
      deleteEndpoint={ingredientApi.endpoints.deleteIngredient}
      filters={{
        ingredient_type: {
          endpoint: ingredientTypeApi.endpoints.getIngredientTypes,
          label: "Ingredient Group",
          dataDisplayKey: "display_name",
        },
      }}
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
