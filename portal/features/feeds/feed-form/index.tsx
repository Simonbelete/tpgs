import React from "react";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Grid, Button, Paper, FormGroup } from "@mui/material";
import { Feed } from "@/models";
import service from "../services/feed_service";
import { LabeledInput } from "@/components/inputs";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

type Inputs = Partial<Feed>;

const schema = object({
  name: string().required(),
}).required();

const FeedForm = ({
  redirect = true,
  feed,
}: {
  redirect?: boolean;
  feed?: Feed;
}) => {
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      ...feed,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      if (feed == null) await create(data);
      else await update(data);
    } catch (ex) {
      enqueueSnackbar("Server Error!", { variant: "error" });
    }
  };

  const create = async (data: Partial<Feed>) => {
    const response = await service.create(data);
    if ((response.status = 201)) {
      enqueueSnackbar("Successfully created!", { variant: "success" });
      if (redirect) router.push("/feeds");
    }
  };

  const update = async (data: Partial<Feed>) => {
    delete data.id;
    const response = await service.update(nutrient_group?.id || 0, data);
    if ((response.status = 201)) {
      enqueueSnackbar("Successfully updated!", { variant: "success" });
      router.push("/feeds/" + nutrient_group?.id);
    }
  };

  return (
    <Paper sx={{ px: 5, py: 5 }} elevation={6} variant="outlined" square>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          {/* Name */}
          <Grid item xs={12}>
            <Controller
              name={"weight"}
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

export default FeedForm;
