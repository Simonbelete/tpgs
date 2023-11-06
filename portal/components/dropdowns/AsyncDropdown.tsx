import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { IconButton, Tooltip, Stack, Typography, Box } from "@mui/material";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import { FullScreenModal } from "../modals";

export default function AsyncDropdown<T>({
  id,
  onOpen,
  onClose,
  value,
  label,
  defaultOptions,
  error,
  helperText,
  createForm,
  createFormTitle = "Create New",
  isLoading,
  multiple,
  onChange,
  options,
  dataValueKey = "name",
  dataLableKey = "id",
  onInputChange,
  ...props
}: {
  id?: string;
  onOpen: () => void;
  onClose: () => void;
  dataValueKey?: string;
  dataLableKey?: string;
  value?: any;
  label?: string;
  defaultOptions?: any;
  options: T[];
  error?: boolean;
  multiple?: boolean;
  helperText?: string;
  createForm?: React.ReactElement;
  createFormTitle?: string;
  isLoading?: boolean;
  onChange?: (event: any, newValue: any) => void;
  onInputChange?: (event: any, newInputValue: any) => void;
}) {
  const [open, setOpen] = React.useState(false);

  // Modal
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleOnOpen = React.useCallback(() => {
    setOpen(true);
    onOpen();
  }, [onOpen]);

  const handleOnClose = React.useCallback(() => {
    setOpen(false);
    onClose();
  }, [onClose]);

  return (
    <Stack gap={1} id={id}>
      <FullScreenModal
        title={createFormTitle}
        open={modalOpen}
        onClose={handleModalClose}
      >
        {/* <Box>
          <Typography variant="title">{createFormTitle}</Typography>
        </Box> */}
        {createForm}
      </FullScreenModal>
      {label && (
        <Typography variant="body2" fontWeight={700}>
          {label}
        </Typography>
      )}
      <Autocomplete
        fullWidth
        clearOnBlur={false}
        multiple={multiple}
        size="small"
        open={open}
        onOpen={handleOnOpen}
        onClose={handleOnClose}
        onChange={onChange}
        value={value}
        defaultValue={value}
        getOptionLabel={(option) => option[dataLableKey] ?? ""}
        options={options}
        loading={isLoading}
        isOptionEqualToValue={(option, val) =>
          option[dataValueKey] === val[dataValueKey]
        }
        onInputChange={onInputChange}
        renderInput={(params) => (
          <TextField
            {...params}
            error={error}
            helperText={helperText}
            fullWidth
            // label={value ? "" : label}
            label={""}
            InputLabelProps={{ shrink: false }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                  {createForm && (
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
                  )}
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
