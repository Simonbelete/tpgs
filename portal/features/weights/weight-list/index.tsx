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
  weightApi,
  exportWeightsCSV,
  exportWeightsXLS,
  exportWeightsXLSX,
  importWeightsCSV,
  importWeightsXLS,
  importWeightsXLSX,
} from "../services";
import { Weight } from "@/models";
import { chickenApi } from "@/features/chickens/services";
import { Typography } from "@mui/material";
import Link from "next/link";

export const WeightList = () => {
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
              {params.row.chicken.display_name}
            </Link>
          </Typography>
        );
      },
    },
    { field: "week", headerName: "Week", flex: 1, minWidth: 150 },
    { field: "weight", headerName: "Weight (g)", flex: 1, minWidth: 150 },
  ];
  return (
    <ListLayout<Weight>
      title="Weight"
      columns={columns}
      actions={[EditAction, HistoryAction, PermanentlyDeleteAction]}
      getEndpoint={weightApi.endpoints.getWeights}
      deleteEndpoint={weightApi.endpoints.deleteWeight}
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
            exportCsv={exportWeightsCSV}
            exportXls={exportWeightsXLS}
            exportXlsx={exportWeightsXLSX}
          />
          <ImportButton
            importCsv={importWeightsCSV}
            importXls={importWeightsXLS}
            importXlsx={importWeightsXLSX}
          />
        </>
      }
    />
  );
};
