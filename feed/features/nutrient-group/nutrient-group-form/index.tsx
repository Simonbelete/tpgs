import React from "react";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Grid, Button, Paper, FormGroup } from "@mui/material";
import { NutrientGroup } from "@/models";
import service from "../services/nutrient_group_service";
import { LabeledInput } from "@/components/inputs";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { alertSuccess } from "@/util/alert";
import { useSnackbar } from "notistack";

type Inputs = Partial<NutrientGroup>;

const schema = object({
  name: string().required(),
}).required();

const NutrientGroupForm = ({ redirect }: { redirect?: boolean }) => {
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await service.create(data);
      if ((response.status = 201)) {
        enqueueSnackbar("Successfully created!", { variant: "success" });
        if (redirect) router.push("/nutrient-groups");
      }
    } catch (ex) {
      enqueueSnackbar("Server Error!", { variant: "error" });
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
