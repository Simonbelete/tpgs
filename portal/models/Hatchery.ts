import AbstractBaseModel from "./AbstractBaseModel";
import Breed from "./Breed";

export default interface Hatchery extends AbstractBaseModel {
  name: string;
  incubation_moved_date: string;
  hatch_date: string;
  breed: number | Breed;
  note: string;
  incubation_count: number;
  hatchery_egg_count: number;
}
