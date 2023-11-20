import React, { useEffect, useState } from "react";
import { Grid, Stack, Tabs, Tab, Box, tabsClasses } from "@mui/material";
import { Chicken } from "@/models";
import ChickenInfoZone from "./ChickenInfoZone";
import ChickenDangerZone from "./ChickenDangerZone";
import ChickenDetailForm from "./ChickenDetailForm";
import OffspringList from "./OffspringList";
import AncestorsList from "./AncestorsList";
import SiblingsList from "./SiblingsList";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ChickenForm = ({ chicken }: { chicken?: Chicken }) => {
  const [tab, setTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) =>
    setTab(newValue);

  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12} lg={9} xl={10}>
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
              <ChickenDetailForm chicken={chicken} />
            </Box>
            <Box sx={{ display: tab == 1 ? "block" : "none" }}>
              {chicken && <OffspringList id={chicken?.id} />}
            </Box>
            <Box sx={{ display: tab == 2 ? "block" : "none" }}>
              {chicken && <AncestorsList id={chicken?.id} />}
            </Box>
            <Box sx={{ display: tab == 3 ? "block" : "none" }}>
              {chicken && <SiblingsList id={chicken?.id} />}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} lg={3} xl={2}>
          <Stack spacing={3}>
            {chicken && (
              <>
                <ChickenInfoZone id={chicken.id} />
                <ChickenDangerZone chicken={chicken} />
              </>
            )}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default ChickenForm;
