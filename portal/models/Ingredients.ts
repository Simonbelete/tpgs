import AbstractBaseModel from "./AbstractBaseModel";
import IngredientNutrient from "./IngredientNutrient";
import IngredientType from "./IngredientType";

export default interface Ingredient extends AbstractBaseModel {
  name: string;
  code: string;
  ingredient_type: number | IngredientType;
  description: number;
  price: number;
  price_unit: string;
  nutrients: number | IngredientNutrient[];
  dm: number;
}
