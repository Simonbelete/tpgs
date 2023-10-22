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
  name: string;
};

const schema = yup.object({
  name: yup.string().required(),
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
