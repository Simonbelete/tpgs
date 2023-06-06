import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import client from "@/services/client";
import { Button, IconButton, Tooltip, Stack, Typography } from "@mui/material";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";

interface Model {
  id?: string;
}

export default function AsyncDropdown({
  url,
  key = "name",
  value,
  label,
  defaultOptions,
  error,
  helperText,
  onChange,
  ...props
}: {
  url: string;
  key?: string;
  value?: any;
  label: string;
  defaultOptions?: any;
  error?: boolean;
  helperText?: string;
  onChange?: (event: any, newValue: any) => void;
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

  return (
    <Stack gap={1}>
      <Typography variant="body2" fontWeight={700}>
        {label}
      </Typography>
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
        value={value}
        defaultValue={value}
        getOptionLabel={(option) => option[key]}
        options={options}
        loading={loading}
        isOptionEqualToValue={(option, value) => option[key] === value[key]}
        renderInput={(params) => (
          <TextField
            {...params}
            error={error}
            helperText={helperText}
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
                  <Tooltip title="Create New">
                    <IconButton
                      sx={{ py: 0 }}
                      size="large"
                      color="secondary.main"
                    >
                      <AddToQueueIcon />
                    </IconButton>
                  </Tooltip>
                </React.Fragment>
              ),
            }}
          />
        )}
        {...props}
      />
    </Stack>
  );
}
