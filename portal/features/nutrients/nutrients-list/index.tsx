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
import { nutrientApi, URL } from "../services";
import { Nutrient } from "@/models";
import { Typography } from "@mui/material";
import Link from "next/link";
import dayjs from "dayjs";

export const NutrientList = () => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
    {
      field: "abbreviation",
      headerName: "Abbreviation",
      flex: 1,
      minWidth: 150,
    },
    { field: "description", headerName: "Description", flex: 1, minWidth: 150 },
    {
      field: "nutrient_group",
      headerName: "Nutrient Group",
      flex: 1,
      minWidth: 150,
      valueGetter: (params) =>
        params.row.nutrient_group ? params.row.nutrient_group.name : "",
      renderCell: (params: GridRenderCellParams<any>) => {
        if (params.row.nutrient_group == null) return <></>;
        return (
          <Typography color={"link.primary"} variant="body2">
            <Link href={`/nutrient-groups/${params.row.nutrient_group.id}`}>
              {params.row.nutrient_group.name}
            </Link>
          </Typography>
        );
      },
    },
    {
      field: "unit",
      headerName: "Unit",
      flex: 1,
      minWidth: 150,
      valueGetter: (params) => (params.row.unit ? params.row.unit.name : ""),
      renderCell: (params: GridRenderCellParams<any>) => {
        if (params.row.unit == null) return <></>;
        return (
          <Typography color={"link.primary"} variant="body2">
            <Link href={`/units/${params.row.unit.id}`}>
              {params.row.unit.name}
            </Link>
          </Typography>
        );
      },
    },
    { field: "order", headerName: "Order", flex: 1, minWidth: 100 },
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
    <ListLayout<Nutrient>
      title="Nutrient"
      columns={columns}
      actions={[EditAction, HistoryAction, PermanentlyDeleteAction]}
      getEndpoint={nutrientApi.endpoints.getNutrients}
      deleteEndpoint={nutrientApi.endpoints.deleteNutrient}
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
