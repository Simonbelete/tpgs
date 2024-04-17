import AbstractBaseModel from "./AbstractBaseModel";
import Chicken from "./Chicken";
import Formula from "./Formula";
import Directory from "./Directory";
import Pen from "./Pen";
import ChickenFilter from "./ChickenFilter";
import Hatchery from "./Hatchery";

export default interface Feed extends AbstractBaseModel, ChickenFilter {
  hatchery: number | Hatchery;
  pen: number | Pen;
  chicken: number | Chicken;
  week: number;
  weight: number;
  formula: null | number | Formula;
  total_chickens?: number;
  children_feed_count?: number;
}
