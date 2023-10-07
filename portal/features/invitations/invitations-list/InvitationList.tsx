import React, { useEffect, useState } from "react";
import {
  GridRowsProp,
  GridColDef,
  GridRenderCellParams
} from "@mui/x-data-grid";
import { Chip, Typography, Stack } from "@mui/material";
import Link from "next/link";
import { DataTable } from "@/components/tables";
import { Invitation } from "@/models";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import _ from "lodash";
import dayjs from 'dayjs';
import { useGetInvitationsQuery, useDeleteInvitationMutation } from "../services";
import buildQuery from "@/util/buildQuery";
import buildPage from "@/util/buildPage";

const columns: GridColDef[] = [
  {
    field: "inviter",
    headerName: "Invited By",
    flex: 1,
    minWidth: 150,
    renderCell: (params: GridRenderCellParams<any>) => {
      if (params.row.inviter == null) return <></>;
      return (
        <Typography color={"link.primary"} variant="body2">
          <Link href={`/users/${params.row.inviter.id}`}>
            {params.row.inviter.name}
          </Link>
        </Typography>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
    minWidth: 150,
  },
  { 
    field: "sent_date", 
    headerName: "Invitation date", 
    flex: 1, minWidth: 150,
    valueGetter: (params) =>
      params.row.sent_date ? dayjs(params.row.sent_date).format(process.env.NEXT_PUBLIC_DATE_FORMAT) : "",
  },
  { 
    field: "expire_date", 
    headerName: "Expire Date", 
    flex: 1, minWidth: 150,
    valueGetter: (params) =>
      params.row.expire_date ? dayjs(params.row.expire_date).format(process.env.NEXT_PUBLIC_DATE_FORMAT) : "",
  },
  {
    field: "farms",
    headerName: "Farms",
    flex: 1,
    minWidth: 150,
    renderCell: (params: GridRenderCellParams<any>) => {
      return (
        <Stack direction="row" spacing={1}>
          {params.row.farms &&
            params.row.farms.map((e: string, key: any) => (
              <Chip key={key} label={e} size="small" />
            ))}
        </Stack>
      );
    },
  },
  {
    field: "accepted",
    headerName: "Accepted",
    flex: 1,
    minWidth: 150,
    renderCell: (params: GridRenderCellParams<any>) => {
      if (params.row.accepted) {
        <Chip label="Accepted" color="success" size="small" />;
      }
      if (params.row.accepted == false) {
        <Chip label="Not Accepted" color="error" size="small" />;
      }
      return (
        <Chip label="Pending" color="warning" variant="outlined" size="small" />
      );
    },
  },
];

const InvitationList = () => {
  const selector = useSelector((state: RootState) => state.filter);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const { data, isLoading, refetch } = useGetInvitationsQuery(buildQuery({...buildPage(paginationModel), ...selector})); 
  const [deleteHouse, deleteResult ] = useDeleteInvitationMutation();

  const handleDelete = async (id: number) => await deleteHouse(id).then(() => refetch())

  return (
    <DataTable
      onDelete={handleDelete}
      rows={(data?.results ?? []) as GridRowsProp<Invitation>}
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

export default InvitationList;
