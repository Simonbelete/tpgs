import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { PieChartSkeleton } from "@/components";
import { Row, Column } from "../formulation/Formulation";
import _ from "lodash";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <PieChartSkeleton />,
});

export const PricePerNutrient = ({
  rows,
  columns,
}: {
  rows: Row[];
  columns: Column[];
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const result: any = {
      x: [],
      y: [],
      type: "bar",
    };

    rows.forEach((r) => {
      result.x.push(r.display_name);
    });

    setData(result);
  }, [rows, columns]);

  return (
    <Plot
      layout={{
        title: "Price per nutrient",
        height: 500,
        barmode: "stack",
      }}
      config={{ responsive: true }}
      style={{ width: "100%" }}
      data={data}
    />
  );
};
