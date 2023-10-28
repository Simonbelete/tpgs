import AbstractBaseModel from "./AbstractBaseModel";
import RequirementNutrient from "./RequirementNutrient";

export default interface Requirement extends AbstractBaseModel {
  name: string;
  dm: number;
  nutrients: number[] | RequirementNutrient[];
  description?: string;
  nutrient_count: number;
  weight: number;
  desired_dm: number;
  budget: number;
  desired_ratio: number;
}
