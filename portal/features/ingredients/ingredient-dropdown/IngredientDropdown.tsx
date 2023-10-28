import React, { useEffect } from "react";
import { AsyncDropdown } from "@/components/dropdowns";
import { useLazyGetIngredientsQuery } from "../services";
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
  const [trigger, { isLoading, data }, lastPromiseInfo] =
    useLazyGetIngredientsQuery();

  const handleOnOpen = () => {
    trigger({}, true);
  };

  const handleOnClose = () => {};

  return (
    <AsyncDropdown<Ingredient>
      multiple={multiple}
      value={value}
      dataKey="name"
      label={"Ingredient"}
      error={error}
      helperText={helperText}
      options={data?.results ?? []}
      isLoading={isLoading}
      onOpen={handleOnOpen}
      onClose={handleOnClose}
      onChange={onChange}
      createForm={<IngredientForm />}
      createFormTitle="Create Ingredient"
      onInputChange={(event: any, newInputValue: any) => {
        trigger({ search: newInputValue }, false);
      }}
    />
  );
};

export default FlockDropdown;
