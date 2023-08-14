import Formula from "./Formula";
import Nutrient from "./Nutrient";

export default interface FormulaRation {
  formula: number | Formula;
  nutrient: number | Nutrient;
  value: number;
}
