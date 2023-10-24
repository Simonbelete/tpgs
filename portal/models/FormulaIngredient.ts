import Formula from "./Formula";
import Ingredient from "./Ingredients";

export default interface FormulaIngredient {
  id: number;
  formula: number | Formula;
  ingredient: number | Ingredient;
  price?: number;
  ration_min: number;
  ratio_max: number;
  ration: number;
  ration_weight: number;
  ration_price: number;
}
