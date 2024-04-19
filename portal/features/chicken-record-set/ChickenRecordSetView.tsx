import React, { useState, useCallback, useEffect } from "react";
import {
  DataEditor,
  EditableGridCell,
  GridCell,
  GridCellKind,
  GridColumn,
  Item,
  GetRowThemeCallback,
  GridMouseEventArgs,
} from "@glideapps/glide-data-grid";
import { Sizer } from "@/features/formula/components";
import _ from "lodash";
import {
  chickenRecordSetApi,
  useGetChickensRecordSetQuery,
  useLazyGetChickensRecordSetQuery,
} from "./services/chicken_record_set";
import { Grid, Button, Typography, Box } from "@mui/material";
import { ChickenRecordSet } from "@/models";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { LabeledInput } from "@/components/inputs";
import { Card } from "@/components";
import { GenerationDropdown } from "../chickens";
import { PenDropdown } from "@/features/pen";
import { HatcheryDropdown } from "@/features/hatchery";
import { HouseDropdown } from "@/features/houses";
import { BreedDropdown, BreedForm } from "@/features/breeds";
import { Dropdown } from "@/components/dropdowns";
import { useDispatch } from "react-redux";
import { baseApi } from "@/services/baseApi";
import {
  useExtraCells,
  ButtonCellType,
} from "@glideapps/glide-data-grid-cells";
import buildPage from "@/util/buildPage";
import buildDirectoryQuery from "@/util/buildDirectoryQuery";

const sexOptions = [
  { value: null, name: "---" },
  { value: "M", name: "Male" },
  { value: "F", name: "Female" },
];

const chickenDetailColumn = [
  {
    title: "Tag",
    id: "chicken.tag",
    width: 100,
    property: {
      kind: GridCellKind.Text,
      allowOverlay: false,
      readonly: true,
      style: "faded",
      themeOverride: {
        bgCell: "#EFEFF1",
      },
    },
  },
  {
    title: "Hatch Date",
    id: "chicken.hatch_date",
    width: 100,
    property: {
      kind: GridCellKind.Text,
      allowOverlay: false,
      readonly: true,
      style: "faded",
      themeOverride: {
        bgCell: "#EFEFF1",
      },
    },
  },
  {
    title: "Sex",
    id: "chicken.sex",
    width: 50,
    property: {
      kind: GridCellKind.Text,
      allowOverlay: false,
      readonly: true,
      style: "faded",
      themeOverride: {
        bgCell: "#EFEFF1",
      },
    },
  },
  {
    title: "Breed",
    id: "chicken.breed.display_name",
    width: 100,
    property: {
      kind: GridCellKind.Text,
      allowOverlay: false,
      readonly: true,
      style: "faded",
      themeOverride: {
        bgCell: "#EFEFF1",
      },
    },
  },
  {
    title: "Batch",
    id: "chicken.batch.display_name",
    width: 80,
    property: {
      kind: GridCellKind.Text,
      allowOverlay: false,
      readonly: true,
      style: "faded",
      themeOverride: {
        bgCell: "#EFEFF1",
      },
    },
  },
  {
    title: "House",
    id: "chicken.house.display_name",
    width: 80,
    property: {
      kind: GridCellKind.Text,
      allowOverlay: false,
      readonly: true,
      style: "faded",
      themeOverride: {
        bgCell: "#EFEFF1",
      },
    },
  },
  {
    title: "Pen",
    id: "chicken.pen.display_name",
    width: 80,
    property: {
      kind: GridCellKind.Text,
      allowOverlay: false,
      readonly: true,
      style: "faded",
      themeOverride: {
        bgCell: "#EFEFF1",
      },
    },
  },
  {
    title: "Cull Date",
    id: "chicken.cull_date",
    width: 100,
    property: {
      kind: GridCellKind.Text,
      allowOverlay: false,
      readonly: true,
      style: "faded",
      themeOverride: {
        bgCell: "#EFEFF1",
      },
    },
  },
  {
    title: "Cull Reason",
    id: "chicken.cull_reason.display_name",
    width: 80,
    property: {
      kind: GridCellKind.Text,
      allowOverlay: false,
      readonly: true,
      style: "faded",
      themeOverride: {
        bgCell: "#EFEFF1",
      },
    },
  },
];

