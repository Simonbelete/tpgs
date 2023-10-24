import AbstractBaseModel from "./AbstractBaseModel";
import Nutrient from "./Nutrient";
import Requirement from "./Requirement";

export default interface RequirementNutrient extends AbstractBaseModel {
  requirement: number | Requirement;
  nutrient: number | Nutrient;
  value: number;
}
