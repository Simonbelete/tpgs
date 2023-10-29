import React, { useEffect, useState } from "react";
import { GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { DataTable } from "@/components/tables";
import { Country } from "@/models";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import _ from "lodash";
import dayjs from "dayjs";
import { useGetCountriesQuery } from "../services";
import buildQuery from "@/util/buildQuery";
import buildPage from "@/util/buildPage";

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
  { field: "code2", headerName: "Code 2", flex: 1, minWidth: 150 },
  { field: "code3", headerName: "Code 3", flex: 1, minWidth: 150 },
  {
    field: "alternate_names",
    headerName: "Alternate Names",
    flex: 1,
    minWidth: 150,
  },
  { field: "continent", headerName: "Continent", flex: 1, minWidth: 150 },
  { field: "phone", headerName: "Phone", flex: 1, minWidth: 150 },
];

const CountryList = () => {
  const selector = useSelector((state: RootState) => state.countryList);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const { data, isLoading, refetch } = useGetCountriesQuery({
    ...buildPage(paginationModel),
    q: selector.search,
  });

  return (
    <DataTable
      rows={(data?.results ?? []) as GridRowsProp<Country>}
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

export default CountryList;
