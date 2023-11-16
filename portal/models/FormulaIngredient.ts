import Formula from "./Formula";
import Ingredient from "./Ingredients";
import AbstractBaseModel from "./AbstractBaseModel";

export default interface FormulaIngredient extends AbstractBaseModel {
  formula: number | Formula;
  ingredient: number | Partial<Ingredient>;
  price?: number;
  ration_min: number;
  ratio_max: number;
  ration: number;
  ration_weight: number;
  ration_price: number;

  // Custom
  nutrients?: { abbreviation: string; value: number }[];
}
