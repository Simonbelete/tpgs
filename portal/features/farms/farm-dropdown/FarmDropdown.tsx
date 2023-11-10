import React, { useEffect } from "react";
import { AsyncDropdown } from "@/components/dropdowns";
import { farmApi, useLazyGetFarmsQuery } from "../services";
import { Farm } from "@/models";

const FarmDropdown = ({
  value,
  label = "Farm",
  error,
  onChange,
  helperText,
  multiple,
}: {
  value?: any;
  label?: string;
  error?: boolean;
  helperText?: string;
  multiple?: boolean;
  onChange?: (event: any, newValue: any) => void;
}) => {
  return (
    <AsyncDropdown<Farm>
      multiple={multiple}
      value={value}
      dataKey="name"
      placeholder="Select Farm"
      label={label}
      error={error}
      helperText={helperText}
      endpoint={farmApi.endpoints.getFarms}
      query={{ name__not: "public" }}
      onChange={onChange}
    />
  );
};

export default FarmDropdown;
