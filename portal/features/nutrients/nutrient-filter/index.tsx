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
} from "@mui/material";
import { SearchInput, SearchInputIcon } from "@/components/inputs";
import { CheckboxDropdown } from "@/components/dropdowns";

interface FilterMenu {
  data: {
    value: number;
    label: string;
  }[];
  selected: string[];
}

const NutrientFilter = () => {
  const [states, setStates] = useState<FilterMenu>({
    data: [
      {
        value: 1,
        label: "Name",
      },
      {
        value: 2,
        label: "Name",
      },
    ],
    selected: [],
  });

  const handleOnStatesChange = (event: SelectChangeEvent) => {};
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
            {/* <SearchInput label="Search..." /> */}
            <SearchInputIcon label="Search..." />

            <Box>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                disableElevation
              >
                Apply
              </Button>
            </Box>
            <Box>
              <Button
                variant="text"
                color="secondary"
                size="small"
                disableElevation
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
              menus={states.data}
              label={"State"}
              selected={states.selected}
              onChange={handleOnStatesChange}
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default NutrientFilter;
