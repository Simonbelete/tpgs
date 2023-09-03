import React from "react";
import { FormulaRation } from "@/models";
import FIcBarChart from "../fic-bar-chart";

const FormulaQuickComparison = ({ formula_rations }:{ formula_rations: FormulaRation[] }) => {
  console.log(formula_rations)
  return (
    <FIcBarChart
      data={formula_rations}
      dataKey="achived_goal"
      displayKey={"nutrient"}
    />
  )
}

export default FormulaQuickComparison;