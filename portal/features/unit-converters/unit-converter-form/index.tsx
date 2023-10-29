import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Grid, TextField, Button, Card, Paper, Stack } from "@mui/material";
import { UnitConverter } from "@/models";
import { LabeledInput } from "@/components/inputs";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import unit_converter_service from "../services/unit_converter_service";
import { AsyncDropdown } from "@/components/dropdowns";
import errorToForm from "@/util/errorToForm";
import { UnitForm } from "@/features/units";

type Inputs = Partial<UnitConverter>;

const schema = yup.object({
  unit_from: yup
    .number()
    .required()
    .transform((_, data) => {
      return data.id;
    }),
  unit_to: yup
    .number()
    .required()
    .transform((_, data) => {
      return data.id;
    }),
  factor: yup.number().required(),
});

const UnitConverterForm = ({
  unit_converter,
}: {
  unit_converter?: UnitConverter;
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
      ...unit_converter,
    },
    // @ts-ignore
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      if (unit_converter == null) await create(data);
      else await update(data);
    } catch (ex: any) {
      if (ex.response.status == 400) {
        errorToForm(ex.response.data, setError);
      } else {
        enqueueSnackbar("Server Error!", { variant: "error" });
      }
    }
  };

  const create = async (data: Partial<UnitConverter>) => {
    const response = await unit_converter_service.create(data);
    if ((response.status = 201)) {
      enqueueSnackbar("Successfully created!", { variant: "success" });
      router.push("/units-converter");
    }
  };

  const update = async (data: Partial<UnitConverter>) => {
    delete data.id;
    const response = await unit_converter_service.update(
      unit_converter?.id || 0,
      data
    );
    if ((response.status = 201)) {
      enqueueSnackbar("Successfully updated!", { variant: "success" });
      router.push("/unit-converters/" + unit_converter?.id);
    }
  };

  return <></>;
};

export default UnitConverterForm;
