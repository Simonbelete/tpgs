import Nutrient from "./Nutrient";
import Formula from "./Formula";
import AbstractBaseModel from "./AbstractBaseModel";

export default interface FormulaRequirement extends AbstractBaseModel {
  nutrient: number | Nutrient;
  formula: number | Formula;
  value: number;
}
