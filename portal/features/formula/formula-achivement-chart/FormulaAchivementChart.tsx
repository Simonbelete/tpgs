import React, { useEffect, useState } from "react";
import { Formula } from '@/models';
import { useGetFormulaRationsQuery } from '../services';
import dynamic from "next/dynamic";

const AchivementChartComponent = dynamic(
  () => import("../components/achivement-chart"),
  {
    ssr: false,
    loading: () => <></>
  }
);

const FormulaAchivementChart = ({formula}: {formula: Formula}) => {
  const {data, isLoading} = useGetFormulaRationsQuery(formula.id);
  const [chartData, setChartData] = useState({
    x: [],
    y: []
  })

  useEffect(() => {

  }, [data])

  return (
    <AchivementChartComponent data={chartData} />
  )
}

export default FormulaAchivementChart;