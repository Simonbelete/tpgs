import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { PieChartSkeleton } from "@/components";
import { Row, Column } from "../formulation/Formulation";
import _ from "lodash";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <PieChartSkeleton />,
});

export const IngredientBoundary = ({
  rows,
  columns,
}: {
  rows: Row[];
  columns: Column[];
}) => {
  const [data, setData] = useState<Object[]>([]);

  useEffect(() => {
    // const result: any = {
    //   x: [],
    //   y: [],
    //   type: "bar",
    //   error_y: {
    //     type: "data",
    //     symmetric: false,
    //     array: [],
    //     arrayminus: [],
    //   },
    // };

    // rows.forEach((r) => {
    //   result.x.push(r.display_name);
    //   result.y.push(r.ratio || 0);

    //   result.error_y.array.push(_.get(r, "max", 0) - _.get(r, "ratio", 0));
    //   result.error_y.arrayminus.push(_.get(r, "min", 0) - _.get(r, "ratio", 0));
    // });

    // setData([result]);

    const result: Object[] = [];

    rows.forEach((r) => {
      result.push({
        y: [_.get(r, "min", 0), _.get(r, "ratio", 0), _.get(r, "max", 0)],
        boxpoints: false,
        jitter: 0.3,
        pointpos: -1.8,
        type: "box",
        name: r.display_name,
      });
    });

    setData(result);
  }, [rows, columns]);

  return (
    <Plot
      layout={{
        title: "Ingredient Boundary (Min and Max) Limit",
        height: 500,
      }}
      config={{ responsive: true }}
      style={{ width: "100%" }}
      data={data}
    />
  );
};
