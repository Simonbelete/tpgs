import React from "react";
import { MiniStatistics } from "@/components";
import { Stack } from "@mui/material";
import GroupIcon from '@mui/icons-material/Group';
import { FarmIcon, ChickenIcon } from '@/components/Icons';

const Stats = () => {
  return (
    <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
      <MiniStatistics 
        startContent={<GroupIcon />} 
        name="Users" 
        value="200K" 
        color="#FFC00C"
        />
        <MiniStatistics 
          startContent={<FarmIcon fill="#fff" width={"30"} height={"30"} />} 
          name="Flocks" 
          value="200K" 
          color="#20A0B7"
        />
        <MiniStatistics 
          startContent={<FarmIcon  fill="#fff" width={"30"} height={"30"} />} 
          name="Farms" 
          value="200K" 
          color="#2DA547"
        />
        <MiniStatistics 
          startContent={<ChickenIcon  fill="#fff" width={"30"} height={"30"} />} 
          name="Chickens" 
          value="200K" 
          color="#DB3846"
        />
    </Stack>
  )
}

export default Stats;