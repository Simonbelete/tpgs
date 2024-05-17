import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import _ from "lodash";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as yup from "yup";
import { EditableTable } from "@/components/tables";
import {
  DataGrid,
  GridToolbar,
  GridColDef,
  GridSortModel,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import {
  Box,
  Checkbox,
  Grid,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import { FarmDropdown } from "@/features/farms";
import { PenDropdown } from "@/features/pen";
import { HatcheryDropdown } from "@/features/hatchery";
import { ChickenDropdown, GenerationDropdown } from "@/features/chickens";
import { BreedDropdown, BreedForm } from "@/features/breeds";
import { Dropdown } from "@/components/dropdowns";
import {
  Chicken,
  Directory,
  Farm,
  DirectoryFilterData,
  Breed,
  ChickenRecordSet,
} from "@/models";
import { HouseDropdown } from "@/features/houses";
import { LabeledInput } from "@/components/inputs";
import { Card } from "@/components";
import {
  useUpdateChickenMutation,
  useLazyGetChickensQuery,
} from "@/features/chickens/services";
import { useLazyGetChickensRecordSetQuery } from "@/features/chicken-record-set/services";
import StripedDataGrid, {
  CustomNoRowsOverlay,
} from "@/lib/crud/components/StripedDataGrid";
import buildSorting from "@/util/buildSorting";
import buildPage from "@/util/buildPage";
import { ReductionReasonDropdown } from "@/features/reduction-reason";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { useCRUD } from "@/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Link from "next/link";

type Inputs = Partial<Directory> & {
  week: number;
  reduction_reason: any;
  reduction_date: any;
};

const schema = yup.object({
  breed: yup.object().nullable(),
  hatchery: yup.object().nullable(),
  sex: yup.object().nullable(),
  house: yup.object().nullable(),
  pen: yup.object().nullable(),
  week: yup.number().min(0).required(),
  reduction_reason: yup.object().required(),
  reduction_date: yup.string().required(),
});

const sexOptions = [
  { value: null, name: "---" },
  { value: "M", name: "Male" },
  { value: "F", name: "Female" },
];

export const SelectionForm = () => {
  const tenant = useSelector((state: RootState) => state.tenant);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [filter, setFilter] = useState<Inputs | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [unselectedChickens, setUnSelectedChickens] = useState<number[]>([]);

  const [trigger, { data, isFetching }] = useLazyGetChickensRecordSetQuery();
  const [updateChicken, updateResult] = useUpdateChickenMutation();

  const columns: GridColDef[] = [
    {
      field: "chicken__tag",
      headerName: "Tag",
      renderCell: (params: GridRenderCellParams<any>) => {
        return (
          <Typography color={"link.primary"} variant="body2">
            <Link
              target="_blank"
              href={`/chickens/${params.row?.chicken.id}/edit`}
            >
              {params.row?.chicken.display_name}
            </Link>
          </Typography>
        );
      },
    },
    {
      field: "chicken__sex",
      headerName: "Sex",
      valueGetter: (value, row) => row?.chicken.sex,
    },
    {
      field: "chicken__reduction_date",
      headerName: "Reduction date",
      valueGetter: (value, row) => row?.chicken.reduction_in_weeks,
    },
    {
      field: "feed_weight",
      headerName: "Body weight (g)",
    },
    {
      field: "no_eggs",
      headerName: "No of eggs",
    },
    {
      field: "eggs_weight",
      headerName: "Eggs weight (g)",
    },
    {
      field: "body_weight",
      headerName: "Body weight (g)",
    },
    {
      field: "selection",
      headerName: "Selection",
      renderCell(params) {
        if (params?.row?.chicken.reduction_date) {
          return <></>;
        } else
          return (
            <Box>
              <Checkbox
                onChange={() => handleCull(params?.row)}
                defaultChecked
                size="small"
              />
            </Box>
          );
      },
    },
  ];

  const handleCull = async (row: ChickenRecordSet) => {
    const body: any = {
      id: _.get(row.chicken, "id", 0),
      reduction_reason: _.get(filter, "reduction_reason.id", null),
      reduction_date: dayjs(_.get(filter, "reduction_date")).format(
        process.env.NEXT_PUBLIC_API_DATE_FORMAT
      ),
    };

    updateChicken(body);
  };

  const useCRUDHook = useCRUD({
    results: [updateResult],
  });

  const handleSortModelChange = React.useCallback(
    (sortModel: GridSortModel) => {
      if (filter == null) return;
      if (sortModel.length != 0) {
        trigger({
          ...buildFilterQuery(filter),
          ...buildPage(paginationModel),
          ...buildSorting(sortModel),
        });
      }
    },
    [filter, paginationModel]
  );

  useEffect(() => {
    if (filter == null) return;

    trigger({
      ...buildFilterQuery(filter),
      ...buildPage(paginationModel),
    });
  }, [paginationModel]);

  const { handleSubmit, control, getValues } = useForm<Inputs>({
    defaultValues: {
      reduction_date: dayjs(),
    },
    // @ts-ignore
    resolver: yupResolver(schema),
  });

  const buildFilterQuery = (directory: Inputs) => {
    return {
      farm: tenant.name,
      chicken__hatchery: _.get(directory.hatchery, "id", null),
      chicken__generation: _.get(directory.generation, "id", null),
      chicken__breed: _.get(directory.breed, "id", null),
      chicken__house: _.get(directory.house, "id", null),
      chicken__pen: _.get(directory.pen, "id", null),
      week: _.get(directory, "week", null),
      chicken__sex: _.get(directory.sex, "value", null),
    };
  };

  const onSubmit: SubmitHandler<Inputs> = async (directory) => {
    setFilter(directory);
    trigger({
      ...buildFilterQuery(directory),
      ...buildPage(paginationModel),
    });
  };

  return (
    <>
      <Card title="Filters">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <Grid container spacing={2}>
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
                      value={value ?? ""}
                      error={!!error?.message}
                      helperText={error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Controller
                  name={"week"}
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
                      value={value ?? ""}
                      label={"Week"}
                      placeholder={"Week"}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name={"reduction_reason"}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <ReductionReasonDropdown
                      onChange={(_, data) => onChange(data)}
                      value={value ?? ""}
                      error={!!error?.message}
                      helperText={error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="body2"
                  fontWeight={700}
                  color={"text.primary"}
                  mb={1}
                >
                  Cull Date
                </Typography>
                <Controller
                  name={"reduction_date"}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { invalid, isTouched, isDirty, error },
                  }) => (
                    <DatePicker
                      maxDate={dayjs()}
                      slotProps={{
                        textField: {
                          size: "small",
                          fullWidth: true,
                          error: !!error?.message,
                          helperText: error?.message,
                        },
                      }}
                      onChange={onChange}
                      value={value ? dayjs(value as string) : null}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Button
              sx={{ mt: 2 }}
              onClick={() => handleSubmit(onSubmit)()}
              variant="contained"
              disableElevation
              size="small"
            >
              Filter
            </Button>
          </Box>
        </form>
      </Card>

      <div style={{ minHeight: 400, width: "100%", marginTop: "10px" }}>
        <StripedDataGrid
          sx={{ background: "white" }}
          columns={columns}
          rows={data?.results ?? []}
          rowCount={data?.count || 0}
          loading={isFetching}
          slots={{ toolbar: GridToolbar, noRowsOverlay: CustomNoRowsOverlay }}
          pageSizeOptions={[10, 25, 50, 100, 1000]}
          density="compact"
          autosizeOptions={{
            columns: [
              "chicken__tag",
              "chicken__sex",
              "chicken__reduction_date",
              "feed_weight",
              "no_eggs",
              "eggs_weight",
              "body_weight",
              "selection",
            ],
            includeOutliers: true,
            includeHeaders: false,
            expand: true,
            outliersFactor: 10,
          }}
          autoHeight={true}
          autosizeOnMount={true}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          sortingMode="server"
          onSortModelChange={handleSortModelChange}
          disableRowSelectionOnClick
        />
      </div>
    </>
  );
};
