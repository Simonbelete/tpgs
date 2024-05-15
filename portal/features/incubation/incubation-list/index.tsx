import React, { useEffect, useState } from "react";
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
import { incubationApi, URL } from "../services";
import { Incubation } from "@/models";
import dayjs from "dayjs";
import { Typography } from "@mui/material";
import Link from "next/link";

export const IncubationList = () => {
  const columns: GridColDef[] = [
    {
      field: "hatchery",
      headerName: "Hatch",
      flex: 1,
      minWidth: 150,
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
      valueGetter: (value, row) =>
        row.created_at
          ? dayjs(row.date_time).format(process.env.NEXT_PUBLIC_DATETIME_FORMAT)
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
    <ListLayout<Incubation>
      title="Incubations"
      columns={columns}
      actions={[
        DashboardAction,
        EditAction,
        HistoryAction,
        PermanentlyDeleteAction,
      ]}
      getEndpoint={incubationApi.endpoints.getIncubations}
      deleteEndpoint={incubationApi.endpoints.deleteIncubation}
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
