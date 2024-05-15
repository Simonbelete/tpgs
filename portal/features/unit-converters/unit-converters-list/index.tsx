import React, { useEffect, useState } from "react";
import { GridRowsProp, GridColDef, GridToolbar } from "@mui/x-data-grid";
import Link from "next/link";
import { useSnackbar } from "notistack";
import { DataTable } from "@/components/tables";
import { UnitConverter } from "@/models";
import unit_converter_service from "../services/unit_converter_service";

const columns: GridColDef[] = [
  {
    field: "unit_from",
    headerName: "Unit From",
    flex: 1,
    minWidth: 150,
    valueGetter: (value, row) => row.unit_to.name ?? "",
  },
  {
    field: "unit_to",
    headerName: "Unit To",
    flex: 1,
    minWidth: 150,
    valueGetter: (value, row) => row.unit_to.name ?? "",
  },
  { field: "factor", headerName: "Factor", flex: 1, minWidth: 150 },
];

const UnitConvertersList = () => {
  const [rows, setRows] = useState<GridRowsProp<UnitConverter>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    setIsLoading(true);
    try {
      unit_converter_service.get().then((response) => {
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
      const response = await unit_converter_service.delete(id);
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

export default UnitConvertersList;
