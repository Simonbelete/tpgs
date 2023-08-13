/**
 * Formula Ingredients Contribution Bar Chart
 */

import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const FIcBarChart = ({
  data,
  dataKey,
  displayKey,
}: {
  data: any[];
  dataKey: string;
  displayKey: string;
}) => {
  return (
    <div style={{ marginTop: "100px" }}>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data}>
          <Bar dataKey={dataKey} fill="#8884d8" />
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={displayKey} />
          <YAxis />
          <Tooltip />
          <Legend />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FIcBarChart;
