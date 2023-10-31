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
  requirementApi,
  exportRequirementsCSV,
  exportRequirementsXLS,
  exportRequirementsXLSX,
  importRequirementsCSV,
  importRequirementsXLS,
  importRequirementsXLSX,
} from "../services";
import { Requirement } from "@/models";
import dayjs from "dayjs";

export const RequirementList = () => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
    { field: "weight", headerName: "Weight", flex: 1, minWidth: 150 },
    { field: "budget", headerName: "Price", flex: 1, minWidth: 150 },
    { field: "desired_ratio", headerName: "Ratio (%)", flex: 1, minWidth: 150 },
    {
      field: "desired_dm",
      headerName: "Dry Matter (%)",
      flex: 1,
      minWidth: 150,
    },
    { field: "nutrient_count", headerName: "Total nutrients" },
    // {
    //   field: "created_at",
    //   headerName: "Create at",
    //   flex: 1,
    //   minWidth: 150,
    //   valueGetter: (params) =>
    //     params.row.created_at
    //       ? dayjs(params.row.created_at).format(
    //           process.env.NEXT_PUBLIC_DATE_FORMAT
    //         )
    //       : "",
    // },
  ];
  return (
    <ListLayout<Requirement>
      title="Requirements"
      columns={columns}
      actions={[
        DashboardAction,
        EditAction,
        HistoryAction,
        PermanentlyDeleteAction,
      ]}
      getEndpoint={requirementApi.endpoints.getRequirements}
      deleteEndpoint={requirementApi.endpoints.deleteRequirement}
      filters={{}}
      menus={
        <>
          <CreateButton baseUrl="/requirements" />
          <ExportButton
            exportCsv={exportRequirementsCSV}
            exportXls={exportRequirementsXLS}
            exportXlsx={exportRequirementsXLSX}
          />
          <ImportButton
            importCsv={importRequirementsCSV}
            importXls={importRequirementsXLS}
            importXlsx={importRequirementsXLSX}
          />
        </>
      }
    />
  );
};
