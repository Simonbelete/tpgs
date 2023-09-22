import AbstractBaseModel from "./AbstractBaseModel";

export default interface Breed extends AbstractBaseModel {
  name: string;
  color: string;
}
