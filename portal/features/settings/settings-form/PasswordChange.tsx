import React, { useEffect } from "react";
import { Grid, Typography, Box, Divider, Button } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { LabeledInput } from "@/components/inputs";
import {
  useChangePasswordMutation,
  useDeactivateAccountMutation,
} from "@/features/auth/services";
import { ChangePassword } from "@/models";
import { useCRUD } from "@/hooks";
import { signOut } from "next-auth/react";

type Inputs = ChangePassword;

const schema = yup.object({
  old_password: yup.string().required(),
  password: yup.string().length(6).required(),
  confirm_password: yup
    .string()
    .label("confirm password")
    .required()
    .oneOf([yup.ref("password"), ""], "Passwords must match"),
});

const PasswordChange = () => {
  const [changePassword, changePasswordResult] = useChangePasswordMutation();
  const [deactivateAccount, deactivateAccountResult] =
    useDeactivateAccountMutation();

  const { handleSubmit, control, setError } = useForm<Inputs>({
    defaultValues: {},
    // @ts-ignore
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await changePassword(data);
  };

  const handleDeleteAccount = async () => {
    const response = await deactivateAccount(null);
  };

  useEffect(() => {
    if (changePasswordResult.isSuccess || deactivateAccountResult.isSuccess) {
      signOut();
    }
  }, [changePasswordResult.isSuccess, deactivateAccountResult.isSuccess]);

  const useCRUDHook = useCRUD({
    results: [changePasswordResult],
    setError: setError,
  });

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
                fieldState: { error },
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
                fieldState: { error },
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
                fieldState: { error },
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

        <Button variant="outlined" color="error" onClick={handleDeleteAccount}>
          Delete account
        </Button>
      </Box>
    </div>
  );
};

export default PasswordChange;
