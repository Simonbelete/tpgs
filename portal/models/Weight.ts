import AbstractBaseModel from "./AbstractBaseModel";
import Chicken from './Chicken';
import Unit from "./Unit";
import Flock from "./Flock";

export default interface Weight extends AbstractBaseModel {
  flock: number | Flock;
  chicken: number | Chicken;
  week: number;
  weight: number;
}
