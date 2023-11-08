import AbstractBaseModel from "./AbstractBaseModel";
import Flock from "./Flock";
import House from "./House";

export default interface Chicken extends AbstractBaseModel {
  name: string;
  tag: string;
  sex: string;
  sire: number | Chicken;
  dam: number | Chicken;
  flock: number | Flock;
  house: number | House;
  pen: string;
  reduction_date: string;
  reduction_reason: string;
  generation: number;
}
