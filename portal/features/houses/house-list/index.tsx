import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import {
  ListLayout,
  PermanentlyDeleteAction,
  EditAction,
  HistoryAction,
  CreateButton,
  ExportButton,
  ImportButton,
  ExportModal,
} from "@/lib/crud";
import {
  houseApi,
  exportHousesCSV,
  exportHousesXLS,
  exportHousesXLSX,
  importHousesCSV,
  importHousesXLS,
  importHousesXLSX,
} from "../services";
import { House } from "@/models";

export const HouseList = () => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
  ];
  return (
    <ListLayout<House>
      title="House"
      columns={columns}
      actions={[EditAction, HistoryAction, PermanentlyDeleteAction]}
      getEndpoint={houseApi.endpoints.getHouses}
      deleteEndpoint={houseApi.endpoints.deleteHouse}
      filters={{}}
      menus={
        <>
          <CreateButton />
          <ExportModal
            url="/houses"
            fields={{
              house: {
                endpoint: houseApi.endpoints.getHouses,
                label: "House",
                md: 12,
              },
            }}
          />
          {/* <ExportButton
            exportCsv={exportHousesCSV}
            exportXls={exportHousesXLS}
            exportXlsx={exportHousesXLSX}
          /> */}
          <ImportButton
            importCsv={importHousesCSV}
            importXls={importHousesXLS}
            importXlsx={importHousesXLSX}
          />
        </>
      }
    />
  );
};
