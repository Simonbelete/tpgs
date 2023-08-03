import IngredientType from "./IngredientType";
import Nutrient from "./Nutrient";

export default interface Ingredient {
  id: number;
  name: string;
  code: string;
  ingredient_type: number | IngredientType;
  description: number;
  price: number;
  price_unit: string;
  nutrients: number | Nutrient[];
  dm: number;
}
