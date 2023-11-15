import React, { useEffect } from "react";
import { AsyncDropdown } from "@/components/dropdowns";
import { unitApi, useLazyGetUnitsQuery } from "../services";
import { Unit } from "@/models";
import { UnitForm } from "../unit-form";

const UnitDropdown = ({
  value,
  label = "Unit",
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
    <AsyncDropdown<Unit>
      value={value}
      dataKey="name"
      label={label}
      placeholder="Select Unit"
      error={error}
      helperText={helperText}
      onChange={onChange}
      createFormTitle="Create Unit"
      createForm={<UnitForm shallowRoute={false} />}
      endpoint={unitApi.endpoints.getUnits}
    />
  );
};

export default UnitDropdown;
