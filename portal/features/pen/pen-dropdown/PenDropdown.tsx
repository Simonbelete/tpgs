import React, { useEffect } from "react";
import { AsyncDropdown } from "@/components/dropdowns";
import { useLazyGetPensQuery } from "../services";
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
  label: string;
  error?: boolean;
  helperText?: string;
  dataKey?: string;
  onChange?: (event: any, newValue: any) => void;
}) => {
  const [trigger, { isLoading, data }, lastPromiseInfo] = useLazyGetPensQuery();

  const handleOnOpen = () => {
    trigger({}, true);
  };

  const handleOnClose = () => {};

  return (
    <AsyncDropdown<Pen>
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
      createForm={<PenForm />}
      createFormTitle="Create Pen"
      onInputChange={(event: any, newInputValue: any) => {
        trigger({}, false);
      }}
    />
  );
};

export default PenDropdown;
