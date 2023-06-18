import React from "react";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridToolbar,
  gridClasses,
  DataGridProps,
} from "@mui/x-data-grid";
import { Box, IconButton } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Link from "next/link";
import { useRouter } from "next/router";

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    "&:hover, &.Mui-hovered": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
}));

const DataTable = ({ rows, columns, ...props }: DataGridProps) => {
  const router = useRouter();

  const settingColumn: GridColDef[] = [
    {
      field: "Setting",
      flex: 1,
      minWidth: 150,
      renderCell(params: any) {
        return (
          <Box>
            <Link href={router.asPath + "/" + params.id + "/edit"}>
              <IconButton aria-label="edit">
                <EditNoteIcon fontSize="small" />
              </IconButton>
            </Link>
            <Link href={router.asPath + "/" + params.id}>
              <IconButton aria-label="view">
                <VisibilityIcon fontSize="small" />
              </IconButton>
            </Link>
            <IconButton aria-label="delete">
              <DeleteForeverIcon fontSize="small" />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <StripedDataGrid
      sx={{ background: "white" }}
      rows={rows}
      density="compact"
      columns={[...columns, ...settingColumn]}
      paginationMode="server"
      checkboxSelection
      // getRowClassName={(params) =>
      //   params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      // }
      // slots={{
      //   toolbar: GridToolbar,
      // }}
      {...props}
    />
  );
};

export default DataTable;

{
  /* <DataGrid
sx={{
  boxShadow: 2,
  border: 2,
  borderColor: "primary.light",
  "& .MuiDataGrid-cell:hover": {
    color: "primary.main",
  },
}}
rows={rows}
columns={columns}
slots={{
  toolbar: GridToolbar,
}}
/> */
}
