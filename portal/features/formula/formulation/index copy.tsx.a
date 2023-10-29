import React, {
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
} from "react";
import {
  DataEditor,
  EditableGridCell,
  GridCell,
  GridCellKind,
  GridColumn,
  Item,
  GridColumnIcon,
} from "@glideapps/glide-data-grid";
import _ from "lodash";
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
  Tabs,
  Tab
} from "@mui/material";
import {
  IngredientSelectDialog,
  IngredientService,
} from "@/features/ingredients";
import {
  Ingredient,
  Nutrient,
  Unit,
  Formula,
  FormulaRation,
  FormulaRequirement,
  FormulaIngredient,
} from "@/models";
import { enqueueSnackbar } from "notistack";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as yup from "yup";
import { LabeledInput } from "@/components/inputs";
import {  Dropdown } from "@/components/dropdowns";
import { yupResolver } from "@hookform/resolvers/yup";
import FIcBarChart from "../fic-bar-chart";
import formula_service from "../services/formula_service";
import { useRouter } from "next/router";
import FormulaResultTable from "../formula-result-table";
import { PurposeDropdown } from "@/features/purposes";
import { CountryDropdown } from "@/features/countries";
import { useGetNutrientsQuery } from '@/features/nutrients/services';

type Inputs = Partial<Formula>;

function resultA11yProps(index: number) {
  return {
    id: `formula-experimental-result-${index}`,
    "aria-controls": `formula-experimental-result-${index}`,
  };
}

const schema = yup
  .object({
    name: yup.string().required(),
    purpose: yup.string().nullable(),
    weight: yup.number().required(),
    country: yup.string().nullable(),
    sex: yup.string().nullable(),
    age_from_week: yup.number().nullable(),
    age_to_week: yup.number().nullable(),
    formula_basis: yup.string().nullable(),
    note: yup.string().nullable(),
  })
  .transform((currentValue: any) => {
    if (currentValue.purpose != null)
      currentValue.purpose = currentValue.purpose.id;
    if (currentValue.country != null)
      currentValue.country = currentValue.country.id;
    if (currentValue.formula_basis != null)
      currentValue.formula_basis = currentValue.formula_basis.value;
    return currentValue;
  });

