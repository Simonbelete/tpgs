import React, { useEffect } from "react";
import { AsyncDropdown } from "@/components/dropdowns";
import { useLazyGetPurposesQuery } from "../services";
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
  const [trigger, { isLoading, data }, lastPromiseInfo] =
    useLazyGetPurposesQuery();

  const handleOnOpen = () => {
    trigger({}, true);
  };

  const handleOnClose = () => {};

  return (
    <AsyncDropdown<Purpose>
      value={value}
      dataKey="name"
      label={label}
      error={error}
      helperText={helperText}
      options={data?.results ?? []}
      isLoading={isLoading}
      onOpen={handleOnOpen}
      onClose={handleOnClose}
      onChange={onChange}
      onInputChange={(event: any, newInputValue: any) => {
        trigger({ search: newInputValue }, false);
      }}
    />
  );
};

export default PurposeDropdown;
