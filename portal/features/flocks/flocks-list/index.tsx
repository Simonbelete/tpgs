import React, { useEffect, useState } from "react";
import { Typography } from '@mui/material';
import Link from 'next/link';
import { GridRowsProp, GridColDef,   GridRenderCellParams,
} from "@mui/x-data-grid";
import { DataTable } from "@/components/tables";
import flock_service from "../services/flock_service";
import { Flock } from "@/models";
import { useSnackbar } from "notistack";
import { RenderProgress } from "@/components";
import dayjs from 'dayjs';

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
  { field: "hatch_date", 
    headerName: "Hatch Date", 
    flex: 1, minWidth: 150,
    valueGetter: (params) =>
      params.row.hatch_date ? dayjs(params.row.hatch_date).format(process.env.NEXT_PUBLIC_DATE_FORMAT) : "",
  },
  {
    field: "breed",
    headerName: "Breed",
    flex: 1,
    minWidth: 150,
    renderCell: (params: GridRenderCellParams<any>) => {
      if (params.row.inviter == null) return <></>;
      return (
        <Typography color={"link.primary"} variant="body2">
          <Link href={`/breeds/${params.row.inviter.id}`}>
            {params.row.inviter.name}
          </Link>
        </Typography>
      );
    },
  },
  { 
    field: "total_taged_chickens", 
    type: "number",
    headerName: "Tagged", width: 100,
    renderCell: (params: GridRenderCellParams<any>) => {
      return <RenderProgress value={50} />
    },
  },
  { field: "total_chickens", headerName: "Total Chickens", flex: 1, minWidth: 150 },
];

const FlockList = () => {
  const [rows, setRows] = useState<GridRowsProp<Flock>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    setIsLoading(true);
    try {
      flock_service.get().then((response) => {
        setRows(response.data.results);
      });
    } catch (ex) {
    } finally {
      setIsLoading(false);
    }
  }, [paginationModel]);

  const refresh = () => {
    setPaginationModel({ page: 0, pageSize: 10 });
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await flock_service.delete(id);
      if (response.status == 204)
        enqueueSnackbar("Successfully Deleted!", { variant: "success" });
      else enqueueSnackbar("Failed to Deleted!", { variant: "error" });
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
      rowCount={rows.length}
      loading={isLoading}
      pageSizeOptions={[5]}
      paginationModel={paginationModel}
      paginationMode="server"
      onPaginationModelChange={setPaginationModel}
    />
  );
};

export default FlockList;
