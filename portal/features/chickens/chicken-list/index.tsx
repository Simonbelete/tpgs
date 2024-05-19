import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
  ListLayout,
  DashboardAction,
  PermanentlyDeleteAction,
  EditAction,
  HistoryAction,
  CreateButton,
} from "@/lib/crud";
import { chickenApi, URL } from "../services";
import { Chicken } from "@/models";
import { Typography, Button } from "@mui/material";
import Link from "next/link";
import dayjs from "dayjs";
import { breedApi } from "@/features/breeds/services";
import { penApi } from "@/features/pen/services";
import { hatcheryApi } from "@/features/hatchery/services";
import { houseApi } from "@/features/houses/services";
import { reductionReasonApi } from "@/features/reduction-reason/services";
import { userApi } from "@/features/users/services";

export const ChickenList = () => {
  const columns: GridColDef[] = [
    { field: "tag", headerName: "Tag" },
    { field: "sex", headerName: "Sex" },
    { field: "generation", headerName: "Generation" },
    {
      field: "hatcher",
      headerName: "Batch",
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
      field: "breed",
      headerName: "Breed",
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
      field: "house",
      headerName: "House",
      renderCell: (params: GridRenderCellParams<any>) => {
        if (params.row.house == null) return <></>;
        return (
          <Typography color={"link.primary"} variant="body2">
            <Link href={`/houses/${params.row.house.id}`}>
              {params.row.house.display_name}
            </Link>
          </Typography>
        );
      },
    },
    {
      field: "pen",
      headerName: "Pen",
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
    {
      field: "hatch_date",
      headerName: "Hatch Date",
      valueGetter: (value, row) =>
        row.hatch_date
          ? dayjs(row.hatch_date).format(process.env.NEXT_PUBLIC_DATE_FORMAT)
          : "",
    },
    { field: "color", headerName: "color" },
    {
      field: "reduction_reason",
      headerName: "Reduction reason",
      renderCell: (params: GridRenderCellParams<any>) => {
        if (params.row.reduction_reason == null) return <></>;
        return (
          <Typography color={"link.primary"} variant="body2">
            <Link href={`/reduction-reasons/${params.row.reduction_reason.id}`}>
              {params.row.reduction_reason.display_name}
            </Link>
          </Typography>
        );
      },
    },
    {
      field: "reduction_date",
      headerName: "Mortality",
      valueGetter: (value, row) =>
        row.reduction_date
          ? dayjs(row.reduction_date).format(
              process.env.NEXT_PUBLIC_DATE_FORMAT
            )
          : "",
    },
    {
      field: "created_at",
      headerName: "Create at",
      valueGetter: (value, row) =>
        row.created_at
          ? dayjs(row.created_at).format(process.env.NEXT_PUBLIC_DATE_FORMAT)
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
        sex: {
          label: "Sex",
          dataDisplayKey: "name",
          dataValueKey: "value",
          options: [
            { value: "M", name: "Male" },
            { value: "F", name: "Female" },
          ],
        },
        generation: {
          label: "Generation",
          dataDisplayKey: "generation",
          endpoint: chickenApi.endpoints.getGenerations,
        },
        house: {
          label: "House",
          dataDisplayKey: "display_name",
          endpoint: houseApi.endpoints.getHouses,
        },
        color: {
          label: "Color",
          dataDisplayKey: "color",
          endpoint: chickenApi.endpoints.getColors,
        },
        hatch_date: {
          label: "Hatch date",
          dataDisplayKey: "hatch_date",
          endpoint: chickenApi.endpoints.getHatchDates,
        },
        reduction_reason: {
          label: "Reduction reason",
          dataDisplayKey: "display_name",
          endpoint: reductionReasonApi.endpoints.getReductionReasons,
        },
        reduction_date: {
          label: "Reduction date",
          dataDisplayKey: "reduction_date",
          endpoint: chickenApi.endpoints.getReductionDates,
        },
        sire: {
          label: "Sire",
          dataDisplayKey: "display_name",
          endpoint: chickenApi.endpoints.getMaleChickens,
        },
        dam: {
          label: "Dam",
          dataDisplayKey: "display_name",
          endpoint: chickenApi.endpoints.getFeMaleChickens,
        },
        created_by: {
          label: "Created By",
          dataDisplayKey: "display_name",
          endpoint: userApi.endpoints.getUsers,
        },
      }}
      menus={
        <>
          <CreateButton />
        </>
      }
    />
  );
};
