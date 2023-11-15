import React, { useEffect } from "react";
import { AsyncDropdown } from "@/components/dropdowns";
import { ingredientApi, useLazyGetIngredientsQuery } from "../services";
import { Ingredient } from "@/models";
import { IngredientForm } from "../ingredient-form";

const FlockDropdown = ({
  value,
  error,
  onChange,
  helperText,
  multiple,
}: {
  value?: any;
  error?: boolean;
  helperText?: string;
  onChange?: (event: any, newValue: any) => void;
  multiple?: boolean;
}) => {
  return (
    <AsyncDropdown<Ingredient>
      multiple={multiple}
      value={value}
      dataKey="name"
      label={"Ingredient"}
      error={error}
      helperText={helperText}
      onChange={onChange}
      createForm={<IngredientForm shallowRoute={false} />}
      createFormTitle="Create Ingredient"
      endpoint={ingredientApi.endpoints.getIngredients}
    />
  );
};

export default FlockDropdown;
