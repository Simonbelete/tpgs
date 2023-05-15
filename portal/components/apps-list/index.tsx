import React from "react";
import Image from "next/image";
import { Stack, Box } from "@mui/material";

const AppList = () => {
  const appsImage = [
    "/images/tpsg_platforms_icon.png",
    "/images/feed_formulation_icon.png",
    "/images/nutration_education_icon.png",
    "/images/breeding_data_icon.png",
  ];
  return (
    <Stack direction="row" gap={2}>
      {appsImage.map((e, key) => (
        <Image key={key} src={e} width={60} height={60} alt="" />
      ))}
    </Stack>
  );
};

export default AppList;
