import AbstractBaseModel from "./AbstractBaseModel";
import Ingredient from "./Ingredients";
import Requirement from "./Requirement";

export default interface RequirementIngredient extends AbstractBaseModel {
  requirement: number | Requirement;
  ingredient: number | Ingredient;
  min: number;
  max: number;
}
