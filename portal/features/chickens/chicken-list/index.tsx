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
import { chickenApi, URL } from "../services";
import { Chicken } from "@/models";
import { Typography, Button } from "@mui/material";
import Link from "next/link";
import dayjs from "dayjs";
import { breedApi } from "@/features/breeds/services";
import DownloadIcon from "@mui/icons-material/Download";
import { penApi } from "@/features/pen/services";
import { hatcheryApi } from "@/features/hatchery/services";

export const ChickenList = () => {
  const columns: GridColDef[] = [
    { field: "tag", headerName: "Tag", minWidth: 150 },
    {
      field: "breed",
      headerName: "Breed",
      flex: 1,
      renderCell: (params: GridRenderCellParams<any>) => {
        if (params.row.breed == null) return <></>;
        return (
          <Typography color={"link.primary"} variant="body2">
            <Link href={`/breeds/${params.row.breed.id}`}>
              {params.row.breed.display_name}
            </Link>
          </Typography>
        );
      },
    },
    {
      field: "pen",
      headerName: "Pen",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams<any>) => {
        if (params.row.pen == null) return <></>;
        return (
          <Typography color={"link.primary"} variant="body2">
            <Link href={`/pen/${params.row.pen.id}`}>
              {params.row.pen.display_name}
            </Link>
          </Typography>
        );
      },
    },
    { field: "sex", headerName: "Tag", flex: 1 },
    {
      field: "hatcher",
      headerName: "Hatch / Batch",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams<any>) => {
        if (params.row.hatchery == null) return <></>;
        return (
          <Typography color={"link.primary"} variant="body2">
            <Link href={`/hatchery/${params.row.hatchery.id}`}>
              {params.row.hatchery.display_name}
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
      field: "reduction_date",
      headerName: "Mortality",
      flex: 1,
      valueGetter: (params) =>
        params.row.reduction_date
          ? dayjs(params.row.reduction_date).format(
              process.env.NEXT_PUBLIC_DATE_FORMAT
            )
          : "",
    },
    {
      field: "created_at",
      headerName: "Create at",
      flex: 1,
      minWidth: 150,
      valueGetter: (params) =>
        params.row.created_at
          ? dayjs(params.row.created_at).format(
              process.env.NEXT_PUBLIC_DATE_FORMAT
            )
          : "",
    },
  ];
  return (
    <ListLayout<Chicken>
      title="Chicken"
      columns={columns}
      actions={[EditAction, HistoryAction, PermanentlyDeleteAction]}
      getEndpoint={chickenApi.endpoints.getChickens}
      deleteEndpoint={chickenApi.endpoints.deleteChicken}
      filters={{
        breed: {
          label: "Breed",
          endpoint: breedApi.endpoints.getBreeds,
          dataDisplayKey: "name",
        },
        pen: {
          label: "Pen",
          endpoint: penApi.endpoints.getPens,
          dataDisplayKey: "name",
        },
        hatchery: {
          label: "Hatch / Batch",
          endpoint: hatcheryApi.endpoints.getHatchery,
          dataDisplayKey: "name",
        },
      }}
      menus={
        <>
          <CreateButton />
          {/* 
          <Link href="/chickens/export">
            <Button
              startIcon={<DownloadIcon />}
              size="small"
              color="secondary"
              sx={{ textTransform: "none" }}
            >
              Export
            </Button>
          </Link>
          <ImportButton url={URL} /> */}
        </>
      }
    />
  );
};
