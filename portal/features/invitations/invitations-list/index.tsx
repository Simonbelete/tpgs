import React, { useEffect, useState } from "react";
import {
  GridRowsProp,
  GridColDef,
  GridToolbar,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { DataTable } from "@/components/tables";
import { Farm, Invitation } from "@/models";
import invitation_service from "../services/invitation_service";
import { Chip, Box, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Link from 'next/link';
import _ from "lodash";
import dayjs from 'dayjs'

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

const InvitationsList = () => {
  const [rows, setRows] = useState<GridRowsProp<Invitation>>([]);
  const [rowCount, setRowCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();

  const filter = useSelector((state: RootState) => state.invitationFilter)

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
     loadData().finally(() => {
      setIsLoading(false);
     })

     return () => {
      controller.abort()
    }
  }, [paginationModel, filter]);

  const loadData = async () => {
    // Build Filters
    let filterQuery: any = {}

    if(filter.invitationState.length !== 0) filterQuery['accepted__in'] = filter.invitationState.map((e: any) => e.value).join(',');

    // Page Builder
    const offset = paginationModel.page * paginationModel.pageSize;
    const pageQuery = {...{limit: paginationModel.pageSize, offset: offset}, ...(_.isEmpty(filterQuery) ? {}: {offset: null, limit: null})}
    const searchQuery = filter.search != "" ? {search: filter.search} : {}

    const response = await invitation_service.get({...pageQuery, ...filterQuery, ...searchQuery})
    if(response.status == 200) {
      setRows(response.data.results);
      setRowCount(response.data.count || 0);
    }
  }

  const refresh = () => {
    setPaginationModel({ page: 0, pageSize: 10 });
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await invitation_service.delete(id);
      if (response.status == 204) {
        enqueueSnackbar("Successfully Deleted!", { variant: "success" });
        // router.push("/invitation");
      } else enqueueSnackbar("Failed to Deleted!", { variant: "error" });
    } catch (ex) {
      enqueueSnackbar("Server Error!", { variant: "error" });
    } finally {
      refresh();
    }
  };

  return (
    <DataTable
      onDelete={handleDelete}
      rows={rows}
      columns={columns}
      rowCount={rowCount}
      loading={isLoading}
      pageSizeOptions={[5, 10, 25, 50, 100]}
      paginationModel={paginationModel}
      paginationMode="server"
      onPaginationModelChange={setPaginationModel}
      setting={DataTable.SETTING_COL.delete}
    />
  );
};

export default InvitationsList;
