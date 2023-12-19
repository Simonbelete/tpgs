import AbstractBaseModel from "./AbstractBaseModel";
import House from "./House";
import Breed from "./Breed";
import Hatchery from "./Hatchery";
import Pen from "./Pen";

export default interface Chicken extends AbstractBaseModel {
  name: string;
  tag: string;
  sex?: null | string | Object;
  sire: null | number | Chicken;
  dam: null | number | Chicken;
  hatchery: null | number | Hatchery;
  hatch_date?: string;
  house: null | number | House;
  breed: number | Breed;
  pen: null | number | Pen;
  reduction_date: null | string;
  reduction_reason: null | string;
  reduction_in_weeks?: number;
  generation: null | number;
}
