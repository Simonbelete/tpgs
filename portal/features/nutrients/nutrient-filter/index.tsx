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
import { SearchInput } from "@/components/inputs";
import { CheckboxDropdown } from "@/components/dropdowns";
import { NutrientGroup } from "@/models";

interface FilterMenu {
  data: {
    value: number;
    label: string;
  }[];
  selected: string[];
}

const NutrientFilter = () => {
  const [nutrientGroups, setNutrientGroups] = useState<NutrientGroup[]>([]);

  const handleOnNutrientGroupChange = (event: SelectChangeEvent) => {
    console.log('****')
    console.log(event.target.value)
    // if(event.target.value[0] != undefined)
      setNutrientGroups(event.target.value as any);
  }
  
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
            <SearchInput label="Search..." />

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
              url="/nutrient-groups"
              dataValueKey="id"
              dataLableKey="name"
              label={"Nutrient Group"}
              selected={nutrientGroups}
              onChange={handleOnNutrientGroupChange}
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
