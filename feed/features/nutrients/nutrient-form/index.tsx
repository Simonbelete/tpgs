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
    // console.log("respone");
    // console.log(response);
  };

  return (
    <Paper sx={{ px: 5, py: 5 }} elevation={6} variant="outlined" square>
      <FormControl onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
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
          <Grid item xs={12}>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </Paper>
  );
};

export default NutrientForm;
