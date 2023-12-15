import AbstractBaseModel from "./AbstractBaseModel";
import Breed from "./Breed";

export default interface BreedFeedGuideline extends AbstractBaseModel {
  breed: Breed;
  week: number;
  weight: number;
}
