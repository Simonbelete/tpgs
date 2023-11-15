import React, { useEffect } from "react";
import { AsyncDropdown } from "@/components/dropdowns";
import { requirementApi } from "../services";
import { Requirement } from "@/models";
import { RequirementForm } from "../requirement-form";

const RequirementDropdown = ({
  value,
  error,
  onChange,
  helperText,
  multiple,
}: {
  value?: any;
  error?: boolean;
  helperText?: string;
  onChange?: (event: any, newValue: any) => void;
  multiple?: boolean;
}) => {
  return (
    <AsyncDropdown<Requirement>
      multiple={multiple}
      value={value}
      dataKey="name"
      label={"Requirement"}
      placeholder="Select Requirement"
      error={error}
      helperText={helperText}
      onChange={onChange}
      createForm={<RequirementForm shallowRoute={false} />}
      createFormTitle="Create Requirement"
      endpoint={requirementApi.endpoints.getRequirements}
    />
  );
};

export default RequirementDropdown;
