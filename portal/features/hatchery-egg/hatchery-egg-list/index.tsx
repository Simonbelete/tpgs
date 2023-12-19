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
import { hatcheryEggApi, URL } from "../services";
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
      field: "egg",
      headerName: "Egg",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams<any>) => {
        if (params.row.egg == null) return <></>;
        return (
          <Typography color={"link.primary"} variant="body2">
            <Link href={`/eggs/${params.row.egg.id}`}>
              {params.row.egg.display_name}
            </Link>
          </Typography>
        );
      },
    },
    {
      field: "no_eggs",
      headerName: "No of eggs",
      flex: 1,
    },
    {
      field: "canndle_date",
      headerName: "Canndle Date",
      flex: 1,
      valueGetter: (params) =>
        params.row.date_time
          ? dayjs(params.row.date_time).format(
              process.env.NEXT_PUBLIC_DATE_FORMAT
            )
          : "",
    },
    {
      field: "candled_eggs",
      headerName: "Candled Eggs",
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
      getEndpoint={hatcheryEggApi.endpoints.getHatcheryEggs}
      deleteEndpoint={hatcheryEggApi.endpoints.deleteHatcheryEgg}
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
