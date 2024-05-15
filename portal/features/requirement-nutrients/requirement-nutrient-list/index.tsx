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
import { requirementNutrientApi, URL } from "../services";
import { RequirementNutrient } from "@/models";
import { Typography } from "@mui/material";
import Link from "next/link";
import dayjs from "dayjs";

export const RequirementNutrientList = () => {
  const columns: GridColDef[] = [
    {
      field: "requirement",
      headerName: "Requirement",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams<any>) => {
        if (params.row.requirement == null) return <></>;
        return (
          <Typography color={"link.primary"} variant="body2">
            <Link href={`/requirements/${params.row.requirement.id}`}>
              {params.row.requirement.name}
            </Link>
          </Typography>
        );
      },
    },
    {
      field: "nutrient",
      headerName: "Nutrient",
      flex: 1,
      renderCell: (params: GridRenderCellParams<any>) => {
        if (params.row.nutrient == null) return <></>;
        return (
          <Typography color={"link.primary"} variant="body2">
            <Link href={`/nutrients/${params.row.nutrient.id}`}>
              {params.row.nutrient.abbreviation}
            </Link>
          </Typography>
        );
      },
    },
    { field: "value", headerName: "Value", flex: 1 },
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
    <ListLayout<RequirementNutrient>
      title="Requirement Composition"
      columns={columns}
      actions={[EditAction, HistoryAction, PermanentlyDeleteAction]}
      getEndpoint={requirementNutrientApi.endpoints.getRequirementNutrients}
      deleteEndpoint={
        requirementNutrientApi.endpoints.deleteRequirementNutrient
      }
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
