import React, { useEffect } from "react";
import { AsyncDropdown } from "@/components/dropdowns";
import { useLazyGetChickensQuery } from '../services';
import { Chicken } from "@/models";

const ChickenDropdown = ({
  sex,
  value,
  label = "Chicken",
  error,
  onChange,
  helperText,
}: {
  sex?: string;
  value?: any,
  label?: string,
  error?: boolean
  helperText?: string;
  onChange?: (event: any, newValue: any) => void;
}) => {
  const [trigger, {isLoading, data}, lastPromiseInfo] = useLazyGetChickensQuery();

  const handleOnOpen = () => {
    trigger({'sex': sex}, true);
  }

  const handleOnClose = () => {

  }

  return (
    <AsyncDropdown<Chicken>
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
        trigger({search: newInputValue, sex: sex}, true)
      }}
    />
  )
}

export default ChickenDropdown;