import React from "react";
import { Drawer, List, Paper, Stack, Box, Grid } from "@mui/material";
import { SearchInput } from "@/components/inputs";
import { CheckboxDropdown } from "@/components/dropdowns";

const InvitationFilter = () => {
  return (
    <Paper sx={{ p: 2 }} elevation={0} variant="outlined" square>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <SearchInput label="Search..." />
        </Grid>
        <Grid item xs={12}>
          <Stack direction={"row"}>
            <CheckboxDropdown menus={[]} label={"State"} />
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default InvitationFilter;
