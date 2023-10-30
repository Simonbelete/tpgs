import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { ListLayout } from "@/lib/crud";
import {
  cityApi,
  exportCitiesCSV,
  exportCitiesXLS,
  exportCitiesXLSX,
  importCitiesCSV,
  importCitiesXLS,
  importCitiesXLSX,
} from "../services";
import { City } from "@/models";

export const CityList = () => {
  const columns: GridColDef[] = [
    { field: "display_name", headerName: "Name", flex: 1 },
  ];
  return (
    <ListLayout<City>
      baseUrl="/cities"
      title="City"
      columns={columns}
      actions={[]}
      getEndpoint={cityApi.endpoints.getCities}
      filters={{}}
      exportCsv={exportCitiesCSV}
      exportXls={exportCitiesXLS}
      exportXlsx={exportCitiesXLSX}
      importCsv={importCitiesCSV}
      importXls={importCitiesXLS}
      importXlsx={importCitiesXLSX}
      getRowId={(row: any) => row.geoname_id}
    />
  );
};
