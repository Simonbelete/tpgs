import React, { useEffect, useState } from "react";
import {
  GridRowsProp,
  GridColDef,
} from "@mui/x-data-grid";
import { DataTable } from "@/components/tables";
import { Directory } from "@/models";
import _ from "lodash";
import dayjs from 'dayjs';
import { useGetDdrectoriesQuery } from "../services";
import buildQuery from "@/util/buildQuery";
import buildPage from "@/util/buildPage";

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
];

const DirectoryList = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const { data, isLoading, refetch } = useGetDdrectoriesQuery(buildQuery(buildPage(paginationModel))); 

  return (
    <DataTable
      rows={(data?.results ?? []) as GridRowsProp<Directory>}
      columns={columns}
      rowCount={data?.count || 0}
      loading={isLoading}
      pageSizeOptions={[5, 10, 25, 50, 100]}
      paginationModel={paginationModel}
      paginationMode="server"
      onPaginationModelChange={setPaginationModel}
    />
  );
};

export default DirectoryList;
