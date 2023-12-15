import AbstractBaseModel from "./AbstractBaseModel";
import Breed from "./Breed";

export default interface BreedHHEPGuideline extends AbstractBaseModel {
  breed: Breed;
  week: number;
  hhep: number;
}
