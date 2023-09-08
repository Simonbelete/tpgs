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
import { NutrientGroup } from "@/models";
import { setNutrientGroups, removeNutrientGroupById, setSearch, clearAll } from "../slices";
import { RootState } from "@/store";

const NutrientFilter = () => {
  const dispatch = useDispatch();
  const nutrientGroups = useSelector((state: RootState) => state.nutrientFilter.nutrient_groups);

  const handleOnNutrientGroupChange = (event: SelectChangeEvent) => {
      dispatch(setNutrientGroups(event.target.value as any))
      // setNutrientGroups(event.target.value as any);
  }

  const handleDeleteNutrientGroup = (data: NutrientGroup) => () => {
    dispatch(removeNutrientGroupById(data.id));
  }

  const handleSearchButton = () => {

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
        <Grid item xs={12}>
          <Stack>
            {nutrientGroups.map((e, key) => 
              <ListItem key={key}>
                <Chip
                  label={`Nutrient Group: ${e.name}`}
                  size="small"
                  onDelete={handleDeleteNutrientGroup(e)}
                />
              </ListItem>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default NutrientFilter;
