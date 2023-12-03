import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { PieChartSkeleton } from "@/components";
import { Row, Column } from "../formulation/Formulation";
import _ from "lodash";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <PieChartSkeleton />,
});

export const NutrientDistributions = ({
  rows,
  columns,
}: {
  rows: Row[];
  columns: Column[];
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const result: any = [];

    const totals = {};

    columns.forEach((el) => {
      const total = _.sumBy(rows, (o) => Number(_.get(o, el.path, 0)));

      if (total != null) _.set(totals, `${el.id}`, total);
      else _.set(totals, `${el.id}`, 0);
    });

    rows.forEach((r) => {
      const x: number[] = [];
      const y: string[] = [];
      _.forEach(r.nutrients, (el, key) => {
        const normalized = (el.value / _.get(totals, key, 0)) * 100;
        x.push(normalized);
        y.push(key);
      });

      result.push({
        x,
        y,
        name: r.display_name,
        type: "bar",
        orientation: "h",
      });
    });

    setData(result);
  }, [rows, columns]);

  return (
    <Plot
      layout={{
        title: "Nutrient distribuation",
        height: 500,
        barmode: "stack",
      }}
      config={{ responsive: true }}
      style={{ width: "100%" }}
      data={data}
    />
  );
};
