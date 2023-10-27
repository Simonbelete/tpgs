import React, { useEffect } from "react";
import { AsyncDropdown } from "@/components/dropdowns";
import { useLazyGetBreedsQuery } from "../services";
import { Breed } from "@/models";
import { BreedForm } from "../breed-form";

const BreedDropdown = ({
  value,
  label = "Breed",
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
    useLazyGetBreedsQuery();

  const handleOnOpen = () => {
    trigger({}, true);
  };

  const handleOnClose = () => {};

  return (
    <AsyncDropdown<Breed>
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
      createForm={<BreedForm redirect={false} />}
      createFormTitle="Create Breed"
      onInputChange={(event: any, newInputValue: any) => {
        trigger({ search: newInputValue }, false);
      }}
    />
  );
};

export default BreedDropdown;
