import React, { useImperativeHandle } from "react";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Grid, Button, Paper, FormGroup } from "@mui/material";
import { NutrientGroup } from "@/models";
import service from "../services/nutrient_group_service";
import { LabeledInput } from "@/components/inputs";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

type Inputs = Partial<NutrientGroup>;

const schema = object({
  name: string().required(),
}).required();

const NutrientGroupForm = ({
  actionRef,
  redirect = true,
  nutrient_group,
}: {
  redirect?: boolean;
  nutrient_group?: NutrientGroup;
  actionRef?: React.Ref<unknown>;
}) => {
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      ...nutrient_group,
    },
    // @ts-ignore
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      if (nutrient_group == null) await create(data);
      else await update(data);
    } catch (ex) {
      enqueueSnackbar("Server Error!", { variant: "error" });
    }
  };

  useImperativeHandle(actionRef, () => ({
    create() {
      handleSubmit(onSubmit)();
    },
    createAndNew() {
      handleSubmit(onSubmit)().finally(() =>
        router.push("/nutrient-groups/create")
      );
    },
  }));

  const create = async (data: Partial<NutrientGroup>) => {
    const response = await service.create(data);
    if ((response.status = 201)) {
      enqueueSnackbar("Successfully created!", { variant: "success" });
      if (redirect) router.push("/nutrient-groups");
    }
  };

  const update = async (data: Partial<NutrientGroup>) => {
    delete data.id;
    const response = await service.update(nutrient_group?.id || 0, data);
    if ((response.status = 201)) {
      enqueueSnackbar("Successfully updated!", { variant: "success" });
      router.push("/unit-converters/" + nutrient_group?.id);
    }
  };

  return (
    <Paper sx={{ px: 5, py: 5 }} elevation={6} variant="outlined" square>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          {/* Name */}
          <Grid item xs={12}>
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

export default NutrientGroupForm;
