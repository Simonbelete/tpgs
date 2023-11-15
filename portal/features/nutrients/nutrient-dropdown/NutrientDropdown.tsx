import React, { useEffect } from "react";
import { AsyncDropdown } from "@/components/dropdowns";
import { nutrientApi, useLazyGetNutrientsQuery } from "../services";
import { Nutrient } from "@/models";
import { NutrientForm } from "../nutrient-form";

const NutrientDropdown = ({
  value,
  label = "Nutrient",
  error,
  onChange,
  helperText,
}: {
  value?: any;
  label?: string;
  error?: boolean;
  helperText?: string;
  onChange?: (event: any, newValue: any) => void;
}) => {
  return (
    <AsyncDropdown<Nutrient>
      value={value}
      dataKey="name"
      placeholder="Select Nutrient"
      label={label}
      error={error}
      helperText={helperText}
      onChange={onChange}
      createForm={<NutrientForm shallowRoute={false} />}
      createFormTitle="Create Nutrient"
      endpoint={nutrientApi.endpoints.getNutrients}
    />
  );
};

export default NutrientDropdown;
