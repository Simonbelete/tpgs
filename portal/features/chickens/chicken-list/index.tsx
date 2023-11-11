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
  chickenApi,
  exportChickensCSV,
  exportChickensXLS,
  exportChickensXLSX,
  importChickensCSV,
  importChickensXLS,
  importChickensXLSX,
} from "../services";
import { Chicken } from "@/models";
import { Typography } from "@mui/material";
import Link from "next/link";
import dayjs from "dayjs";
import { breedApi } from "@/features/breeds/services";

export const ChickenList = () => {
  const columns: GridColDef[] = [
    { field: "tag", headerName: "Tag", flex: 1 },
    {
      field: "breed",
      headerName: "Breed",
      flex: 1,
      minWidth: 150,
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
      headerName: "Hatcher",
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
      }}
      menus={
        <>
          <CreateButton />
          <ExportButton
            exportCsv={exportChickensCSV}
            exportXls={exportChickensXLS}
            exportXlsx={exportChickensXLSX}
          />
          <ImportButton
            importCsv={importChickensCSV}
            importXls={importChickensXLS}
            importXlsx={importChickensXLSX}
          />
        </>
      }
    />
  );
};
