import React, { useEffect, useState } from "react";
import { Formula } from "@/models";
import { useGetFormulaNutrientsQuery } from "../services";
import dynamic from "next/dynamic";
import { StatisticsCard } from "@/components";

const AchivementChartComponent = dynamic(
  () => import("../components/achivement-chart"),
  {
    ssr: false,
    loading: () => <></>,
  }
);

const NutrientValueChartComponent = dynamic(
  () => import("./NutrientValueChart"),
  {
    ssr: false,
    loading: () => <></>,
  }
);

const FormulaAchivementChart = ({ formula }: { formula: Formula }) => {
  const { data, isLoading } = useGetFormulaNutrientsQuery(formula.id);
  const [chartData, setChartData] = useState<{
    x: string[];
    y: number[];
  }>({
    x: [],
    y: [],
  });
  const [valuesData, setValuesData] = useState<any>([]);

  useEffect(() => {
    const x: string[] = [];
    const y: number[] = [];
    const y1: number[] = [];
    const y2: number[] = [];

    const response = data?.results || [];

    for (let i = 0; i < response.length; i += 1) {
      x.push(response[i].name || "");
      y.push(response[i].achived_goal);
      y1.push(response[i].ration_value);
      y2.push(response[i].requirement_value);
    }

    setChartData({ x, y });
    setValuesData([
      { x, y: y1, type: "bar", name: "Ration" },
      { x, y: y2, type: "bar", name: "Requirement" },
    ]);
  }, [data]);

  return (
    <div>
      <StatisticsCard title="Nutrient goal achievement out of 100%">
        <AchivementChartComponent data={chartData} />
      </StatisticsCard>
      <StatisticsCard title="Nutrient Ration vs Requirement">
        <NutrientValueChartComponent data={valuesData} />
      </StatisticsCard>
    </div>
  );
};

export default FormulaAchivementChart;
