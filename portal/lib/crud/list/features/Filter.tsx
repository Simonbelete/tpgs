import React, { useState } from "react";
import {
  Paper,
  Stack,
  Box,
  Grid,
  Typography,
  Divider,
  Button,
  ListItem,
  Chip,
  SelectChangeEvent,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { SearchInput } from "@/components/inputs";
import { CheckboxDropdown } from "@/components/dropdowns";
import { filterSlice } from "@/store/slices";
import { RootState } from "@/store";
import { Response, AbstractBaseModel } from "@/models";
import AsyncCheckboxDropdown from "../../components/AsyncCheckboxDropdown";
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

export type FilterField<T> = {
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
  dataDisplayKey: string;
};

export interface FilterProps<T> {
  filters: {
    [K in keyof Partial<T>]: FilterField<T[K]>;
  };
}

export default function Filter<T>({ filters }: FilterProps<T>) {
  const dispatch = useDispatch();
  const activeMenu = [
    { name: "Active", value: true },
    { name: "Deactive", value: false },
  ];

  const selector = useSelector((state: RootState) => state.filter);

  const handleActiveChange = (event: SelectChangeEvent) =>
    dispatch(
      filterSlice.actions.setIsActive((event.target.value as any).value)
    );

  const handleSearchButton = () => dispatch(filterSlice.actions.reset());

  return (
    <Paper
      sx={{ p: 2 }}
      elevation={0}
      variant="outlined"
      square
      id="invitation-filter"
    >
      <Grid container alignItems={"center"}>
        <Grid item xs={12} md={4}>
          <Typography variant="body2" fontWeight={700}>
            ADVANCED SEARCH
          </Typography>
        </Grid>
        <Grid item xs={12} md />
        <Grid item xs={12} md={4}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent={{ xs: "start", md: "end" }}
            spacing={2}
          >
            <SearchInput
              label="Search..."
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                dispatch(filterSlice.actions.setSearch(event.target.value))
              }
            />

            <Stack
              direction="row"
              justifyContent={{ xs: "start", md: "end" }}
              spacing={2}
            >
              <Box>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  disableElevation
                  onClick={handleSearchButton}
                >
                  Search
                </Button>
              </Box>
              <Box>
                <Button
                  variant="text"
                  color="secondary"
                  size="small"
                  disableElevation
                  onClick={() => dispatch(filterSlice.actions.reset())}
                >
                  Clear
                </Button>
              </Box>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <Divider sx={{ my: 1 }} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack direction={"row"} spacing={2}>
            <CheckboxDropdown
              multiple={false}
              menus={activeMenu}
              dataValueKey="value"
              dataLableKey="name"
              label={"Active"}
              selected={[{ value: selector.is_active }]}
              onChange={handleActiveChange}
            />
            {Object.keys(filters).map((key, i) => {
              // @ts-ignore
              const options = filters[key] as Field;

              if (options.endpoint) {
                return (
                  <AsyncCheckboxDropdown
                    key={i}
                    query={{}}
                    label={options.label}
                    onChange={(event: SelectChangeEvent) => {
                      dispatch(
                        filterSlice.actions.pushFilter({
                          key: key,
                          value: event.target.value,
                        })
                      );
                    }}
                    selected={selector.filters[key] || []}
                    dataValueKey="id"
                    dataLableKey="name"
                    endpoint={options.endpoint}
                  />
                );
              }

              return <Box key={i}></Box>;
            })}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Stack direction={"row"} spacing={2}>
            <Chip
              label={`State: ${selector.is_active}`}
              size="small"
              onDelete={() => {}}
            />
            {Object.keys(selector.filters).map((key, i) => {
              if (Array.isArray(selector.filters[key])) {
                // @ts-ignore
                const dataDisplayKey = (filters[key] as any).dataDisplayKey;

                return (selector.filters[key] || []).map((e: any, j: any) => (
                  <Chip
                    key={j}
                    label={`${key}: ${e[dataDisplayKey]}`}
                    size="small"
                    onDelete={() =>
                      dispatch(
                        filterSlice.actions.popFilter({ key: key, value: e })
                      )
                    }
                  />
                ));
              }
              return (
                <Chip
                  key={i}
                  label={`${key}: ${selector.filters[key]}`}
                  size="small"
                  onDelete={() => {}}
                />
              );
            })}
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}
