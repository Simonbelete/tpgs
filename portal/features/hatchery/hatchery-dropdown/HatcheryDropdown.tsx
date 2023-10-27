import React, { useEffect } from "react";
import { AsyncDropdown } from "@/components/dropdowns";
import { useLazyGetHatcheryQuery } from "../services";
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
  label: string;
  error?: boolean;
  helperText?: string;
  dataKey?: string;
  onChange?: (event: any, newValue: any) => void;
}) => {
  const [trigger, { isLoading, data }, lastPromiseInfo] =
    useLazyGetHatcheryQuery();

  const handleOnOpen = () => {
    trigger({}, true);
  };

  const handleOnClose = () => {};

  return (
    <AsyncDropdown<Hatchery>
      value={value}
      dataKey={dataKey}
      label={label}
      error={error}
      helperText={helperText}
      options={data?.results ?? []}
      isLoading={isLoading}
      onOpen={handleOnOpen}
      onClose={handleOnClose}
      onChange={onChange}
      createForm={<HatcheryForm />}
      createFormTitle="Create Hatchery"
      onInputChange={(event: any, newInputValue: any) => {
        trigger({ search: newInputValue }, false);
      }}
    />
  );
};

export default HatcheryDropdown;
