import React, { useEffect, useState } from "react";
import { Grid, Stack, Tabs, Tab, Box, tabsClasses } from "@mui/material";
import { Chicken } from "@/models";
import ChickenInfoZone from "./ChickenInfoZone";
import ChickenDangerZone from "./ChickenDangerZone";
import ChickenDetailForm from "./ChickenDetailForm";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ChickenForm = ({
  chicken,
}: {
  chicken?: Chicken;
}) => {
  const [tab, setTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => setTab(newValue);

  return (
    <>
    <Grid container spacing={5}>
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
          <Tab label="Offspring" {...a11yProps(1)} />
          <Tab label="Ancestors" {...a11yProps(1)} />
          <Tab label="Siblings" {...a11yProps(2)} />
        </Tabs>
        <Box sx={{pt: 5}}>
          {tab == 0 && <ChickenDetailForm chicken={chicken} />}
        </Box>
      </Grid>
      <Grid item xs={12} lg={4} xl={2.5}>
        <Stack spacing={3}>
          {chicken && (
            <>
            <ChickenInfoZone id={chicken?.id} />
            <ChickenDangerZone id={chicken.id} is_active={chicken.is_active} />
            </>
          )}
        </Stack>
      </Grid>
    </Grid>
    </>
  );
};

export default ChickenForm;
