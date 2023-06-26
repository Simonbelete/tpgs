import NutrientGroup from "./NutrientGroup";
import Unit from "./Unit";

export default interface Nutrient {
  id: number;
  name: string;
  code: string;
  abbreviation: string;
  description: string;
  nutrient_group: NutrientGroup | number;
  unit: number | Unit;
}
