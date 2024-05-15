import React, { useState } from "react";
import * as yup from "yup";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import {
  Requirement,
  RequirementNutrient,
  RequirementIngredient,
  Ingredient,
} from "@/models";
import { EditableList, EditToolbar } from "@/lib/crud";
import { requirementApi } from "../services";
import { EditMode } from "@/types";
import _ from "lodash";
import { ingredientApi } from "@/features/ingredients/services";

export interface EditableRequirementNutrient
  extends RequirementNutrient,
    EditMode {}

const RequirementIngredientToolbar = ({
  setRows,
  rows,
  refetch,
}: {
  setRows: (
    newRows: (
      oldRows: GridRowsProp<EditableRequirementNutrient>
    ) => GridRowsProp<EditableRequirementNutrient>
  ) => void;
  rows: GridRowsProp<EditableRequirementNutrient>;
  refetch: () => void;
}) => {
  return (
    <EditToolbar<EditableRequirementNutrient, Ingredient>
      refetch={refetch}
      title="Add Ingredient"
      setRows={setRows}
      rows={rows}
      endpoint={ingredientApi.endpoints.getIngredients}
      mapperKey="ingredient"
    />
  );
};

const RequirementIngredientForm = ({ data }: { data: Requirement }) => {
  const columns: GridColDef[] = [
    {
      field: "ingredient__name",
      headerName: "Name",
      flex: 1,
      filterable: false,
      valueGetter: (value, row) => (row.ingredient ? row.ingredient.name : ""),
    },
    {
      field: "min",
      headerName: "Min",
      minWidth: 100,
      filterable: false,
      editable: true,
      type: "number",
    },
    {
      field: "max",
      headerName: "Max",
      minWidth: 100,
      filterable: false,
      editable: true,
      type: "number",
    },
  ];

  const cleanData = (
    values: Partial<RequirementIngredient>
  ): Partial<RequirementIngredient> => {
    return {
      id: data?.id, // Only for post data
      requirement: data?.id,
      ingredient: (values.ingredient as Ingredient).id || 0,
      min: values.min,
      max: values.max,
    };
  };

  return (
    <EditableList<RequirementIngredient>
      getQuery={{ id: data?.id, query: {} }}
      toolbar={RequirementIngredientToolbar}
      columns={columns}
      beforeSubmit={cleanData}
      getEndpoint={requirementApi.endpoints.getIngredientsOfRequirement}
      createEndpoint={requirementApi.endpoints.createIngredientForRequirement}
      updateEndpoint={requirementApi.endpoints.updateIngredientOfRequirement}
      deleteEndpoint={requirementApi.endpoints.deleteIngredientOfRequirement}
    />
  );
};

export default RequirementIngredientForm;
