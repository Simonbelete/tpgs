import AbstractBaseModel from "./AbstractBaseModel";
import Breed from "./Breed";

export default interface WeightGuideline extends AbstractBaseModel {
  breed: number | Breed;
  week: number;
  weight: number;
}
