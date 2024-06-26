import NutrientGroup from "./NutrientGroup";

export default interface Nutrient {
  id: number;
  name: string;
  code: string;
  abbreviation: string;
  description: string;
  nutrient_group: NutrientGroup | number;
  unit: number;
}
