import AbstractBaseModel from "./AbstractBaseModel";
import Flock from "./Flock";
import Chicken from "./Chicken";
import Formula from "./Formula";

export default interface Feed extends AbstractBaseModel {
  flock: number | Flock;
  chicken: number | Chicken;
  week: number;
  weight: number;
  formula: number | Formula;
}
