import React, { useEffect } from "react";
import { AsyncDropdown } from "@/components/dropdowns";
import { useLazyGetFormulasQuery } from '../services';
import { Formula } from "@/models";

const FormulaDropdown = ({
  value,
  error,
  onChange,
  helperText,
}: {
  value?: any,
  error?: boolean
  helperText?: string;
  onChange?: (event: any, newValue: any) => void;
}) => {
  const [trigger, {isLoading, data}, lastPromiseInfo] = useLazyGetFormulasQuery();

  const handleOnOpen = () => {
    trigger({}, true);
  }

  const handleOnClose = () => {

  }

  return (
    <AsyncDropdown<Formula>
      value={value}
      dataKey="name"
      label={"Formula"}
      error={error}
      helperText={helperText}
      options={data?.results ?? []}
      isLoading={isLoading}
      onOpen={handleOnOpen}
      onClose={handleOnClose}
      onChange={onChange}
      onInputChange={(event: any, newInputValue: any) => {
        trigger({}, true)
      }}
    />
  )
}

export default FormulaDropdown;