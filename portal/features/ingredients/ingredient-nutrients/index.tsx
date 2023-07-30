import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridToolbar,
  gridClasses,
  DataGridProps,
  GridRowModesModel,
  GridRowModes,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { Button, LinearProgress } from "@mui/material";
import {
  EditableTable,
  EditableTableCustomNoRowsOverlay,
} from "@/components/tables";
import { Nutrient } from "@/models";
import { useSelector, useDispatch } from "react-redux";
import { NutrientSelectDialog } from "@/features/nutrients";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { AnyAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { setNutrients } from "../slices";
import ingredient_service from "../services/ingredient_service";
import { enqueueSnackbar } from "notistack";
import messages from "@/util/messages";

const EditToolbar = (props: {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}) => {
  const { setRows } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSelected = (value?: Nutrient) => {
    if (value != undefined || value != null) {
      setRows((oldRows) => [...oldRows, { ...value, isNew: true }]);
    }
    handleClose();
  };

  return (
    <>
      <NutrientSelectDialog
        open={open}
        onSelected={handleSelected}
        onClose={handleClose}
      />
      <GridToolbarContainer>
        <Button
          color="primary"
          startIcon={<AddIcon />}
          variant="outlined"
          onClick={handleOpen}
          size={"small"}
        >
          Add new
        </Button>
      </GridToolbarContainer>
    </>
  );
};

const IngredientNutrients = ({ id }: { id?: number }) => {
  const dispatch = useDispatch();
  const ingredient = useSelector((state: RootState) => state.ingredient);

  const [rows, setRows] = useState<
    GridRowsProp<Partial<Nutrient> & { isNew: boolean }>
  >([]);

  useEffect(() => {
    dispatch(setNutrients(rows as any));
  }, [rows]);

  useEffect(() => {
    if (id == null) return;
    ingredient_service.nutrient
      .get(id)
      .then((response) => {
        if (response.status == 200) setRows(response.data.results as any);
      })
      .catch((ex) => {});
  }, []);

  const columns: GridColDef[] = [
    { field: "code", headerName: "Code", flex: 1, minWidth: 100 },
    { field: "name", headerName: "Name", flex: 1, minWidth: 100 },
    {
      field: "abbreviation",
      headerName: "Abbreviation",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "value",
      headerName: "Value",
      flex: 1,
      minWidth: 150,
      editable: true,
    },
    {
      field: "unit",
      headerName: "Unit",
      flex: 1,
      minWidth: 150,
      valueGetter: (params) => (params.row.unit ? params.row.unit.name : ""),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            showInMenu={false}
            key={id}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const handleDeleteClick = (id: GridRowId) => {
    setRows(rows.filter((row) => row.id !== id));
    handleDelete(id);
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    handleUpdate(newRow as any);
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleUpdate = async (data: Partial<Nutrient> & { isNew: boolean }) => {
    console.log(data);
    if (id == null) return;
    let response;
    if (data.isNew) {
      response = await ingredient_service.nutrient.create(id, data);
    } else {
      response = await ingredient_service.nutrient.update(
        id,
        data.id || 0,
        data
      );
    }
  };

  const handleDelete = async (row_id: string | number) => {
    if (id == null) return;
    const response = await ingredient_service.nutrient.delete(
      id,
      Number(row_id) || 0
    );
    if (response.status == 200)
      enqueueSnackbar(messages.deleteSuccess(), { variant: "success" });
    else enqueueSnackbar(messages.deleteError(), { variant: "error" });
  };

  return (
    <>
      <EditableTable
        sx={{ background: "white", minHeight: "20px" }}
        rows={rows}
        editMode="row"
        rowHeight={40}
        columns={columns}
        disableRowSelectionOnClick
        slots={{
          toolbar: EditToolbar,
          noRowsOverlay: EditableTableCustomNoRowsOverlay,
          loadingOverlay: LinearProgress,
        }}
        processRowUpdate={processRowUpdate}
        slotProps={{
          toolbar: { setRows },
        }}
      />
    </>
  );
};

export default IngredientNutrients;
