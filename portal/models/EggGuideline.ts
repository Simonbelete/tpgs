import AbstractBaseModel from "./AbstractBaseModel";
import Breed from "./Breed";

export default interface EggGuideline extends AbstractBaseModel {
  breed: number | Breed;
  week: number;
  egg: number;
  weight: number;
}
