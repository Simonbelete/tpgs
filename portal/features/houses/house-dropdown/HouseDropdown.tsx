import React, { useEffect } from "react";
import { AsyncDropdown } from "@/components/dropdowns";
import { useLazyGetHousesQuery } from "../services";
import { House } from "@/models";
import { HouseForm } from "../house-form";

const HouseDropdown = ({
  value,
  label = "House",
  error,
  onChange,
  helperText,
}: {
  value?: any;
  label: string;
  error?: boolean;
  helperText?: string;
  onChange?: (event: any, newValue: any) => void;
}) => {
  const [trigger, { isLoading, data }, lastPromiseInfo] =
    useLazyGetHousesQuery();

  const handleOnOpen = () => {
    trigger({}, true);
  };

  const handleOnClose = () => {};

  return (
    <AsyncDropdown<House>
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
      createForm={<HouseForm />}
      createFormTitle="Create House"
      onInputChange={(event: any, newInputValue: any) => {
        trigger({ search: newInputValue }, false);
      }}
    />
  );
};

export default HouseDropdown;
