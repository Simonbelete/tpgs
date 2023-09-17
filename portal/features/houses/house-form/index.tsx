import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Grid, Button, Paper, Stack, Box } from "@mui/material";
import { House } from "@/models";
import house_service from "../services/house_service";
import { LabeledInput } from "@/components/inputs";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import CloseIcon from "@mui/icons-material/Close";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { Card, DangerZoneCard, InfoZoneCard } from '@/components/card';
import SaveIcon from '@mui/icons-material/Save';
import HouseInfoZone from "./HouseInfoZone";

type Inputs = Partial<House>;

const schema = yup
  .object({
    name: yup.string().required(),
}).required();

const HouseForm = ({
  house,
  redirect = true,
}: {
  house?: House;
  redirect?: boolean;
}) => {
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      ...house,
    },
    // @ts-ignore
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      if (house == null) await create(data);
      else await update(data);
    } catch (ex) {
      enqueueSnackbar("Server Error!", { variant: "error" });
    }
  };

  const create = async (data: Partial<House>) => {
    const response = await house_service.create(data);
    if ((response.status = 201)) {
      enqueueSnackbar("Successfully created!", { variant: "success" });
      if (redirect) router.push("/houses");
    }
  };

  const update = async (data: Partial<House>) => {
    delete data.id;
    const response = await house_service.update(house?.id || 0, data);
    if ((response.status = 201)) {
      enqueueSnackbar("Successfully updated!", { variant: "success" });
      router.push("/houses/" + house?.id);
    }
  };

  return (
    <>
    <Grid container spacing={4}>
      <Grid item xs={9}>
        <Card title="House Form">
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
          </Grid>
          </form>
        </Card>
        <Box sx={{mt: 5}}>
        <Stack
            spacing={2}
            direction={"row"}
            justifyContent="flex-start"
            alignItems="center"
          >
            <Box>
              <Button
                variant="contained"
                size="small"
                startIcon={<SaveIcon />}
                onClick={() => handleSubmit(onSubmit)()}
              >
                Save
              </Button>
            </Box>
            <Box>
              <Button
                variant="outlined"
                color="error"
                size="small"
                startIcon={<CloseIcon />}
                onClick={() => router.push("/houses")}
              >
                Cancel
              </Button>
            </Box>
          </Stack>
      </Box>
      </Grid>
      <Grid item xs={3}>
        <Stack spacing={3}>
          {house && (
            <HouseInfoZone id={house?.id} />
          )}
          <DangerZoneCard />
        </Stack>
      </Grid>
    </Grid>
    </>
  );
};

export default HouseForm;
