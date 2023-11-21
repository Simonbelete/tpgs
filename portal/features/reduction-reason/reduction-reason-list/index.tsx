import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
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
import { reductionReasonApi, URL } from "../services";
import { ReductionReason } from "@/models";

export const ReductionReasonList = () => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
  ];
  return (
    <ListLayout<ReductionReason>
      title="Reduction Reason"
      columns={columns}
      actions={[EditAction, HistoryAction, PermanentlyDeleteAction]}
      getEndpoint={reductionReasonApi.endpoints.getReductionReasons}
      deleteEndpoint={reductionReasonApi.endpoints.deleteReductionReason}
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
