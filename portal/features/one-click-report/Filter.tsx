import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Card } from "@/components";
import { LabeledInput } from "@/components/inputs";
import { PenDropdown } from "@/features/pen";
import { HatcheryDropdown } from "@/features/hatchery";
import { GenerationDropdown } from "@/features/chickens";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Dropdown } from "@/components/dropdowns";
import { HouseDropdown } from "@/features/houses";
import { BreedDropdown, BreedForm } from "@/features/breeds";
import _ from "lodash";

const sexOptions = [
  { value: null, name: "---" },
  { value: "M", name: "Male" },
  { value: "F", name: "Female" },
];

const schema = yup.object({
  generation: yup.object().nullable(),
  breed: yup.object().nullable(),
  hatchery: yup.object().nullable(),
  sex: yup.object().nullable(),
  house: yup.object().nullable(),
  pen: yup.object().nullable(),
});

const Filter = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const { handleSubmit, control } = useForm<any>({
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  const handleOnSubmit: SubmitHandler<any> = async (data) => {
    onSubmit(data);
  };

  return (
    <Card title="Filter">
      <form onSubmit={handleSubmit(handleOnSubmit)}>
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
  );
};

export default Filter;
