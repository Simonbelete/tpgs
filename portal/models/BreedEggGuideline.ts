import AbstractBaseModel from "./AbstractBaseModel";
import Breed from "./Breed";

export default interface BreedEggGuideline extends AbstractBaseModel {
  breed: Breed;
  week: number;
  egg: number;
  weight: number;
}
