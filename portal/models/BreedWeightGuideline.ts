import AbstractBaseModel from "./AbstractBaseModel";
import Breed from "./Breed";

export default interface BreedWeightGuideline extends AbstractBaseModel {
  breed: Breed;
  week: number;
  weight: number;
}
