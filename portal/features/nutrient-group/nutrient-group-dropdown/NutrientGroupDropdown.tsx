import React, { useEffect } from "react";
import { AsyncDropdown } from "@/components/dropdowns";
import { nutrientGroupApi, useLazyGetNutrientGroupsQuery } from "../services";
import { NutrientGroup } from "@/models";
import { NutrientGroupForm } from "../nutrient-group-form";

const NutrientGroupDropdown = ({
  value,
  label = "Nutrient Group",
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
    <AsyncDropdown<NutrientGroup>
      value={value}
      dataKey="name"
      placeholder="Select Nutrient Group"
      label={label}
      error={error}
      helperText={helperText}
      onChange={onChange}
      createForm={<NutrientGroupForm shallowRoute={false} />}
      createFormTitle="Create Nutrient Group"
      endpoint={nutrientGroupApi.endpoints.getNutrientGroups}
    />
  );
};

export default NutrientGroupDropdown;
