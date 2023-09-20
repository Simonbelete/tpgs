import React, { useEffect, useState } from "react";
import {
  GridRowsProp,
  GridColDef,
} from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { DataTable } from "@/components/tables";
import { House } from "@/models";
import house_service from "../services/house_service";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import _ from "lodash";
import dayjs from 'dayjs';
import { useGetHousesQuery } from "../services";

const buildQuery = (data: any): Object => {
  let result: any = {}
  for(const key in data) {
    if(data[key].isArray) {
      result[`${key}__in`] = data[key].map((e: any) => e.id).join(',')
    }else {
      result[key] = data[key]
    }
  }
  return result;
}

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
  { field: "created_at", 
    headerName: "Create at", flex: 1, minWidth: 150,
    valueGetter: (params) =>
      params.row.created_at ? dayjs(params.row.created_at).format(process.env.NEXT_PUBLIC_DATE_FORMAT) : "",
  },
];

const HouseList = () => {
  const selector = useSelector((state: RootState) => state.houseList);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const { data, isLoading } = useGetHousesQuery(buildQuery({...paginationModel, ...selector})); 

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();

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
      rows={(data?.results ?? []) as GridRowsProp<House>}
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

export default HouseList;
