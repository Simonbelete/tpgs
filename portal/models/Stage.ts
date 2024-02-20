import AbstractBaseModel from "./AbstractBaseModel";

export default interface Stage extends AbstractBaseModel {
  name: string;
  order?: number;
  description?: string;
  min_week?: number;
  max_week?: number;
}
