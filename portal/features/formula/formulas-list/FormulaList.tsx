import React, { useEffect, useState } from "react";
import {
  GridRowsProp,
  GridColDef,
} from "@mui/x-data-grid";
import { DataTable } from "@/components/tables";
import { Formula } from "@/models";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import _ from "lodash";
import dayjs from 'dayjs';
import { useGetFormulasQuery, useDeleteFormulaMutation } from "../services";
import buildQuery from "@/util/buildQuery";
import buildPage from "@/util/buildPage";

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
  { field: "created_at", 
    headerName: "Create at", flex: 1, minWidth: 150,
    valueGetter: (params) =>
      params.row.created_at ? dayjs(params.row.created_at).format(process.env.NEXT_PUBLIC_DATE_FORMAT) : "",
  },
];

const FormulaList = () => {
  const selector = useSelector((state: RootState) => state.filter);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const { data, isLoading, refetch } = useGetFormulasQuery(buildQuery({...buildPage(paginationModel), ...selector})); 
  const [deleteFormula, deleteResult ] = useDeleteFormulaMutation();

  const handleDelete = async (id: number) => await deleteFormula(id).then(() => refetch())

  return (
    <DataTable
      onDelete={handleDelete}
      rows={(data?.results ?? []) as GridRowsProp<Formula>}
      columns={columns}
      rowCount={data?.count || 0}
      loading={isLoading}
      pageSizeOptions={[5, 10, 25, 50, 100]}
      paginationModel={paginationModel}
      paginationMode="server"
      onPaginationModelChange={setPaginationModel}
      setting={DataTable.SETTING_COL.dashboard}
    />
  );
};

export default FormulaList;