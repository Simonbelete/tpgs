import React, { useState, ChangeEvent } from "react";
import { useSnackbar } from "notistack";
import {
  Box,
  Button,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
} from "@mui/material";
import { Dropdown, AsyncDropdown } from "@/components/dropdowns";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { ExportJob } from "@/models";
import client from "@/services/client";
import _ from "lodash";
import { Card } from "@/components";
import { useRouter } from "next/router";
import { ApiEndpointQuery } from "@reduxjs/toolkit/dist/query/core/module";
import { QueryDefinition } from "@reduxjs/toolkit/dist/query";
import { EndpointDefinitions } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { QueryHooks } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { ClientQueyFn, Query } from "@/types";
import { Response } from "@/models";
import { LabeledInput } from "@/components/inputs";
import { chickenApi } from "@/features/chickens/services";
import { hatcheryApi } from "@/features/hatchery/services";
import { houseApi } from "@/features/houses/services";
import { penApi } from "@/features/pen/services";
import buildQuery from "@/util/buildQuery";

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

type Res = {
  name: string;
  resource: string;
  fields: {
    [key: string]: ExportField;
  };
};

const resources: Res[] = [
  { name: "---", resource: "", fields: {} },
  {
    name: "Export Pedigree, Body Weight, Feed Intake & Egg Production",
    resource: "ChickenExportResource",
    fields: {
      chicken: {
        endpoint: chickenApi.endpoints.getChickens,
        label: "Chicken",
        md: 12,
        dataKey: "display_name",
      },
      hatchery: {
        endpoint: hatcheryApi.endpoints.getHatchery,
        label: "hatchery",
        md: 12,
        dataKey: "display_name",
      },
      house: {
        endpoint: houseApi.endpoints.getHouses,
        label: "House",
        md: 12,
        dataKey: "display_name",
      },
      pen: {
        endpoint: penApi.endpoints.getPens,
        label: "Pen",
        md: 12,
        dataKey: "display_name",
      },
      generation: {
        label: "Generation",
        placeholder: "Generation",
        md: 12,
      },
    },
  },
  {
    name: "Example",
    resource: "ExampleExportResource",
    fields: {},
  },
];

type Inputs = Partial<ExportJob> & { resource: Res };

export const ExportJobForm = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();

  const [activeResouce, setActiveResouce] = useState<Res | null>(null);

  const { handleSubmit, control, setValue, getValues } = useForm<Inputs>({
    defaultValues: {
      format: "csv",
    },
  });

  const buildChickenExportResource = (values: any) => {
    return {
      chicken: _.get(values.chicken, "id", null),
      hatchery: _.get(values.hatchery, "id", null),
      house: _.get(values.house, "id", null),
      pen: _.get(values.pen, "id", null),
      generation: _.get(values, "generation", null),
    };
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const body = {
      resource: _.get(data.resource, "resource", null),
      format: data.format,
    };

    let query = {};

    switch (body.resource) {
      case "ChickenExportResource":
        query = buildChickenExportResource(data);
        break;
    }

    try {
      const response = await client.post("export/jobs/", body, {
        params: query,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status == 201) {
        // router.push(`/import-job/${response.data.id}`);
      } else {
        enqueueSnackbar("Please select file type either csv or excel", {
          variant: "error",
        });
      }
    } catch {
      enqueueSnackbar("500 Server Error check you file and try again", {
        variant: "error",
      });
    }
  };

  return (
    <Card title="Submit Import Job">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ width: "90%", mb: 2 }}>
          <Typography variant="caption" mb={2}>
            *Leaving field empty will consider all values
          </Typography>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Controller
              name={"resource"}
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { invalid, isTouched, isDirty, error },
              }) => (
                <Dropdown
                  options={resources}
                  error={!!error?.message}
                  helperText={error?.message}
                  onChange={(_, data) => {
                    onChange(data);
                    setActiveResouce(data);
                  }}
                  value={value ?? { name: "---", resource: "" }}
                  dataKey="name"
                />
              )}
            />
          </Grid>
          {activeResouce &&
            Object.keys(activeResouce?.fields).map((key, i) => {
              const options = activeResouce.fields[key] as ExportField;

              if (options.endpoint) {
                return (
                  <Grid key={i} item xs={options.xs || 12} md={options.md || 6}>
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
                  <Grid key={i} item xs={options.xs || 12} md={options.md || 6}>
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
          <Grid item xs={12}>
            <Controller
              name={"format"}
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { invalid, isTouched, isDirty, error },
              }) => (
                <ToggleButtonGroup
                  color="primary"
                  value={value}
                  onChange={(_, data) => onChange(data)}
                  exclusive
                  aria-label="Platform"
                  size="small"
                >
                  <ToggleButton value="csv">Csv (.csv)</ToggleButton>
                  <ToggleButton value="xlsx">Excel (.xlsx)</ToggleButton>
                  <ToggleButton value="xls">Excel (.xls)</ToggleButton>
                </ToggleButtonGroup>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              size="small"
              disableElevation
              type="submit"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};
