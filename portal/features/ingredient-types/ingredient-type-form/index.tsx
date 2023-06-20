import React from "react";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Grid, TextField, Button, Paper } from "@mui/material";
import { LabeledInput } from "@/components/inputs";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { IngredientType } from "@/models";
import errorToForm from "@/util/errorToForm";
import ingredient_type_services from "../services/ingredient_type_services";

type Inputs = Partial<IngredientType>;

const schema = object({
  name: string().required(),
}).required();

const IngredientTypeForm = ({
  ingredient_type,
  redirect = true,
}: {
  ingredient_type?: IngredientType;
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
      ...ingredient_type,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      if (ingredient_type == null) await create(data);
      else await update(data);
    } catch (ex: any) {
      if (ex.response.status == 400) {
        errorToForm(ex.response.data, setError);
      } else {
        enqueueSnackbar("Server Error!", { variant: "error" });
      }
    }
  };

  const create = async (data: Partial<IngredientType>) => {
    const response = await ingredient_type_services.create(data);
    if ((response.status = 201)) {
      enqueueSnackbar("Successfully created!", { variant: "success" });
      if (redirect) router.push("/ingredient-types");
    }
  };

  const update = async (data: Partial<IngredientType>) => {
    delete data.id;
    const response = await ingredient_type_services.update(
      ingredient_type?.id || 0,
      data
    );
    if ((response.status = 201)) {
      enqueueSnackbar("Successfully updated!", { variant: "success" });
      router.push("/ingredient-types/" + ingredient_type?.id);
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

export default IngredientTypeForm;
