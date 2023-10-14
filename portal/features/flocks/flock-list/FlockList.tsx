import React, { useEffect, useState } from "react";
import {
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { DataTable } from "@/components/tables";
import { Flock } from "@/models";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import _ from "lodash";
import dayjs from "dayjs";
import { useGetFlocksQuery, useDeleteFlockMutation } from "../services";
import buildQuery from "@/util/buildQuery";
import buildPage from "@/util/buildPage";
import { ProgressBar } from "@/components";

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
  {
    field: "total_chickens",
    headerName: "Total Chickens",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "total_taged_chickens",
    headerName: "Taged Chickens",
    flex: 1,
    renderCell: (params: GridRenderCellParams<any>) => {
      if (params.row.house == null) return <></>;
      return (
        <ProgressBar
          variant="determinate"
          value={
            ((params.row.total_chickens - params.row.total_taged_chickens) /
              params.row.total_taged_chickens) *
            100
          }
        />
      );
    },
  },
];

const FlockList = () => {
  const selector = useSelector((state: RootState) => state.filter);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const { data, isLoading, refetch } = useGetFlocksQuery(
    buildQuery({ ...buildPage(paginationModel), ...selector })
  );
  const [deleteFlock, deleteResult] = useDeleteFlockMutation();

  const handleDelete = async (id: number) =>
    await deleteFlock(id).then(() => refetch());

  return (
    <DataTable
      onDelete={handleDelete}
      rows={(data?.results ?? []) as GridRowsProp<Flock>}
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

export default FlockList;
