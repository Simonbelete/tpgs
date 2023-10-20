import React, { useEffect, useState } from "react";
import { Stack, Chip } from "@mui/material";
import {
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { DataTable } from "@/components/tables";
import { User } from "@/models";
import { useGetUsersQuery, useDeleteUserMutation } from "../services";
import buildQuery from "@/util/buildQuery";
import buildPage from "@/util/buildPage";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
  { field: "email", headerName: "Email", flex: 1, minWidth: 150 },
  {
    field: "groups",
    headerName: "Groups",
    flex: 1,
    minWidth: 150,
    renderCell: (params: GridRenderCellParams<any>) => {
      return (
        <Stack direction="row" spacing={1}>
          {params.row.farms &&
            params.row.farms.map((e: string, key: any) => (
              <Chip key={key} label={e} size="small" />
            ))}
        </Stack>
      );
    },
  },
];

const UsersList = () => {
  const selector = useSelector((state: RootState) => state.filter);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const { data, isLoading, refetch } = useGetUsersQuery(
    buildQuery({ ...buildPage(paginationModel), ...selector })
  );
  const [deleteUser, deleteResult] = useDeleteUserMutation();

  const handleDelete = async (id: number) =>
    await deleteUser(id).then(() => refetch());

  return (
    <DataTable
      onDelete={handleDelete}
      rows={(data?.results ?? []) as GridRowsProp<User>}
      columns={columns}
      rowCount={data?.count || 0}
      loading={isLoading}
      pageSizeOptions={[5, 10, 25, 50, 100]}
      paginationModel={paginationModel}
      paginationMode="server"
      onPaginationModelChange={setPaginationModel}
      setting={DataTable.SETTING_COL.basic}
    />
  );
};

export default UsersList;
