import React, { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { GridRowsProp, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { DataTable } from "@/components";
import nutrient_service from "../services/nutrient_group_service";
import { NutrientGroup } from "@/models";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1, minWidth: 150 },
  { field: "name", headerName: "name", flex: 1, minWidth: 150 },
  // {
  //   field: "Setting",
  //   flex: 1,
  //   minWidth: 150,
  //   renderCell(params) {
  //     return (
  //       <Box>
  //         <IconButton aria-label="edit">
  //           <CreateIcon fontSize="small" />
  //         </IconButton>
  //         <IconButton aria-label="view">
  //           <VisibilityIcon fontSize="small" />
  //         </IconButton>
  //         <IconButton aria-label="delete">
  //           <DeleteForeverIcon fontSize="small" />
  //         </IconButton>
  //       </Box>
  //     );
  //   },
  // },
];

const NutrientGroupList = () => {
  const [rows, setRows] = useState<GridRowsProp<NutrientGroup>>([]);

  useEffect(() => {
    try {
      nutrient_service.get().then((response) => {
        console.log("results");
        console.log(response.data);
        setRows(response.data.results);
      });
    } catch (ex) {
      console.log(ex);
    }
  }, []);
  return <DataTable rows={rows} columns={columns} />;
};

export default NutrientGroupList;
