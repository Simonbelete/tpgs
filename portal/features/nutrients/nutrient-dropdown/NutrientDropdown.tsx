import React, { useEffect } from "react";
import { AsyncDropdown } from "@/components/dropdowns";
import { useLazyGetNutrientsQuery } from '../services';
import { Nutrient } from "@/models";
import { NutrientForm } from "../nutrient-form";

const NutrientDropdown = ({
  value,
  label = "Nutrient",
  error,
  onChange,
  helperText,
}: {
  value?: any,
  label?: string,
  error?: boolean
  helperText?: string;
  onChange?: (event: any, newValue: any) => void;
}) => {
  const [trigger, {isLoading, data}, lastPromiseInfo] = useLazyGetNutrientsQuery();

  const handleOnOpen = () => {
    trigger({}, true);
  }

  const handleOnClose = () => {

  }

  return (
    <AsyncDropdown<Nutrient>
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
      createForm={<NutrientForm />}
      createFormTitle="Create Nutrient"
      onInputChange={(event: any, newInputValue: any) => {
        trigger({}, true)
      }}
    />
  )
}

export default NutrientDropdown;