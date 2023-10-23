import React, { useEffect, useState } from "react";
import {
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import Link from "next/link";
import { DataTable } from "@/components/tables";
import { Nutrient } from "@/models";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import _ from "lodash";
import dayjs from "dayjs";
import { useGetNutrientsQuery, useDeleteNutrientMutation } from "../services";
import buildQuery from "@/util/buildQuery";
import buildPage from "@/util/buildPage";

const columns: GridColDef[] = [
  { field: "code", headerName: "Code", flex: 1, minWidth: 100 },
  { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
  { field: "abbreviation", headerName: "Abbreviation", flex: 1, minWidth: 150 },
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
];

const NutrientList = () => {
  const selector = useSelector((state: RootState) => state.filter);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const { data, isLoading, refetch } = useGetNutrientsQuery(
    buildQuery({ ...buildPage(paginationModel), ...selector })
  );
  const [deleteNutrient, deleteResult] = useDeleteNutrientMutation();

  const handleDelete = async (id: number) =>
    await deleteNutrient(id).then(() => refetch());

  return (
    <DataTable
      onDelete={handleDelete}
      rows={(data?.results ?? []) as GridRowsProp<Nutrient>}
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

export default NutrientList;
