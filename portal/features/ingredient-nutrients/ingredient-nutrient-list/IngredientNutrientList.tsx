import React, { useEffect, useState } from "react";
import {
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import Link from "next/link";
import { DataTable } from "@/components/tables";
import { IngredientNutrient } from "@/models";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import _ from "lodash";
import dayjs from "dayjs";
import {
  useGetIngredientNutrientsQuery,
  useDeleteIngredientNutrientMutation,
} from "../services";
import buildQuery from "@/util/buildQuery";
import buildPage from "@/util/buildPage";

const columns: GridColDef[] = [
  {
    field: "ingredient",
    headerName: "Ingredient",
    flex: 1,
    renderCell: (params: GridRenderCellParams<any>) => {
      if (params.row.ingredient == null) return <></>;
      return (
        <Typography color={"link.primary"} variant="body2">
          <Link href={`/ingredients/${params.row.ingredient.id}`}>
            {params.row.ingredient.name}
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
          <Link href={`/ingredients/${params.row.nutrient.id}`}>
            {params.row.nutrient.name}
          </Link>
        </Typography>
      );
    },
  },
  { field: "value", headerName: "Value", flex: 1 },
];

const IngredientNutrientList = () => {
  const selector = useSelector((state: RootState) => state.filter);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const { data, isLoading, refetch } = useGetIngredientNutrientsQuery(
    buildQuery({ ...buildPage(paginationModel), ...selector })
  );
  const [deleteIngredientNutrient, deleteResult] =
    useDeleteIngredientNutrientMutation();

  const handleDelete = async (id: number) =>
    await deleteIngredientNutrient(id).then(() => refetch());

  return (
    <DataTable
      onDelete={handleDelete}
      rows={(data?.results ?? []) as GridRowsProp<IngredientNutrient>}
      columns={columns}
      rowCount={data?.count || 0}
      loading={isLoading}
      pageSizeOptions={[5, 10, 25, 50, 100]}
      paginationModel={paginationModel}
      paginationMode="server"
      onPaginationModelChange={setPaginationModel}
      setting={DataTable.SETTING_COL.basic}
    />
  );
};

export default IngredientNutrientList;
