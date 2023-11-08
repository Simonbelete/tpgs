import React, { useEffect } from "react";
import { AsyncDropdown } from "@/components/dropdowns";
import { hatcheryApi, useLazyGetHatcheryQuery } from "../services";
import { Hatchery } from "@/models";
import { HatcheryForm } from "../hatchery-form";

const HatcheryDropdown = ({
  value,
  label = "Hatchery",
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
    <AsyncDropdown<Hatchery>
      value={value}
      dataKey={dataKey}
      label={label}
      error={error}
      placeholder="Select Hatchery"
      helperText={helperText}
      endpoint={hatcheryApi.endpoints.getHatchery}
      onChange={onChange}
      createForm={<HatcheryForm />}
      createFormTitle="Create Hatchery"
    />
  );
};

export default HatcheryDropdown;
