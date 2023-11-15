import React, { useEffect } from "react";
import { AsyncDropdown } from "@/components/dropdowns";
import { formulaApi, useLazyGetFormulasQuery } from "../services";
import { Formula } from "@/models";

const FormulaDropdown = ({
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
    useLazyGetFormulasQuery();

  const handleOnOpen = () => {
    trigger({}, true);
  };

  const handleOnClose = () => {};

  return (
    <AsyncDropdown<Formula>
      value={value}
      dataKey="name"
      label={"Formula"}
      placeholder="Select Formula"
      error={error}
      helperText={helperText}
      onChange={onChange}
      endpoint={formulaApi.endpoints.getFormulas}
    />
  );
};

export default FormulaDropdown;
