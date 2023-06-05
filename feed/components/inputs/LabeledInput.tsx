import {
  FormControl,
  InputLabel,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import React from "react";

const LabeledInput = (props: TextFieldProps) => {
  return (
    <Stack gap={1}>
      <Typography variant="body2" fontWeight={700}>
        {props.label}
      </Typography>
      <TextField
        {...props}
        label={props.value ? "" : props.label}
        InputLabelProps={{ shrink: false }}
      />
    </Stack>
  );
};

export default LabeledInput;
