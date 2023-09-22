import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Grid, Button, Paper, Stack, Box } from "@mui/material";
import { House } from "@/models";
import { LabeledInput } from "@/components/inputs";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import { Card } from '@/components/card';
import SaveIcon from '@mui/icons-material/Save';
import HouseInfoZone from "./HouseInfoZone";
import HouseDangerZone from "./HouseDangerZone";
import { useCreateHouseMutation, useUpdateHouseMutation } from "../services";
import { useCRUD } from "@/hooks";

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

  const [createHouse, createResult ] = useCreateHouseMutation();
  const [updateHouse, updateResult ] = useUpdateHouseMutation();

  const { handleSubmit, control, setError } = useForm<Inputs>({
    defaultValues: {
      ...house,
    },
    // @ts-ignore 
    resolver: yupResolver(schema),
  });

  const useCRUDHook = useCRUD({
    results: [
      createResult,
      updateResult
    ],
    setError: setError
  })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (house == null) await createHouse(data);
    else await updateHouse({...data, id: house.id});
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
            <>
            <HouseInfoZone id={house?.id} />
            <HouseDangerZone id={house.id} is_active={house.is_active} />
            </>
          )}
        </Stack>
      </Grid>
    </Grid>
    </>
  );
};

export default HouseForm;
