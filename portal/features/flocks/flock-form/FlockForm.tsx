import React, { useEffect, useState } from "react";
import { Grid, Stack, Box, Tabs, Tab, tabsClasses } from "@mui/material";
import { Flock } from "@/models";
import { useRouter } from "next/router";
import FlockInfoZone from "./FlockInfoZone";
import FlockDangerZone from "./FlockDangerZone";
import FlockDetailForm from "./FlockDetailForm";

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
          <Box sx={{ pt: 5 }}>
            <FlockDetailForm flock={flock} />
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
