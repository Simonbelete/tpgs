import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Checkbox,
  ListItemText,
  InputBase,
  Typography,
  Box,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { SearchInputIcon } from "../inputs";

const WIDTH = 150;

const BootstrapInput = styled(InputBase)(({ theme }) => ({
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

export default function CheckboxDropdown<T>({
  menus,
  label,
  onChange,
  selected,
  dataValueKey,
  dataLableKey,
  multiple = true,
}: {
  dataValueKey: string;
  dataLableKey: string;
  menus?: object[];
  label: string;
  onChange: (event: SelectChangeEvent) => void;
  selected: object[];
  multiple?: boolean;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ minWidth: WIDTH }}>
        <InputLabel
          shrink={false}
          htmlFor="demo-multiple-checkbox-label"
          sx={{ top: "-8px", fontSize: "13px", "&:focus": { color: "red" } }}
        >
          {label}
        </InputLabel>
        <Select
          open={open}
          onOpen={handleOpen}
          onClose={handleClose}
          multiple={multiple}
          // @ts-ignore
          value={
            multiple ? (Array.isArray(selected) ? selected : []) : selected
          }
          renderValue={(selected) => <></>}
          onChange={onChange}
          input={<BootstrapInput />}
          size="small"
          MenuProps={{
            MenuListProps: {
              style: {
                paddingTop: 0,
                paddingBottom: 10,
              },
            },
          }}
        >
          <li aria-selected="false" role="option">
            <Box
              display="flex"
              aria-label="None"
              onClick={(e: any) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              justifyContent="center"
              alignItems="center"
              sx={{ width: WIDTH }}
            >
              <Box sx={{ py: 1, px: 1 }}>
                <SearchInputIcon
                  label="Search..."
                  value={searchInput}
                  onChange={handleSearchInput}
                />
              </Box>
            </Box>
          </li>

          {menus &&
            menus.map((e: any, key: any) => (
              // @ts-ignore
              <MenuItem key={key} value={e} sx={{ paddingLeft: "6px" }}>
                <Checkbox
                  checked={
                    Array.isArray(selected) &&
                    selected.some(
                      (d: any) => d[dataValueKey] == e[dataValueKey]
                    )
                  }
                  size="small"
                  sx={{ paddingTop: 0, paddingBottom: 0, paddingRight: "15px" }}
                />
                <ListItemText
                  disableTypography
                  primary={
                    <Typography variant="body2" fontSize={14}>
                      {/* @ts-ignore */}
                      {e[dataLableKey]}
                    </Typography>
                  }
                />
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
