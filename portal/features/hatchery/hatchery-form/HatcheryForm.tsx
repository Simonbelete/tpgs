import React, { useEffect, useState } from "react";
import { Grid, Tabs, Tab, Stack, Box, tabsClasses } from "@mui/material";
import { Hatchery } from "@/models";
import { useRouter } from "next/router";
import HatcheryInfoZone from "./HatcheryInfoZone";
import HatcheryDangerZone from "./HatcheryDangerZone";
import HatcheryDetailForm from "./HatcheryDetailForm";

function a11yProps(index: number) {
  return {
    id: `hatchery-tab-${index}`,
    "aria-controls": `hatchery-tabpanel-${index}`,
  };
}

const HatcheryForm = ({
  hatchery,
  redirect = true,
}: {
  hatchery?: Hatchery;
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
            <Tab label="Eggs" {...a11yProps(1)} />
            <Tab label="Incubation" {...a11yProps(2)} />
          </Tabs>
          <Box sx={{ pt: 5 }}>
            <Box sx={{ display: tab == 0 ? "block" : "none" }}>
              <HatcheryDetailForm hatchery={hatchery} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} lg={4} xl={2.5}>
          <Stack spacing={3}>
            {hatchery && (
              <>
                <HatcheryInfoZone id={hatchery?.id} />
                <HatcheryDangerZone
                  id={hatchery.id}
                  is_active={hatchery.is_active}
                />
              </>
            )}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default HatcheryForm;
