import React, { ReactNode, useCallback, useEffect } from "react";
import { ObjectSchema } from "yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ApiEndpointMutation,
  ApiEndpointQuery,
} from "@reduxjs/toolkit/dist/query/core/module";
import {
  QueryDefinition,
  MutationDefinition,
} from "@reduxjs/toolkit/dist/query";
import { EndpointDefinitions } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import {
  MutationHooks,
  QueryHooks,
} from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { ClientQueyFn, Query } from "@/types";
import { useCRUD } from "@/hooks";
import { Response, AbstractBaseModel } from "@/models";
import {
  Grid,
  InputAdornment,
  Box,
  Stack,
  Button,
  Typography,
  Alert,
  AlertTitle,
} from "@mui/material";
import { LabeledInput } from "@/components/inputs";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useRouter } from "next/router";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import AsyncDropdown from "../../components/AsyncDropdown";
import CreatableAsyncDropdown from "../../components/CreatableAsyncDropdown";
import getPreviousUrl from "@/util/getPreviousUrl";
import dayjs from "dayjs";
import { Dropdown } from "@/components/dropdowns";
import _ from "lodash";

export type Field<T> = {
  prefix?: string | ReactNode;
  postfix?: string | ReactNode;
  endpoint?: ApiEndpointQuery<
    QueryDefinition<Query, ClientQueyFn, any, Response<T[] | any>, any>,
    EndpointDefinitions
  > &
    QueryHooks<
      QueryDefinition<Query, ClientQueyFn, any, Response<T[] | any>, any>
    >;
  xs?: number;
  md?: number;
  placeholder?: string;
  label?: string;
  form?: ReactNode;
  viewForm?: any;
  type?: "string" | "number" | "date" | "datetime";
  dataKey?: string;
  multiple?: boolean;
  disabled?: boolean;
  options?: Object;
  creatable?: {
    field: string;
    endpoint: ApiEndpointMutation<
      MutationDefinition<any, ClientQueyFn, any, Promise<any>, any>,
      EndpointDefinitions
    > &
      MutationHooks<
        MutationDefinition<any, ClientQueyFn, any, Promise<any>, any>
      >;
    defaults?: Object;
  };
  unresectable?: boolean;
};

export interface FormProps<T> {
  data?: T;
  schema: ObjectSchema<any>;
  beforeSubmit?: (values: Partial<T>) => Partial<T>;
  fields: {
    [K in keyof Partial<T>]: Field<T[K]>;
  };
  onCreateSuccess?: (data: T) => void;
  onUpdateSuccess?: (data: T) => void;
  createEndpoint: ApiEndpointMutation<
    MutationDefinition<Partial<T>, ClientQueyFn, any, Promise<T>, any>,
    EndpointDefinitions
  > &
    MutationHooks<
      MutationDefinition<Partial<T>, ClientQueyFn, any, Promise<T>, any>
    >;
  updateEndpoint: ApiEndpointMutation<
    MutationDefinition<
      Pick<AbstractBaseModel, "id"> & Partial<T>,
      ClientQueyFn,
      any,
      Promise<T>,
      any
    >,
    EndpointDefinitions
  > &
    MutationHooks<
      MutationDefinition<
        Pick<AbstractBaseModel, "id"> & Partial<T>,
        ClientQueyFn,
        any,
        Promise<T>,
        any
      >
    >;
  shallowRoute?: boolean;
}

export default function Form<
  T extends AbstractBaseModel & { status?: number }
