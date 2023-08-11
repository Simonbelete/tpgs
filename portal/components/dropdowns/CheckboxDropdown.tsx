import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  SelectChangeEvent,
  Checkbox,
  ListItemText,
  InputBase,
} from "@mui/material";
import { styled } from "@mui/material/styles";

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
    fontSize: 14,
    width: "100%",
    padding: "6px 10px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: ["Inter", "sans-serif"].join(","),
    "&:focus": {
      // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
  "& .MuiFormLabel-root": {
    color: "red !important",
    border: "1px solid red",
  },
}));

const CheckboxDropdown = ({
  menus,
  label,
}: {
  menus: { value: string; label: string }[];
  label: string;
}) => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    // const {
    //   target: { value },
    // } = event;
    // setPersonName(
    //   // On autofill we get a stringified value.
    //   typeof value === 'string' ? value.split(',') : value,
    // );
  };
  return (
    <div>
      <FormControl sx={{ minWidth: 130 }}>
        <InputLabel htmlFor="demo-multiple-checkbox-label" sx={{ top: "15px" }}>
          {label}
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          multiple
          // @ts-ignore
          value={selected}
          renderValue={(selected) => <span>{label}</span>}
          onChange={handleChange}
          input={<BootstrapInput />}
          size="small"
        >
          <MenuItem value={"name"}>
            <Checkbox checked={false} size="small" />
            <ListItemText primary={"name"} />
          </MenuItem>
          <MenuItem value={"name"}>
            <Checkbox checked={false} />
            <ListItemText primary={"name"} />
          </MenuItem>
          {/* {menus.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={false} />
              <ListItemText primary={name} />
            </MenuItem>
          ))} */}
        </Select>
      </FormControl>
    </div>
  );
};

export default CheckboxDropdown;
