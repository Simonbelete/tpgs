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
import { AxiosResponse } from "axios";
import { Response, AbstractBaseModel } from "@/models";
import { Grid, InputAdornment, Box, Stack, Button } from "@mui/material";
import { LabeledInput } from "@/components/inputs";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useRouter } from "next/router";
import AsyncDropdown from "../../components/AsyncDropdown";

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
  shallowRoute?: boolean;
}

export default function Form<
  T extends AbstractBaseModel & { status?: number }
>({
  fields,
  baseUrl,
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
        router.push(
          `${router.pathname.split("/create")[0]}/${response.id}`,
          undefined,
          { shallow: true }
        );
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
                      dataKey="name"
                      endpoint={options.endpoint}
                      createForm={options.form}
                      placeholder={options.placeholder}
                      onChange={(_, data) => onChange(data)}
                      value={value}
                      error={!!error?.message}
                      helperText={error?.message}
                    />
                  )}
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
                    value={value ?? ""}
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
              {data ? "Update" : "Create"}
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
