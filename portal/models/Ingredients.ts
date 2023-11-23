import AbstractBaseModel from "./AbstractBaseModel";
import IngredientNutrient from "./IngredientNutrient";
import IngredientType from "./IngredientType";

export default interface Ingredient extends AbstractBaseModel {
  name: string;
  code: string;
  ingredient_type?: null | number[] | IngredientType[];
  description?: string;
  price: number;
  nutrients: number | IngredientNutrient[];
  dm?: number;
  nutrient_count: number;
  min?: null | number;
  max?: null | number;
}
