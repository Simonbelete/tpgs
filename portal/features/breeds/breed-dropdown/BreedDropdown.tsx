import React, { useEffect } from "react";
import { AsyncDropdown } from "@/components/dropdowns";
import { breedApi } from "../services";
import { Breed } from "@/models";

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
  return (
    <AsyncDropdown<Breed>
      value={value}
      dataKey="name"
      label={label}
      error={error}
      helperText={helperText}
      onChange={onChange}
      endpoint={breedApi.endpoints.getBreeds}
    />
  );
};

export default BreedDropdown;
