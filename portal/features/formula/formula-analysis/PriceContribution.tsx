import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { PieChartSkeleton } from "@/components";
import { Row, Column } from "../formulation/Formulation";
import _ from "lodash";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <PieChartSkeleton />,
});

export const PriceContribution = ({
  rows,
  columns,
}: {
  rows: Row[];
  columns: Column[];
}) => {
  const [data, setData] = useState<Object[]>([]);

  useEffect(() => {
    const result: any = {
      type: "pie",
      values: [],
      labels: [],
      textinfo: "label+percent",
      textposition: "outside",
      automargin: true,
    };
    rows.forEach((r) => {
      result.values.push(r.unit_price);
      result.labels.push(r.display_name);
    });

    setData([result]);
  }, [rows, columns]);

  return (
    <Plot
      layout={{
        title: "Ingredient price contribution",
        height: 500,
        barmode: "stack",
      }}
      config={{ responsive: true }}
      style={{ width: "100%" }}
      data={data}
    />
  );
};
