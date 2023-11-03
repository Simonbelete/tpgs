import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
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
  feedApi,
  exportFeedsCSV,
  exportFeedsXLS,
  exportFeedsXLSX,
  importFeedsCSV,
  importFeedsXLS,
  importFeedsXLSX,
} from "../services";
import { Feed } from "@/models";
import { Typography } from "@mui/material";
import Link from "next/link";
import { chickenApi } from "@/features/chickens/services";

export const BatchFeedList = () => {
  const columns: GridColDef[] = [
    {
      field: "chicken",
      headerName: "Chicken",
      flex: 1,
      renderCell: (params: GridRenderCellParams<any>) => {
        if (params.row.chicken == null) return <></>;
        return (
          <Typography color={"link.primary"} variant="body2">
            <Link href={`/chickens/${params.row.chicken.id}`}>
              {params.row.chicken.name}
            </Link>
          </Typography>
        );
      },
    },
    { field: "week", headerName: "Week", flex: 1, minWidth: 150 },
    {
      field: "weight",
      headerName: "Feed intake weight (g)",
      flex: 1,
      minWidth: 150,
    },
  ];
  return (
    <ListLayout<Feed>
      title="Batch Feed Intake"
      columns={columns}
      actions={[EditAction, HistoryAction, PermanentlyDeleteAction]}
      getEndpoint={feedApi.endpoints.getBatchFeeds}
      deleteEndpoint={feedApi.endpoints.deleteFeed}
      filters={{
        chicken: {
          label: "Chicken",
          dataDisplayKey: "name",
          endpoint: chickenApi.endpoints.getChickens,
        },
      }}
      menus={
        <>
          <CreateButton />
          <ExportButton
            exportCsv={exportFeedsCSV}
            exportXls={exportFeedsXLS}
            exportXlsx={exportFeedsXLSX}
          />
          <ImportButton
            importCsv={importFeedsCSV}
            importXls={importFeedsXLS}
            importXlsx={importFeedsXLSX}
          />
        </>
      }
    />
  );
};
