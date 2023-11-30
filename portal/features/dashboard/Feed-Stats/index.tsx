import React from "react";
import { MiniStatistics } from "@/components";
import { Stack } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import { FarmIcon, ChickenIcon, DNAHellxIcon } from "@/components/Icons";
import { useGetCountAnalyseQuery } from "@/features/analyses/services";
import _ from "lodash";
import ScienceIcon from "@mui/icons-material/Science";
import ChecklistIcon from "@mui/icons-material/Checklist";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";

const FeedStats = () => {
  const { data } = useGetCountAnalyseQuery({});

  return (
    <Stack
      spacing={{ xs: 1, sm: 2 }}
      direction="row"
      useFlexGap
      flexWrap="wrap"
    >
      <MiniStatistics
        startContent={<LocalDiningIcon />}
        name="Ingredients"
        value={_.get(data?.results, "ingredient_count", 0)}
        color="#FFC00C"
      />
      <MiniStatistics
        startContent={<ChecklistIcon fill="#fff" width={"30"} height={"30"} />}
        name="Requirements"
        value={_.get(data?.results, "requirement_count", 0)}
        color="#20A0B7"
      />
      <MiniStatistics
        startContent={<ScienceIcon fill="#fff" width={"30"} height={"30"} />}
        name="Formulas"
        value={_.get(data?.results, "formula_count", 0)}
        color="#2DA547"
      />
      <MiniStatistics
        startContent={
          <BubbleChartIcon fill="#fff" width={"30"} height={"30"} />
        }
        name="Nutrients"
        value={_.get(data?.results, "nutrient_count", 0)}
        color="#DB3846"
      />
    </Stack>
  );
};

export default FeedStats;
