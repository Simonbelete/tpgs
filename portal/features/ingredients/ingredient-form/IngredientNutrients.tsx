import React, { useEffect, useState } from "react";
import _ from "lodash";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowId,
  GridRowModel,
} from "@mui/x-data-grid";
import { Button, LinearProgress } from "@mui/material";
import {
  EditableTable,
  EditableTableCustomNoRowsOverlay,
} from "@/components/tables";
import { IngredientNutrient, Nutrient } from "@/models";
import { useSelector, useDispatch } from "react-redux";
import { NutrientSelectDialog } from "@/features/nutrients";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { RootState } from "@/store";
import { setNutrients, removeNutrientById, updateNutrient, clearAll } from "../slices";
import ingredient_service from "../services/ingredient_service";
import { enqueueSnackbar } from "notistack";
import messages from "@/util/messages";
import randomId from "@/util/randomId";

const EditToolbar = (props: {
  processRowUpdate: (newRow: GridRowModel) => void;
}) => {
  const { processRowUpdate } = props;
  const dispatch = useDispatch();
  const rows: GridRowsProp<Partial<IngredientNutrient> & Partial<{ isNew?: boolean }>> = useSelector((state: RootState) => state.ingredientForm.nutrients);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const checkDuplicate = (id: any) => {
    return rows.some((e: any) => e.nutrient.id == id);
  };

  const handleSelected = (value?: Nutrient) => {
    if (value != undefined || value != null) {
      const newRow: any = {
        id: value.id,
        nutrient: value,
        value: 0,
        isNew: true,
      };
      if (checkDuplicate(value.id))
        enqueueSnackbar(messages.duplicateError(), { variant: "warning" });
      else {
        dispatch(setNutrients([...rows, newRow]))
        // processRowUpdate(newRow);
      }
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
  const rows: GridRowsProp<Partial<IngredientNutrient> & Partial<{ isNew?: boolean }>> = useSelector((state: RootState) => state.ingredientForm.nutrients);

  useEffect(() => {
    const controller = new AbortController();
    dispatch(clearAll())

    if (id == null) return;

    ingredient_service.nutrient
      .get(id)
      .then((response) => {
        if (response.status == 200) {
          dispatch(setNutrients(response.data.results))
        }
      })
      .catch((ex) => {});

      return () => {
        controller.abort()
      }
  }, []);

  const columns: GridColDef[] = [
    {
      field: "code",
      headerName: "Code",
      flex: 1,
      minWidth: 100,
      valueGetter: (params) =>
        params.row.nutrient ? params.row.nutrient.code : "",
    },
    {
      field: "nutrient",
      headerName: "Name",
      flex: 1,
      minWidth: 100,
      valueGetter: (params) =>
        params.row.nutrient ? params.row.nutrient.name : "",
    },
    {
      field: "abbreviation",
      headerName: "Abbreviation",
      flex: 1,
      minWidth: 150,
      valueGetter: (params) =>
        params.row.nutrient ? params.row.nutrient.abbreviation : "",
    },
    {
      field: "value",
      headerName: "Value",
      flex: 1,
      minWidth: 150,
      editable: true,
      type: 'number',
    },
    {
      field: "unit",
      headerName: "Unit",
      flex: 1,
      minWidth: 150,
      valueGetter: (params) => params.row.nutrient.unit
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
    dispatch(removeNutrientById(Number(id)));
    handleDelete(id);
  };

  const processRowUpdate = async (updatedRow: GridRowModel, originalRow: GridRowModel) => {
    const bodyData: Partial<IngredientNutrient> = {
      value: updatedRow.value,
      nutrient: (updatedRow.nutrient as Nutrient).id,
    };

    if (id != null && updatedRow.isNew) await onCreate(updatedRow, bodyData);
    else if(id != null) await onUpdate(updatedRow, bodyData);

    const newRow = { ...updatedRow, isNew: false };

    dispatch(updateNutrient(newRow as any))

    return newRow;
  };

  const handleOnProcessRowUpdateError = (error: any) => {
  }

  const onCreate = async (
    row: GridRowModel,
    data: Partial<IngredientNutrient>
  ) => {
    if (id == null) return;

    try {
      const response = await ingredient_service.nutrient.create(id, data);
      if (response.status == 201) {
        const updatedRow: any = { ...row, id: response.data.id, isNew: false };
        dispatch(setNutrients([...rows, updatedRow]))
      }
    } catch (ex) {
      enqueueSnackbar("Failed", { variant: "error" });
    }
  };

  const onUpdate = async (
    newRow: GridRowModel,
    data: Partial<IngredientNutrient>
  ) => {
    if (id == null) return;

    try {
      const response = await ingredient_service.nutrient.update(
        id,
        newRow.id || 0,
        data
      );
    } catch (ex) {
      enqueueSnackbar("Failed", { variant: "error" });
    }
  };

  const handleDelete = async (row_id: string | number) => {
    if (id == null) return;
    const response = await ingredient_service.nutrient.delete(
      id,
      Number(row_id) || 0
    );
    if (response.status == 204)
      enqueueSnackbar(messages.deleteSuccess(), { variant: "success" });
    else enqueueSnackbar(messages.deleteError(), { variant: "error" });
  };

  return (
    <>
      <EditableTable
        sx={{ background: "white", minHeight: "20px" }}
        rows={rows}
        // editMode="row"
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
          toolbar: { processRowUpdate },
        }}
        onProcessRowUpdateError={handleOnProcessRowUpdateError}
      />
    </>
  );
};

export default IngredientNutrients;