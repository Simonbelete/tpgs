import React, { useEffect, useState } from "react";
import {
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import Link from "next/link";
import { DataTable } from "@/components/tables";
import { ReductionReason } from "@/models";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import _ from "lodash";
import dayjs from "dayjs";
import {
  useGetReductionReasonsQuery,
  useDeleteReductionReasonMutation,
} from "../services";
import buildQuery from "@/util/buildQuery";
import buildPage from "@/util/buildPage";

const columns: GridColDef[] = [{ field: "name", headerName: "Name", flex: 1 }];

const ReductionReasonList = () => {
  const selector = useSelector((state: RootState) => state.filter);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const { data, isLoading, refetch } = useGetReductionReasonsQuery(
    buildQuery({ ...buildPage(paginationModel), ...selector })
  );
  const [deleteReductionReason, deleteResult] =
    useDeleteReductionReasonMutation();

  const handleDelete = async (id: number) =>
    await deleteReductionReason(id).then(() => refetch());

  return (
    <DataTable
      onDelete={handleDelete}
      rows={(data?.results ?? []) as GridRowsProp<ReductionReason>}
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

export default ReductionReasonList;
