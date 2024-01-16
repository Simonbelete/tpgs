import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  DialogActions,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Stack,
  Typography,
  IconButton,
  Grid,
  Divider,
  InputAdornment,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";
import { ApiEndpointQuery } from "@reduxjs/toolkit/dist/query/core/module";
import { QueryDefinition } from "@reduxjs/toolkit/dist/query";
import { EndpointDefinitions } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { QueryHooks } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { ClientQueyFn, Query } from "@/types";
import { Response } from "@/models";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import AsyncDropdown from "../../components/AsyncDropdown";
import { AxiosResponse } from "axios";
import client from "@/services/client";
import fileDownload from "@/util/fileDownload";
import { useSnackbar } from "notistack";
import { LabeledInput } from "@/components/inputs";

type ExportField = {
  endpoint?: ApiEndpointQuery<
    QueryDefinition<Query, ClientQueyFn, any, Response<any>, any>,
    EndpointDefinitions
  > &
    QueryHooks<QueryDefinition<Query, ClientQueyFn, any, Response<any>, any>>;
  xs?: number;
  md?: number;
  placeholder?: string;
  label?: string;
  dataKey?: string;
  multiple?: boolean;
  disabled?: boolean;
};

export interface ExportModalProps {
  beforeSubmit?: (values: any) => Object;
  name?: string;
  url: string;
  fullUrl?: string;
  fields: {
    [key: string]: ExportField;
  };
}

export const ExportModal = ({
  url,
  fullUrl,
  fields,
  name = "Export",
  beforeSubmit,
}: ExportModalProps) => {
  const [open, setOpen] = useState(false);
  const [exportType, setExportType] = React.useState("csv");

  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => setOpen(false);

  const handleExportTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setExportType(newAlignment);
  };

  const { handleSubmit, control, setError } = useForm({});

  const onSubmit: SubmitHandler<any> = async (values) => {
    const query = beforeSubmit == null ? values : beforeSubmit(values);
    setOpen(false);
    try {
      const response: Partial<AxiosResponse> = await client.get(
        fullUrl ? fullUrl : `${url}/export/${exportType}`,
        { params: query }
      );
      fileDownload(response.data as any, `${url}_.${exportType}`);
    } catch (ex) {
      console.log(ex);
      enqueueSnackbar(
        "Failed to Export, please check you network and try again",
        { variant: "error" }
      );
    }
  };

  return (
    <>
      <Button
        startIcon={<DownloadIcon />}
        size="small"
        color="secondary"
        sx={{ textTransform: "none" }}
        onClick={() => setOpen(true)}
      >
        {name}
      </Button>
      <Dialog disableEscapeKeyDown open={open} maxWidth="lg">
        <DialogTitle>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography variant="h6" fontWeight={600} color={"text.main"}>
              Export
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Divider />
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
            <Grid container spacing={2}>
              {fields &&
                Object.keys(fields).map((key, i) => {
                  // @ts-ignore
                  const options = fields[key] as ExportField;

                  if (options.endpoint) {
                    return (
                      <Grid
                        key={i}
                        item
                        xs={options.xs || 12}
                        md={options.md || 6}
                      >
                        <Controller
                          // @ts-ignore
                          name={key}
                          control={control}
                          render={({
                            field: { onChange, value },
                            fieldState: { error },
                          }) => (
                            <AsyncDropdown
                              label={options.label}
                              dataKey={options?.dataKey || "name"}
                              // @ts-ignore
                              endpoint={options.endpoint}
                              placeholder={options.placeholder}
                              onChange={(_, data) => onChange(data)}
                              value={value}
                              error={!!error?.message}
                              helperText={error?.message}
                              multiple={options.multiple}
                              disabled={options.disabled}
                            />
                          )}
                        />
                      </Grid>
                    );
                  } else {
                    return (
                      <Grid
                        key={i}
                        item
                        xs={options.xs || 12}
                        md={options.md || 6}
                      >
                        <Controller
                          // @ts-ignore
                          name={key}
                          control={control}
                          render={({
                            field: { onChange, value },
                            fieldState: { error },
                          }) => (
                            <LabeledInput
                              name={key}
                              error={!!error?.message}
                              helperText={error?.message}
                              onChange={onChange}
                              fullWidth
                              size="small"
                              value={value ?? ""}
                              label={options.label}
                              placeholder={options.placeholder}
                              disabled={options.disabled}
                            />
                          )}
                        />
                      </Grid>
                    );
                  }
                })}
            </Grid>
          </Box>
          <Box sx={{ mt: 3 }}>
            <ToggleButtonGroup
              color="primary"
              value={exportType}
              exclusive
              onChange={handleExportTypeChange}
              aria-label="Platform"
              size="small"
            >
              <ToggleButton value="csv">Csv (.csv)</ToggleButton>
              <ToggleButton value="xlsx">Excel (.xlsx)</ToggleButton>
              <ToggleButton value="xls">Excel (.xls)</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{ display: "felx", justifyContent: "space-between" }}
        >
          <Button onClick={() => setOpen(false)} color="error" size="small">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            disableElevation
            size="small"
          >
            Export
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
