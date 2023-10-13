import React, { useEffect, useState } from "react";
import { Formula } from '@/models';
import { useGetFormulaNutrientsQuery } from '../services';
import dynamic from "next/dynamic";

const AchivementChartComponent = dynamic(
  () => import("../components/achivement-chart"),
  {
    ssr: false,
    loading: () => <></>
  }
);

const FormulaAchivementChart = ({formula}: {formula: Formula}) => {
  const {data, isLoading} = useGetFormulaNutrientsQuery(formula.id);
  const [chartData, setChartData] = useState({
    x: [],
    y: []
  })

  useEffect(() => {
    const x: any = data?.results.map(e => e.name);
    const y: any = data?.results.map(e => e.achived_goal);

    console.log('------')
    console.log(x)
    console.log(y)

    setChartData({
      x, y
    })
  }, [data])

  return (
    <AchivementChartComponent data={chartData} />
  )
}

export default FormulaAchivementChart;