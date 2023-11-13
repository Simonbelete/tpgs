import React, { useState } from "react";
import * as yup from "yup";
import { GridColDef, GridValidRowModel, GridRowsProp } from "@mui/x-data-grid";
import { FormulaRequirement, Formula, Nutrient } from "@/models";
import { EditableList, EditToolbar } from "@/lib/crud";
import { formulaApi } from "../services";
import { EditMode } from "@/types";
import { nutrientApi } from "@/features/nutrients/services";

export interface EditableFormulaRequirement
  extends FormulaRequirement,
    EditMode {}

const FormulaRequirementToolbar = ({
  setRows,
  rows,
  refetch,
}: {
  setRows: (
    newRows: (
      oldRows: GridRowsProp<EditableFormulaRequirement>
    ) => GridRowsProp<EditableFormulaRequirement>
  ) => void;
  rows: GridRowsProp<EditableFormulaRequirement>;
  refetch: () => void;
}) => {
  return (
    <EditToolbar<EditableFormulaRequirement, Nutrient>
      refetch={refetch}
      title="Add Nutrient"
      setRows={setRows}
      rows={rows}
      endpoint={nutrientApi.endpoints.getNutrients}
      mapperKey="ingredient"
    />
  );
};

export const FormulaRequirementForm = ({ data }: { data?: Formula }) => {
  const cleanFormulaRequirement = (
    values: Partial<FormulaRequirement>
  ): Partial<FormulaRequirement> => {
    return {
      id: data?.id, // Only for post data
      formula: data?.id,
      nutrient: (values.nutrient as Nutrient).id || undefined,
      value: values.value,
    };
  };

  const columns: GridColDef[] = [
    {
      field: "ingredient",
      headerName: "Name",
      flex: 1,
      minWidth: 150,
      valueGetter: (params) =>
        params.row.ingredient ? params.row.ingredient.name : "",
    },
    {
      field: "price",
      headerName: "Price (kg)",
      flex: 1,
      valueGetter: (params) =>
        params.row.ingredient ? params.row.ingredient.price : "",
    },
    {
      field: "ration_weight",
      headerName: "Ration Weight (kg)",
      flex: 1,
      valueGetter: (params) =>
        params.row.ingredient ? params.row.ingredient.ration_weight : "",
    },
    {
      field: "ration_price",
      headerName: "Ration Price (kg)",
      flex: 1,
      valueGetter: (params) =>
        params.row.ingredient ? params.row.ingredient.ration_price : "",
    },
    // {
    //   field: "ratio_min",
    //   headerName: "Min (%)",
    //   flex: 1,
    //   minWidth: 150,
    //   editable: true,
    // },
    // {
    //   field: "ratio_max",
    //   headerName: "Min (%)",
    //   flex: 1,
    //   minWidth: 150,
    //   editable: true,
    // },
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
      <EditableList<FormulaRequirement>
        getQuery={{ id: data?.id || 0, query: {} }}
        toolbar={FormulaRequirementToolbar}
        columns={columns}
        beforeSubmit={cleanFormulaRequirement}
        getEndpoint={formulaApi.endpoints.getRequirementsOfFormula}
        createEndpoint={formulaApi.endpoints.createRequirementForFormula}
        updateEndpoint={formulaApi.endpoints.updateRequirementOfFormula}
        deleteEndpoint={formulaApi.endpoints.deleteRequirementOfFormula}
      />
    </>
  );
};
