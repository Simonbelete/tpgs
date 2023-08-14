import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import { Button, IconButton, Tooltip, Stack, Typography } from "@mui/material";

export default function AsyncDropdown<T>({
  key = "name",
  value,
  label,
  defaultOptions,
  error,
  helperText,
  multiple,
  onChange,
  options,
  ...props
}: {
  key?: string;
  value?: any;
  label?: string;
  defaultOptions?: any;
  error?: boolean;
  multiple?: boolean;
  helperText?: string;
  onChange?: (event: any, newValue: any) => void;
  options: readonly T[];
}) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = async () => {
    setOpen(true);
  };

  return (
    <Stack gap={1}>
      {label && (
        <Typography variant="body2" fontWeight={700}>
          {label}
        </Typography>
      )}
      <Autocomplete
        fullWidth
        multiple={multiple}
        size="small"
        open={open}
        onOpen={handleOpen}
        onClose={() => {
          setOpen(false);
        }}
        onChange={onChange}
        value={value}
        defaultValue={value}
        getOptionLabel={(option) => option[key]}
        options={options}
        isOptionEqualToValue={(option, value) => option[key] === value[key]}
        renderInput={(params) => (
          <TextField
            {...params}
            error={error}
            helperText={helperText}
            fullWidth
            label={value ? "" : label}
            InputLabelProps={{ shrink: false }}
          />
        )}
        {...props}
      />
    </Stack>
  );
}
