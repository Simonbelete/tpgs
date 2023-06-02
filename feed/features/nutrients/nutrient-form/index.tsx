import React from "react";
import { object, string } from "yup";
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
import { BootstrapInput } from "@/components/inputs";

type Inputs = Partial<Nutrient>;

const schema = object({
  name: string().required(),
  code: string(),
  abbreviation: string(),
  description: string(),
}).required();

const NutrientForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await nutrient_service.create(data);
  };

  return (
    <Paper sx={{ px: 5, py: 5 }} elevation={6} variant="outlined" square>
      <FormControl onSubmit={handleSubmit(onSubmit)} fullWidth>
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
                <BootstrapInput
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
                <BootstrapInput
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
                <BootstrapInput
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
                <BootstrapInput
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
          {/* Button  */}
          <Grid item xs={12}>
            <Button fullWidth variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </Paper>
  );
};

export default NutrientForm;
