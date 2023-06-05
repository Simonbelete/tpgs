import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import client from "@/services/client";

export default function AsyncDropdown({
  url,
  key = "name",
  value,
  label,
  onChange,
  ...props
}: {
  url: string;
  key?: string;
  value: any;
  label: string;
  onChange?: (event: any, newValue: string | null) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly any[]>([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await client.get(url);

      if (active) {
        setOptions(response.data.results);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  React.useEffect(() => {
    console.log("aaa");
    console.log(value);
  }, [value]);

  return (
    <Autocomplete
      fullWidth
      size="small"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={onChange}
      // value={value}
      getOptionLabel={(option) => option[key]}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          label={value ? "" : label}
          InputLabelProps={{ shrink: false }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
      {...props}
    />
  );
}
