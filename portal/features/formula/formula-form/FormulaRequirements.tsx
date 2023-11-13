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
      field: "nutrient",
      headerName: "Name",
      flex: 1,
      minWidth: 100,
      valueGetter: (params) =>
        params.row.nutrient ? params.row.nutrient.name : "",
    },
    {
      field: "abbreviation",
      headerName: "Abbreviation",
      flex: 1,
      minWidth: 150,
      valueGetter: (params) =>
        params.row.nutrient ? params.row.nutrient.abbreviation : "",
    },
    {
      field: "value",
      headerName: "Value",
      flex: 1,
      minWidth: 150,
      editable: true,
    },
    {
      field: "unit",
      headerName: "Unit",
      flex: 1,
      minWidth: 150,
      valueGetter: (params) => params.row.nutrient.unit,
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
