import React, { useState, ChangeEvent, ReactNode } from "react";
import { useSnackbar } from "notistack";
import { Box, Button, Grid, Typography, Tabs, Tab } from "@mui/material";
import { Dropdown } from "@/components/dropdowns";
import AsyncDropdown from "@/lib/crud/components/AsyncDropdown";
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
import { ChickenForm } from "../chickens";
import { breedApi } from "../breeds/services";

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
  ViewFormFC?: React.FC<any>;
};

type Res = {
  name: string;
  resource: string;
  fields: {
    [key: string]: ExportField;
  };
};

const singleChickenFilterForm: {
  [key: string]: ExportField;
} = {
  chicken: {
    endpoint: chickenApi.endpoints.getChickens,
    label: "Chicken",
    placeholder: "Select Chicken",
    md: 12,
    xs: 12,
    dataKey: "display_name",
    ViewFormFC: ChickenForm,
  },
};

const baseChickenFilter: {
  [key: string]: ExportField;
} = {
  generation: {
    label: "Generation",
    placeholder: "Select Generation",
    md: 4,
    xs: 12,
    endpoint: chickenApi.endpoints.getGenerations,
    dataKey: "generation",
  },
  breed: {
    label: "Breed",
    placeholder: "Select Breed",
    md: 4,
    xs: 12,
    endpoint: breedApi.endpoints.getBreeds,
    dataKey: "display_name",
  },
  hatchery: {
    endpoint: hatcheryApi.endpoints.getHatchery,
    label: "Hatch / Batch",
    placeholder: "Select Hatch / Batch",
    md: 4,
    xs: 12,
    dataKey: "display_name",
  },
  house: {
    endpoint: houseApi.endpoints.getHouses,
    label: "House",
    placeholder: "Select House",
    md: 4,
    xs: 12,
    dataKey: "display_name",
  },
  pen: {
    endpoint: penApi.endpoints.getPens,
    label: "Pen",
    placeholder: "Select Pen",
    md: 4,
    xs: 12,
    dataKey: "display_name",
  },
};

const batchFilterForms: {
  [key: string]: ExportField;
} = {
  ...baseChickenFilter,
  start_week: {
    label: "Start Week",
    placeholder: "Start Week",
    md: 4,
    xs: 12,
  },
  end_week: {
    label: "End Week",
    placeholder: "End Week",
    md: 4,
    xs: 12,
  },
};

const resources: Res[] = [
  { name: "---", resource: "", fields: {} },
  {
    name: "Export Pedigree, Body Weight, Feed Intake & Egg Production",
    resource: "ChickenRecordsetResource",
    fields: batchFilterForms,
  },
  {
    name: "Export Pedigree information",
    resource: "BaseChickenResource",
    fields: baseChickenFilter,
  },
  {
    name: "Export Pedigree & Body Weight",
    resource: "ChickenBodyWeightExportResource",
    fields: batchFilterForms,
  },
  // {
  //   name: "Export Feed conversition ratio",
  //   resource: "ChickenFeedFCRResource",
  //   fields: batchFilterForms,
  // },
];

type Inputs = Partial<ExportJob> & { resource: Res };

export const ExportJobForm = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();

  const [tabValue, setTabValue] = useState(0);
  const [activeResouce, setActiveResouce] = useState<Res | null>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const { handleSubmit, control, setValue, getValues } = useForm<Inputs>({
    defaultValues: {
      format: "csv",
    },
  });

  const buildBaseChickenResource = (values: any) => {
    // Chicken Model
    return {
      id: _.get(values.chicken, "id", null),
      generation: _.get(values.generation, "generation", null),
      breed: _.get(values.breed, "id", null),
      hatchery: _.get(values.hatchery, "id", null),
      house: _.get(values.house, "id", null),
      pen: _.get(values.pen, "id", null),
    };
  };

  const buildChickenExportResource = (values: any) => {
    // Tables that refer Chicken model
    const vals = {
      chicken: _.get(values.chicken, "id", null),
      generation: _.get(values.generation, "generation", null),
      breed: _.get(values.breed, "id", null),
      hatchery: _.get(values.hatchery, "id", null),
      house: _.get(values.house, "id", null),
      pen: _.get(values.pen, "id", null),
      week__gte: _.get(values, "start_week", null),
      week__lte: _.get(values, "end_week", null),
    };

    return vals;
  };

  const buildChickenRefResource = (values: any) => {
    // ChickenRecordSet Model
    const vals = {
      chicken: _.get(values.chicken, "id", null),
      chicken__hatchery: _.get(values.hatchery, "id", null),
      chicken__house: _.get(values.house, "id", null),
      chicken__pen: _.get(values.pen, "id", null),
      chicken__generation: _.get(values.generation, "generation", null),
      chicken__breed: _.get(values.breed, "id", null),
      week__gte: _.get(values, "start_week", null),
      week__lte: _.get(values, "end_week", null),
    };

    return vals;
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("abbbbb");
    const body = {
      resource: _.get(data.resource, "resource", null),
      format: "xlsx",
    };

    let query = {};

    switch (body.resource) {
      case "BaseChickenResource":
        query = buildBaseChickenResource(data);
        break;
      case "ChickenBodyWeightExportResource":
        query = buildChickenExportResource(data);
        break;
      case "ChickenRecordsetResource":
      case "ChickenFeedFCRResource":
        query = buildChickenRefResource(data);
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
        router.push(`/export-job`);
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
    <>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="inherit"
        sx={{ mb: 2 }}
      >
        <Tab label="Export single chicken data" />
        <Tab label="Batch export" />
      </Tabs>
      <Card title="Submit Export Job">
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
              Object.keys(
                tabValue == 0 ? singleChickenFilterForm : activeResouce?.fields
              ).map((key, i) => {
                const options = (
                  tabValue == 0
                    ? singleChickenFilterForm[key]
                    : activeResouce.fields[key]
                ) as ExportField;
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
                            viewForm={
                              options.ViewFormFC && (
                                // @ts-ignore
                                <options.ViewFormFC
                                  data={value}
                                  shallowRoute={false}
                                />
                              )
                            }
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
            {/* <Grid item xs={12}>
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
          </Grid> */}
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
    </>
  );
};
