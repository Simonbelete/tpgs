import AbstractBaseModel from "./AbstractBaseModel";
import Breed from "./Breed";

export default interface HHEPGuideline extends AbstractBaseModel {
  breed: number | Breed;
  week: number;
  hhep: number;
}
