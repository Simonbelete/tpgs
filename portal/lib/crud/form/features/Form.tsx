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
} from "@mui/material";
import { LabeledInput } from "@/components/inputs";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useRouter } from "next/router";
import { DatePicker } from "@mui/x-date-pickers";
import AsyncDropdown from "../../components/AsyncDropdown";
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
  type?: "string" | "number" | "date" | "datetime";
  dataKey?: string;
  multiple?: boolean;
  disabled?: boolean;
  options?: Object;
};

export interface FormProps<T> {
  data?: T;
  schema: ObjectSchema<any>;
  beforeSubmit?: (values: Partial<T>) => Partial<T>;
  fields: {
    [K in keyof Partial<T>]: Field<T[K]>;
  };
  onCreateSuccess?: (data: T) => void;
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
  shallowRoute = true,
}: FormProps<T>) {
  type Inputs = Partial<T>;

  const router = useRouter();

  const [createTrigger, createResult] = createEndpoint.useMutation();
  const [updateTrigger, updateResult] = updateEndpoint.useMutation();

  const { handleSubmit, control, setError } = useForm<Inputs>({
    defaultValues: data || ({} as any),
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
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
    } else await updateTrigger({ ...cleaned_data, id: data.id });
  };

  const useCRUDHook = useCRUD({
    results: [createResult, updateResult],
    setError: setError,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={4}>
        {Object.keys(fields).map((key, i) => {
          // @ts-ignore
          const options = fields[key] as Field;

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
                      endpoint={options.endpoint}
                      createForm={options.form}
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
          justifyContent="flex-start"
          alignItems="center"
        >
          <Box>
            <Button
              variant="contained"
              size="small"
              startIcon={<SaveIcon />}
              onClick={() => handleSubmit(onSubmit)()}
              data-testid="data-submit"
            >
              {data ? "Update" : "Create"}
            </Button>
          </Box>
          <Box>
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
        </Stack>
      </Box>
    </form>
  );
}
