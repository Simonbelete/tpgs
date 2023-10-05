import React, { useEffect, useState } from "react";
import { Grid, Stack, Tabs, Tab, Box, tabsClasses } from "@mui/material";
import { Ingredient } from "@/models";
import IngredientInfoZone from "./IngredientInfoZone";
import IngredientDangerZone from "./IngredientDangerZone";
import IngredientDetailForm from "./IngredientDetailForm";
import IngredientNutrients from './IngredientNutrients';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const IngredientForm = ({
  ingredient,
}: {
  ingredient?: Ingredient;
}) => {
  const [tab, setTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => setTab(newValue);

  return (
    <>
    <Grid container spacing={2}>
      <Grid item xs>
        <Tabs
          scrollButtons
          value={tab} onChange={handleTabChange} aria-label="basic tabs example"
          sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              '&.Mui-disabled': { opacity: 0.3 },
            },
          }}
          >
          <Tab label="Detail" {...a11yProps(0)} />
          <Tab label="Nutrients" {...a11yProps(1)} />
        </Tabs>
        <Box sx={{pt: 5}}>
          {tab == 0 && <IngredientDetailForm ingredient={ingredient} />}
          {tab == 1 && <IngredientNutrients id={ingredient?.id} />}
        </Box>
      </Grid>
      <Grid item xs={12} lg={3} xl={2.5}>
        <Stack spacing={3}>
          {ingredient && (
            <>
            <IngredientInfoZone id={ingredient?.id} />
            <IngredientDangerZone id={ingredient.id} is_active={ingredient.is_active} />
            </>
          )}
        </Stack>
      </Grid>
    </Grid>
    </>
  );
};

export default IngredientForm;
