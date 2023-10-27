import React, { useEffect } from "react";
import { AsyncDropdown } from "@/components/dropdowns";
import { useLazyGetFarmsQuery } from "../services";
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
  const [trigger, { isLoading, data }, lastPromiseInfo] =
    useLazyGetFarmsQuery();

  const handleOnOpen = () => {
    trigger({}, true);
  };

  const handleOnClose = () => {};

  return (
    <AsyncDropdown<Farm>
      multiple={multiple}
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

export default FarmDropdown;
