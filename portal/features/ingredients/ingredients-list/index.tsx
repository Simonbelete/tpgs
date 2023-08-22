import React, { useEffect, useState } from "react";
import { GridRowsProp, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { DataTable } from "@/components/tables";
import { Ingredient } from "@/models";
import { useSelector, useDispatch } from "react-redux";
import ingredient_service from "../services/ingredient_service";
import { RootState } from "@/store";
import _ from "lodash";

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
  const [rowCount, setRowCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 10,
  });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const ingredientFilter = useSelector((state: RootState) => state.ingredientFilter);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
     loadData().finally(() => {
      setLoading(false);
     })

     return () => {
      controller.abort()
    }
  }, [paginationModel, ingredientFilter]);

  const loadData = async () => {
    // Build Filters
    let filterQuery: any = {}

    // Page Builder
    const pageQuery = {...{page: paginationModel.page + 1, limit: paginationModel.pageSize}, ...(_.isEmpty(filterQuery) ? {}: {page: 0})}
    const searchQuery = ingredientFilter.search != "" ? {search: ingredientFilter.search} : {}

    const response = await ingredient_service.get({...pageQuery, ...filterQuery, ...searchQuery})
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
      rowCount={rowCount}
      loading={loading}
      pageSizeOptions={[5, 10, 25, 50, 100]}
      paginationModel={paginationModel}
      paginationMode="server"
      onPaginationModelChange={setPaginationModel}
    />
  );
};

export default IngredientsList;
