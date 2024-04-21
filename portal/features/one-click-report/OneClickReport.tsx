import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StatusCard from "./components/StatsuCard";
import {
  useLazyGetChickensRecordsetQualityQuery,
  useLazyGetChickensSummaryQuery,
  useLazyGetMortalityRateQuery,
} from "./services";
import Filter from "./Filter";
import MortalityRate from "./MortalityRate";
import _ from "lodash";
import DataSummary from "./DataSummary";

export const OneClickReport = () => {
  const [chickenSummaryTrigger, { data: chickenSummary }] =
    useLazyGetChickensSummaryQuery();
  const [mortalityRateTrigger, { data: mortalityRateData }] =
    useLazyGetMortalityRateQuery();
  const [getQualityTrigger, { data: qualityData }] =
    useLazyGetChickensRecordsetQualityQuery();

  const onSubmit = (values: any) => {
    const query = {
      hatchery: _.get(values.hatchery, "id", null),
      generation: _.get(values.generation, "id", null),
      breed: _.get(values.breed, "id", null),
      house: _.get(values.house, "id", null),
      pen: _.get(values.pen, "id", null),
      sex: _.get(values.sex, "value", null),
    };

    chickenSummaryTrigger(query);
    mortalityRateTrigger(query);
    getQualityTrigger(query);
  };

  const calcPercentage = (x: number, y: number) => {
    if (y == 0) return 0;
    return Number(((x / y) * 100).toFixed(1));
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
            value={_.get(chickenSummary, "chicken.total", "!")}
            subttile="# Chickens"
          />
          <StatusCard
            title="Alive chickens"
            value={_.get(chickenSummary, "chicken.alive", "!")}
            subttile="# Alive chickens"
            percentage={calcPercentage(
              _.get(chickenSummary, "chicken.alive", 0),
              _.get(chickenSummary, "chicken.total", 0)
            )}
          />
          <StatusCard
            title="Dead chickens"
            value={_.get(chickenSummary, "chicken.dead", "!")}
            subttile="# Dead chickens"
            percentage={calcPercentage(
              _.get(chickenSummary, "chicken.dead", 0),
              _.get(chickenSummary, "chicken.total", 0)
            )}
          />
          <StatusCard
            title="Male chickens"
            value={_.get(chickenSummary, "sex.M", "!")}
            subttile="# Male Chickens"
            percentage={calcPercentage(
              _.get(chickenSummary, "sex.M", 0),
              _.get(chickenSummary, "chicken.total", 0)
            )}
          />
          <StatusCard
            title="Female chickens"
            value={_.get(chickenSummary, "sex.F", "!")}
            subttile="# Female chickens"
            percentage={calcPercentage(
              _.get(chickenSummary, "sex.F", 0),
              _.get(chickenSummary, "chicken.total", 0)
            )}
          />
          <StatusCard
            title="Unknown chickens"
            value={_.get(chickenSummary, "sex.F", "!")}
            subttile="# Unknown chickens"
            percentage={calcPercentage(
              _.get(chickenSummary, "sex.Unknown", 0),
              _.get(chickenSummary, "chicken.total", 0)
            )}
          />
          <StatusCard
            title="Hatch Date"
            value={
              _.get(chickenSummary, "hatch_date.seted", "!") +
              "/" +
              _.get(chickenSummary, "hatch_date.unseted", "!")
            }
            subttile="# Data availability"
            percentage={calcPercentage(
              _.get(chickenSummary, "hatch_date.seted", 0),
              _.get(chickenSummary, "chicken.total", 0)
            )}
          />
          <StatusCard
            title="Seted Parent"
            value={
              _.get(chickenSummary, "pedigree.sire_dam_seted", "!") +
              "/" +
              _.get(chickenSummary, "pedigree.sire_dam_unseted", "!")
            }
            subttile="# Data availability"
            percentage={calcPercentage(
              _.get(chickenSummary, "pedigree.sire_dam_seted", 0),
              _.get(chickenSummary, "chicken.total", 0)
            )}
          />
        </Stack>
      </Box>
      <Box>
        <MortalityRate data={mortalityRateData} />
      </Box>
      <Box>
        <DataSummary data={qualityData} />
      </Box>
    </Box>
  );
};
