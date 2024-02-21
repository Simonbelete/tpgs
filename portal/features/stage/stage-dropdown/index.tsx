import React, { useEffect } from "react";
import { AsyncDropdown } from "@/components/dropdowns";
import { stageApi } from "../services";
import { Stage } from "@/models";

export const StageDropdown = ({
  value,
  label = "Stage",
  error,
  onChange,
  helperText,
  dataKey = "name",
  disabled,
}: {
  value?: any;
  label?: string;
  error?: boolean;
  helperText?: string;
  dataKey?: string;
  onChange?: (event: any, newValue: any) => void;
  disabled?: boolean;
}) => {
  return (
    <AsyncDropdown<Stage>
      value={value}
      dataKey={dataKey}
      label={label}
      error={error}
      placeholder="Select Hatchery"
      helperText={helperText}
      endpoint={stageApi.endpoints.getStages}
      onChange={onChange}
      disabled={disabled}
    />
  );
};
