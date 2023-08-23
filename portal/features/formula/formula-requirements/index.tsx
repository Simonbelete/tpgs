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
import { setRequirements } from "../slices";
import formula_service from "../services/formula_service";
import { enqueueSnackbar } from "notistack";
import messages from "@/util/messages";
import randomId from "@/util/randomId";

const EditToolbar = (props: {
  rows: any;
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  processRowUpdate: (newRow: GridRowModel) => void;
}) => {
  const { setRows, processRowUpdate, rows } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const checkDuplicate = (id: any) => {
    return rows.some((e: any) => e.nutrient.id == id);
  };

  const handleSelected = (value?: Nutrient) => {
    if (value != undefined || value != null) {
      const newRow = {
        id: randomId(true),
        nutrient: value,
        value: 0,
        isNew: true,
      };
      if (checkDuplicate(value.id))
        enqueueSnackbar(messages.duplicateError(), { variant: "warning" });
      else {
        setRows((oldRows) => [...oldRows, newRow]);
        processRowUpdate(newRow);
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

  const [rows, setRows] = useState<
    GridRowsProp<Partial<FormulaRequirement> & Partial<{ isNew: boolean }>>
  >([]);

  useEffect(() => {
    dispatch(setRequirements(rows as any));
  }, [rows]);

  useEffect(() => {
    if (id == null) return;
    const controller = new AbortController();

    formula_service.requirement
      .get(id)
      .then((response) => {
        if (response.status == 200) {
          setRows(response.data.results);
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
    setRows(rows.filter((row) => row.id !== id));
    handleDelete(id);
  };

  const processRowUpdate = async (newRow: GridRowModel) => {
    if (id == null) return;

    const bodyData: Partial<FormulaRequirement> = {
      value: newRow.value,
      nutrient: (newRow.nutrient as Nutrient).id,
    };
    if (newRow.isNew) await onCreate(newRow, bodyData);
    else await onUpdate(newRow, bodyData);

    const updatedRow = { ...newRow, isNew: false };

    return updatedRow;
  };

  const onCreate = async (
    row: GridRowModel,
    data: Partial<FormulaRequirement>
  ) => {
    if (id == null) return;

    try {
      const response = await formula_service.requirement.create(id, data);
      if (response.status == 201) {
        const updatedRow = { ...row, id: response.data.id, isNew: false };
        setRows([...rows, updatedRow]);
      }
    } catch (ex) {
      enqueueSnackbar("Failed", { variant: "error" });
    }
  };

  const onUpdate = async (
    newRow: GridRowModel,
    data: Partial<FormulaRequirement>
  ) => {
    if (id == null) return;

    try {
      const response = await formula_service.requirement.update(
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
    const response = await formula_service.requirement.delete(
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
          toolbar: { setRows, processRowUpdate, rows },
        }}
      />
    </>
  );
};

export default FormulaRequirements;
