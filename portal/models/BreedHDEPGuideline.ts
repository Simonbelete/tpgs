import AbstractBaseModel from "./AbstractBaseModel";
import Breed from "./Breed";

export default interface BreedHDEPGuideline extends AbstractBaseModel {
  breed: Breed;
  week: number;
  hdep: number;
}
