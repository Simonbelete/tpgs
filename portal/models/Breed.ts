import AbstractBaseModel from "./AbstractBaseModel";

export default interface Breed extends AbstractBaseModel {
  id: number;
  name: string;
  color: string;
}
