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
import { RootState } from "@/store";
import { filterSlice } from "@/store/slices";

const InvitationFilter = () => {
  const dispatch = useDispatch();
  const activeMenu = [
    {name: 'Active', value: true},
    {name: 'Deactive', value: false}
  ]
  const invitationStateMenu = [
    {name: 'Accepted', value: true},
    {name: 'Pending', value: false}
  ]
  
  const selector = useSelector((state: RootState) => state.filter);

  const handleActiveChange = (event: SelectChangeEvent) => dispatch(filterSlice.actions.setIsActive((event.target.value as any).value))

  const handleSearchButton = () => dispatch(filterSlice.actions.reset());

  const handleInvitationStateChange = (event: SelectChangeEvent) => dispatch(filterSlice.actions.pushFilter({key: 'accepted', value: event.target.value as any}));
  const handleInvitationStateRemove = (data: any) => () => dispatch(filterSlice.actions.popFilter({key: 'accepted', value: data}));
  
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
            <SearchInput label="Search..."  onChange={(event: React.ChangeEvent<HTMLInputElement>) => dispatch(filterSlice.actions.setSearch(event.target.value)) }/>

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
                onClick={() => dispatch(filterSlice.actions.reset())}
              >
                Clear
              </Button>
            </Box>
          </Stack>

          </Stack>
        </Grid>
      </Grid>
      <Divider sx={{ my: 1 }} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
            <Stack direction={"row"}>
              <CheckboxDropdown
                menus={invitationStateMenu}
                dataValueKey="value"
                dataLableKey="name"
                label={"Invitation State"}
                selected={selector.filters['accepted'] || []}
                onChange={handleInvitationStateChange}
              />
            </Stack>
          </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Stack direction={"row"}>
            {selector.filters['accepted'] && selector.filters['accepted'].map((e: any, key: any) => 
              <Chip key={key}
                    label={`State: ${e.name}`}
                    size="small"
                    onDelete={handleInvitationStateRemove(e)}
                  />)}
          </Stack>
        </Grid>
      </Grid>
      {/* <Grid container spacing={2}>
        <Grid item xs={12}>
            <Stack direction={"row"}>
              <CheckboxDropdown
                multiple={false}
                menus={activeMenu}
                dataValueKey="value"
                dataLableKey="name"
                label={"Active"}
                selected={[{value: selector.is_active}]}
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
                    label={`State: ${selector.is_active}`}
                    size="small"
                    onDelete={() => {}}
                />
                </ListItem>
          </Stack>
        </Grid> 
      </Grid> */}
    </Paper>
  );
};

export default InvitationFilter;
