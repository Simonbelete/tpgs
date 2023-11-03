import AbstractBaseModel from "./AbstractBaseModel";
import Chicken from "./Chicken";
import Formula from "./Formula";
import Directory from "./Directory";
import Pen from "./Pen";
import Hatchery from "./Hatchery";

export default interface Feed extends AbstractBaseModel {
  batch?: Directory;
  hatchery: number | Hatchery;
  pen: number | Pen;
  chicken: number | Chicken;
  week: number;
  weight: number;
  formula: number | Formula;
}
