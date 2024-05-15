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
import { breedApi } from "@/features/breeds/services";
import { stageApi } from "@/features/stage/services";

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
      field: "stage",
      headerName: "Stage",
      flex: 1,
      renderCell: (params: GridRenderCellParams<any>) => {
        if (params.row.stage == null) return <></>;
        return (
          <Typography color={"link.primary"} variant="body2">
            <Link href={`/stages/${params.row.stage.id}`}>
              {params.row.stage.name}
            </Link>
          </Typography>
        );
      },
    },
    {
      field: "hatch_date",
      headerName: "Hatch Date",
      flex: 1,
      valueGetter: (value, row) =>
        row.hatch_date
          ? dayjs(row.hatch_date).format(process.env.NEXT_PUBLIC_DATE_FORMAT)
          : "",
    },
    {
      field: "created_at",
      headerName: "Create at",
      flex: 1,
      minWidth: 150,
      valueGetter: (value, row) =>
        row.created_at
          ? dayjs(row.created_at).format(process.env.NEXT_PUBLIC_DATE_FORMAT)
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
      filters={{
        breed: {
          label: "Breed",
          endpoint: breedApi.endpoints.getBreeds,
          dataDisplayKey: "name",
        },
        stage: {
          label: "Stage",
          endpoint: stageApi.endpoints.getStages,
          dataDisplayKey: "name",
        },
      }}
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
