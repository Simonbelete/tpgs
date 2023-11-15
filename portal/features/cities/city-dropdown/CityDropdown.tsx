import React, { useEffect } from "react";
import { AsyncDropdown } from "@/components/dropdowns";
import { cityApi } from "../services";
import { City } from "@/models";

const CityDropdown = ({
  value,
  label = "City",
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
  return (
    <AsyncDropdown<City>
      value={value}
      dataKey="name"
      label={label}
      error={error}
      helperText={helperText}
      placeholder="City"
      onChange={onChange}
      endpoint={cityApi.endpoints.getCities}
    />
  );
};

export default CityDropdown;
