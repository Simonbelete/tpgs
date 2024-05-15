import React, { useState } from "react";
import * as yup from "yup";
import { GridColDef, GridValidRowModel, GridRowsProp } from "@mui/x-data-grid";
import { FormulaIngredient, Ingredient, Formula } from "@/models";
import { EditableList, EditToolbar } from "@/lib/crud";
import { formulaApi } from "../services";
import { EditMode } from "@/types";
import { ingredientApi } from "@/features/ingredients/services";

export interface EditableFormulaIngredient
  extends FormulaIngredient,
    EditMode {}

const FormulaIngredientToolbar = ({
  setRows,
  rows,
  refetch,
}: {
  setRows: (
    newRows: (
      oldRows: GridRowsProp<EditableFormulaIngredient>
    ) => GridRowsProp<EditableFormulaIngredient>
  ) => void;
  rows: GridRowsProp<EditableFormulaIngredient>;
  refetch: () => void;
}) => {
  return (
    <EditToolbar<EditableFormulaIngredient, Ingredient>
      refetch={refetch}
      title="Add Ingredient"
      setRows={setRows}
      rows={rows}
      endpoint={ingredientApi.endpoints.getIngredients}
      mapperKey="ingredient"
    />
  );
};

export const FormulaIngredientForm = ({ data }: { data?: Formula }) => {
  const cleanFormulaIngredient = (
    values: Partial<FormulaIngredient>
  ): Partial<FormulaIngredient> => {
    return {
      id: data?.id, // Only for post data
      formula: data?.id,
      ingredient: (values.ingredient as Ingredient).id || undefined,
      ration: values.ration,
    };
  };

  const columns: GridColDef[] = [
    {
      field: "ingredient",
      headerName: "Name",
      flex: 1,
      minWidth: 150,
      valueGetter: (value, row) => (row.ingredient ? row.ingredient.name : ""),
    },
    {
      field: "unit_price",
      headerName: "Unit Price (kg)",
      flex: 1,
      valueGetter: (value, row) => row.unit_price,
    },
    {
      field: "ration_weight",
      headerName: "Ration Weight (kg)",
      flex: 1,
      valueGetter: (value, row) => row.ration_weight,
    },
    {
      field: "ration_price",
      headerName: "Ration Price (kg)",
      flex: 1,
      valueGetter: (value, row) => row.ration_price,
    },
    {
      field: "min",
      headerName: "Min (%)",
      flex: 1,
      valueGetter: (value, row) => row.min,
      editable: true,
    },
    {
      field: "max",
      headerName: "Max (%)",
      flex: 1,
      valueGetter: (value, row) => row.max,
      editable: true,
    },
    {
      field: "ration",
      headerName: "Value (%)",
      flex: 1,
      minWidth: 150,
      editable: true,
    },
  ];

  return (
    <>
      <EditableList<FormulaIngredient>
        getQuery={{ id: data?.id || 0, query: {} }}
        toolbar={FormulaIngredientToolbar}
        columns={columns}
        beforeSubmit={cleanFormulaIngredient}
        getEndpoint={formulaApi.endpoints.getIngredientsOfFormula}
        createEndpoint={formulaApi.endpoints.createIngredientForFormula}
        updateEndpoint={formulaApi.endpoints.updateIngredientOfFormula}
        deleteEndpoint={formulaApi.endpoints.deleteIngredientOfFormula}
      />
    </>
  );
};
