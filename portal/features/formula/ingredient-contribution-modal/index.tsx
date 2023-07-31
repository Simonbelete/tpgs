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
  Sector,
  PieChart,
  Pie,
} from "recharts";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import formula_service from "../services/formula_service";

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${payload.abbreviation} ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

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
  const [activeIndex, setActiveIndex] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };
  const formula = useSelector((state: RootState) => state.formula);

  const onPieEnter = (index: number) => setActiveIndex(index);

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
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabIndex} onChange={handleChange}>
          <Tab label="Bar Chart" iconPosition="start" icon={<BarChartIcon />} />
          <Tab
            label="Pie Chart"
            iconPosition="start"
            icon={<DonutSmallIcon />}
          />
        </Tabs>
      </Box>
      <Box mx={2} my={4} pb={4}>
        {tabIndex == 0 && (
          <>
            <ResponsiveContainer width="100%" height={500}>
              <BarChart
                width={500}
                height={300}
                data={nutrients}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="qty" />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}
        {tabIndex == 1 && (
          <>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={400} height={400}>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={nutrients}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="percentage"
                  onMouseEnter={onPieEnter}
                />
              </PieChart>
            </ResponsiveContainer>
          </>
        )}
      </Box>
    </ChartModal>
  );
};

export default IngredientContributionModal;
