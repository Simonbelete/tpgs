import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  DataEditor,
  EditableGridCell,
  GridCell,
  GridCellKind,
  GridColumn,
  Item,
  GridColumnIcon,
  DataEditorProps,
  GridSelection,
} from "@glideapps/glide-data-grid";
import _ from "lodash";
import { NutrientService } from "@/features/nutrients";
import { Sizer } from "../components";
import {
  Box,
  Backdrop,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid,
  InputAdornment,
} from "@mui/material";
import {
  IngredientSelectDialog,
  IngredientService,
} from "@/features/ingredients";
import { Ingredient, Nutrient, Unit, Formula } from "@/models";
import { enqueueSnackbar } from "notistack";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as yup from "yup";
import { LabeledInput } from "@/components/inputs";
import { AsyncDropdown } from "@/components/dropdowns";
import { PurposeForm } from "@/features/purposes";
import { yupResolver } from "@hookform/resolvers/yup";

type Inputs = Partial<Formula>;

const schema = yup.object({
  name: yup.string().required(),
  code: yup.string().nullable(),
  abbreviation: yup.string().required(),
  description: yup.string().nullable(),
  nutrient_group: yup.number().nullable(),
  unit: yup.number().nullable(),
});

const Formulation = () => {
  const isInitialMount = useRef(true);
  const [loading, setLoading] = useState<boolean>(false);
  const theme = useTheme();
  const rows = useRef<Array<Array<number | string>>>([
    ["Ration"],
    ["Requirement"],
  ]);
  const [columns, setColumns] = useState<GridColumn[]>([
    { title: "Name", id: "name" },
    { title: "%", id: "value", icon: GridColumnIcon.HeaderNumber, width: 100 },
    {
      title: "Price[kg]",
      id: "price",
      icon: GridColumnIcon.HeaderNumber,
    },
    {
      title: "DM",
      id: "dm",
      icon: GridColumnIcon.HeaderNumber,
    },
    {
      title: "Min[%]",
      id: "min",
      icon: GridColumnIcon.HeaderNumber,
      width: 100,
    },
    {
      title: "Max[%]",
      id: "max",
      icon: GridColumnIcon.HeaderNumber,
      width: 100,
    },
  ]);
  const COL_DM_INDEX = 4;
  const COL_NUT_INDEX = 4;
  const COL_VALUE_INDEX = 1;

  // Nutrients Start and end Rows
  const COL_NU_SI = 4;
  const COL_NU_EI = columns.length - 2;

  useEffect(() => {
    if (isInitialMount.current) {
      setLoading(true);
      NutrientService.get({
        limit: 100,
      })
        .then((response) => {
          const cols: GridColumn[] = [];

          if (response.status == 200) {
            for (let i = 0; i < response.data.results.length; i = i + 1) {
              const unit_name =
                response.data.results[i].unit != null
                  ? (response.data.results[i].unit as Unit).name
                  : "-";
              cols.push({
                title: `${response.data.results[i].abbreviation}[${unit_name}]`,
                id: response.data.results[i].abbreviation,
              });
            }
          }
          appendColumns(cols);
        })
        .catch((ex) => {})
        .finally(() => {
          setLoading(false);
        });
      isInitialMount.current = false;
    }
  }, []);

  const appendColumns = (cols: GridColumn[]) => {
    setColumns([
      ...columns.slice(0, COL_NU_SI),
      ...cols,
      ...columns.slice(COL_NU_SI),
    ]);
  };

  const getContent = React.useCallback(
    (cell: Item): GridCell => {
      const [col, row] = cell;
      const dataRow = rows.current[row];

      // @ts-ignore
      let d = dataRow != undefined ? dataRow[col] : "";

      if (col == 0) {
        return {
          kind: GridCellKind.Text,
          allowOverlay: true,
          displayData: String(d ?? ""),
          data: String(d ?? ""),
        };
      } else {
        return {
          kind: GridCellKind.Number,
          allowOverlay: true,
          displayData: String(d ?? 0),
          data: Number(d ?? 0),
        };
      }
    },
    [rows]
  );

  const onCellEdited = React.useCallback(
    (cell: Item, newValue: EditableGridCell) => {
      const [col, row] = cell;

      if (rows.current[row] == undefined) {
        return;
      }

      // @ts-ignore
      rows.current[row][col] = newValue.data;

      const result: number[] = [];
      console.log("&&&&&&&&&&&&&");

      // slice out the ration and requirement
      rows.current.slice(0, -2).forEach((row) => {
        // slice out  name and value
        row.slice(1).forEach((column, index) => {
          // Jump Min and Max (do not calculate for those fields)
          if (index > columns.length - 2) return;

          if (result[index]) {
            if (index == 0) result[index] += Number(column);
            else
              result[index] +=
                (Number(column) * Number(row[COL_VALUE_INDEX])) / 100;
          } else {
            if (index == 0) result[index] = Number(column);
            else
              result[index] =
                (Number(column) * Number(row[COL_VALUE_INDEX])) / 100;
          }
        });
      });

      const ROW_RATION_INDEX = rows.current.length - 2;
      let a = [...rows.current[ROW_RATION_INDEX].slice(0), ...result];
      console.log(a);
      // Update ration row
      rows.current[ROW_RATION_INDEX] = [
        ...rows.current[ROW_RATION_INDEX].slice(0),
        ...result,
      ];
    },
    []
  );

  const onRowAppended = React.useCallback(() => {
    handleOpenIngredientDialog();
  }, []);

  const [openIngredientDialog, setOpenIngredientDialog] = useState(false);
  const handleCloseIngredientDialog = () => setOpenIngredientDialog(false);
  const handleOpenIngredientDialog = () => setOpenIngredientDialog(true);

  const generateEmptyRow = (): Array<string | number> => {
    const emptyRow = new Array(columns.length);
    emptyRow.fill(0, COL_NU_SI, COL_NU_EI);
    return emptyRow;
  };

  const handleSelected = async (value?: Ingredient) => {
    if (value == undefined || value == null) return;

    try {
      handleCloseIngredientDialog();
      setLoading(true);
      const response = await IngredientService.nutrient.get(value.id);
      const newRow = generateEmptyRow();
      if (response.status == 200) {
        for (let i = 0; i < response.data.results.length; i += 1) {
          const colIndex: number = columns.findIndex(
            (e) =>
              e.id ==
              (response.data.results[i].nutrient as Nutrient).abbreviation
          );
          newRow[colIndex] = response.data.results[i].value;
        }
      } else {
        // TODO:
      }
      newRow[0] = value?.name;
      rows.current = [newRow, ...rows.current];
    } catch (ex) {
    } finally {
      setLoading(false);
    }
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    // @ts-ignore
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {};

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={() => {}}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <IngredientSelectDialog
        open={openIngredientDialog}
        onSelected={handleSelected}
        onClose={handleCloseIngredientDialog}
      />
      <Box sx={{ my: 5, border: "1px solid #98AAC4" }}>
        <Accordion elevation={0} defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography fontWeight={600}>General</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={4}>
                {/* Name */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name={"name"}
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { invalid, isTouched, isDirty, error },
                    }) => (
                      <LabeledInput
                        error={!!error?.message}
                        helperText={error?.message}
                        onChange={onChange}
                        fullWidth
                        size="small"
                        value={value}
                        label={"Name"}
                        placeholder={"Name"}
                      />
                    )}
                  />
                </Grid>
                {/* Purpose */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name={"purpose"}
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { invalid, isTouched, isDirty, error },
                    }) => (
                      <AsyncDropdown
                        url="/purposes/"
                        key="name"
                        onChange={(_, data) => onChange(data)}
                        value={value}
                        label="Purpose"
                        error={!!error?.message}
                        helperText={error?.message}
                        createForm={<PurposeForm />}
                      />
                    )}
                  />
                </Grid>
                {/* Weight */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name={"budget"}
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { invalid, isTouched, isDirty, error },
                    }) => (
                      <LabeledInput
                        error={!!error?.message}
                        helperText={error?.message}
                        onChange={onChange}
                        fullWidth
                        size="small"
                        value={value}
                        label={"Budget"}
                        placeholder={"budget"}
                        type="number"
                      />
                    )}
                  />
                </Grid>
                {/* Weight */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name={"weight"}
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { invalid, isTouched, isDirty, error },
                    }) => (
                      <LabeledInput
                        error={!!error?.message}
                        helperText={error?.message}
                        onChange={onChange}
                        fullWidth
                        size="small"
                        value={value}
                        label={"Weight [Kg]"}
                        placeholder={"Weight per Kg"}
                        type="number"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">kg</InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>
                {/* Country */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name={"country"}
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { invalid, isTouched, isDirty, error },
                    }) => (
                      <AsyncDropdown
                        url="/countries/"
                        key="name"
                        onChange={(_, data) => onChange(data)}
                        value={value}
                        label="Country"
                        error={!!error?.message}
                        helperText={error?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </form>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Sizer>
        <DataEditor
          width="100%"
          experimental={{ strict: true }}
          columns={columns}
          rows={rows.current.length}
          isDraggable={true}
          freezeColumns={1}
          rowMarkers="number"
          onCellEdited={onCellEdited}
          getCellContent={getContent}
          onRowAppended={onRowAppended}
          trailingRowOptions={{
            // How to get the trailing row to look right
            sticky: true,
            tint: true,
            hint: "Add Ingredient",
          }}
        />
      </Sizer>
    </>
  );
};

export default Formulation;
