import React from "react";
import { ReportingLayout } from "@/layouts";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";

const PedigreeTree = dynamic(() => import("./PedigreeTree"), {
  ssr: false,
});

const PedigreeChart = () => {
  return (
    <ReportingLayout>
      <PedigreeTree />
    </ReportingLayout>
  );
};

export default PedigreeChart;
