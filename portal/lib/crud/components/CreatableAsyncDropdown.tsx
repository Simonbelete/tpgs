import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { IconButton, Tooltip, Stack, Typography, Box } from "@mui/material";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import { FullScreenModal, PlainModal } from "@/components/modals";
import { ApiEndpointQuery } from "@reduxjs/toolkit/dist/query/core/module";
import { QueryDefinition } from "@reduxjs/toolkit/dist/query";
import { EndpointDefinitions } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { QueryHooks } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { ClientQueyFn, Query } from "@/types";
import { Response } from "@/models";
import buildPage from "@/util/buildPage";
import QueuePlayNextIcon from "@mui/icons-material/QueuePlayNext";

export interface CreatableAsyncDropdownProps<T> {
  query?: Object;
  dataKey?: string;
  value?: any;
  label?: string;
  defaultOptions?: any;
  error?: boolean;
  multiple?: boolean;
  helperText?: string;
  placeholder?: string;
  createForm?: React.ReactNode;
  createFormTitle?: string;
  onChange?: (event?: any, newValue?: any) => void;
  endpoint: ApiEndpointQuery<
    QueryDefinition<Query, ClientQueyFn, any, Response<T[]>, any>,
    EndpointDefinitions
  > &
    QueryHooks<QueryDefinition<Query, ClientQueyFn, any, Response<T[]>, any>>;
  disabled?: boolean;
  name?: string;
  // TODO: use one type for the form
  creatable?: any;
  viewForm?: any;
}

export default function CreatableAsyncDropdown<T>({
  dataKey = "name",
  query,
  value,
  label,
  defaultOptions,
  error,
  helperText,
  createForm,
  createFormTitle = "Create New",
  multiple,
  onChange,
  endpoint,
  placeholder,
  disabled = false,
  name,
  creatable,
  viewForm,
  ...props
}: CreatableAsyncDropdownProps<T>) {
  const [open, setOpen] = React.useState(false);
  // const [inputValue, setInputValue] = React.useState(value ?? "");

  const [trigger, { data, isLoading, isFetching }] = endpoint.useLazyQuery();

  // Modal
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  // View form modal
  const [openViewForm, setOpenViewForm] = React.useState(false);
  const handleOpenViewFormOpen = () => setOpenViewForm(true);
  const handleOpenViewFormClose = () => setOpenViewForm(false);

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 15,
  });

  const handleOnOpen = async () => {
    setOpen(true);

    setPaginationModel({
      page: 0,
      pageSize: 15,
    });

    try {
      const response = await trigger(
        {
          ...buildPage({
            page: 0,
            pageSize: 15,
          }),
          ...(query || {}),
        },
        false
      ).unwrap();
      setOptions(response?.results || []);
    } catch (ex) {
      setOptions([]);
    }
  };
  const handleOnClose = () => {
    setOpen(false);
  };

  const handleInputChange = async (event: any, newValue: any) => {
    if (event && event.type == "change") {
      const response = await trigger(
        { search: newValue, ...buildPage(paginationModel), offset: 0 },
        false
      ).unwrap();
      setOptions(response?.results || []);
    }
  };

  const [options, setOptions] = React.useState<T[]>([]);

  const [position, setPosition] = React.useState(0);

  const [listboxNode, setListboxNode] = React.useState<any>("");

  React.useEffect(() => {
    if (listboxNode !== "") {
      listboxNode.scrollTop = position;
    }
  }, [position, listboxNode]);

  const loadMoreResults = async () => {
    const nextPage = paginationModel.page + 1;
    setPaginationModel({ ...paginationModel, page: nextPage });

    const response = await trigger(
      buildPage({ ...paginationModel, page: nextPage }),
      false
    ).unwrap();
    setOptions([...options, ...(response?.results || [])]);
  };

  const handleScroll = (event: any) => {
    if (
      paginationModel.page >=
      Math.floor((data?.count || 0) / paginationModel.pageSize)
    )
      return;

    setListboxNode(event.currentTarget);
    const x = listboxNode.scrollTop + listboxNode.clientHeight;

    if (listboxNode.scrollHeight - x <= 1) {
      setPosition(x);
      loadMoreResults();
    }
  };

  const [createTrigger, createResult] = creatable.endpoint.useMutation();

  const createNew = async (value: string) => {
    let cleaned_data: any = { ...(creatable.defaults || {}) };
    cleaned_data[creatable.field || ""] = value;
    const response = await createTrigger(cleaned_data).unwrap();
    console.log(response);
    if (response?.status == 201) {
      onChange && onChange(null, response);
    } else {
      // TODO: display error
    }
  };

  return (
    <Stack gap={1}>
      <FullScreenModal
        title={createFormTitle}
        open={modalOpen}
        onClose={handleModalClose}
      >
        {createForm}
      </FullScreenModal>
      <PlainModal open={openViewForm} onClose={handleOpenViewFormClose}>
        {viewForm}
      </PlainModal>
      {label && (
        <Typography
          variant="body2"
          fontWeight={700}
          color={disabled ? "text.secondary" : "text.primary"}
        >
          {label}
        </Typography>
      )}
      <Autocomplete
        fullWidth
        filterOptions={(options, params) => {
          const filtered = options;

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some(
            (option) => inputValue === option[dataKey]
          );
          if (inputValue !== "" && !isExisting) {
            let newLine: any = {
              inputValue,
            };
            newLine[dataKey] = `Create \"${inputValue}\"`;
            filtered.push(newLine);
          }

          return filtered;
        }}
        clearOnBlur={false}
        multiple={multiple}
        size="small"
        open={open}
        onOpen={handleOnOpen}
        onClose={handleOnClose}
        onChange={(event: any, newValue: any) => {
          onChange && onChange(event, newValue);
          // Remove Search Text for multiple
          if (multiple) {
            setPaginationModel({
              page: 0,
              pageSize: 15,
            });
          }

          if (newValue && newValue.inputValue) {
            createNew(newValue.inputValue);
          }
        }}
        value={value ?? ""}
        defaultValue={value}
        getOptionLabel={(option) => option[dataKey] ?? ""}
        options={options}
        loading={isFetching}
        isOptionEqualToValue={(option, val) => option[dataKey] === val[dataKey]}
        onInputChange={handleInputChange}
        placeholder={placeholder}
        ListboxProps={{
          onScroll: handleScroll,
        }}
        disabled={disabled || createResult.isFetching}
        renderInput={(params) => (
          <TextField
            {...params}
            name={name}
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
                  {isFetching ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                  {createForm && (
                    <Tooltip title={createFormTitle}>
                      <IconButton
                        sx={{ py: 0 }}
                        size="large"
                        // color="secondary.main"
                        disabled={disabled}
                        onClick={handleModalOpen}
                      >
                        <AddToQueueIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  {viewForm && (
                    <Tooltip title={createFormTitle}>
                      <IconButton
                        sx={{ py: 0 }}
                        size="large"
                        // color="secondary.main"
                        disabled={disabled}
                        onClick={handleOpenViewFormOpen}
                      >
                        <QueuePlayNextIcon />
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
