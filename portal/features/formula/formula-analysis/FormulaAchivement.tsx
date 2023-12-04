import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { PieChartSkeleton } from "@/components";
import { Row, Column } from "../formulation/Formulation";
import _ from "lodash";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <PieChartSkeleton />,
});

export const FormulaAchivement = ({
  requirement,
  ration,
}: {
  requirement: Row;
  ration: Row;
}) => {
  const [data, setData] = useState<Object[]>([]);

  const roundTo3DecimalPlace = (value: number): number => {
    return Number(value.toFixed(3));
  };

  useEffect(() => {
    const chart: any = {
      x: [],
      y: [],
      type: "bar",
    };

    ["ratio", "unit_price", "ration_weight", "ration_price", "dm"].map((e) => {
      chart.x.push(e);
      const req: number = _.get(requirement, `${e}`, 0);
      const rat: number = _.get(ration, `${e}`, 0);

      if (req == 0) chart.y.push(0);
      else chart.y.push(roundTo3DecimalPlace(Number((rat / req) * 100)));
    });

    // Achivement chart
    Object.keys(ration?.nutrients || {}).map((key, i) => {
      chart.x.push(key);
      const req: number = _.get(requirement, `nutrients.${key}.value`, 0);
      const rat: number = _.get(ration, `nutrients.${key}.value`, 0);

      if (req == 0) chart.y.push(0);
      else chart.y.push(roundTo3DecimalPlace(Number((rat / req) * 100)));
    });

    setData([chart]);
  }, [requirement, ration]);

  return (
    <Plot
      divId="achivement-chart"
      data={data}
      layout={{
        title: "Nutrient goal achievement out of 100%",
        height: 500,
      }}
      config={{ responsive: true }}
      style={{ width: "100%" }}
    />
  );
};