>({
  fields,
  data,
  schema,
  createEndpoint,
  updateEndpoint,
  beforeSubmit,
  onCreateSuccess,
  onUpdateSuccess,
  shallowRoute = true,
}: FormProps<T>) {
  type Inputs = Partial<T>;

  const router = useRouter();

  const [createTrigger, createResult] = createEndpoint.useMutation();
  const [updateTrigger, updateResult] = updateEndpoint.useMutation();

  const {
    handleSubmit,
    control,
    setError,
    getValues,
    resetField,
    setFocus,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: data || ({} as any),
    resolver: yupResolver(schema),
  });

  const onCreateOrUpdateSubmit: SubmitHandler<Inputs> = async (values) => {
    const cleaned_data = beforeSubmit == null ? values : beforeSubmit(values);
    if (data == null) {
      const response = await createTrigger(cleaned_data as T).unwrap();
      if (response?.status == 201 && onCreateSuccess != undefined) {
        onCreateSuccess(response);
        if (shallowRoute) {
          router.push(
            `${router.pathname.split("/create")[0]}/${response.id}`,
            undefined,
            { shallow: true }
          );
        }
      }
    } else {
      const response = await updateTrigger({
        ...cleaned_data,
        id: data.id,
      }).unwrap();
      if (response?.status == 200 && onUpdateSuccess != undefined) {
        onUpdateSuccess(response);
      }
    }
  };

  const useCRUDHook = useCRUD({
    results: [createResult, updateResult],
    setError: setError,
  });

  const cleanData = (values: Partial<T>) => {
    return beforeSubmit == null ? values : beforeSubmit(values);
  };

  const onCreateOrUpdateAndNewSubmit: SubmitHandler<Inputs> = async (
    values
  ) => {
    const cleaned_data = beforeSubmit == null ? values : beforeSubmit(values);
    const formQuery: Object = {
      week: _.get(cleaned_data, "week", 0),
    };

    if (data == null) {
      const response = await createTrigger(cleaned_data as T).unwrap();
      if (response?.status == 201 && onCreateSuccess != undefined) {
        Object.keys(fields).map((key, i) => {
          // @ts-ignore
          const options = fields[key] as Field;
          if (!options.unresectable) resetField(key as any);
        });
      }
    } else {
    }
  };

  return (
    <>
      {Object.keys(errors).length != 0 ? (
        <Alert severity="error" sx={{ mb: 3 }}>
          <AlertTitle>Error</AlertTitle>
          {Object.keys(errors).map((key, index) => {
            return (
              <div key={index}>
                <strong>
                  {key.replace("_", " ").charAt(0).toUpperCase() +
                    key.replace("_", " ").slice(1)}
                </strong>{" "}
                — {/* @ts-ignore */}
                {errors[key].message}
              </div>
            );
          })}
        </Alert>
      ) : (
        <></>
      )}
      <form onSubmit={handleSubmit(onCreateOrUpdateSubmit)}>
        <Grid container spacing={4}>
          {Object.keys(fields).map((key, i) => {
            // @ts-ignore
            const options = fields[key] as Field;

            if (options.creatable) {
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
                      <CreatableAsyncDropdown
                        label={options.label}
                        dataKey={options?.dataKey || "name"}
                        endpoint={options.endpoint}
                        createForm={options.form}
                        placeholder={options.placeholder}
                        onChange={(_, data) => onChange(data)}
                        value={value}
                        error={!!error?.message}
                        helperText={error?.message}
                        multiple={options.multiple}
                        disabled={options.disabled}
                        creatable={options.creatable}
                        viewForm={
                          options.viewForm && (
                            <options.viewForm
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
            } else if (options.endpoint) {
              return (
                <Grid key={i} item xs={options.xs || 12} md={options.md || 6}>
                  <Controller
                    // @ts-ignore
                    name={key}
                    control={control}
                    render={({
                      field: { onChange, value, ref },
                      fieldState: { error },
                    }) => (
                      <AsyncDropdown
                        ref={ref}
                        label={options.label}
                        dataKey={options?.dataKey || "name"}
                        endpoint={options.endpoint}
                        createForm={options.form}
                        placeholder={options.placeholder}
                        onChange={(_, data) => onChange(data)}
                        value={value}
                        error={!!error?.message}
                        helperText={error?.message}
                        multiple={options.multiple}
                        disabled={options.disabled}
                        viewForm={
                          options.viewForm && (
                            <options.viewForm
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
            } else if (options.options) {
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
                      <Dropdown
                        options={options.options}
                        dataKey={options.datakey}
                        onChange={(_, data) => onChange(data)}
                        value={value}
                        label={options.label}
                        error={!!error?.message}
                        helperText={error?.message}
                      />
                    )}
                  />
                </Grid>
              );
            } else if (options.type == "date") {
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
                      <Stack gap={1}>
                        <Typography variant="body2" fontWeight={700}>
                          {options.label}
                        </Typography>
                        <DatePicker
                          slotProps={{
                            textField: {
                              size: "small",
                              fullWidth: true,
                              error: !!error?.message,
                              helperText: error?.message,
                            },
                          }}
                          onChange={onChange}
                          value={value ? dayjs(value as string) : null}
                        />
                      </Stack>
                    )}
                  />
                </Grid>
              );
            } else if (options.type == "datetime") {
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
                      <Stack gap={1}>
                        <Typography variant="body2" fontWeight={700}>
                          {options.label}
                        </Typography>
                        <DateTimePicker
                          slotProps={{
                            textField: {
                              size: "small",
                              fullWidth: true,
                              error: !!error?.message,
                              helperText: error?.message,
                            },
                          }}
                          onChange={onChange}
                          value={dayjs(value as string)}
                        />
                      </Stack>
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
                        type={options.type ?? "text"}
                        error={!!error?.message}
                        helperText={error?.message}
                        onChange={onChange}
                        fullWidth
                        size="small"
                        value={value ?? ""}
                        label={options.label}
                        placeholder={options.placeholder}
                        disabled={options.disabled}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">
                              {options.postfix}
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>
              );
            }
          })}
        </Grid>
        <Box sx={{ mt: 5 }}>
          <Stack
            spacing={2}
            direction={"row"}
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display={"flex"} gap={2}>
              <Button
                variant="contained"
                size="small"
                startIcon={<SaveIcon />}
                onClick={() => handleSubmit(onCreateOrUpdateSubmit)()}
                data-testid="data-submit"
              >
                {data ? "Update" : "Create"}
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="small"
                startIcon={<CloseIcon />}
                onClick={() => router.push(getPreviousUrl(router.pathname))}
                data-testid="data-cancel"
              >
                Cancel
              </Button>
            </Box>
            {!data && (
              <Box>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => handleSubmit(onCreateOrUpdateAndNewSubmit)()}
                >
                  Create & New
                </Button>
              </Box>
            )}
          </Stack>
        </Box>
      </form>
    </>
  );
}
