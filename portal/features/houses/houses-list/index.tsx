import React, { useEffect, useState } from "react";
import {
  GridRowsProp,
  GridColDef,
  GridToolbar,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { DataTable } from "@/components/tables";
import { House } from "@/models";
import house_service from "../services/house_service";
import { Chip, Box, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Link from 'next/link';
import _ from "lodash";
import dayjs from 'dayjs'

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
  { field: "created_at", 
    headerName: "Create at", flex: 1, minWidth: 150,
    valueGetter: (params) =>
      params.row.created_at ? dayjs(params.row.created_at).format(process.env.NEXT_PUBLIC_DATE_FORMAT) : "",
  },
];

const InvitationsList = () => {
  const [rows, setRows] = useState<GridRowsProp<House>>([]);
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

    // Page Builder
    const offset = paginationModel.page * paginationModel.pageSize;
    const pageQuery = {...{limit: paginationModel.pageSize, offset: offset}, ...(_.isEmpty(filterQuery) ? {}: {offset: null, limit: null})}
    const searchQuery = filter.search != "" ? {search: filter.search} : {}

    const response = await house_service.get({...pageQuery, ...filterQuery, ...searchQuery})
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
      const response = await house_service.delete(id);
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
      setting={DataTable.SETTING_COL.basic}
    />
  );
};

export default InvitationsList;
