import React, { useState, ChangeEvent } from "react";
import { useSnackbar } from "notistack";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { Dropdown } from "@/components/dropdowns";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { ImportJob } from "@/models";
import { useCreateImportJobMutation } from "./services";
import client from "@/services/client";
import _ from "lodash";
import { Card } from "@/components";
import { useRouter } from "next/router";

const resources = [
  { name: "---", resource: "" },
  {
    name: "Import Pedigree, Body Weight, Feed Intake & Egg Production",
    resource: "AllChickenDataImportResource",
  },
  { name: "Import Body Weight", resource: "ChickenWeightResource" },
  { name: "Import Pedigree", resource: "BaseChickenResource" },
  // { name: "Import Egg Production", resource: "ChickenEgg" },
  // { name: "Chicken Detail", resource: "ChickenDetailResource" },
  // { name: "Import Chicken Body Weights", resource: "ChickenWeightResource" },
  // { name: "Import Chicken Feed Intake", resource: "ChickenFeedResource" },
  // { name: "Import Chicken Egg Production", resource: "EggResource" },
  // { name: "Breeds", resource: "BreedResource" },
  // { name: "Import Hatch(Batch)", resource: "HatcheryResource" },
];

type Inputs = Partial<ImportJob>;

const schema = yup.object({
  resource: yup.object().required(),
});

export const ImportJobForm = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();

  const { handleSubmit, control, setValue, getValues } = useForm<Inputs>({
    // @ts-ignore
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const extension = data.file.name.substring(
      data.file.name.lastIndexOf(".") + 1,
      data.file.name.length
    );
    const body = {
      file: data.file,
      resource: _.get(data.resource, "resource", null),
      format: extension,
    };

    try {
      const response = await client.post("import/jobs/", body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status == 201) {
        router.push(`/import-job`);
      } else {
        enqueueSnackbar("Please select file type either csv or excel", {
          variant: "error",
        });
      }
    } catch {
      enqueueSnackbar("500 Server Error check you file and try again", {
        variant: "error",
      });
    }
  };

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target != null && event.target.files != null) {
      const allowedExtensions = /(\.csv|\.xlsx|\.xls)$/i;
      const target = event.target as HTMLInputElement;
      const file = target.files != null ? target.files[0] : null;

      if (file == null) return;

      if (!allowedExtensions.test(file.name)) {
        enqueueSnackbar("Please select file type either csv or excel", {
          variant: "error",
        });
        return;
      }
      setValue("file", file);
    }
  };

  return (
    <Card title="Submit Import Job">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Stack alignContent={"space-betweens"} direction="row">
              <Button variant="outlined" size="small" component="label">
                Select File
                <input
                  type="file"
                  hidden
                  accept=".csv,.xlsx,.xls"
                  value={""}
                  onChange={handleFileUpload}
                />
              </Button>
              <Typography>{_.get(getValues("file"), "name", "")}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Controller
              name={"resource"}
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { invalid, isTouched, isDirty, error },
              }) => (
                <Dropdown
                  options={resources}
                  error={!!error?.message}
                  helperText={error?.message}
                  onChange={(_, data) => onChange(data)}
                  value={value ?? { name: "---", resource: "" }}
                  dataKey="name"
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
