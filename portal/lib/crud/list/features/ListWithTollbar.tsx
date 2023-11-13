import React, { useEffect, useState, useCallback } from "react";
import {
  GridColDef,
  GridValidRowModel,
  GridFilterModel,
  GridSortModel,
  GridRenderCellParams,
} from "@mui/x-data-grid";
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
import { ClientQueyFn, EditMode } from "@/types";
import { Response, AbstractBaseModel } from "@/models";
import EditableTable, {
  EditableTableCustomNoRowsOverlay,
} from "../../components/EditableTable";
import { LinearProgress, Box } from "@mui/material";
import buildPage from "@/util/buildPage";
import buildSorting from "@/util/buildSorting";

export interface ListWithTollbarProps<
  T extends AbstractBaseModel & GridValidRowModel
> {
  getQuery: { id: number; query?: Object };
  toolbar?: React.FC<any>;
  columns: GridColDef[];
  getEndpoint: ApiEndpointQuery<
    QueryDefinition<
      { id: number; query?: Object },
      ClientQueyFn,
      any,
      Response<T[]>,
      any
    >,
    EndpointDefinitions
  > &
    QueryHooks<
      QueryDefinition<
        { id: number; query?: Object },
        ClientQueyFn,
        any,
        Response<T[]>,
        any
      >
    >;
  actions: React.FC<
    GridRenderCellParams & {
      onClick?: (id: number) => void;
    }
  >[];
}
/**
 *
 * T.id is current row id
 */
export default function ListWithTollbar<
  T extends AbstractBaseModel & EditMode
>({
  getQuery,
  toolbar,
  columns,
  getEndpoint,
  actions,
}: ListWithTollbarProps<T>) {
  const [rows, setRows] = useState<T[]>([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [query, setQuery] = useState(getQuery);

  const updateQuery = (q: Object) =>
    setQuery({ id: getQuery.id, query: { ...getQuery.query, ...q } });

  const { data, isLoading, isFetching, refetch } = getEndpoint.useQuery(query);

  useEffect(() => {
    updateQuery(buildPage(paginationModel));
  }, [paginationModel]);

  useEffect(() => {
    if (data?.results) setRows(data?.results);
  }, [data]);

  const handleOnProcessRowUpdateError = (error: any) => {};

  const processRowUpdate = async (updatedRow: any, originalRow: any) => {
    const newRow = { ...updatedRow, isNew: false };

    // TODO: check if refetch is needed
    refetch();

    return newRow;
  };

  const onFilterChange = React.useCallback((filterModel: GridFilterModel) => {
    if (filterModel.quickFilterValues) {
      updateQuery({ search: filterModel.quickFilterValues[0] });
    }
  }, []);

  const handleSortModelChange = React.useCallback(
    (sortModel: GridSortModel) => {
      if (sortModel.length != 0) {
        updateQuery(buildSorting(sortModel));
      }
    },
    []
  );

  const settingColumn: GridColDef = {
    field: "Actions",
    flex: 1,
    minWidth: 150,
    headerAlign: "center",
    align: "right",
    renderCell(params) {
      return (
        <Box>
          {actions.map((E, i) => {
            return <E key={i} {...params} />;
          })}
        </Box>
      );
    },
  };

  return (
    <EditableTable
      hideFooterPagination={false}
      sx={{ background: "white", minHeight: "20px" }}
      rows={rows}
      rowCount={data?.count || 0}
      loading={isFetching}
      // editMode="row"
      rowHeight={40}
      columns={[...columns, settingColumn]}
      disableRowSelectionOnClick
      slots={{
        toolbar: toolbar,
        noRowsOverlay: EditableTableCustomNoRowsOverlay,
        loadingOverlay: LinearProgress,
      }}
      processRowUpdate={processRowUpdate}
      slotProps={{
        toolbar: { setRows, rows, refetch },
      }}
      onProcessRowUpdateError={handleOnProcessRowUpdateError}
      pageSizeOptions={[10, 25, 50, 100]}
      paginationModel={paginationModel}
      paginationMode="server"
      onPaginationModelChange={setPaginationModel}
      filterMode="server"
      onFilterModelChange={onFilterChange}
      sortingMode="server"
      onSortModelChange={handleSortModelChange}
    />
  );
}
