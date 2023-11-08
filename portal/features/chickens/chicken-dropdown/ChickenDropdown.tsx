import React, { useEffect } from "react";
import { AsyncDropdown } from "@/components/dropdowns";
import { chickenApi, useLazyGetChickensQuery } from "../services";
import { Chicken } from "@/models";

const ChickenDropdown = ({
  sex,
  value,
  label = "Chicken",
  error,
  onChange,
  helperText,
}: {
  sex?: string;
  value?: any;
  label?: string;
  error?: boolean;
  helperText?: string;
  onChange?: (event: any, newValue: any) => void;
}) => {
  return (
    <AsyncDropdown<Chicken>
      value={value}
      dataKey="display_name"
      label={label}
      error={error}
      placeholder="Select Chicken"
      helperText={helperText}
      query={{ ...(sex ? { sex: sex } : {}) }}
      endpoint={chickenApi.endpoints.getChickens}
      onChange={onChange}
    />
  );
};

export default ChickenDropdown;
