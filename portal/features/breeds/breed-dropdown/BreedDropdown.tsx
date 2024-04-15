import React, { useEffect } from "react";
import { AsyncDropdown } from "@/components/dropdowns";
import { breedApi } from "../services";
import { Breed } from "@/models";
import { BreedForm } from "../breed-form";

const BreedDropdown = ({
  value,
  label = "Breed",
  error,
  onChange,
  helperText,
  disabled,
  viewForm,
}: {
  value?: any;
  label?: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  viewForm?: any;
  onChange?: (event: any, newValue: any) => void;
}) => {
  return (
    <AsyncDropdown<Breed>
      disabled={disabled}
      value={value}
      dataKey="name"
      label={label}
      error={error}
      helperText={helperText}
      onChange={onChange}
      endpoint={breedApi.endpoints.getBreeds}
      viewForm={viewForm}
    />
  );
};

export default BreedDropdown;
