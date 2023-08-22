import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridToolbar,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { Card, Chip, Typography } from "@mui/material";
import { DataTable } from "@/components/tables";
import nutrient_service from "../services/nutrient_service";
import { Nutrient } from "@/models";
import { useSnackbar } from "notistack";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import _ from "lodash";



const columns: GridColDef[] = [
  { field: "code", headerName: "Code", flex: 1, minWidth: 100 },
  { field: "abbreviation", headerName: "Abbreviation", flex: 1, minWidth: 150 },
  { field: "description", headerName: "Description", flex: 1, minWidth: 150 },
  {
    field: "nutrient_group",
    headerName: "Nutrient Group",
    flex: 1,
    minWidth: 150,
    valueGetter: (params) =>
      params.row.nutrient_group ? params.row.nutrient_group.name : "",
    renderCell: (params: GridRenderCellParams<any>) => {
      if (params.row.nutrient_group == null) return <></>;
      return (
        <Typography color={"link.primary"} variant="body2">
          <Link href={`/nutrient-groups/${params.row.nutrient_group.id}`}>
            {params.row.nutrient_group.name}
          </Link>
        </Typography>
      );
    },
  },
  { field: "unit", headerName: "Unit", flex: 1, minWidth: 150 },
];

const NutrientsList = () => {
  const [rows, setRows] = useState<GridRowsProp<Nutrient>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const nutrientFilter = useSelector((state: RootState) => state.nutrientFilter);

  useEffect(() => {
    setLoading(true);
    loadData().finally(() => {
      setLoading(false)
    })
    
  }, [paginationModel, nutrientFilter]);

  const loadData = async () => {
    // Build Filters
    let filterQuery: any = {}

    if(nutrientFilter.nutrient_groups.length != 0) {
      filterQuery['nutrient_group__in'] = nutrientFilter.nutrient_groups.map((e) => e.id).join(',') 
    }

    // Page Builder
    const pageQuery = {...paginationModel, ...(_.isEmpty(filterQuery) ? {}: {page: 0})}

    console.log(pageQuery);
    console.log(filterQuery)

    const response = await nutrient_service.get({...pageQuery, ...filterQuery})
    if(response.status == 200)
      setRows(response.data.results);
  }

  const refresh = () => {
    setPaginationModel({ page: 0, pageSize: 10 });
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await nutrient_service.delete(id);
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
      loading={loading}
      // pageSizeOptions={[5]}
      paginationModel={paginationModel}
      paginationMode="server"
      onPaginationModelChange={setPaginationModel}
    />
  );
};

export default NutrientsList;
