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
import { setSearch, clearAll, setActive } from "../slices";
import { RootState } from "@/store";

const HouseFilter = () => {
  const dispatch = useDispatch();
  const activeMenu = [
    {name: 'Active', value: true},
    {name: 'Deactive', value: false}
  ]
  
  const filterState = useSelector((state: RootState) => state.houseFilter);

  const handleActiveChange = (event: SelectChangeEvent) => dispatch(setActive(event.target.value as any));

  const handleSearchButton = () => {}
  
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
            direction="row"
            justifyContent={{ xs: "start", md: "end" }}
            spacing={2}
          >
            <SearchInput label="Search..."  onChange={(event: React.ChangeEvent<HTMLInputElement>) => dispatch(setSearch(event.target.value)) }/>

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
                onClick={() => dispatch(clearAll())}
              >
                Clear
              </Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>
      <Divider sx={{ my: 1 }} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
            <Stack direction={"row"}>
              <CheckboxDropdown
                menus={activeMenu}
                dataValueKey="value"
                dataLableKey="name"
                label={"Active"}
                selected={[{value: filterState.active}]}
                onChange={handleActiveChange}
              />
            </Stack>
          </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Stack>
              <ListItem>
                  <Chip
                    label={`State: ${filterState.active}`}
                    size="small"
                    onDelete={() => {}}
                />
                </ListItem>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default HouseFilter;
