import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
  ListLayout,
  DashboardAction,
  PermanentlyDeleteAction,
  EditAction,
  HistoryAction,
  CreateButton,
  ExportModal,
  ImportButton,
} from "@/lib/crud";
import { nutrientGroupApi, URL } from "../services";
import { NutrientGroup } from "@/models";
import { Typography } from "@mui/material";
import Link from "next/link";

export const NutrientGroupList = () => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
  ];
  return (
    <ListLayout<NutrientGroup>
      title="NutrientGroup"
      columns={columns}
      actions={[EditAction, HistoryAction, PermanentlyDeleteAction]}
      getEndpoint={nutrientGroupApi.endpoints.getNutrientGroups}
      deleteEndpoint={nutrientGroupApi.endpoints.deleteNutrientGroup}
      filters={{}}
      menus={
        <>
          <CreateButton />
          <ExportModal
            url={URL}
            fields={{}}
            beforeSubmit={(values) => values}
          />
          <ImportButton url={URL} />
        </>
      }
    />
  );
};
