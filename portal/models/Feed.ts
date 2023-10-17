import AbstractBaseModel from "./AbstractBaseModel";
import Flock from "./Flock";
import Chicken from "./Chicken";
import Formula from "./Formula";
import Directory from "./Directory";
import Pen from "./Pen";

export default interface Feed extends AbstractBaseModel {
  batch?: Directory;
  flock: number | Flock;
  pen: number | Pen;
  chicken: number | Chicken;
  week: number;
  weight: number;
  formula: number | Formula;
}
