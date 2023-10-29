import React, { useEffect, useState } from "react";
import { GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { DataTable } from "@/components/tables";
import { City } from "@/models";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useGetCitiesQuery } from "../services";
import buildPage from "@/util/buildPage";
import formatNumber from "@/util/formatNumber";

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
  // { field: "country", headerName: "Country", flex: 1, minWidth: 150 },
  // { field: "region", headerName: "Region", flex: 1, minWidth: 150 },
  // { field: "subregion", headerName: "Subregion", flex: 1, minWidth: 150 },
  { field: "latitude", headerName: "Latitude", flex: 1, minWidth: 150 },
  { field: "longitude", headerName: "Longitude", flex: 1, minWidth: 150 },
  {
    field: "population",
    headerName: "population",
    flex: 1,
    minWidth: 150,
    valueGetter: (params) => formatNumber(params.row.population),
  },
  { field: "feature_code", headerName: "Feature Code", flex: 1, minWidth: 150 },
];

const CityList = () => {
  const selector = useSelector((state: RootState) => state.cityList);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const { data, isLoading, refetch } = useGetCitiesQuery({
    ...buildPage(paginationModel),
    q: selector.search,
  });

  return (
    <DataTable
      rows={(data?.results ?? []) as GridRowsProp<City>}
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

export default CityList;
