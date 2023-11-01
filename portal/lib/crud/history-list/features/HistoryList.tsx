import React, { useState } from "react";
import { GridColDef, GridRowsProp, GridValidRowModel } from "@mui/x-data-grid";
import { ApiEndpointQuery } from "@reduxjs/toolkit/dist/query/core/module";
import { QueryDefinition } from "@reduxjs/toolkit/dist/query";
import { EndpointDefinitions } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { QueryHooks } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { ClientQueyFn, Query } from "@/types";
import { Response } from "@/models";
import buildQuery from "@/util/buildQuery";
import buildPage from "@/util/buildPage";
import StripedDataGrid, {
  CustomNoRowsOverlay,
} from "../../components/StripedDataGrid";
import { Box, LinearProgress } from "@mui/material";
import { historyColDef } from "@/components/gird-col-def";

export interface HistoryListProps<T> {
  columns: GridColDef[];
  getHistoryQuery: { id: number; query: Query };
  getHistoryEndpoint: ApiEndpointQuery<
    QueryDefinition<Query, ClientQueyFn, any, Response<T[]>, any>,
    EndpointDefinitions
  > &
    QueryHooks<QueryDefinition<Query, ClientQueyFn, any, Response<T[]>, any>>;
}

export default function HistoryList<T>({
  columns,
  getHistoryQuery,
  getHistoryEndpoint,
}: HistoryListProps<T>) {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const { data, isLoading, refetch } = getHistoryEndpoint.useQuery(
    buildQuery({ ...buildPage(paginationModel), ...getHistoryQuery })
  );

  return (
    <StripedDataGrid
      sx={{ background: "white", height: "100%" }}
      rows={(data?.results || []) as GridValidRowModel[]}
      rowCount={data?.count || 0}
      loading={isLoading}
      density="compact"
      rowHeight={55}
      columns={[...columns, ...historyColDef]}
      disableRowSelectionOnClick
      slots={{
        noRowsOverlay: CustomNoRowsOverlay,
        loadingOverlay: LinearProgress,
      }}
      getRowId={(row: any) => row.history_id}
      pageSizeOptions={[10, 25, 50, 100]}
      paginationModel={paginationModel}
      paginationMode="server"
      onPaginationModelChange={setPaginationModel}
    />
  );
}
