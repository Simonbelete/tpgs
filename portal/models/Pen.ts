import AbstractBaseModel from "./AbstractBaseModel";
import House from "./House";

export default interface Pen extends AbstractBaseModel {
  name: string;
  house: number | House;
}
