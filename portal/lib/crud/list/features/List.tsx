import React, { ReactNode, useEffect } from "react";
import {
  GridColDef,
  GridRenderCellParams,
  GridRowProps,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { Box, LinearProgress } from "@mui/material";
import StripedDataGrid, {
  CustomNoRowsOverlay,
} from "../components/StripedDataGrid";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  ApiEndpointMutation,
  ApiEndpointQuery,
} from "@reduxjs/toolkit/dist/query/core/module";
import {
  QueryDefinition,
  MutationDefinition,
  BaseQueryFn,
} from "@reduxjs/toolkit/dist/query";
import { EndpointDefinitions } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import {
  MutationHooks,
  QueryHooks,
} from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { ClientQueyFn, Query } from "@/types";
import { Response } from "@/models";

export interface ListProps<T> {
  columns: GridColDef[];
  actions: React.FC<GridRenderCellParams>[];
  getEndpoint: ApiEndpointQuery<
    QueryDefinition<Query, ClientQueyFn, any, Response<T[]>, any>,
    EndpointDefinitions
  > &
    QueryHooks<QueryDefinition<Query, ClientQueyFn, any, Response<T[]>, any>>;
  deleteEndpoint: ApiEndpointMutation<
    MutationDefinition<number, ClientQueyFn, any, T, any>,
    EndpointDefinitions
  > &
    MutationHooks<MutationDefinition<number, ClientQueyFn, any, T, any>>;
}

export default function List<T>({
  columns,
  actions,
  getEndpoint,
  deleteEndpoint,
}: ListProps<T>) {
  const selector = useSelector((state: RootState) => state.filter);

  const [trigger, { data, isLoading }] = getEndpoint.useLazyQuery();
  const [deleteTrigger, deleteResult] = deleteEndpoint.useMutation();

  const settingColumn: GridColDef = {
    field: "Actions",
    flex: 1,
    minWidth: 150,
    headerAlign: "center",
    align: "right",
    renderCell(params) {
      return (
        <Box>
          {actions.map((E, i) => (
            <E key={i} {...params} />
          ))}
        </Box>
      );
    },
  };

  const getRowById = (row: any) => {
    // if (setting == SETTING_COL.history) return row.history_id;
    return row.id;
  };

  useEffect(() => {
    trigger("", true);
  }, []);

  return (
    <StripedDataGrid
      sx={{ background: "white", height: "100%" }}
      rows={(data?.results || []) as GridValidRowModel[]}
      loading={isLoading}
      density="compact"
      rowHeight={55}
      columns={[...columns, settingColumn]}
      paginationMode="server"
      disableRowSelectionOnClick
      slots={{
        noRowsOverlay: CustomNoRowsOverlay,
        loadingOverlay: LinearProgress,
      }}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      }
      getRowId={getRowById}
    />
  );
}
