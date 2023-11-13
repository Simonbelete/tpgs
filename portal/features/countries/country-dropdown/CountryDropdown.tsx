import React, { useEffect } from "react";
import { AsyncDropdown } from "@/components/dropdowns";
import { countryApi, useLazyGetCountriesQuery } from "../services";
import { Country } from "@/models";

const CountryDropdown = ({
  value,
  label = "Country",
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
    <AsyncDropdown<Country>
      value={value}
      dataKey="name"
      label={label}
      error={error}
      helperText={helperText}
      endpoint={countryApi.endpoints.getCountries}
      onChange={onChange}
    />
  );
};

export default CountryDropdown;
