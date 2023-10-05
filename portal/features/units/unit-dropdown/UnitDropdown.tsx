import React, { useEffect } from "react";
import { AsyncDropdown } from "@/components/dropdowns";
import { useLazyGetUnitsQuery } from '../services';
import { Unit } from "@/models";
import { UnitForm } from '../unit-form' 

const UnitDropdown = ({
  value,
  label = "Unit",
  error,
  onChange,
  helperText,
}: {
  value?: any,
  label?: string,
  error?: boolean
  helperText?: string;
  onChange?: (event: any, newValue: any) => void;
}) => {
  const [trigger, {isLoading, data}, lastPromiseInfo] = useLazyGetUnitsQuery();

  const handleOnOpen = () => {
    trigger({}, true);
  }

  const handleOnClose = () => {

  }

  return (
    <AsyncDropdown<Unit>
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
      createFormTitle="Create Unit"
      createForm={<UnitForm />}
      onInputChange={(event: any, newInputValue: any) => {
        trigger({}, true)
      }}
    />
  )
}

export default UnitDropdown;