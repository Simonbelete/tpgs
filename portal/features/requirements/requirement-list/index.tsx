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
  ExportModal,
} from "@/lib/crud";
import { requirementApi, URL } from "../services";
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
  ];

  const beforeExportSubmit = (values: any) => values;

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
