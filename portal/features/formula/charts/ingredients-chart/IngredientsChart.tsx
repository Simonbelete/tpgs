import React, { useEffect, useState } from "react";
import { Grid, Skeleton } from "@mui/material";
import { Formula } from "@/models";
import { useGetFormulaMatrixQuery } from "../../services";
import dynamic from "next/dynamic";
import { BarChartSkeleton } from "@/components";

// const ICC = dynamic(() => import("./ICC"), {
//   ssr: false,
//   loading: () => <></>,
// });

const NDC = dynamic(() => import("./NDC"), {
  ssr: false,
  loading: () => <BarChartSkeleton />,
});

// const PriceChart = dynamic(() => import("./Price"), {
//   ssr: false,
//   loading: () => <></>,
// });

const IngredientsChart = ({ formula_id }: { formula_id: number }) => {
  const { data, isLoading } = useGetFormulaMatrixQuery(formula_id);

  const [ndc, setNdc] = useState<any>();
  const [icc, seticc] = useState<any>();
  const [price, setPrice] = useState<any>();

  useEffect(() => {
    const result_ndc: any[] = [];
    const result_icc: any[] = [];
    const result_price: any[] = [];

    const response = data?.results || [];

    console.log(response);

    for (let i = 0; i < response.length; i += 1) {
      result_ndc.push({
        x: response[i].nutrients,
        y: response[i].values,
        name: response[i].ingredient.name || "",
        type: "bar",
      });
    }
    console.log(result_ndc);
    setNdc(result_ndc);
  }, [data]);

  return (
    <Grid container>
      <Grid item xs={6}>
        <NDC data={ndc} />
      </Grid>
    </Grid>
  );
};

export default IngredientsChart;
