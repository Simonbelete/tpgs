import React, { useCallback, useEffect, useState } from "react";
import { Modal, Box, Typography, Tabs, Tab } from "@mui/material";
import { ChartModal } from "@/components/modals";
import { IngredientService } from "@/features/ingredients";
import BarChartIcon from "@mui/icons-material/BarChart";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import { IngredientNutrient } from "@/models";
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
  const [nutrients, setNutrients] = useState<IngredientNutrient[]>([]);
  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };
  const formula = useSelector((state: RootState) => state.formula);

  useEffect(() => {
    IngredientService.nutrient
      .get(id)
      .then((response) => {
        if (response.status == 200) setNutrients(response.data.results);
      })
      .catch((ex) => {});
  }, []);

  // const calculateNutrientContribution = () => {
  //   const weight = 10;
  //   const ingredientNutrient = formula.ingredients.find((e) => e.id == id);
  //   // ingredientNutrient.
  // };

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
