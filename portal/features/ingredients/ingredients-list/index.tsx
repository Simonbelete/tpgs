import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
  ListLayout,
  DashboardAction,
  PermanentlyDeleteAction,
  EditAction,
  HistoryAction,
  CreateButton,
  ExportButton,
  ImportButton,
} from "@/lib/crud";
import {
  ingredientApi,
  exportIngredientsCSV,
  exportIngredientsXLS,
  exportIngredientsXLSX,
  importIngredientsCSV,
  importIngredientsXLS,
  importIngredientsXLSX,
} from "../services";
import { Ingredient } from "@/models";
import { Typography } from "@mui/material";
import Link from "next/link";
import dayjs from "dayjs";

export const IngredientList = () => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
    { field: "dm", headerName: "Dry Matter (%)", flex: 1, minWidth: 150 },
    { field: "price", headerName: "Price (/kg)", flex: 1, minWidth: 150 },
    {
      field: "ingredient_type",
      headerName: "Ingredient Type",
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
      actions={[EditAction, HistoryAction, PermanentlyDeleteAction]}
      getEndpoint={ingredientApi.endpoints.getIngredients}
      deleteEndpoint={ingredientApi.endpoints.deleteIngredient}
      filters={{}}
      menus={
        <>
          <CreateButton />
          <ExportButton
            exportCsv={exportIngredientsCSV}
            exportXls={exportIngredientsXLS}
            exportXlsx={exportIngredientsXLSX}
          />
          <ImportButton
            importCsv={importIngredientsCSV}
            importXls={importIngredientsXLS}
            importXlsx={importIngredientsXLSX}
          />
        </>
      }
    />
  );
};
