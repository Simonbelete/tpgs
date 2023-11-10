import React, { useEffect } from "react";
import { AsyncDropdown } from "@/components/dropdowns";
import { chickenApi, useLazyGetChickensQuery } from "../services";
import { Chicken } from "@/models";

export const GenerationDropdown = ({
  sex,
  value,
  label = "Generation",
  error,
  onChange,
  helperText,
  disabled,
}: {
  sex?: string;
  value?: any;
  label?: string;
  error?: boolean;
  helperText?: string;
  onChange?: (event: any, newValue: any) => void;
  disabled?: boolean;
}) => {
  return (
    <AsyncDropdown<Pick<Chicken, "generation">>
      value={value}
      disabled={disabled}
      dataKey="name"
      label={label}
      error={error}
      placeholder="Select Generation"
      helperText={helperText}
      endpoint={chickenApi.endpoints.getGenerations}
      onChange={onChange}
    />
  );
};
