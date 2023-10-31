import React, { useEffect, useState } from "react";
import {
  GridColDef,
  GridRenderCellParams,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { Box, LinearProgress } from "@mui/material";
import StripedDataGrid, {
  CustomNoRowsOverlay,
} from "../../components/StripedDataGrid";
import DeleteModal from "../../components/DeleteModal";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
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
import { Response } from "@/models";
import PermanentlyDeleteAction from "../actions/PermanentlyDeleteAction";
import buildQuery from "@/util/buildQuery";
import buildPage from "@/util/buildPage";

export interface ListProps<T> {
  columns: GridColDef[];
  actions: React.FC<
    GridRenderCellParams & {
      onClick?: (id: number) => void;
    }
  >[];
  getEndpoint: ApiEndpointQuery<
    QueryDefinition<Query, ClientQueyFn, any, Response<T[]>, any>,
    EndpointDefinitions
  > &
    QueryHooks<QueryDefinition<Query, ClientQueyFn, any, Response<T[]>, any>>;
  deleteEndpoint?: ApiEndpointMutation<
    MutationDefinition<number, ClientQueyFn, any, T, any>,
    EndpointDefinitions
  > &
    MutationHooks<MutationDefinition<number, ClientQueyFn, any, T, any>>;
  getRowId?: (row: any) => any;
}

export default function List<T>({
  columns,
  actions,
  getEndpoint,
  deleteEndpoint,
  getRowId,
}: ListProps<T>) {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state.filter);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [selectedId, setSelectedId] = useState<number>(0);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);

  const { data, isLoading, refetch } = getEndpoint.useQuery(
    buildQuery({ ...buildPage(paginationModel), ...selector })
  );
  const [deleteTrigger, deleteResult] =
    deleteEndpoint != null
      ? deleteEndpoint.useMutation()
      : [async () => {}, {}];

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
            if (E.name == PermanentlyDeleteAction.name) {
              return (
                <E
                  key={i}
                  {...params}
                  onClick={(id) => handleOpenDeleteConfirmation(id)}
                />
              );
            } else {
              return <E key={i} {...params} />;
            }
          })}
        </Box>
      );
    },
  };

  const handleCloseDeleteConfirmation = () => setDeleteConfirmation(false);
  const handleOpenDeleteConfirmation = (id: number) => {
    setSelectedId(id);
    setDeleteConfirmation(true);
  };
  const deletePermanently = async () => {
    setDeleteConfirmation(false);
    if (deleteEndpoint !== null)
      await deleteTrigger(selectedId).then(() => refetch());
  };

  const getRowById = (row: any) => {
    return row.id;
  };

  return (
    <>
      <DeleteModal
        open={deleteConfirmation}
        onClose={handleCloseDeleteConfirmation}
        onYes={deletePermanently}
      />
      <StripedDataGrid
        sx={{ background: "white", height: "100%" }}
        rows={(data?.results || []) as GridValidRowModel[]}
        loading={isLoading}
        density="compact"
        rowHeight={55}
        columns={[...columns, settingColumn]}
        disableRowSelectionOnClick
        slots={{
          noRowsOverlay: CustomNoRowsOverlay,
          loadingOverlay: LinearProgress,
        }}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        getRowId={getRowId != null ? getRowId : getRowById}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
      />
    </>
  );
}
