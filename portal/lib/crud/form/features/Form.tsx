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
import { Grid, InputAdornment } from "@mui/material";
import { LabeledInput } from "@/components/inputs";

export interface Field<T> {
  name: string;
  prefix?: string | ReactNode;
  postfix?: string | ReactNode;
  endpoint?: ApiEndpointQuery<
    QueryDefinition<Query, ClientQueyFn, any, Response<T[]>, any>,
    EndpointDefinitions
  > &
    QueryHooks<QueryDefinition<Query, ClientQueyFn, any, Response<T[]>, any>>;
  xs?: number;
  md?: number;
  placeholder?: string;
  label?: string;
}

export interface FormProps<T> {
  data?: T;
  schema: ObjectSchema<any>;
  fields: Field<T>[];
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
  data,
  schema,
  createEndpoint,
  updateEndpoint,
}: FormProps<T>) {
  type Inputs = Partial<T>;

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
      <Grid container>
        {fields.map((e, i) => {
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
        })}
      </Grid>
    </form>
  );
}
