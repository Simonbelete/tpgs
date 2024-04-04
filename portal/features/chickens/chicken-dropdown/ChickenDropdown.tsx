import React, { useEffect } from "react";
// import { AsyncDropdown } from "@/components/dropdowns";
import { chickenApi, useLazyGetChickensQuery } from "../services";
import { Chicken } from "@/models";
import AsyncDropdown, {
  AsyncDropdownProps,
} from "@/lib/crud/components/AsyncDropdown";
import { ChickenForm } from "../chicken-form";

const ChickenDropdown = ({
  sex,
  value,
  label = "Chicken",
  error,
  onChange,
  helperText,
  ...props
}: {
  sex?: string;
  value?: any;
  label?: string;
  error?: boolean;
  helperText?: string;
  onChange?: (event: any, newValue: any) => void;
} & Partial<AsyncDropdownProps<Chicken>>) => {
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
      viewForm={<ChickenForm data={value} shallowRoute={false} />}
      {...props}
    />
  );
};

export default ChickenDropdown;
