import { Stack } from "@mui/material";
import React from "react";

const ILRILogo = ({ size = 25 }: { size?: number }) => {
  return (
    <Stack>
      <img src="/images/ilri_logo.png" alt="ILIR CGIAR Logo" height={size} />
    </Stack>
  );
};

export default ILRILogo;
