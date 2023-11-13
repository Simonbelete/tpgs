import React, { useEffect } from "react";
import { AsyncDropdown } from "@/components/dropdowns";
import { purposeApi, useLazyGetPurposesQuery } from "../services";
import { Purpose } from "@/models";

const PurposeDropdown = ({
  value,
  label = "Purpose",
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
    <AsyncDropdown<Purpose>
      value={value}
      dataKey="name"
      label={label}
      error={error}
      helperText={helperText}
      onChange={onChange}
      endpoint={purposeApi.endpoints.getPurposes}
    />
  );
};

export default PurposeDropdown;
