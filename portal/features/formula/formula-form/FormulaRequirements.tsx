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
import { FormulaRequirement, Nutrient } from "@/models";
import { useSelector, useDispatch } from "react-redux";
import { NutrientSelectDialog } from "@/features/nutrients";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { RootState } from "@/store";
import { setRequirements, removeIngredientById, updateRequirement } from "./slice";
import { enqueueSnackbar } from "notistack";
import messages from "@/util/messages";
import {
  useLazyGetFormulaRequirementsQuery,
  useCreateFormulaRequirementMutation,
  useUpdateFormulaRequirementMutation,
  useDeleteFormulaRequirementMutation,
} from '../services';

const EditToolbar = (props: {
  rows: any;
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  processRowUpdate: (newRow: GridRowModel) => void;
}) => {
  const { setRows, processRowUpdate, rows } = props;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const checkDuplicate = (id: any) => {
    return rows.some((e: any) => e.nutrient.id == id);
  };

  const handleSelected = (value?: Nutrient) => {
    if (value != undefined || value != null) {
      const newRow = {
        id: value.id,
        nutrient: value,
        value: 0,
        isNew: true,
      };
      if (checkDuplicate(value.id))
        enqueueSnackbar(messages.duplicateError(), { variant: "warning" });
      else {
        dispatch(setRequirements([...rows, newRow]));
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

const FormulaRequirements = ({ id }: { id?: number }) => {
  const dispatch = useDispatch();
  const rows: GridRowsProp<Partial<FormulaRequirement> & Partial<{ isNew: boolean }>> = useSelector((state: RootState) => state.formula.requirements);
  const [trigger, {data}] = useLazyGetFormulaRequirementsQuery();

  const [createFormulaRequirement, createResult ] = useCreateFormulaRequirementMutation();
  const [updateFormulaRequirement, updateResult ] = useUpdateFormulaRequirementMutation();
  const [deleteFormulaRequirement, deleteResult ] = useDeleteFormulaRequirementMutation();

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
    },
    {
      field: "unit",
      headerName: "Unit",
      flex: 1,
      minWidth: 150,
      valueGetter: (params) => params.row.nutrient.unit,
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
    dispatch(removeIngredientById(Number(id)));
    handleDelete(id);
  };

  const processRowUpdate = async (updatedRow: GridRowModel, originalRow: GridRowModel) => {
    const bodyData: Partial<FormulaRequirement> = {
      value: updatedRow.value,
      nutrient: (updatedRow.nutrient as Nutrient).id,
    };
    if (id != null && updatedRow.isNew) await onCreate(bodyData);
    else if(id != null) await onUpdate(bodyData);

    const newRow = { ...updatedRow, isNew: false };

    dispatch(updateRequirement(newRow as any))

    return newRow;
  };

  const onCreate = async (
    data: Partial<FormulaRequirement>
  ) => {
    if (id == null) return;
    const response = await createFormulaRequirement({id, data})
    trigger({id: id, query: {}})
    // const updatedRow = { ...row, id: response.data.id, isNew: false };
  };

  const onUpdate = async (
    data: Partial<FormulaRequirement>
  ) => {
    if (id == null) return;
    const response = updateFormulaRequirement({...data, formula: id});
  };

  const handleDelete = async (row_id: string | number) => {
    if (id == null) return;
    const response = await deleteFormulaRequirement({id, requirement_id: Number(row_id)})
  };

  const handleOnProcessRowUpdateError = (error: any) => {
  }

  return (
    <>
      <EditableTable
        autoHeight
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
          toolbar: {processRowUpdate, rows },
        }}
        onProcessRowUpdateError={handleOnProcessRowUpdateError}
      />
    </>
  );
};

export default FormulaRequirements;
