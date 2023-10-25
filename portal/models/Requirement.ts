import AbstractBaseModel from "./AbstractBaseModel";
import RequirementNutrient from "./RequirementNutrient";

export default interface Requirement extends AbstractBaseModel {
  name: string;
  dm: number;
  nutrients: number[] | RequirementNutrient[];
  description?: string;
}