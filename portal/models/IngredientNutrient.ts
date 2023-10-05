import AbstractBaseModel from "./AbstractBaseModel";
import Ingredient from "./Ingredients";
import Nutrient from "./Nutrient";

export default interface IngredientNutrient extends AbstractBaseModel {
  ingredient: number | Ingredient;
  nutrient: number | Nutrient;
  value: number;
}
