import React, { useEffect } from "react";
import { AsyncDropdown } from "@/components/dropdowns";
import { useLazyGetReductionReasonsQuery } from "../services";
import { ReductionReason } from "@/models";
import { ReductionReasonForm } from "../reduction-reason-form";

const ReductionReasonDropdown = ({
  value,
  label = "Cull Reason",
  error,
  onChange,
  helperText,
  dataKey = "name",
}: {
  value?: any;
  label?: string;
  error?: boolean;
  helperText?: string;
  dataKey?: string;
  onChange?: (event: any, newValue: any) => void;
}) => {
  const [trigger, { isLoading, data }, lastPromiseInfo] =
    useLazyGetReductionReasonsQuery();

  const handleOnOpen = () => {
    trigger({}, true);
  };

  const handleOnClose = () => {};

  return (
    <AsyncDropdown<ReductionReason>
      value={value}
      dataKey={dataKey}
      label={label}
      error={error}
      helperText={helperText}
      options={data?.results ?? []}
      isLoading={isLoading}
      onOpen={handleOnOpen}
      onClose={handleOnClose}
      onChange={onChange}
      createForm={<ReductionReasonForm />}
      createFormTitle="Create ReductionReason"
      onInputChange={(event: any, newInputValue: any) => {
        trigger({ search: newInputValue }, false);
      }}
    />
  );
};

export default ReductionReasonDropdown;
