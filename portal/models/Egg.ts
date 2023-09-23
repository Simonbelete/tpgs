import AbstractBaseModel from "./AbstractBaseModel";

export default interface Egg extends AbstractBaseModel {
  week: number;
  weight: number;
}
