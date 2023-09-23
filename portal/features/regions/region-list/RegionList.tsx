import React, { useEffect, useState } from "react";
import {
  GridRowsProp,
  GridColDef,
} from "@mui/x-data-grid";
import { DataTable } from "@/components/tables";
import { Breed } from "@/models";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useGetRegionsQuery } from "../services";
import buildPage from "@/util/buildPage";

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
  { field: "alternate_names", headerName: "Alternate Names", flex: 1, minWidth: 150 },
  { field: "geoname_code", headerName: "Geoname Code", flex: 1, minWidth: 150 },
];

const RegionList = () => {
  const selector = useSelector((state: RootState) => state.regionList);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const { data, isLoading, refetch } = useGetRegionsQuery({...buildPage(paginationModel), q: selector.search}); 

  return (
    <DataTable
      rows={(data?.results ?? []) as GridRowsProp<Breed>}
      columns={columns}
      rowCount={data?.count || 0}
      loading={isLoading}
      pageSizeOptions={[5, 10, 25, 50, 100]}
      paginationModel={paginationModel}
      paginationMode="server"
      onPaginationModelChange={setPaginationModel}
      getRowId={(row: any) => row.geoname_id}
    />
  );
};

export default RegionList;
