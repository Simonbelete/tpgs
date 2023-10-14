import React, { useEffect, useState } from "react";
import { Grid, Stack, Box, Tabs, Tab, tabsClasses } from "@mui/material";
import { Flock } from "@/models";
import { useRouter } from "next/router";
import FlockInfoZone from "./FlockInfoZone";
import FlockDangerZone from "./FlockDangerZone";
import FlockDetailForm from "./FlockDetailForm";
import { FlockAccusationList } from "../../flock-accusation/flock-accusation-list";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const FlockForm = ({
  flock,
  redirect = true,
}: {
  flock?: Flock;
  redirect?: boolean;
}) => {
  const router = useRouter();
  const [tab, setTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) =>
    setTab(newValue);

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={8} xl={9.5}>
          <Tabs
            scrollButtons
            value={tab}
            onChange={handleTabChange}
            aria-label="basic tabs example"
            sx={{
              [`& .${tabsClasses.scrollButtons}`]: {
                "&.Mui-disabled": { opacity: 0.3 },
              },
            }}
          >
            <Tab label="Detail" {...a11yProps(0)} />
            <Tab label="Offspring" {...a11yProps(1)} />
            <Tab label="Ancestors" {...a11yProps(2)} />
            <Tab label="Siblings" {...a11yProps(3)} />
          </Tabs>
          <Box sx={{ pt: 5 }}>
            <Box sx={{ display: tab == 0 ? "block" : "none" }}>
              <FlockDetailForm flock={flock} />
            </Box>
            <Box sx={{ display: tab == 1 ? "block" : "none" }}>
              <FlockAccusationList />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} lg={4} xl={2.5}>
          <Stack spacing={3}>
            {flock && (
              <>
                <FlockInfoZone id={flock?.id} />
                <FlockDangerZone id={flock.id} is_active={flock.is_active} />
              </>
            )}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default FlockForm;
