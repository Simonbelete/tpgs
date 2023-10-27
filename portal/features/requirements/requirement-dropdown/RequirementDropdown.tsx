import React, { useEffect } from "react";
import { AsyncDropdown } from "@/components/dropdowns";
import { useLazyGetRequirementsQuery } from "../services";
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
  const [trigger, { isLoading, data }, lastPromiseInfo] =
    useLazyGetRequirementsQuery();

  const handleOnOpen = () => {
    trigger({}, true);
  };

  const handleOnClose = () => {};

  return (
    <AsyncDropdown<Requirement>
      multiple
      value={value}
      dataKey="name"
      label={"Ingredient"}
      error={error}
      helperText={helperText}
      options={data?.results ?? []}
      isLoading={isLoading}
      onOpen={handleOnOpen}
      onClose={handleOnClose}
      onChange={onChange}
      createForm={<RequirementForm />}
      createFormTitle="Create Requirement"
      onInputChange={(event: any, newInputValue: any) => {
        trigger({}, true);
      }}
    />
  );
};

export default RequirementDropdown;
