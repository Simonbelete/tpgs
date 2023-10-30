import Nutrient from "./Nutrient";

export default interface FormulaNutrient extends Partial<Nutrient> {
  ration_id: number;
  ration_value: number;
  requirement_id: number;
  requirement_value: number;
  achived_goal: number;
  nutrient_group_id: number;
}
