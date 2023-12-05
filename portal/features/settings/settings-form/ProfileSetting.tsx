import React from "react";
import {
  Grid,
  TextField,
  Typography,
  Box,
  Divider,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { LabeledInput } from "@/components/inputs";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { useUpdateUserMutation } from "@/features/users/services";
import { useCRUD } from "@/hooks";
import { User } from "@/models";
import { useSession, signOut } from "next-auth/react";
import { CountryDropdown } from "@/features/countries";
import _ from "lodash";

type Inputs = Partial<User>;

const schema = yup.object({
  name: yup.string().required(),
  country: yup.object(),
  company: yup.string(),
});

const ProfileSetting = () => {
  const { data: session, status } = useSession();

  const [updateUser, updateResult] = useUpdateUserMutation();

  const { handleSubmit, control, setError } = useForm<Inputs>({
    defaultValues: {
      name: session?.user?.name,
    },
    // @ts-ignore
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const body = {
      id: Number(session?.user?.id) || 0,
      name: data.name,
      country: _.get(data, "country.id", null),
      company: data.company,
    };
    await updateUser(body);
  };

  const useCRUDHook = useCRUD({
    results: [updateResult],
    setError: setError,
  });

  return (
    <div role="tabpanel" style={{ width: "100%" }}>
      <Box sx={{ px: 5 }}>
        <Box sx={{ mb: 3 }}>
          <Typography fontWeight={600} variant="h6" color="text.primary">
            Profile
          </Typography>
          <Divider />
        </Box>
        <Grid container rowSpacing={2} columnSpacing={10}>
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
                  label={"Full name"}
                  placeholder={"Full name"}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name={"country"}
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { invalid, isTouched, isDirty, error },
              }) => (
                <CountryDropdown
                  onChange={(_, data) => onChange(data)}
                  value={value}
                  error={!!error?.message}
                  helperText={error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name={"company"}
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
                  label={"Company"}
                  placeholder={"Company"}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Button
                variant="contained"
                size="small"
                onClick={() => handleSubmit(onSubmit)()}
              >
                Update Profile
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ProfileSetting;
