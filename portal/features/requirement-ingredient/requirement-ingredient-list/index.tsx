import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
  ListLayout,
  PermanentlyDeleteAction,
  EditAction,
  HistoryAction,
  CreateButton,
  ExportModal,
  ImportButton,
} from "@/lib/crud";
import { requirementIngredientApi, URL } from "../services";
import { RequirementIngredient } from "@/models";
import { Typography } from "@mui/material";
import Link from "next/link";
import dayjs from "dayjs";

export const RequirementIngredientList = () => {
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
      field: "ingredient",
      headerName: "Ingredient",
      flex: 1,
      renderCell: (params: GridRenderCellParams<any>) => {
        if (params.row.ingredient == null) return <></>;
        return (
          <Typography color={"link.primary"} variant="body2">
            <Link href={`/ingredients/${params.row.ingredient.id}`}>
              {params.row.ingredient.abbreviation}
            </Link>
          </Typography>
        );
      },
    },
    { field: "min", headerName: "Min", flex: 1 },
    { field: "max", headerName: "Max", flex: 1 },
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
    <ListLayout<RequirementIngredient>
      title="Requirement Min & Max"
      columns={columns}
      actions={[EditAction, HistoryAction, PermanentlyDeleteAction]}
      getEndpoint={requirementIngredientApi.endpoints.getRequirementIngredients}
      deleteEndpoint={
        requirementIngredientApi.endpoints.deleteRequirementIngredient
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
