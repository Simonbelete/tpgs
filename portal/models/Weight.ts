import AbstractBaseModel from "./AbstractBaseModel";
import Chicken from "./Chicken";
import ChickenFilter from "./ChickenFilter";
import Flock from "./Flock";

export default interface Weight extends AbstractBaseModel, ChickenFilter {
  flock: number | Flock;
  chicken: number | Chicken;
  week: number;
  weight: number;
}
