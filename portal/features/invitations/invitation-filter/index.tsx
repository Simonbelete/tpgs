import React, { useState } from "react";
import {
  Paper,
  Stack,
  Box,
  Grid,
  Typography,
  Divider,
  SelectChangeEvent,
  Button,
  ListItem,
  Chip
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { SearchInput } from "@/components/inputs";
import { CheckboxDropdown } from "@/components/dropdowns";
import { setSearch, clearAll, setInvitationState, removeInvitationState } from "../slices";
import { RootState } from "@/store";
import { DatePicker } from "@/components";

const InvitationFilter = () => {
  const dispatch = useDispatch();
  const invitationStateMenu = [
    {name: 'Accepted', value: true},
    {name: 'Pending', value: false}
  ]
  
  const filterState = useSelector((state: RootState) => state.invitationFilter);

  const handleInvitationStateChange = (event: SelectChangeEvent) => dispatch(setInvitationState(event.target.value as any));
  const handleInvitationStateRemove = (data: any) => () => dispatch(removeInvitationState(data.name));

  const handleSearchButton = () => {}
  
  return (
    <Paper sx={{ p: 2 }} elevation={0} variant="outlined" square>
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
                menus={invitationStateMenu}
                dataValueKey="value"
                dataLableKey="name"
                label={"Invitation State"}
                selected={filterState.invitationState}
                onChange={handleInvitationStateChange}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} >
            <DatePicker />
          </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Stack>
            {filterState.invitationState.map((e: any, key) => 
              <ListItem key={key}>
                  <Chip
                    label={`State: ${e.name}`}
                    size="small"
                    onDelete={handleInvitationStateRemove(e)}
                  />
                </ListItem>)}
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default InvitationFilter;
