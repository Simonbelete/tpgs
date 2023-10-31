import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import {
  ListLayout,
  DashboardAction,
  PermanentlyDeleteAction,
  EditAction,
  HistoryAction,
  CreateButton,
  ExportButton,
  ImportButton,
} from "@/lib/crud";
import {
  reductionReasonApi,
  exportReductionReasonsCSV,
  exportReductionReasonsXLS,
  exportReductionReasonsXLSX,
  importReductionReasonsCSV,
  importReductionReasonsXLS,
  importReductionReasonsXLSX,
} from "../services";
import { ReductionReason } from "@/models";

export const ReductionReasonList = () => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
  ];
  return (
    <ListLayout<ReductionReason>
      baseUrl="/reduction-reason"
      title="Reduction Reason"
      columns={columns}
      actions={[EditAction, HistoryAction, PermanentlyDeleteAction]}
      getEndpoint={reductionReasonApi.endpoints.getReductionReasons}
      deleteEndpoint={reductionReasonApi.endpoints.deleteReductionReason}
      filters={{}}
      menus={
        <>
          <CreateButton baseUrl="/reduction-reasons" />
          <ExportButton
            exportCsv={exportReductionReasonsCSV}
            exportXls={exportReductionReasonsXLS}
            exportXlsx={exportReductionReasonsXLSX}
          />
          <ImportButton
            importCsv={importReductionReasonsCSV}
            importXls={importReductionReasonsXLS}
            importXlsx={importReductionReasonsXLSX}
          />
        </>
      }
    />
  );
};
