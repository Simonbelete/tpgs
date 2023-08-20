import React, { useState, useRef } from "react";
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
  MenuList,
  Typography,
  TextField,
  Box
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { SearchInputIcon } from "../inputs";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  // "label + &": {
  //   marginTop: theme.spacing(3),
  // },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "#fff",
    border: "1px solid",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    fontSize: 14,
    width: "100%",
    padding: "4px 10px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: ["Inter", "sans-serif"].join(","),
    "&:focus": {
      borderColor: alpha(theme.palette.secondary.dark, 0.3),
      color: alpha(theme.palette.secondary.dark, 0.3),
    },
  },
}));

const CheckboxDropdown = ({
  menus,
  label,
  onChange,
  selected,
}: {
  menus: { value: string | number; label: string }[];
  label: string;
  onChange: (event: SelectChangeEvent) => void;
  selected: string[];
}) => {
  const inputRef = useRef<any>();
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
        <InputLabel
          shrink={false}
          htmlFor="demo-multiple-checkbox-label"
          sx={{ top: "-8px", fontSize: "13px", "&:focus": { color: "red" } }}
        >
          {label}
        </InputLabel>
        <Select      
          labelId="demo-multiple-checkbox-label"
          multiple
          open
          // @ts-ignore
          value={selected}
          renderValue={(selected) => <></>}
          onChange={onChange}
          input={<BootstrapInput />}
          size="small"
          MenuProps={{
            MenuListProps: {
              style: {
                paddingTop: 0,
                paddingBottom: 0,
              },
            },
          }}
          // onAnimationEndCapture={() => inputRef.current.focus()}
        >
          <Box display="flex" justifyContent="center" alignItems="center" sx={{width: 130}}>
            <Box sx={{py: 1, px: 1}}>
              <SearchInputIcon ref={inputRef} label="Search..."/>
            </Box>
          </Box>
          {menus.map((e, key) => (
            <MenuItem key={key} value={"name"} sx={{ paddingLeft: "6px" }}>
              <Checkbox
                checked={false}
                size="small"
                sx={{ paddingTop: 0, paddingBottom: 0, paddingRight: "15px" }}
              />
              <ListItemText
                disableTypography
                primary={
                  <Typography variant="body2" fontSize={14}>
                    {e.label}
                  </Typography>
                }
              />
            </MenuItem>
          ))}

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
