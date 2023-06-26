import React from "react";
import { FormControl, MenuItem, Select } from "@mui/material";

const LabeledSelect = ({
  items,
}: {
  items?: { label: string; value: string }[];
}) => {
  return (
    <FormControl>
      <Select>
        {items &&
          items.map((e, key) => (
            <MenuItem key={key} value={e.value}>
              {e.label}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};
export default LabeledSelect;
