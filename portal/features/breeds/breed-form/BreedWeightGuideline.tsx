import React, { useState } from "react";
import * as yup from "yup";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import {
  Requirement,
  BreedWeightGuideline,
  RequirementIngredient,
  Ingredient,
} from "@/models";
import { EditableList, EditToolbar } from "@/lib/crud";
import { breedApi } from "../services";
import { EditMode } from "@/types";
import _ from "lodash";
import { ingredientApi } from "@/features/ingredients/services";

export interface EditableBreedWeightGuideline
  extends BreedWeightGuideline,
    EditMode {}

const RequirementIngredientToolbar = ({
  setRows,
  rows,
  refetch,
}: {
  setRows: (
    newRows: (
      oldRows: GridRowsProp<EditableBreedWeightGuideline>
    ) => GridRowsProp<EditableBreedWeightGuideline>
  ) => void;
  rows: GridRowsProp<EditableBreedWeightGuideline>;
  refetch: () => void;
}) => {
  return (
    <EditToolbar<EditableBreedWeightGuideline, Ingredient>
      refetch={refetch}
      title="Add Ingredient"
      setRows={setRows}
      rows={rows}
      endpoint={ingredientApi.endpoints.getIngredients}
      mapperKey="ingredient"
    />
  );
};

const RequirementIngredient = ({ data }: { data: Requirement }) => {
  const columns: GridColDef[] = [
    {
      field: "ingredient__name",
      headerName: "Name",
      flex: 1,
      filterable: false,
      valueGetter: (params) =>
        params.row.ingredient ? params.row.ingredient.name : "",
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

export default RequirementIngredient;
