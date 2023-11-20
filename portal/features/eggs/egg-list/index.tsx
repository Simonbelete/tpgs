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
  ExportModal,
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
import _ from "lodash";
import { hatcheryApi } from "@/features/hatchery/services";
import { penApi } from "@/features/pen/services";

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

  const beforeExportSubmit = (values: any) => {
    return {
      chicken: _.get(values, "chicken.id", null),
      chicken__hatchery: _.get(values, "hatchery.id", null),
      chicken__pen: _.get(values, "pen.id", null),
      chicken__pen__house: _.get(values, "house.id", null),
    };
  };

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
          <ExportModal
            url="/eggs"
            fields={{
              chicken: {
                endpoint: chickenApi.endpoints.getChickens,
                label: "Chicken",
                md: 12,
                dataKey: "display_name",
              },
              hatchery: {
                endpoint: hatcheryApi.endpoints.getHatchery,
                label: "hatchery",
                md: 12,
                dataKey: "display_name",
              },
              house: {
                endpoint: houseApi.endpoints.getHouses,
                label: "House",
                md: 12,
                dataKey: "display_name",
              },
              pen: {
                endpoint: penApi.endpoints.getPens,
                label: "Pen",
                md: 12,
                dataKey: "display_name",
              },
            }}
            beforeSubmit={beforeExportSubmit}
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
