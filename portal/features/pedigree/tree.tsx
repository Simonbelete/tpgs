import React, { ReactElement } from "react";
import { ReportingLayout } from "@/layouts";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";

const PedigreeTree = dynamic(() => import("./PedigreeTree"), {
  ssr: false,
});

const PedigreeChart = () => {
  return (
    // <ReportingLayout>

    <PedigreeTree />
    // </ReportingLayout>
  );
};

PedigreeChart.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default PedigreeChart;
