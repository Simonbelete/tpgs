import React, { useEffect } from "react";
import { AsyncDropdown } from "@/components/dropdowns";
import { useLazyGetFlocksQuery } from "../services";
import { Flock } from "@/models";
import { FlockForm } from "../flock-form";

const FlockDropdown = ({
  value,
  error,
  onChange,
  helperText,
}: {
  value?: any;
  error?: boolean;
  helperText?: string;
  onChange?: (event: any, newValue: any) => void;
}) => {
  const [trigger, { isLoading, data }, lastPromiseInfo] =
    useLazyGetFlocksQuery();

  const handleOnOpen = () => {
    trigger({}, true);
  };

  const handleOnClose = () => {};

  return (
    <AsyncDropdown<Flock>
      value={value}
      dataKey="name"
      label={"Flock"}
      error={error}
      helperText={helperText}
      options={data?.results ?? []}
      isLoading={isLoading}
      onOpen={handleOnOpen}
      onClose={handleOnClose}
      onChange={onChange}
      createForm={<FlockForm />}
      createFormTitle="Create Flock"
      onInputChange={(event: any, newInputValue: any) => {
        trigger({ search: newInputValue }, false);
      }}
    />
  );
};

export default FlockDropdown;
