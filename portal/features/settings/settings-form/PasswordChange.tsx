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

type Inputs = {
  old_password: string;
  password: string;
  confirm_password: string;
};

const schema = yup.object({
  old_password: yup.string().required(),
  password: yup.string().length(6).required(),
  confirm_password: yup
    .string()
    .label("confirm password")
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const PasswordChange = () => {
  const { handleSubmit, control, setError } = useForm<Inputs>({
    defaultValues: {},
    // @ts-ignore
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {};

  return (
    <div role="tabpanel" style={{ width: "100%" }}>
      <Box>
        <Box sx={{ mb: 3 }}>
          <Typography fontWeight={600} variant="h6" color="text.primary">
            Account Setting
          </Typography>
          <Divider />
        </Box>
        <Grid container rowSpacing={4} columnSpacing={10}>
          <Grid item xs={12}>
            <Controller
              name={"old_password"}
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
                  label={"Old Password"}
                  placeholder={"Old Password"}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name={"password"}
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
                  label={"New Password"}
                  placeholder={"New Password"}
                  type="password"
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name={"confirm_password"}
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
                  label={"Confirm Password"}
                  placeholder={"Confirm Password"}
                  type="password"
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
                Change Password
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box mt={5}>
        <Box sx={{ mb: 3 }}>
          <Typography fontWeight={600} variant="h6" color="error">
            Delete account
          </Typography>
          <Divider />
        </Box>

        <Button variant="outlined" color="error" onClick={() => {}}>
          Delete account
        </Button>
      </Box>
    </div>
  );
};

export default PasswordChange;
