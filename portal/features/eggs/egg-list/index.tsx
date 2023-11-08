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
  eggApi,
  exportEggsCSV,
  exportEggsXLS,
  exportEggsXLSX,
  importEggsCSV,
  importEggsXLS,
  importEggsXLSX,
} from "../services";
import { Egg } from "@/models";
import { houseApi } from "@/features/houses/services";
import { Typography } from "@mui/material";
import Link from "next/link";
import { chickenApi } from "@/features/chickens/services";

export const EggList = () => {
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
    { field: "weight", headerName: "Egg Weight (g)", flex: 1, minWidth: 150 },
    { field: "eggs", headerName: "Total eggs", flex: 1, minWidth: 150 },
  ];
  return (
    <ListLayout<Egg>
      title="Egg"
      columns={columns}
      actions={[EditAction, HistoryAction, PermanentlyDeleteAction]}
      getEndpoint={eggApi.endpoints.getEggs}
      deleteEndpoint={eggApi.endpoints.deleteEgg}
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
            exportCsv={exportEggsCSV}
            exportXls={exportEggsXLS}
            exportXlsx={exportEggsXLSX}
          />
          <ImportButton
            importCsv={importEggsCSV}
            importXls={importEggsXLS}
            importXlsx={importEggsXLSX}
          />
        </>
      }
    />
  );
};
