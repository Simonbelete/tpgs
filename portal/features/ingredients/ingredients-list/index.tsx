import React, { useEffect, useState } from "react";
import { GridRowsProp, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { DataTable } from "@/components/tables";
import { Ingredient } from "@/models";
import ingredient_service from "../services/ingredient_service";

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
  { field: "code", headerName: "Code", flex: 1, minWidth: 150 },
  {
    field: "ingredient_type",
    headerName: "Ingredient Type",
    flex: 1,
    minWidth: 150,
    valueGetter: (params) =>
      params.row.ingredient_type ? params.row.ingredient_type.name : "",
  },
  { field: "description", headerName: "Description", flex: 1, minWidth: 150 },
  {
    field: "price",
    headerName: "Price",
    flex: 1,
    minWidth: 150,
    valueGetter: (params) => `${params.row.price} ${params.row.price_unit}`,
  },
];

const IngredientsList = () => {
  const [rows, setRows] = useState<GridRowsProp<Ingredient>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    setIsLoading(true);
    try {
      ingredient_service.get().then((response) => {
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
      const response = await ingredient_service.delete(id);
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

export default IngredientsList;
