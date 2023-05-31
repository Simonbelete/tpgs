import React from "react";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Grid, TextField, Button } from "@mui/material";
import { Ingredient } from "@/models";

type Inputs = Partial<Ingredient>;

const schema = object({
  name: string().required(),
}).required();

const IngredientForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid item xs={12}>
        <Controller
          name={"name"}
          control={control}
          render={({
            field: { onChange, value },
            fieldState: { invalid, isTouched, isDirty, error },
          }) => (
            <TextField
              error={!!error?.message}
              helperText={error?.message}
              onChange={onChange}
              value={value}
              label={"Name"}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Grid>
    </form>
  );
};

export default IngredientForm;