const Formulation = ({ saveRef }: { saveRef: React.Ref<unknown> }) => {
  const isInitialMount = useRef(true);
  const [resultTabIndex, setResultTabIndex] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const theme = useTheme();
  const router = useRouter();
  const [contributionChartData, setContributionChartData] = useState<any[]>([]);
  const ingredients = useRef<Ingredient[]>([]);
  const rows = useRef<Array<Array<number | string>>>([
    ["Ration"],
    ["Requirement"],
  ]);

  const handleResultTabIndexChange = (event: React.SyntheticEvent, newValue: number) => {
    setResultTabIndex(newValue);
  };

  const [columns, setColumns] = useState<
    Array<GridColumn & { nutrient_id?: number }>
  >([
    {
      title: "Name",
      id: "name",
    },
    {
      title: "%",
      id: "value",
      icon: GridColumnIcon.HeaderNumber,
      width: 100,
    },
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
  const COL_VALUE_INDEX = 1;

  // Nutrients Start and end Rows
  const COL_NU_SI = 4;
  const COL_NU_EI = columns.length - 2;

  const { data: nutrients, isLoading} = useGetNutrientsQuery();

  useEffect(() => {
    if (isInitialMount.current) {
      setLoading(true);
      NutrientService.get({
        limit: 100,
      })
        .then((response) => {
          const cols: any = [];

          if (response.status == 200) {
            for (let i = 0; i < response.data.results.length; i = i + 1) {
              const unit_name =
                response.data.results[i].unit != null
                  ? (response.data.results[i].unit as Unit).name
                  : "-";
              cols.push({
                title: `${response.data.results[i].abbreviation}[${unit_name}]`,
                id: response.data.results[i].abbreviation,
                nutrient_id: response.data.results[i].id,
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

      const ROW_RATION_INDEX = rows.current.length - 2;
      const ROW_REQUIREMENT_INDEX = rows.current.length - 1;

      if (col == 0) {
        return {
          kind: GridCellKind.Text,
          readonly: true,
          allowOverlay: false,
          displayData: String(d ?? ""),
          data: String(d ?? ""),
          style: "faded",
          themeOverride: {
            bgCell: "#EFEFF1",
          },
        };
      } else if (
        (ROW_REQUIREMENT_INDEX == row || col == 1) &&
        row != ROW_RATION_INDEX
      ) {
        return {
          kind: GridCellKind.Number,
          allowOverlay: true,
          displayData: String(d ?? 0),
          data: Number(d ?? 0),
        };
      } else {
        return {
          kind: GridCellKind.Number,
          allowOverlay: false,
          readonly: true,
          displayData: String(d ?? 0),
          data: Number(d ?? 0),
          style: "faded",
          themeOverride: {
            bgCell: "#EFEFF1",
          },
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

      const ROW_RATION_INDEX = rows.current.length - 2;
      const ROW_REQUIREMENT_INDEX = rows.current.length - 1;

      if (
        col == getColIndex("value") &&
        [ROW_RATION_INDEX, ROW_REQUIREMENT_INDEX].includes(row) == false
      ) {
        const k = ingredients.current.findIndex(
          (e) => e.name == rows.current[row][0]
        );
        // @ts-ignore
        ingredients.current[k]["ratio"] = Number(newValue.data);
        // @ts-ignore
        ingredients.current[k]["ration_weight"] =
          (getValues("weight") * Number(newValue.data)) / 100;
        // @ts-ignore
        ingredients.current[k]["ration_price"] =
          ingredients.current[k].price *
          ((getValues("weight") * Number(newValue.data)) / 100);
      }

      const result: number[] = [];

      // slice out the ration and requirement
      rows.current.slice(0, -2).forEach((row) => {
        // slice out  name and value
        row.slice(1).forEach((column, index) => {
          if ([getColIndex("min"), getColIndex("max")].includes(index)) return;

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

      // Update ration row
      rows.current[ROW_RATION_INDEX] = ["Ration", ...result];

      const chartData: any[] = [];

      for (let i = 0; i < columns.length; i = i + 1) {
        if (
          [
            getColIndex("name"),
            getColIndex("min"),
            getColIndex("max"),
          ].includes(i)
        )
          continue;
        chartData.push({
          title: columns[i].title,
          contribution: (
            (Number(result[i] || 0) /
              Number(rows.current[ROW_REQUIREMENT_INDEX][i])) *
            100
          ).toFixed(3),
        });
      }

      setContributionChartData(chartData);
    },
    [columns]
  );

  const getColIndex = (id: string) => {
    return columns.findIndex((e) => e.id == id);
  };

  const onCellActivated = React.useCallback((cell: Item) => {}, []);

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

    // Check if ingredient already exists
    if (ingredients.current.findIndex((e) => e.id == value.id) != -1) return;
    ingredients.current = [...ingredients.current, value];

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
    getValues,
  } = useForm<Inputs>({
    // @ts-ignore
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const rations: Partial<FormulaRation>[] = [];
    let ration_price,
      ration_ratio,
      ration_dm = 0;

    const requirements: Partial<FormulaRequirement>[] = [];
    let req_budget,
      req_desired_ratio,
      req_desired_dm = 0;

    const ing: Partial<FormulaIngredient>[] = [];

    const ROW_RATION_INDEX = rows.current.length - 2;
    const ROW_REQUIREMENT_INDEX = rows.current.length - 1;

    const COL_MIN_INDEX = getColIndex("min");
    const COL_VALUE_INDEX = getColIndex("value");
    const COL_PRICE_INDEX = COL_VALUE_INDEX + 1;
    const COL_DM_INDEX = COL_PRICE_INDEX + 1;

    rows.current.forEach((row, index) => {
      if (index == ROW_RATION_INDEX) {
        row.forEach((col, j) => {
          if (j <= COL_DM_INDEX || j >= COL_MIN_INDEX) return;

          if (Number(col) != 0) {
            rations.push({
              id: columns[j].nutrient_id,
              value: Number(col),
            });
          }
        });
        ration_ratio = Number(row[COL_VALUE_INDEX]) || 0;
        ration_dm = Number(row[COL_DM_INDEX]) || 0;
        ration_price = Number(row[COL_PRICE_INDEX]) || 0;
      } else if (index == ROW_REQUIREMENT_INDEX) {
        row.forEach((col, j) => {
          if (j <= COL_DM_INDEX || j >= COL_MIN_INDEX) return;

          if (Number(col) != 0) {
            requirements.push({
              id: columns[j].nutrient_id,
              value: Number(col),
            });
          }
        });
        req_desired_ratio = Number(row[COL_VALUE_INDEX]) || 0;
        req_desired_dm = Number(row[COL_DM_INDEX]) || 0;
        req_budget = Number(row[COL_PRICE_INDEX]) || 0;
      } else {
        const ing_id: number =
          ingredients.current.find((e) => e.name == row[0])?.id || 0;
        ing.push({
          id: ing_id,
          ration_min: Number(row[COL_MIN_INDEX]),
          ratio_max: Number(row[getColIndex("min")]),
          ration: Number(row[getColIndex("value")]),
        });
      }
    });

    try {
      const formula: Partial<Formula> = {
        ...data,
        ingredients: ing as any,
        requirements: requirements as any,
        budget: req_budget,
        desired_ratio: req_desired_ratio,
        desired_dm: req_desired_dm,
        rations: rations as any,
        ration_price: ration_price,
        ration_ratio: ration_ratio,
        ration_dm: ration_dm,
      };

      const response = await formula_service.create(formula);
      if (response.status == 201) {
        enqueueSnackbar("Formula Created", { variant: "success" });
        // router.push("/formulation/formula");
      } else {
        enqueueSnackbar(
          "Failed to save formula, please check you inputs and try again",
          { variant: "error" }
        );
      }
    } catch (ex) {
      enqueueSnackbar(
        "Server Error, please check you connection and try again",
        { variant: "error" }
      );
    } finally {
    }
  };

  useImperativeHandle(saveRef, () => ({
    save() {
      handleSubmit(onSubmit)();
    },
  }));

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
                      <PurposeDropdown
                        onChange={(_, data) => onChange(data)}
                        value={value}
                        error={!!error?.message}
                        helperText={error?.message}
                      />
                    )}
                  />
                </Grid>
                {/* Sex */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name={"sex"}
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { invalid, isTouched, isDirty, error },
                    }) => (
                      <Dropdown
                        options={[
                          { value: "M", name: "Male" },
                          { value: "F", name: "Female" },
                        ]}
                        key="name"
                        onChange={(_, data) => onChange(data)}
                        value={value}
                        label="Sex"
                        error={!!error?.message}
                        helperText={error?.message}
                      />
                    )}
                  />
                </Grid>
                {/* Formula Basis */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name={"formula_basis"}
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { invalid, isTouched, isDirty, error },
                    }) => (
                      <Dropdown
                        options={[
                          { value: "AF", name: "As-Fed Basis" },
                          { value: "DM", name: "DM Basis" },
                        ]}
                        key="name"
                        onChange={(_, data) => onChange(data)}
                        value={value}
                        label="Feed Basis"
                        error={!!error?.message}
                        helperText={error?.message}
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
                          endAdornment: (
                            <InputAdornment position="start">Kg</InputAdornment>
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
                      <CountryDropdown
                        onChange={(_, data) => onChange(data)}
                        value={value}
                        error={!!error?.message}
                        helperText={error?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name={"age_from_week"}
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
                        label={"Age From"}
                        placeholder={"Age From"}
                        type="number"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name={"age_to_week"}
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
                        label={"Age To"}
                        placeholder={"Age To"}
                        type="number"
                      />
                    )}
                  />
                </Grid>
                {/* Name */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name={"note"}
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
                        label={"Remark"}
                        placeholder={"Remark"}
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
          onCellActivated={onCellActivated}
          trailingRowOptions={{
            // How to get the trailing row to look right
            sticky: true,
            tint: true,
            hint: "Add Ingredient",
          }}
        />
      </Sizer>
      <Box sx={{py: 5}}>
        <Tabs value={resultTabIndex} onChange={handleResultTabIndexChange}>
          <Tab label="Quick Comparison" {...resultA11yProps(0)} />
          <Tab
            label="Prcing"
            iconPosition="end"
            {...resultA11yProps(1)}
          />
        </Tabs>
        <Box>
          {resultTabIndex == 0 && <FIcBarChart data={contributionChartData} dataKey="contribution" displayKey={"title"} />}
          {resultTabIndex == 1 && <FormulaResultTable rows={(ingredients.current as any)}/>}
        </Box>
      </Box>
    </>
  );
};

export default Formulation;
