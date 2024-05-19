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
  LinearProgress,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { SearchInputIcon } from "@/components/inputs";
import buildPage from "@/util/buildPage";

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
  query,
  label,
  onChange,
  selected,
  dataValueKey,
  dataLableKey,
  multiple = true,
  endpoint,
}: {
  query?: object;
  dataValueKey: string;
  dataLableKey: string;
  menus?: object[];
  label: string;
  onChange: (event: SelectChangeEvent) => void;
  selected: object[];
  multiple?: boolean;
  endpoint?: any;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");

  const [trigger, { data, isLoading }] = endpoint.useLazyQuery();

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 15,
  });

  const handleOpen = async () => {
    setOpen(true);
    if (menus !== undefined) return;

    if (options.length == 0) {
      const response = await trigger(
        buildPage(paginationModel),
        false
      ).unwrap();
      setOptions(response?.results || []);
    }
  };
  const handleClose = () => setOpen(false);

  const handleSearchInput = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(event.target.value);
    if (menus !== undefined) return;

    if (event && event.type == "change") {
      const response = await trigger(
        {
          search: event.target.value,
          ...buildPage(paginationModel),
          offset: 0,
        },
        false
      ).unwrap();
      setOptions(response?.results || []);
    }
  };

  const [options, setOptions] = useState<T[]>([]);
  const [position, setPosition] = useState(0);
  const [listboxNode, setListboxNode] = useState<any>("");

  useEffect(() => {
    if (listboxNode !== "") {
      listboxNode.scrollTop = position;
    }
  }, [position, listboxNode]);

  const loadMoreResults = async () => {
    const nextPage = paginationModel.page + 1;
    setPaginationModel({ ...paginationModel, page: nextPage });

    const response = await trigger(
      {
        search: searchInput,
        ...buildPage({ ...paginationModel, page: nextPage }),
      },
      false
    ).unwrap();
    setOptions([...options, ...(response?.results || [])]);
  };

  const handleScroll = (event: any) => {
    if (
      paginationModel.page >=
      Math.floor((data?.count || 0) / paginationModel.pageSize)
    )
      return;

    setListboxNode(event.currentTarget);
    const x = listboxNode.scrollTop + listboxNode.clientHeight;

    if (listboxNode.scrollHeight - x <= 1) {
      setPosition(x);
      loadMoreResults();
    }
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
            PaperProps: {
              style: {
                maxHeight: "400px",
              },
              onScroll: handleScroll,
            },
          }}
        >
          <li
            aria-selected="false"
            role="option"
            onKeyDown={(e) => e.stopPropagation()}
          >
            <Box
              display="flex"
              aria-label="None"
              onClick={(e: any) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              justifyContent="center"
              alignItems="center"
              sx={{ width: "100%" }}
            >
              <Box sx={{ py: 1, px: 1, width: "100%" }}>
                <SearchInputIcon
                  label="Search..."
                  value={searchInput}
                  onChange={handleSearchInput}
                />
              </Box>
            </Box>
          </li>
          {isLoading && <LinearProgress />}

          {/* @ts-ignore */}
          <MenuItem
            key={"isnull"}
            // @ts-ignore
            value={{ __isnull: true }}
            sx={{ paddingLeft: "6px" }}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <Checkbox
              checked={
                Array.isArray(selected) &&
                selected.some((d: any) => d["__isnull"] == true)
              }
              size="small"
              sx={{
                paddingTop: 0,
                paddingBottom: 0,
                paddingRight: "15px",
              }}
            />
            <ListItemText
              disableTypography
              primary={
                <Typography variant="body2" fontSize={14}>
                  --NULL--
                </Typography>
              }
            />
          </MenuItem>

          {options &&
            options.map((e: any, key: any) => (
              // @ts-ignore
              <MenuItem
                key={key}
                value={e}
                sx={{ paddingLeft: "6px" }}
                onKeyDown={(e) => e.stopPropagation()}
              >
                <Checkbox
                  checked={
                    Array.isArray(selected) &&
                    selected.some(
                      (d: any) => d[dataValueKey] == e[dataValueKey]
                    )
                  }
                  size="small"
                  sx={{
                    paddingTop: 0,
                    paddingBottom: 0,
                    paddingRight: "15px",
                  }}
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
