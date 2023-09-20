import React, { useState, useRef, useEffect } from "react";
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
  LinearProgress
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { SearchInputIcon } from "../inputs";
import client from "@/services/client";

const WIDTH = 150

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
  url,
  menus,
  label,
  onChange,
  selected,
  dataValueKey,
  dataLableKey,
  multiple=true
}: {
  url?: string,
  dataValueKey: string;
  dataLableKey: string;
  menus?: object[];
  label: string;
  onChange: (event: SelectChangeEvent) => void;
  selected: object[];
  multiple?: boolean;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<object[]>([...(menus || [])])
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState<string>("");

  const handleOpen = async () => {
    setOpen(true);
    if(url != null && data.length == 0) loadData();
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value)
    loadData(event.target.value);
  }

  const loadData = async (search?: string) => {
    if(url == null) return;
    
    setLoading(true)
    try{
      const response = await client.get(url, {params: {limit: 10, search: search}});
      setData(response.data.results);
    }catch(ex){

    }finally {
      setLoading(false);
    }
  }

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
          value={selected}
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
          // onAnimationEndCapture={() => inputRef.current.focus()}
        >
          <li aria-selected="false" role="option">
            <Box display="flex" aria-label="None" onClick={(e: any) => {
                e.preventDefault(); 
                e.stopPropagation();
              }} justifyContent="center" alignItems="center" sx={{width: WIDTH}}>
              <Box sx={{py: 1, px: 1}}>
                <SearchInputIcon label="Search..." value={searchInput} onChange={handleSearchInput}/>
              </Box>
            </Box>
          </li>
          {loading && <LinearProgress />}
          
          {data.map((e, key) => (
            // @ts-ignore
            <MenuItem key={key} value={e} sx={{ paddingLeft: "6px" }}>
              <Checkbox
                // @ts-ignore
                checked={selected && selected.some((d) => d[dataValueKey] == e[dataValueKey])}
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
};

export default CheckboxDropdown;
