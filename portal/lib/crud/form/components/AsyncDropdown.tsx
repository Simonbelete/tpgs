import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { IconButton, Tooltip, Stack, Typography, Box } from "@mui/material";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import { FullScreenModal } from "@/components/modals";
import { ApiEndpointQuery } from "@reduxjs/toolkit/dist/query/core/module";
import { QueryDefinition } from "@reduxjs/toolkit/dist/query";
import { EndpointDefinitions } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { QueryHooks } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { ClientQueyFn, Query } from "@/types";
import { Response } from "@/models";

export default function AsyncDropdown<T>({
  id,
  dataKey = "name",
  value,
  label,
  defaultOptions,
  error,
  helperText,
  createForm,
  createFormTitle = "Create New",
  multiple,
  onChange,
  onInputChange,
  endpoint,
  ...props
}: {
  id?: string;
  dataKey?: string;
  value?: any;
  label?: string;
  defaultOptions?: any;
  error?: boolean;
  multiple?: boolean;
  helperText?: string;
  createForm?: React.ReactNode;
  createFormTitle?: string;
  onChange?: (event: any, newValue: any) => void;
  onInputChange?: (event: any, newInputValue: any) => void;
  endpoint: ApiEndpointQuery<
    QueryDefinition<Query, ClientQueyFn, any, Response<T[]>, any>,
    EndpointDefinitions
  > &
    QueryHooks<QueryDefinition<Query, ClientQueyFn, any, Response<T[]>, any>>;
}) {
  const [open, setOpen] = React.useState(false);

  const [trigger, { data, isLoading }] = endpoint.useLazyQuery();

  // Modal
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleOnOpen = () => {
    setOpen(true);
    trigger({}, false);
  };
  const handleOnClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event: any, newValue: any) => {
    trigger({ search: newValue }, false);
  };

  return (
    <Stack gap={1} id={id}>
      <FullScreenModal
        title={createFormTitle}
        open={modalOpen}
        onClose={handleModalClose}
      >
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
        getOptionLabel={(option) => option[dataKey] ?? ""}
        options={data?.results || []}
        loading={isLoading}
        isOptionEqualToValue={(option, val) => option[dataKey] === val[dataKey]}
        onInputChange={handleInputChange}
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
