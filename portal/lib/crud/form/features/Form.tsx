import React, { ReactNode } from "react";
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
import { AxiosResponse } from "axios";
import { Response, AbstractBaseModel } from "@/models";
import { Grid, InputAdornment, Box, Stack, Button } from "@mui/material";
import { LabeledInput } from "@/components/inputs";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useRouter } from "next/router";
import AsyncDropdown from "../components/AsyncDropdown";

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
};

export interface FormProps<T> {
  baseUrl: string;
  data?: T;
  schema: ObjectSchema<any>;
  fields: {
    [K in keyof Partial<T>]: Field<T[K]>;
  };
  createEndpoint: ApiEndpointMutation<
    MutationDefinition<
      Partial<T>,
      ClientQueyFn,
      any,
      Promise<AxiosResponse<T>>,
      any
    >,
    EndpointDefinitions
  > &
    MutationHooks<
      MutationDefinition<
        Partial<T>,
        ClientQueyFn,
        any,
        Promise<AxiosResponse<T>>,
        any
      >
    >;
  updateEndpoint: ApiEndpointMutation<
    MutationDefinition<
      Pick<AbstractBaseModel, "id"> & Partial<T>,
      ClientQueyFn,
      any,
      Promise<AxiosResponse<T>>,
      any
    >,
    EndpointDefinitions
  > &
    MutationHooks<
      MutationDefinition<
        Pick<AbstractBaseModel, "id"> & Partial<T>,
        ClientQueyFn,
        any,
        Promise<AxiosResponse<T>>,
        any
      >
    >;
}

export default function Form<T>({
  fields,
  baseUrl,
  data,
  schema,
  createEndpoint,
  updateEndpoint,
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
    if (data == null) await createTrigger(values as T);
    else await updateTrigger(values as any);
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
                <AsyncDropdown
                  label={options.label}
                  dataKey="name"
                  endpoint={options.endpoint}
                  createForm={options.form}
                />
              </Grid>
            );
          }

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
                    error={!!error?.message}
                    helperText={error?.message}
                    onChange={onChange}
                    fullWidth
                    size="small"
                    value={value ?? 0}
                    label={options.label}
                    placeholder={options.placeholder}
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
        })}
        {/* {fields.map((e, i) => {
          if (e.endpoint) {
            return <></>;
          }

          return (
            <Grid key={i} item xs={e.xs || 12} md={e.md || 6}>
              <Controller
                // @ts-ignore
                name={e.name}
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { invalid, isTouched, isDirty, error },
                }) => (
                  <LabeledInput
                    error={!!error?.message}
                    helperText={error?.message}
                    onChange={onChange}
                    fullWidth
                    size="small"
                    value={value ?? 0}
                    label={e.label}
                    placeholder={e.placeholder}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          {e.postfix}
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
          );
        })} */}
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
            >
              Save
            </Button>
          </Box>
          <Box>
            <Button
              variant="outlined"
              color="error"
              size="small"
              startIcon={<CloseIcon />}
              onClick={() => router.push(baseUrl)}
            >
              Cancel
            </Button>
          </Box>
        </Stack>
      </Box>
    </form>
  );
}
