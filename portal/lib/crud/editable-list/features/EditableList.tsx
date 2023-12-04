import React, { useEffect, useState, useCallback } from "react";
import {
  GridColDef,
  GridValidRowModel,
  GridActionsCellItem,
  GridFilterModel,
  GridSortModel,
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
import { LinearProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import buildQuery from "@/util/buildQuery";
import buildPage from "@/util/buildPage";
import buildSorting from "@/util/buildSorting";

export interface EditableListProps<
  T extends AbstractBaseModel & GridValidRowModel
> {
  getQuery: { id: number; query: Object };
  toolbar: React.FC<any>;
  columns: GridColDef[];
  beforeSubmit?: (values: Partial<T>) => Partial<T>;
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
  deleteEndpoint: ApiEndpointMutation<
    MutationDefinition<any, ClientQueyFn, any, T, any>,
    EndpointDefinitions
  > &
    MutationHooks<MutationDefinition<any, ClientQueyFn, any, T, any>>;
  updateEndpoint: ApiEndpointMutation<
    MutationDefinition<Partial<T>, ClientQueyFn, any, Promise<T>, any>,
    EndpointDefinitions
  > &
    MutationHooks<
      MutationDefinition<Partial<T>, ClientQueyFn, any, Promise<T>, any>
    >;
  createEndpoint: ApiEndpointMutation<
    MutationDefinition<
      { id: number; data: Partial<T> },
      ClientQueyFn,
      any,
      Promise<T>,
      any
    >,
    EndpointDefinitions
  > &
    MutationHooks<
      MutationDefinition<
        { id: number; data: Partial<T> },
        ClientQueyFn,
        any,
        Promise<T>,
        any
      >
    >;
}
/**
 *
 * T.id is current row id
 */
export default function EditableList<T extends AbstractBaseModel & EditMode>({
  getQuery,
  toolbar,
  columns,
  getEndpoint,
  createEndpoint,
  deleteEndpoint,
  updateEndpoint,
  beforeSubmit,
}: EditableListProps<T>) {
  const [rows, setRows] = useState<T[]>([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [query, setQuery] = useState(getQuery);

  const updateQuery = (q: Object) =>
    setQuery({ id: getQuery.id, query: { ...getQuery.query, ...q } });

  const { data, isLoading, isFetching, refetch } = getEndpoint.useQuery(query);

  const [createTrigger, createResult] = createEndpoint.useMutation();
  const [updateTrigger, updateResult] = updateEndpoint.useMutation();
  const [deleteTrigger, deleteResult] = deleteEndpoint?.useMutation();

  useEffect(() => {
    updateQuery(buildPage(paginationModel));
  }, [paginationModel]);

  useEffect(() => {
    if (data?.results) setRows(data?.results);
  }, [data]);

  const handleOnProcessRowUpdateError = (error: any) => {};

  const processRowUpdate = async (updatedRow: any, originalRow: any) => {
    const cleaned_data =
      beforeSubmit == null ? updatedRow : beforeSubmit(updatedRow);

    if (updatedRow.isNew)
      await createTrigger({ id: cleaned_data.id, data: cleaned_data });
    else await updateTrigger({ ...cleaned_data, id: updatedRow.id });

    const newRow = { ...updatedRow, isNew: false };

    // TODO: check if refetch is needed
    refetch();

    return newRow;
  };

  const settingCol: GridColDef = {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    width: 100,
    cellClassName: "actions",
    getActions: ({ id, row }) => {
      return [
        <GridActionsCellItem
          showInMenu={false}
          key={id}
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDeleteRow(id, row)}
          color="inherit"
        />,
      ];
    },
  };

  const handleDeleteRow = async (id: any, row: T) => {
    if (row.isNew) {
      setRows(rows.filter((e) => e.id != row.id));
    } else {
      const cleaned_data = beforeSubmit == null ? row : beforeSubmit(row);
      await deleteTrigger({ ...cleaned_data, id: id });
      refetch();
    }
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

  return (
    <EditableTable
      hideFooterPagination={false}
      sx={{ background: "white", minHeight: "20px", height: "auto" }}
      rows={rows}
      rowCount={data?.count || 0}
      loading={isFetching}
      // editMode="row"
      rowHeight={40}
      columns={[...columns, settingCol]}
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
