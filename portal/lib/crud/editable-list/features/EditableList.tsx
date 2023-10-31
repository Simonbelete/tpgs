import React, { useEffect, useState } from "react";
import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
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
import { Response, AbstractBaseModel } from "@/models";
import { AxiosResponse } from "axios";
import EditableTable, {
  EditableTableCustomNoRowsOverlay,
} from "../../components/EditableTable";
import { LinearProgress } from "@mui/material";

export interface EditableListProps<
  T extends AbstractBaseModel & GridValidRowModel & { isNew: boolean }
> {
  getQuery: Query;
  toolbar: React.FC;
  columns: GridColDef[];
  beforeSubmit?: (values: Partial<T>) => Partial<T>;
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
}

export default function EditableList<
  T extends AbstractBaseModel & { isNew: boolean }
>({
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

  const { data, isLoading, refetch } = getEndpoint.useQuery(getQuery);

  const [createTrigger, createResult] = createEndpoint.useMutation();
  const [updateTrigger, updateResult] = updateEndpoint.useMutation();
  const [deleteTrigger, deleteResult] = deleteEndpoint?.useMutation();

  useEffect(() => {
    if (data?.results) setRows(data?.results);
  }, [data]);

  const handleOnProcessRowUpdateError = (error: any) => {};

  const processRowUpdate = async (updatedRow: any, originalRow: any) => {
    const cleaned_data =
      beforeSubmit == null ? updatedRow : beforeSubmit(updatedRow);

    if (updatedRow.isNew) await createTrigger(cleaned_data);
    else await updateTrigger(cleaned_data as any);

    const newRow = { ...updatedRow, isNew: false };

    // TODO: check if refetch is needed
    return newRow;
  };

  return (
    <EditableTable
      hideFooterPagination={true}
      sx={{ background: "white", minHeight: "20px" }}
      rows={rows}
      loading={isLoading}
      // editMode="row"
      rowHeight={40}
      columns={columns}
      disableRowSelectionOnClick
      slots={{
        toolbar: toolbar,
        noRowsOverlay: EditableTableCustomNoRowsOverlay,
        loadingOverlay: LinearProgress,
      }}
      processRowUpdate={processRowUpdate}
      slotProps={{
        toolbar: { setRows },
      }}
      onProcessRowUpdateError={handleOnProcessRowUpdateError}
    />
  );
}
