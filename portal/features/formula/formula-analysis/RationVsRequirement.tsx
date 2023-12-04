import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { PieChartSkeleton } from "@/components";
import { Row, Column } from "../formulation/Formulation";
import _ from "lodash";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <PieChartSkeleton />,
});

export const RationVsRequirement = ({
  ration,
  requirement,
}: {
  ration: Row;
  requirement: Row;
}) => {
  const [data, setData] = useState<Object[]>([]);

  useEffect(() => {
    const result: any = [
      { x: [], y: [], type: "bar", name: "Ration" },
      { x: [], y: [], type: "bar", name: "Requirement" },
    ];

    _.forEach(ration.nutrients || {}, (el, key) => {
      result[0].x.push(key);
      result[0].y.push(el.value);
    });

    console.log(ration);

    _.forEach(requirement.nutrients || {}, (el, key) => {
      result[1].x.push(key);
      result[1].y.push(el.value);
    });

    setData(result);
  }, [ration, requirement]);

  return (
    <Plot
      layout={{
        title: "Nutrient Ration vs Requirement",
        height: 500,
      }}
      config={{ responsive: true }}
      style={{ width: "100%" }}
      data={data}
    />
  );
};
