import React, { useEffect } from "react";
import { AsyncDropdown } from "@/components/dropdowns";
import { useLazyGetDdrectoriesQuery } from "../services";
import { Directory } from "@/models";

const DirectoryDropdown = ({
  value,
  label = "Directory",
  error,
  onChange,
  helperText,
  query,
  dataKey,
}: {
  value?: any;
  label?: string;
  error?: boolean;
  helperText?: string;
  query?: Object;
  dataKey?: string;
  onChange?: (event: any, newValue: any) => void;
}) => {
  const [trigger, { isLoading, data }, lastPromiseInfo] =
    useLazyGetDdrectoriesQuery();

  const handleOnOpen = () => {
    trigger({ ...(query || {}) }, true);
  };

  const handleOnClose = () => {};

  return (
    <AsyncDropdown<Directory>
      value={value}
      dataKey={dataKey || "name"}
      label={label}
      error={error}
      helperText={helperText}
      options={data?.results ?? []}
      isLoading={isLoading}
      onOpen={handleOnOpen}
      onClose={handleOnClose}
      onChange={onChange}
      onInputChange={(event: any, newInputValue: any) => {
        trigger({ ...(query || {}) }, false);
      }}
    />
  );
};

export default DirectoryDropdown;
