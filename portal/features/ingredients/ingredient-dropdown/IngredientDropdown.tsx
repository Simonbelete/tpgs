import React, { useEffect } from "react";
import AsyncDropdown, {
  AsyncDropdownProps,
} from "@/lib/crud/components/AsyncDropdown";
import { ingredientApi, useLazyGetIngredientsQuery } from "../services";
import { Ingredient } from "@/models";
import { IngredientForm } from "../ingredient-form";

const IngredientDropdown = ({
  value,
  error,
  onChange,
  helperText,
  multiple,
  ...props
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
      viewForm={<IngredientForm shallowRoute={false} />}
      endpoint={ingredientApi.endpoints.getIngredients}
      {...props}
    />
  );
};

export default IngredientDropdown;
