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
import { stageApi, URL } from "../services";
import { Stage } from "@/models";
import { houseApi } from "@/features/houses/services";
import { Typography } from "@mui/material";
import Link from "next/link";

export const StageList = () => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "order", headerName: "Order", flex: 1 },
    { field: "min_week", headerName: "Min Week", flex: 1 },
    { field: "max_week", headerName: "Max Week", flex: 1 },
  ];
  return (
    <ListLayout<Stage>
      title="Stage"
      columns={columns}
      actions={[EditAction, HistoryAction, PermanentlyDeleteAction]}
      getEndpoint={stageApi.endpoints.getStages}
      deleteEndpoint={stageApi.endpoints.deleteStage}
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
