import React, { useCallback, useEffect, useState } from "react";
import { Modal, Box, Typography, Tabs, Tab } from "@mui/material";
import { ChartModal } from "@/components/modals";
import { IngredientService } from "@/features/ingredients";
import BarChartIcon from "@mui/icons-material/BarChart";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import { Ingredient, IngredientNutrient, Nutrient } from "@/models";
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
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import formula_service from "../services/formula_service";

/**
 *
 * @param id FormulaIngredient
 * @returns
 */
const IngredientContributionModal = ({
  id,
  open = false,
  onClose,
}: {
  id: number;
  open?: boolean;
  onClose: () => void;
}) => {
  const dispatch = useDispatch();
  const [nutrients, setNutrients] = useState<Nutrient[]>([]);
  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };
  const formula = useSelector((state: RootState) => state.formula);

  useEffect(() => {
    if (id == 0) return;
    const curr_formula_ingr = formula.ingredients.find((e: any) => e.id == id);
    const formula_id: number = curr_formula_ingr?.formula as number;
    const formula_ingredient_id: number = curr_formula_ingr?.id as number;
    const ingredient_id: number =
      (curr_formula_ingr?.ingredient as Ingredient).id || 0;

    formula_service.ingredient.nutrient
      .get(formula_id, formula_ingredient_id)
      .then((response) => {
        console.log(response.data.results);
        if (response.status == 200) setNutrients(response.data.results);
      })
      .catch((ex) => {});
  }, [id]);

  return (
    <ChartModal open={open} onClose={onClose}>
      <Tabs value={tabIndex} onChange={handleChange}>
        <Tab label="Bar Chart" iconPosition="start" icon={<BarChartIcon />} />
        <Tab label="Pie Chart" iconPosition="start" icon={<DonutSmallIcon />} />
        <Box mx={2} my={4} pb={4}>
          {tabIndex == 0 && <></>}
          {tabIndex == 1 && <></>}
        </Box>
      </Tabs>
    </ChartModal>
  );
};

export default IngredientContributionModal;
