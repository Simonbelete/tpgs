import React, { useState } from "react";
import {
  Paper,
  Stack,
  Box,
  Grid,
  Typography,
  Divider,
  Button,
  ListItem,
  Chip,
  SelectChangeEvent
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { SearchInput } from "@/components/inputs";
import { CheckboxDropdown } from "@/components/dropdowns";
import { regionListSlice } from "./slice";
import { RootState } from "@/store";

const RegionFilter = () => {
  const dispatch = useDispatch();
  const activeMenu = [
    {name: 'Active', value: true},
    {name: 'Deactive', value: false}
  ]
  
  const selector = useSelector((state: RootState) => state.regionList);

  const handleSearchButton = () => dispatch(regionListSlice.actions.reset());
  
  return (
    <Paper sx={{ p: 2 }} elevation={0} variant="outlined" square id="invitation-filter">
      <Grid container alignItems={"center"}>
        <Grid item xs={12} md={4}>
          <Typography variant="body2" fontWeight={700}>
            ADVANCED SEARCH
          </Typography>
        </Grid>
        <Grid item xs={12} md />
        <Grid item xs={12} md={4}>
          <Stack
            direction={{xs: "column", md: "row"}}
            justifyContent={{ xs: "start", md: "end" }}
            spacing={2}
          >
            <SearchInput label="Search..."  onChange={(event: React.ChangeEvent<HTMLInputElement>) => dispatch(regionListSlice.actions.setSearch(event.target.value)) }/>

            <Stack
            direction="row"
            justifyContent={{ xs: "start", md: "end" }}
            spacing={2}
          >
            <Box>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                disableElevation
                onClick={handleSearchButton}
              >
                Search
              </Button>
            </Box>
            <Box>
              <Button
                variant="text"
                color="secondary"
                size="small"
                disableElevation
                onClick={() => dispatch(regionListSlice.actions.reset())}
              >
                Clear
              </Button>
            </Box>
          </Stack>

          </Stack>
        </Grid>
      </Grid>
      <Divider sx={{ my: 1 }} />
    </Paper>
  );
};

export default RegionFilter;
