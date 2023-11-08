import React, { useEffect } from "react";
import { AsyncDropdown } from "@/components/dropdowns";
import { houseApi, useLazyGetHousesQuery } from "../services";
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
  label?: string;
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
      placeholder="Select House"
      helperText={helperText}
      endpoint={houseApi.endpoints.getHouses}
      onChange={onChange}
      createForm={<HouseForm />}
      createFormTitle="Create House"
    />
  );
};

export default HouseDropdown;
