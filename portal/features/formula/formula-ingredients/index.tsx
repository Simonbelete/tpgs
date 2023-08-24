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
import { FormulaIngredient, Ingredient } from "@/models";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { RootState } from "@/store";
import { setIngredient, clearAll, removeIngredientById, updateIngredient } from "../slices";
import formula_service from "../services/formula_service";
import { enqueueSnackbar } from "notistack";
import messages from "@/util/messages";
import randomId from "@/util/randomId";
import { IngredientSelectDialog } from "@/features/ingredients";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import IngredientContributionModal from "../ingredient-contribution-modal";

const EditToolbar = (props: {
  processRowUpdate: (newRow: GridRowModel) => void;
}) => {
  const { processRowUpdate } = props;
  const dispatch = useDispatch();
  const rows: GridRowsProp<Partial<FormulaIngredient> & Partial<{ isNew: boolean }>> = useSelector((state: RootState) => state.formula.ingredients);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const checkDuplicate = (id: any) => {
    return rows.some((e: any) => e.ingredient.id == id);
  };

  const handleSelected = (value?: Ingredient) => {
    if (value != undefined || value != null) {
      const newRow: any = {
        id: value.id,
        ingredient: value,
        ratio_min: 0,
        ratio_max: 0,
        isNew: true,
      };
      if (checkDuplicate(value.id))
        enqueueSnackbar(messages.duplicateError(), { variant: "warning" });
      else {
        dispatch(setIngredient([...rows, newRow]))
        // processRowUpdate(newRow);
      }
    }
    handleClose();
  };

  return (
    <>
      <IngredientSelectDialog
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

const FormulaIngredients = ({ id }: { id?: number }) => {
  const dispatch = useDispatch();
  const formulaState = useSelector((state: RootState) => state.formula);
  const rows: GridRowsProp<Partial<FormulaIngredient> & Partial<{ isNew: boolean }>> = useSelector((state: RootState) => state.formula.ingredients);
  const [contributionModal, setContributionModal] = useState<{
    id?: number;
    open?: boolean;
  }>({
    id: 0,
    open: false,
  });

  const handleOpenContributionModal = (id?: number) =>
    setContributionModal({
      id: id,
      open: true,
    });
  const handleCloseContributionModal = () =>
    setContributionModal({ open: false });

  useEffect(() => {
    dispatch(setIngredient(rows as any));
  }, [rows]);

  useEffect(() => {
    const controller = new AbortController();
    dispatch(clearAll())
    if (id == null) return;

    formula_service.ingredient
      .get(id)
      .then((response) => {
        if (response.status == 200) {
          dispatch(setIngredient(response.data.results));
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
        params.row.ingredient ? params.row.ingredient.code : "",
    },
    {
      field: "ingredient",
      headerName: "Name",
      flex: 1,
      minWidth: 100,
      valueGetter: (params) =>
        params.row.ingredient ? params.row.ingredient.name : "",
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      minWidth: 100,
      valueGetter: (params) =>
        params.row.ingredient ? params.row.ingredient.price : "",
    },
    {
      field: "ratio_min",
      headerName: "Min[%]",
      flex: 1,
      minWidth: 150,
      editable: true,
    },
    {
      field: "ratio_max",
      headerName: "Min[%]",
      flex: 1,
      minWidth: 150,
      editable: true,
    },
    {
      field: "ration",
      headerName: "Value[%]",
      flex: 1,
      minWidth: 150,
      editable: true,
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
            icon={<InsertChartIcon />}
            label="Contribution"
            onClick={() => handleOpenContributionModal(Number(id))}
            color="inherit"
          />,
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

  const processRowUpdate = async (newRow: GridRowModel) => {
    const bodyData: Partial<FormulaIngredient> = {
      ration: newRow.ration,
      ration_min: newRow.ration_min,
      ratio_max: newRow.ratio_max,
      ingredient: (newRow.ingredient as Ingredient).id,
    };
    if (id != null && newRow.isNew) await onCreate(newRow, bodyData);
    else if(id != null) await onUpdate(newRow, bodyData);

    const updatedRow = { ...newRow, isNew: false };

    dispatch(updateIngredient(newRow as any))

    return updatedRow;
  };

  const onCreate = async (
    row: GridRowModel,
    data: Partial<FormulaIngredient>
  ) => {
    if (id == null) return;

    try {
      const response = await formula_service.ingredient.create(id, data);
      if (response.status == 201) {
        const updatedRow: any = { ...row, id: response.data.id, isNew: false };
        dispatch(setIngredient([...rows, updatedRow]))
      }
    } catch (ex) {
      enqueueSnackbar("Failed", { variant: "error" });
    }
  };

  const onUpdate = async (
    newRow: GridRowModel,
    data: Partial<FormulaIngredient>
  ) => {
    if (id == null) return;

    try {
      const response = await formula_service.ingredient.update(
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
    const response = await formula_service.ingredient.delete(
      id,
      Number(row_id) || 0
    );
    if (response.status == 204)
      enqueueSnackbar(messages.deleteSuccess(), { variant: "success" });
    else enqueueSnackbar(messages.deleteError(), { variant: "error" });
  };

  return (
    <>
      <IngredientContributionModal
        id={contributionModal.id || 0}
        open={contributionModal.open}
        onClose={handleCloseContributionModal}
      />
      <EditableTable
        autoHeight
        sx={{ background: "white" }}
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
          toolbar: { processRowUpdate, rows },
        }}
      />
    </>
  );
};

export default FormulaIngredients;
