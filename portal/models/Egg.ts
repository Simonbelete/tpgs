import AbstractBaseModel from "./AbstractBaseModel";
import Chicken from "./Chicken";
import ChickenFilter from "./ChickenFilter";
import Unit from "./Unit";
import Flock from "./Flock";

export default interface Egg extends AbstractBaseModel, ChickenFilter {
  flock: number | Flock;
  chicken: number | Chicken;
  week: number;
  eggs: number;
  weight: number;
  weight_unit: number | Unit;
}
