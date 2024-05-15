import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Link from "next/link";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Chicken } from "@/models";
import { ToolbarList, EditAction, BasicToolbar } from "@/lib/crud";
import { chickenApi } from "../services";
import dayjs from "dayjs";

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
    valueGetter: (value, row) =>
      row.reduction_date
        ? dayjs(row.reduction_date).format(process.env.NEXT_PUBLIC_DATE_FORMAT)
        : "",
  },
];

const SiblingsList = ({ data }: { data: Chicken }) => {
  return (
    <ToolbarList<Chicken>
      getQuery={{ id: data?.id, query: {} }}
      actions={[EditAction]}
      toolbar={BasicToolbar}
      columns={columns}
      getEndpoint={chickenApi.endpoints.getChickenSiblings}
    />
  );
};

export default SiblingsList;
