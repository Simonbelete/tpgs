import React from "react";
import { MiniStatistics } from "@/components";
import { Stack } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import { FarmIcon, ChickenIcon, DNAHellxIcon } from "@/components/Icons";
import { useGetCountAnalyseQuery } from "@/features/analyses/services";
import _ from "lodash";

const Stats = () => {
  const { data } = useGetCountAnalyseQuery({});

  return (
    <Stack
      spacing={{ xs: 1, sm: 2 }}
      direction="row"
      useFlexGap
      flexWrap="wrap"
    >
      <MiniStatistics
        startContent={<GroupIcon />}
        name="Users"
        value={_.get(data?.results, "total_users", 0)}
        color="#FFC00C"
      />
      <MiniStatistics
        startContent={<FarmIcon fill="#fff" width={"30"} height={"30"} />}
        name="Farms"
        value={_.get(data?.results, "farm_count", 0)}
        color="#20A0B7"
      />
      <MiniStatistics
        startContent={<FarmIcon fill="#fff" width={"30"} height={"30"} />}
        name="Hatc / Batch"
        value={_.get(data?.results, "hatchery_count", 0)}
        color="#2DA547"
      />
      <MiniStatistics
        startContent={<DNAHellxIcon fill="#fff" width={"30"} height={"30"} />}
        name="Breeds"
        value={_.get(data?.results, "breed_count", 0)}
        color="#2DA547"
      />
      <MiniStatistics
        startContent={<ChickenIcon fill="#fff" width={"30"} height={"30"} />}
        name="Chickens"
        value={_.get(data?.results, "chicken_count", 0)}
        color="#DB3846"
      />
    </Stack>
  );
};

export default Stats;
