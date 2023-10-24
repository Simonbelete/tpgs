import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import { useGetFormulaMatrixQuery } from "../../services";
import dynamic from "next/dynamic";
import {
  BarChartSkeleton,
  PieChartSkeleton,
  StatisticsCard,
} from "@/components";
import IngredientPrice from "./IngredientPrice";
import { FormulaIngredient } from "@/models";

const ICC = dynamic(() => import("./ICC"), {
  ssr: false,
  loading: () => <PieChartSkeleton />,
});

const NDC = dynamic(() => import("./NDC"), {
  ssr: false,
  loading: () => <BarChartSkeleton />,
});

const IngredientsChart = ({ formula_id }: { formula_id: number }) => {
  const { data, isLoading } = useGetFormulaMatrixQuery(formula_id);

  const [ndc, setNdc] = useState<any>();
  const [icc, setIcc] = useState<any>();

  useEffect(() => {
    const result_ndc: any[] = [];
    const result_icc: any = {
      type: "pie",
      values: [],
      labels: [],
      textinfo: "label+percent",
      textposition: "outside",
      automargin: true,
    };

    const response = data?.results || [];

    console.log(response);

    for (let i = 0; i < response.length; i += 1) {
      result_ndc.push({
        x: response[i].nutrients,
        y: response[i].values,
        name: response[i].ingredient.name || "",
        type: "bar",
      });

      result_icc.values.push(response[i].ration);
      result_icc.labels.push(response[i].ingredient.name || "");
    }
    setNdc(result_ndc);
    setIcc(result_icc);
  }, [data]);

  return (
    <>
      <Grid item xs={6}>
        <IngredientPrice data={data?.results as FormulaIngredient[]} />
      </Grid>
      <Grid item xs={6}>
        <StatisticsCard title="Ingredient Contribution">
          <ICC data={[icc]} />
        </StatisticsCard>
      </Grid>
      <Grid item xs={12}>
        <StatisticsCard title="Nutrient distribution chart">
          <NDC data={ndc} />
        </StatisticsCard>
      </Grid>
    </>
  );
};

export default IngredientsChart;
