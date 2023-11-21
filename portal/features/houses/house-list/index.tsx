import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import {
  ListLayout,
  PermanentlyDeleteAction,
  EditAction,
  HistoryAction,
  CreateButton,
  ImportButton,
  ExportModal,
} from "@/lib/crud";
import { houseApi, URL } from "../services";
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
            url={URL}
            fields={{
              house: {
                endpoint: houseApi.endpoints.getHouses,
                label: "House",
                md: 12,
              },
            }}
          />
          <ImportButton url={URL} />
        </>
      }
    />
  );
};
