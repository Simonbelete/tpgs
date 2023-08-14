import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import client from "@/services/client";
import { Button, IconButton, Tooltip, Stack, Typography } from "@mui/material";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import { PlainModal, FullScreenModal } from "../modals";

interface Model {
  id?: string;
}

export default function AsyncDropdown<T>({
  url,
  key = "name",
  value,
  label,
  defaultOptions,
  error,
  helperText,
  createForm,
  createFormTitle = "Create New",
  multiple,
  onChange,
  ...props
}: {
  url: string;
  key?: string;
  value?: any;
  label?: string;
  defaultOptions?: any;
  error?: boolean;
  multiple?: boolean;
  helperText?: string;
  createForm?: React.ReactElement;
  createFormTitle?: string;
  onChange?: (event: any, newValue: any) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly T[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Modal
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  // React.useEffect(() => {
  //   let active = true;

  //   if (!loading) {
  //     return undefined;
  //   }

  //   (async () => {
  //     try {
  //       const response = await client.get(url);

  //       if (active) {
  //         setOptions(response.data.results);
  //       }
  //     } catch (ex) {
  //       active = false;
  //     } finally {
  //       setLoading(false);
  //     }
  //   })();

  //   return () => {
  //     active = false;
  //   };
  // }, [loading, url]);

  const handleOpen = async () => {
    setOpen(true);
    try {
      const response = await client.get(url);

      setOptions(response.data.results);
    } catch (ex) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack gap={1}>
      <FullScreenModal open={modalOpen} onClose={handleModalClose}>
        {createForm}
      </FullScreenModal>
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
        // value={value}
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
                  <Tooltip title={createFormTitle}>
                    <IconButton
                      sx={{ py: 0 }}
                      size="large"
                      // color="secondary.main"
                      onClick={handleModalOpen}
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
