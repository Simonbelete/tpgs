import React, { useState, ChangeEvent } from "react";
import { useSnackbar } from "notistack";
import {
  Box,
  Button,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { Dropdown } from "@/components/dropdowns";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { ExportJob } from "@/models";
import client from "@/services/client";
import _ from "lodash";
import { Card } from "@/components";
import { useRouter } from "next/router";

const resources = [
  { name: "---", resource: "" },
  {
    name: "Export Pedigree, Body Weight, Feed Intake & Egg Production",
    resource: "ChickenExportResource",
  },
];

type Inputs = Partial<ExportJob>;

const schema = yup.object({
  resource: yup.object().required(),
});

export const ExportJobForm = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();

  const { handleSubmit, control, setValue, getValues } = useForm<Inputs>({
    // @ts-ignore
    resolver: yupResolver(schema),
    defaultValues: {
      format: "csv",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const body = {
      resource: _.get(data.resource, "resource", null),
      format: data.format,
    };

    try {
      const response = await client.post("export/jobs/", body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status == 201) {
        // router.push(`/import-job/${response.data.id}`);
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

  return (
    <Card title="Submit Import Job">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
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
            <Controller
              name={"format"}
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { invalid, isTouched, isDirty, error },
              }) => (
                <ToggleButtonGroup
                  color="primary"
                  value={value}
                  onChange={(_, data) => onChange(data)}
                  exclusive
                  aria-label="Platform"
                  size="small"
                >
                  <ToggleButton value="csv">Csv (.csv)</ToggleButton>
                  <ToggleButton value="xlsx">Excel (.xlsx)</ToggleButton>
                  <ToggleButton value="xls">Excel (.xls)</ToggleButton>
                </ToggleButtonGroup>
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
