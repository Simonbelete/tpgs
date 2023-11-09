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
  ingredientNutrientApi,
  exportIngredientNutrientsCSV,
  exportIngredientNutrientsXLS,
  exportIngredientNutrientsXLSX,
  importIngredientNutrientsCSV,
  importIngredientNutrientsXLS,
  importIngredientNutrientsXLSX,
} from "../services";
import { IngredientNutrient } from "@/models";
import { Typography } from "@mui/material";
import Link from "next/link";

export const IngredientNutrientList = () => {
  const columns: GridColDef[] = [
    {
      field: "ingredient",
      headerName: "Ingredient",
      flex: 1,
      renderCell: (params: GridRenderCellParams<any>) => {
        if (params.row.ingredient == null) return <></>;
        return (
          <Typography color={"link.primary"} variant="body2">
            <Link href={`/ingredients/${params.row.ingredient.id}`}>
              {params.row.ingredient.name}
            </Link>
          </Typography>
        );
      },
    },
    {
      field: "nutrient",
      headerName: "Nutrient",
      flex: 1,
      renderCell: (params: GridRenderCellParams<any>) => {
        if (params.row.nutrient == null) return <></>;
        return (
          <Typography color={"link.primary"} variant="body2">
            <Link href={`/ingredients/${params.row.nutrient.id}`}>
              {params.row.nutrient.name}
            </Link>
          </Typography>
        );
      },
    },
    { field: "value", headerName: "Value", flex: 1 },
  ];
  return (
    <ListLayout<IngredientNutrient>
      title="IngredientNutrient"
      columns={columns}
      actions={[EditAction, HistoryAction, PermanentlyDeleteAction]}
      getEndpoint={ingredientNutrientApi.endpoints.getIngredientNutrients}
      deleteEndpoint={ingredientNutrientApi.endpoints.deleteIngredientNutrient}
      filters={{}}
      menus={
        <>
          <CreateButton />
          <ExportButton
            exportCsv={exportIngredientNutrientsCSV}
            exportXls={exportIngredientNutrientsXLS}
            exportXlsx={exportIngredientNutrientsXLSX}
          />
          <ImportButton
            importCsv={importIngredientNutrientsCSV}
            importXls={importIngredientNutrientsXLS}
            importXlsx={importIngredientNutrientsXLSX}
          />
        </>
      }
    />
  );
};
