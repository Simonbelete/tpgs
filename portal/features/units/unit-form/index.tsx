import React, { useState } from "react";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Grid, TextField, Button, Card, Paper, Stack } from "@mui/material";
import { Unit } from "@/models";
import { LabeledInput } from "@/components/inputs";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import unit_service from "../services/unit_service";
import Message from "@/components/Message";
import errorToForm from "@/util/errorToForm";

type Inputs = Partial<Unit>;

const schema = object({
  name: string().required(),
}).required();

const UnitForm = ({
  unit,
  redirect = true,
}: {
  unit?: Unit;
  redirect?: boolean;
}) => {
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      ...unit,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      if (unit == null) await create(data);
      else await update(data);
    } catch (ex: any) {
      if (ex.response.status == 400) {
        errorToForm(ex.response.data, setError);
      } else {
        enqueueSnackbar("Server Error!", { variant: "error" });
      }
    }
  };

  const create = async (data: Partial<Unit>) => {
    const response = await unit_service.create(data);
    if ((response.status = 201)) {
      enqueueSnackbar("Successfully created!", { variant: "success" });
      if (redirect) router.push("/units");
    }
  };

  const update = async (data: Partial<Unit>) => {
    delete data.id;
    const response = await unit_service.update(unit?.id || 0, data);
    if ((response.status = 201)) {
      enqueueSnackbar("Successfully updated!", { variant: "success" });
      router.push("/units/" + unit?.id);
    }
  };

  return (
    <>
      <Paper sx={{ px: 5, py: 5 }} elevation={6} variant="outlined" square>
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
            <Grid item xs={12}>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
};

export default UnitForm;
