import React, { useEffect, useState } from "react";
import {
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import Link from "next/link";
import { DataTable } from "@/components/tables";
import { Chicken } from "@/models";
import _ from "lodash";
import dayjs from "dayjs";
import { useGetChickenSiblingsQuery } from "../services";
import buildQuery from "@/util/buildQuery";

const columns: GridColDef[] = [
  { field: "tag", headerName: "Tag", flex: 1 },
  { field: "sex", headerName: "Tag", flex: 1 },
  {
    field: "house",
    headerName: "House",
    flex: 1,
    renderCell: (params: GridRenderCellParams<any>) => {
      if (params.row.house == null) return <></>;
      return (
        <Typography color={"link.primary"} variant="body2">
          <Link href={`/houses/${params.row.house.id}`}>
            {params.row.house.name}
          </Link>
        </Typography>
      );
    },
  },
  { field: "pen", headerName: "Pen", flex: 1 },
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

const SiblingsList = ({ id }: { id: number }) => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const { data, isLoading, refetch } = useGetChickenSiblingsQuery({
    id: id,
    query: buildQuery({ ...paginationModel }),
  });

  return (
    <DataTable
      rows={(data?.results ?? []) as GridRowsProp<Chicken>}
      columns={columns}
      rowCount={data?.count || 0}
      loading={isLoading}
      pageSizeOptions={[5, 10, 25, 50, 100]}
      paginationModel={paginationModel}
      paginationMode="server"
      onPaginationModelChange={setPaginationModel}
      setting={DataTable.SETTING_COL.edit}
    />
  );
};

export default SiblingsList;
