import React, { useEffect } from "react";
import { AsyncDropdown } from "@/components/dropdowns";
import { penApi, useLazyGetPensQuery } from "../services";
import { Pen } from "@/models";
import { PenForm } from "../pen-form";

const PenDropdown = ({
  value,
  label = "Pen",
  error,
  onChange,
  helperText,
  dataKey = "name",
}: {
  value?: any;
  label?: string;
  error?: boolean;
  helperText?: string;
  dataKey?: string;
  onChange?: (event: any, newValue: any) => void;
}) => {
  return (
    <AsyncDropdown<Pen>
      value={value}
      dataKey={dataKey}
      label={label}
      error={error}
      placeholder="Select House / Pen"
      helperText={helperText}
      endpoint={penApi.endpoints.getPens}
      onChange={onChange}
      createForm={<PenForm />}
      createFormTitle="Create Pen"
    />
  );
};

export default PenDropdown;
