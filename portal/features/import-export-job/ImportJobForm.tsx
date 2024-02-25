import React, { useState, ChangeEvent } from "react";
import { useSnackbar } from "notistack";
import { Box, Button, Grid, TextField } from "@mui/material";
import { Dropdown } from "@/components/dropdowns";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { ImportJob } from "@/models";
import { useCreateImportJobMutation } from "./services";
import client from "@/services/client";
import _ from "lodash";

const resources = [
  { name: "---", resource: "" },
  { name: "Chicken Detail", resource: "ChickenDetailResource" },
];

type Inputs = Partial<ImportJob>;

const schema = yup.object({
  resource: yup.object().required(),
});

export const ImportJobForm = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [create] = useCreateImportJobMutation();

  const { handleSubmit, control, setValue } = useForm<Inputs>({
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

    const response = await client.post("import/jobs/", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Button variant="contained" component="label">
            Upload File
            <input
              type="file"
              hidden
              accept=".csv,.xlsx,.xls"
              value={""}
              onChange={handleFileUpload}
            />
          </Button>
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
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
