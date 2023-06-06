import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  Grid,
  TextField,
  Button,
  Card,
  FormControl,
  Paper,
  FormGroup,
  FormLabel,
} from "@mui/material";
import { Nutrient } from "@/models";
import nutrient_service from "../services/nutrient_service";
import { BootstrapInput, LabeledInput } from "@/components/inputs";
import { Dropdown } from "@/components";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { alertSuccess } from "@/util/alert";
import { AsyncDropdown } from "@/components/dropdowns";

type Inputs = Partial<Nutrient>;

const schema = yup
  .object({
    name: yup.string().required(),
    code: yup.string(),
    abbreviation: yup.string().required(),
    description: yup.string(),
    nutrient_group: yup.number(),
  })
  .required();

const NutrientForm = () => {
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await nutrient_service.create(data);
      console.log(response);
      if ((response.status = 201)) {
        alertSuccess({});
        router.push("/");
      }
    } catch (ex) {
      toast.error("Unknown Error");
    }
  };

  return (
    <Paper sx={{ px: 5, py: 5 }} elevation={6} variant="outlined" square>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>{errors.code?.message}</p>
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
          {/* Code */}
          <Grid item xs={12} md={6}>
            <Controller
              name={"code"}
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
                  label={"Code"}
                  placeholder={"Code"}
                />
              )}
            />
          </Grid>
          {/* abbreviation */}
          <Grid item xs={12} md={6}>
            <Controller
              name={"abbreviation"}
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
                  label={"Abbreviation"}
                  placeholder={"Abbreviation"}
                />
              )}
            />
          </Grid>
          {/* description */}
          <Grid item xs={12} md={6}>
            <Controller
              name={"description"}
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
                  label={"Description"}
                  placeholder={"Description"}
                />
              )}
            />
          </Grid>
          {/* Dropdown */}
          <Grid item xs={12} md={6}>
            <Controller
              name={"nutrient_group"}
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { invalid, isTouched, isDirty, error },
              }) => (
                <AsyncDropdown
                  url="/nutrient-groups/"
                  key="name"
                  onChange={(_, data) => onChange(data.id)}
                  value={value}
                  label="Nutrient Group"
                />
              )}
            />
          </Grid>
          {/* Button  */}
          <Grid item xs={12}>
            <Button fullWidth variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default NutrientForm;