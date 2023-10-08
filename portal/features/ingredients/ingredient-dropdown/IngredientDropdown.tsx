import React, { useEffect } from "react";
import { AsyncDropdown } from "@/components/dropdowns";
import { useLazyGetIngredientsQuery } from '../services';
import { Flock } from "@/models";
import { IngredientForm  } from "../ingredient-form";

const FlockDropdown = ({
  value,
  error,
  onChange,
  helperText,
}: {
  value?: any,
  error?: boolean
  helperText?: string;
  onChange?: (event: any, newValue: any) => void;
}) => {
  const [trigger, {isLoading, data}, lastPromiseInfo] = useLazyGetIngredientsQuery();

  const handleOnOpen = () => {
    trigger({}, true);
  }

  const handleOnClose = () => {

  }

  return (
    <AsyncDropdown<Flock>
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
        trigger({}, true)
      }}
    />
  )
}

export default FlockDropdown;