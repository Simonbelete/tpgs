import Formula from "./Formula";
import Ingredient from "./Ingredients";

export default interface FormulaIngredient {
  id: number;
  formula: number | Formula;
  ingredient: number | Ingredient;
  ration_min: number;
  ratio_max: number;
  value: number;
}
