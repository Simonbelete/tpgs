import React from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase, { InputBaseProps } from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    // backgroundColor: theme.palette.mode === "light" ? "#F3F6F9" : "#1A2027",
    backgroundColor: "#fff",
    border: "1px solid",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    fontSize: 16,
    width: "100%",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const BootstrapInputComponent = ({
  label,
  error,
  helperText,
  ...props
}: InputBaseProps & any) => {
  return (
    <FormControl variant="standard" fullWidth error={error}>
      <InputLabel shrink htmlFor="bootstrap-input">
        {label}
      </InputLabel>
      <BootstrapInput {...props} defaultValue="" id="bootstrap-input" />
    </FormControl>
  );
};

export default BootstrapInputComponent;
