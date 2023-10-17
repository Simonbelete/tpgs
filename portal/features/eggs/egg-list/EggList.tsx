import React, { useEffect, useState } from "react";
import {
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { DataTable } from "@/components/tables";
import { Typography } from "@mui/material";
import Link from "next/link";
import { Egg } from "@/models";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import _ from "lodash";
import dayjs from "dayjs";
import { useGetEggsQuery, useDeleteEggMutation } from "../services";
import buildQuery from "@/util/buildQuery";
import buildPage from "@/util/buildPage";

const columns: GridColDef[] = [
  {
    field: "chicken",
    headerName: "Chicken",
    flex: 1,
    renderCell: (params: GridRenderCellParams<any>) => {
      if (params.row.chicken == null) return <></>;
      return (
        <Typography color={"link.primary"} variant="body2">
          <Link href={`/chickens/${params.row.chicken.id}`}>
            {params.row.chicken.name}
          </Link>
        </Typography>
      );
    },
  },
  {
    field: "flock",
    headerName: "Flock",
    flex: 1,
    renderCell: (params: GridRenderCellParams<any>) => {
      if (params.row.flock == null) return <></>;
      return (
        <Typography color={"link.primary"} variant="body2">
          <Link href={`/flocks/${params.row.flock.id}`}>
            {params.row.flock.name}
          </Link>
        </Typography>
      );
    },
  },
  { field: "week", headerName: "Week", flex: 1, minWidth: 150 },
  { field: "eggs", headerName: "No of Eggs", flex: 1, minWidth: 150 },
  { field: "weight", headerName: "Weight [g]", flex: 1, minWidth: 150 },
];

const EggList = () => {
  const selector = useSelector((state: RootState) => state.filter);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const { data, isLoading, refetch } = useGetEggsQuery(
    buildQuery({
      ...buildPage(paginationModel),
      ...selector,
    })
  );
  const [deleteEgg, deleteResult] = useDeleteEggMutation();

  const handleDelete = async (id: number) =>
    await deleteEgg(id).then(() => refetch());

  return (
    <DataTable
      onDelete={handleDelete}
      rows={(data?.results ?? []) as GridRowsProp<Egg>}
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

export default EggList;
