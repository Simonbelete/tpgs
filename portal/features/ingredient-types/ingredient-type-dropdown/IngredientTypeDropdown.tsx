import React, { useEffect } from "react";
import { AsyncDropdown } from "@/components/dropdowns";
import { ingredientTypeApi, useLazyGetIngredientTypesQuery } from "../services";
import { IngredientType } from "@/models";

const IngredientTypeDropdown = ({
  value,
  label = "Ingredient Type",
  error,
  onChange,
  helperText,
  multiple,
}: {
  value?: any;
  label?: string;
  error?: boolean;
  helperText?: string;
  onChange?: (event: any, newValue: any) => void;
  multiple?: boolean;
}) => {
  return (
    <AsyncDropdown<IngredientType>
      multiple={multiple}
      value={value}
      dataKey="name"
      label={label}
      placeholder="Select Ingredient Type"
      error={error}
      helperText={helperText}
      onChange={onChange}
      endpoint={ingredientTypeApi.endpoints.getIngredientTypes}
    />
  );
};

export default IngredientTypeDropdown;
