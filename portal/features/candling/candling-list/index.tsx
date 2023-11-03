import React, { useEffect, useState } from "react";
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
  candlingApi,
  exportHatcheryEggsCSV,
  exportHatcheryEggsXLS,
  exportHatcheryEggsXLSX,
  importHatcheryEggsCSV,
  importHatcheryEggsXLS,
  importHatcheryEggsXLSX,
} from "../services";
import { HatcheryEgg } from "@/models";
import dayjs from "dayjs";
import { Typography } from "@mui/material";
import Link from "next/link";

export const CandlingList = () => {
  const columns: GridColDef[] = [
    {
      field: "hatchery",
      headerName: "Hatchery",
      flex: 1,
      minWidth: 150,
      valueGetter: (params) =>
        params.row.nutrient_group ? params.row.nutrient_group.name : "",
      renderCell: (params: GridRenderCellParams<any>) => {
        if (params.row.hatchery == null) return <></>;
        return (
          <Typography color={"link.primary"} variant="body2">
            <Link href={`/nutrient-groups/${params.row.hatchery.id}`}>
              {params.row.hatchery.name}
            </Link>
          </Typography>
        );
      },
    },
    {
      field: "date_time",
      headerName: "Date",
      flex: 1,
      valueGetter: (params) =>
        params.row.created_at
          ? dayjs(params.row.date_time).format(
              process.env.NEXT_PUBLIC_DATETIME_FORMAT
            )
          : "",
    },
    {
      field: "temperature_celsius",
      headerName: "Temperature (°C)",
      flex: 1,
    },
    {
      field: "humidity_fahrenheit",
      headerName: "Humidity (°F)",
      flex: 1,
    },
    {
      field: "humidity_percent",
      headerName: "Humidity (%)",
      flex: 1,
    },
  ];
  return (
    <ListLayout<HatcheryEgg>
      title="HatcheryEggs"
      columns={columns}
      actions={[
        DashboardAction,
        EditAction,
        HistoryAction,
        PermanentlyDeleteAction,
      ]}
      getEndpoint={candlingApi.endpoints.getHatcheryEggs}
      deleteEndpoint={candlingApi.endpoints.deleteHatcheryEgg}
      filters={{}}
      menus={
        <>
          <CreateButton />
          <ExportButton
            exportCsv={exportHatcheryEggsCSV}
            exportXls={exportHatcheryEggsXLS}
            exportXlsx={exportHatcheryEggsXLSX}
          />
          <ImportButton
            importCsv={importHatcheryEggsCSV}
            importXls={importHatcheryEggsXLS}
            importXlsx={importHatcheryEggsXLSX}
          />
        </>
      }
    />
  );
};
