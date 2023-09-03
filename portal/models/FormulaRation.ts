import Formula from "./Formula";
import Nutrient from "./Nutrient";

export default interface FormulaRation {
  id: number;
  formula: number | Formula;
  nutrient: number | Nutrient;
  value: number;
  achived_goal?: number;
}
