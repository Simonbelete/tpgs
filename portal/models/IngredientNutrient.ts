import Ingredient from "./Ingredients";
import Nutrient from "./Nutrient";

export default interface IngredientNutrient {
  id: number;
  ingredient: number | Ingredient;
  nutrient: number | Nutrient;
  value: number;
}
