import AbstractBaseModel from "./AbstractBaseModel";
import Formula from "./Formula";
import Nutrient from "./Nutrient";

export default interface FormulaRation extends AbstractBaseModel {
  formula: number | Formula;
  nutrient: number | Nutrient;
  value: number;
  achived_goal?: number;
}
