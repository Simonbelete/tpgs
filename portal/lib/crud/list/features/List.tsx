import React, { useEffect, useState } from "react";
import {
  GridColDef,
  GridRenderCellParams,
  GridValidRowModel,
  GridSortModel,
  GridPagination,
  useGridApiContext,
  useGridSelector,
  gridPageCountSelector,
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
import Toolbar from "./Toolbar";
import buildSorting from "@/util/buildSorting";
import { filterSlice } from "@/store/slices";
import MuiPagination from "@mui/material/Pagination";
import { TablePaginationProps } from "@mui/material/TablePagination";

declare module "@mui/x-data-grid" {
  interface ToolbarPropsOverrides {
    refetch: () => void;
  }
}

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

function Pagination({
  page,
  onPageChange,
  className,
}: Pick<TablePaginationProps, "page" | "onPageChange" | "className">) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event as any, newPage - 1);
      }}
    />
  );
}

function CustomPagination(props: any) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
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

  const [sortingQuery, setSortingQuery] = useState<Object>({});

  const [selectedId, setSelectedId] = useState<number>(0);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);

  const { data, isLoading, isFetching, refetch } = getEndpoint.useQuery(
    buildQuery({
      ...buildPage(paginationModel),
      ...selector.filters,
      ...{ is_active: selector.is_active, search: selector.search },
      ...sortingQuery,
    })
  );

  const [deleteTrigger, deleteResult] =
    deleteEndpoint != null
      ? deleteEndpoint.useMutation()
      : [async () => {}, {}];

  const settingColumn: GridColDef = {
    field: "Actions",
    // flex: 1,
    minWidth: 200,
    headerAlign: "center",
    align: "center",
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

  const handleSortModelChange = React.useCallback(
    (sortModel: GridSortModel) => {
      if (sortModel.length != 0) {
        setSortingQuery(buildSorting(sortModel));
      }
    },
    []
  );

  useEffect(() => {
    dispatch(filterSlice.actions.reset());
  }, []);

  return (
    <div style={{ minHeight: 400, width: "100%" }}>
      <DeleteModal
        open={deleteConfirmation}
        onClose={handleCloseDeleteConfirmation}
        onYes={deletePermanently}
      />
      <StripedDataGrid
        data-testid="data-table"
        sx={{ background: "white" }}
        autoHeight={true}
        rows={(data?.results || []) as GridValidRowModel[]}
        rowCount={data?.count || 0}
        loading={isFetching}
        density="compact"
        rowHeight={55}
        columns={[...columns, ...(actions.length > 0 ? [settingColumn] : [])]}
        disableRowSelectionOnClick
        slots={{
          toolbar: Toolbar,
          noRowsOverlay: CustomNoRowsOverlay,
          pagination: CustomPagination,
          // loadingOverlay: LinearProgress,
        }}
        slotProps={{
          toolbar: { refetch },
        }}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        getRowId={getRowId != null ? getRowId : getRowById}
        pageSizeOptions={[10, 25, 50, 100]}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
        sortingMode="server"
        onSortModelChange={handleSortModelChange}
        autosizeOnMount={true}
        autosizeOptions={{
          includeOutliers: true,
          includeHeaders: false,
          expand: true,
        }}
      />
    </div>
  );
}
