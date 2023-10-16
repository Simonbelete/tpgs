import AbstractBaseModel from "./AbstractBaseModel";
import Flock from "./Flock";

export default interface FlockAccusation extends AbstractBaseModel {
  flock: number | Flock;
  accusation: number | Accus;
}
