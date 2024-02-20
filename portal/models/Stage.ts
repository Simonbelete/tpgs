import AbstractBaseModel from "./AbstractBaseModel";

export default interface Stage extends AbstractBaseModel {
  name: string;
  order?: number;
  description?: string;
}
