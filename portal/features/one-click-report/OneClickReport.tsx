import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StatusCard from "./components/StatsuCard";
import { useLazyGetMortalityRateQuery } from "./services";
import Filter from "./Filter";
import MortalityRate from "./MortalityRate";
import _ from "lodash";

export const OneClickReport = () => {
  const [mortalityRateTrigger, { data: mortalityRateData }] =
    useLazyGetMortalityRateQuery();

  const onSubmit = (values: any) => {
    const query = {
      hatchery: _.get(values.hatchery, "id", null),
      generation: _.get(values.generation, "id", null),
      breed: _.get(values.breed, "id", null),
      house: _.get(values.house, "id", null),
      pen: _.get(values.pen, "id", null),
      sex: _.get(values.sex, "value", null),
    };

    mortalityRateTrigger(query);
  };

  return (
    <Box display={"flex"} flexDirection={"column"} gap={5}>
      <Filter onSubmit={onSubmit} />
      <Box></Box>

      <Box>
        <Typography fontWeight={600} color="text.secondary">
          Total
        </Typography>
        <Stack rowGap={2} columnGap={5} direction={"row"} flexWrap={"wrap"}>
          <StatusCard
            title="Total chickens"
            value={100}
            subttile="# Chickens"
          />
          <StatusCard
            title="Alive chickens"
            value={100}
            subttile="# Alive chickens"
            percentage={10}
          />
          <StatusCard
            title="Dead chickens"
            value={100}
            subttile="# Dead chickens"
            percentage={10}
          />
          <StatusCard
            title="Male chickens"
            value={100}
            subttile="# Male Chickens"
          />
          <StatusCard
            title="Female chickens"
            value={100}
            subttile="# Female chickens"
            percentage={10}
          />
          <StatusCard
            title="Unknown chickens"
            value={100}
            subttile="# Unknown chickens"
            percentage={10}
          />
          <StatusCard
            title="Hatch Date"
            value={"10/200"}
            subttile="# Data availability"
            percentage={10}
          />
          <StatusCard
            title="Seted Parent"
            value={"10/200"}
            subttile="# Data availability"
            percentage={10}
          />
        </Stack>
      </Box>
      <Box>
        <MortalityRate data={mortalityRateData} />
      </Box>
    </Box>
  );
};
