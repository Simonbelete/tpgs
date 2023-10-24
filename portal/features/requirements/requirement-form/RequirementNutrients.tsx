import React, { useEffect, useState } from "react";
import _ from "lodash";
import {
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
import { RequirementNutrient, Nutrient } from "@/models";
import { useSelector, useDispatch } from "react-redux";
import { NutrientSelectDialog } from "@/features/nutrients";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { RootState } from "@/store";
import {
  setNutrients,
  removeNutrientById,
  updateNutrient,
  clearAll,
} from "./slice";
import {
  useDeleteRequirementNutrientMutation,
  useCreateRequirementNutrientMutation,
  useUpdateRequirementNutrientMutation,
  useLazyGetRequirementNutrientsQuery,
} from "../services";
import { enqueueSnackbar } from "notistack";
import messages from "@/util/messages";

const EditToolbar = (props: {
  processRowUpdate: (newRow: GridRowModel) => void;
}) => {
  const { processRowUpdate } = props;
  const dispatch = useDispatch();
  const rows: GridRowsProp<
    Partial<RequirementNutrient> & Partial<{ isNew?: boolean }>
  > = useSelector((state: RootState) => state.ingredientForm.nutrients);

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
        dispatch(setNutrients([...rows, newRow]));
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

const RequirementNutrients = ({ id }: { id?: number }) => {
  const dispatch = useDispatch();
  const rows: GridRowsProp<
    Partial<RequirementNutrient> & Partial<{ isNew?: boolean }>
  > = useSelector((state: RootState) => state.requirementForm.nutrients);

  const [trigger, { isLoading, data }, lastPromiseInfo] =
    useLazyGetRequirementNutrientsQuery();

  const [createRequirementNutrient, createResult] =
    useCreateRequirementNutrientMutation();
  const [updateRequirementNutrient, updateResult] =
    useUpdateRequirementNutrientMutation();
  const [deleteRequirementNutrient, deleteResult] =
    useDeleteRequirementNutrientMutation();

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
      headerName: "Value [%]",
      flex: 1,
      minWidth: 150,
      editable: true,
      type: "number",
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
    dispatch(removeNutrientById(Number(id)));
    handleDelete(id);
  };

  const processRowUpdate = async (
    updatedRow: GridRowModel,
    originalRow: GridRowModel
  ) => {
    const bodyData: Partial<RequirementNutrient> = {
      id: updatedRow.id,
      value: updatedRow.value,
      nutrient: (updatedRow.nutrient as Nutrient).id,
    };

    if (id != null && updatedRow.isNew) await onCreate(bodyData);
    else if (id != null) await onUpdate(bodyData);

    const newRow = { ...updatedRow, isNew: false };

    dispatch(updateNutrient(newRow as any));

    return newRow;
  };

  const handleOnProcessRowUpdateError = (error: any) => {};

  const onCreate = async (data: Partial<RequirementNutrient>) => {
    if (id == null) return;

    const response = await createRequirementNutrient({ id, data }).unwrap();
    trigger({ id, query: {} }, true);
  };

  const onUpdate = async (data: Partial<RequirementNutrient>) => {
    if (id == null) return;

    const response = await updateRequirementNutrient({
      ...data,
      requirement: id,
      id: data.id || 0,
    });
    trigger({ id, query: {} }, true);
  };

  const handleDelete = async (row_id: string | number) => {
    if (id == null) return;
    const response = await deleteRequirementNutrient({
      id,
      nutrient_id: Number(row_id),
    });
  };

  useEffect(() => {
    if (id != null) trigger({ id: id, query: {} }, true);
  }, []);

  useEffect(() => {
    dispatch(setNutrients(data?.results || []));
  }, [data]);

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

export default RequirementNutrients;
