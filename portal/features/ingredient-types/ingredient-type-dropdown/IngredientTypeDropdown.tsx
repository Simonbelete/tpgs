import React, { useEffect } from "react";
import { AsyncDropdown } from "@/components/dropdowns";
import { useLazyGetIngredientTypesQuery } from "../services";
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
  const [trigger, { isLoading, data }, lastPromiseInfo] =
    useLazyGetIngredientTypesQuery();

  const handleOnOpen = () => {
    trigger({}, true);
  };

  const handleOnClose = () => {};

  return (
    <AsyncDropdown<IngredientType>
      multiple={multiple}
      value={value}
      dataKey="name"
      label={label}
      error={error}
      helperText={helperText}
      options={data?.results ?? []}
      isLoading={isLoading}
      onOpen={handleOnOpen}
      onClose={handleOnClose}
      onChange={onChange}
      onInputChange={(event: any, newInputValue: any) => {
        trigger({ search: newInputValue }, false);
      }}
    />
  );
};

export default IngredientTypeDropdown;
