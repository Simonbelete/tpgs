import React from "react";
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
import { hatcheryApi, URL } from "../services";
import { Hatchery } from "@/models";
import dayjs from "dayjs";
import { Typography } from "@mui/material";
import Link from "next/link";

export const HatcheryList = () => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "breed",
      headerName: "Breed",
      flex: 1,
      renderCell: (params: GridRenderCellParams<any>) => {
        if (params.row.breed == null) return <></>;
        return (
          <Typography color={"link.primary"} variant="body2">
            <Link href={`/breeds/${params.row.breed.id}`}>
              {params.row.breed.name}
            </Link>
          </Typography>
        );
      },
    },
    {
      field: "hatch_date",
      headerName: "Hatch Date",
      flex: 1,
      valueGetter: (params) =>
        params.row.hatch_date
          ? dayjs(params.row.hatch_date).format(
              process.env.NEXT_PUBLIC_DATE_FORMAT
            )
          : "",
    },
    {
      field: "incubation_moved_date",
      headerName: "Incubation Moved Date",
      flex: 1,
      valueGetter: (params) =>
        params.row.incubation_moved_date
          ? dayjs(params.row.incubation_moved_date).format(
              process.env.NEXT_PUBLIC_DATE_FORMAT
            )
          : "",
    },
  ];
  return (
    <ListLayout<Hatchery>
      title="Hatch"
      columns={columns}
      actions={[
        // DashboardAction,
        EditAction,
        HistoryAction,
        PermanentlyDeleteAction,
      ]}
      getEndpoint={hatcheryApi.endpoints.getHatchery}
      deleteEndpoint={hatcheryApi.endpoints.deleteHatchery}
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
