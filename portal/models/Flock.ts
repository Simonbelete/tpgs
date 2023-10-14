import AbstractBaseModel from "./AbstractBaseModel";
import Breed from "./Breed";

export default interface Flock extends AbstractBaseModel {
  name: string;
  breed: number | Breed;
  hatch_date: string;
}