const ChickenRecordSetView = () => {
  const dispatch = useDispatch();
  const [trigger, { data }] = useLazyGetChickensRecordSetQuery();
  const { customRenderers } = useExtraCells();
  const [pageModel, setPageModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const [columns, setColumns] = useState<any[]>([...chickenDetailColumn]);

  const { handleSubmit, control } = useForm<any>({
    defaultValues: {
      start_week: 0,
      end_week: 5,
    },
  });

  const generateWeekColumns = (start_week: number, end_week: number) => {
    const weekColumns = [];
    for (let i = start_week; i < end_week + 1; i++) {
      weekColumns.push({
        title: "Body Weight (g)",
        id: `body_weight_${i}`,
        property: {
          kind: GridCellKind.Number,
          allowOverlay: true,
          readonly: false,
        },
        width: 80,
        group: `Week ${i}`,
      });
      weekColumns.push({
        title: "No of Eggs",
        id: `eggs_${i}`,
        property: {
          kind: GridCellKind.Number,
          allowOverlay: true,
          readonly: false,
        },
        width: 80,
        group: `Week ${i}`,
      });
      weekColumns.push({
        title: "Total Egg Weight (g)",
        id: `eggs_weight_${i}`,
        property: {
          kind: GridCellKind.Number,
          allowOverlay: true,
          readonly: false,
        },
        width: 80,
        group: `Week ${i}`,
      });
      weekColumns.push({
        title: "Feed Intake (g)",
        id: `feed_weight_${i}`,
        property: {
          kind: GridCellKind.Number,
          allowOverlay: true,
          readonly: false,
        },
        width: 80,
        group: `Week ${i}`,
      });
    }

    return weekColumns;
  };

  const getContent = useCallback(
    (cell: Item): GridCell | any => {
      const [col, row] = cell;
      const dataRow = data?.results[row];
      const dataCol = columns[col];

      if (
        String(dataCol.id).match(
          "(body_weight|eggs|eggs_weight|feed_weight)_[0-9]*"
        )
      ) {
        // Render Columns grouped that are grouped by week
        return renderWeeklyData(cell);
      } else {
        // other rows
        const d = _.get(dataRow, dataCol.id, "");

        // console.log(row, data?.results.length);

        if (
          row == _.get(data?.results, "length", -1) &&
          _.get(data?.results, "length", -1) != 0
        ) {
          // Add Load More to the end of line
          return {
            kind: GridCellKind.Custom,
            allowOverlay: false,
            readonly: true,
            span: [0, chickenDetailColumn.length - 1],
            data: {
              kind: "button-cell",
              backgroundColor: ["transparent", "#6572ffee"],
              color: ["accentColor", "accentFg"],
              borderColor: "#6572ffa0",
              borderWidth: "0",
              // borderRadius: 9,
              title: `Load More +${(data?.count || 0) - pageModel.page + 1}`,
              onClick: () => loadMore(),
            },
            themeOverride: {
              baseFontStyle: "700 12px",
            },
          };
        } else if (dataCol.property.kind == GridCellKind.Custom) {
          return {
            ...dataCol.property,
            data: {
              kind: "button-cell",
              backgroundColor: ["transparent", "#6572ffee"],
              color: ["accentColor", "accentFg"],
              borderColor: "#fff",
              borderRadius: 9,
              title: "Delete",
            },
          };
        } else {
          return {
            kind: GridCellKind.Text,
            allowOverlay: true,
            readonly: false,
            displayData: String(d ?? ""),
            data: String(d),
            ...dataCol.property,
          };
        }
      }
    },
    [data, columns]
  );

  const renderWeeklyData = (cell: Item) => {
    const [col, row] = cell;
    const dataRow = data?.results[row];
    const dataCol = columns[col];

    const colName = String(dataCol.id).split(/_[0-9]+/)[0];

    let d = _.get(dataRow, colName, "-");

    return {
      kind: GridCellKind.Number,
      allowOverlay: true,
      readonly: false,
      displayData: String(d ?? ""),
      data: Number(d),
    };
  };

  const loadMore = () => {
    const newPageModel = { ...pageModel, page: pageModel.page + 1 };
    setPageModel(newPageModel);
    trigger({ ...buildPage(newPageModel) });
  };

  const onSubmit: SubmitHandler<any> = async (values) => {
    setColumns([
      ...chickenDetailColumn,
      ...generateWeekColumns(values.start_week, values.end_week),
    ]);

    // TODO: use invildate tages
    await dispatch(chickenRecordSetApi.util.resetApiState());

    trigger({
      chicken__hatchery: _.get(values.hatchery, "id", null),
      chicken__generation: _.get(values.generation, "id", null),
      chicken__breed: _.get(values.breed, "id", null),
      chicken__house: _.get(values.house, "id", null),
      chicken__pen: _.get(values.pen, "id", null),
      week_gte: _.get(values, "start_week", 0),
      week_lte: _.get(values, "end_week", 0),
      chicken__sex: _.get(values.sex, "value", null),
    });
  };

  return (
    <>
      <Card title="Filter">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ width: "90%", mb: 2 }}>
            <Typography variant="caption" mb={2}>
              *Leaving field empty will consider all values
            </Typography>
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Controller
                name={"generation"}
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <GenerationDropdown
                    onChange={(_, data) => onChange(data)}
                    value={value}
                    error={!!error?.message}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name={"breed"}
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <BreedDropdown
                    onChange={(_, data) => onChange(data)}
                    value={value}
                    error={!!error?.message}
                    helperText={error?.message}
                    viewForm={
                      // @ts-ignore
                      <BreedForm data={value} shallowRoute={false} />
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name={"hatchery"}
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <HatcheryDropdown
                    onChange={(_, data) => onChange(data)}
                    value={value}
                    error={!!error?.message}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name={"sex"}
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { invalid, isTouched, isDirty, error },
                }) => (
                  <Dropdown
                    options={sexOptions}
                    dataKey="name"
                    onChange={(_, data) => onChange(data)}
                    value={value}
                    label="Sex"
                    error={!!error?.message}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name={"house"}
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <HouseDropdown
                    onChange={(_, data) => onChange(data)}
                    value={value}
                    error={!!error?.message}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name={"pen"}
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <PenDropdown
                    onChange={(_, data) => onChange(data)}
                    value={value}
                    error={!!error?.message}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name={"start_week"}
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
                    label={"Start Week"}
                    placeholder={"Start Week"}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name={"end_week"}
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
                    label={"End Week"}
                    placeholder={"End Week"}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                size="small"
                disableElevation
                type="submit"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>

      <Box m={5} />
      <Sizer>
        <DataEditor
          height={"800px"}
          width="100%"
          customRenderers={customRenderers}
          getCellContent={getContent}
          columns={columns}
          rows={(data?.results.length ?? 0) + 1}
          freezeColumns={1}
          rowMarkers={"both"}
        />
      </Sizer>
    </>
  );
};

export default ChickenRecordSetView;
