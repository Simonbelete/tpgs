import AbstractBaseModel from "./AbstractBaseModel";
import NutrientGroup from "./NutrientGroup";
import Unit from "./Unit";

export default interface Nutrient extends AbstractBaseModel {
  name: string;
  code: string;
  abbreviation: string;
  description: string;
  nutrient_group?: null | NutrientGroup | number;
  unit?: null | number | Unit;
  qty?: number;
  percentage?: number;
  order?: null | number;
}
