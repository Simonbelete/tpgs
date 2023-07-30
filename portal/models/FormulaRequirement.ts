import Nutrient from "./Nutrient";
import Formula from "./Formula";

export default interface FormulaRequirement {
  id: number;
  nutrient: number | Nutrient;
  formula: number | Formula;
  value: number;
}
