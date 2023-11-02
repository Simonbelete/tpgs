import AbstractBaseModel from "./AbstractBaseModel";
import Breed from "./Breed";

export default interface HDEPGuideline extends AbstractBaseModel {
  breed: number | Breed;
  week: number;
  hdep: number;
}
