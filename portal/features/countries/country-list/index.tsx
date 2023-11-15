import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import { ListLayout } from "@/lib/crud";
import { countryApi } from "../services";
import { Country } from "@/models";

export const CountryList = () => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
    { field: "code2", headerName: "Code 2", flex: 1, minWidth: 150 },
    { field: "code3", headerName: "Code 3", flex: 1, minWidth: 150 },
  ];
  return (
    <ListLayout<Country>
      title="Country"
      columns={columns}
      actions={[]}
      getEndpoint={countryApi.endpoints.getCountries}
    />
  );
};
