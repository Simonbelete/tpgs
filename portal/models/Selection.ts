import AbstractBaseModel from "./AbstractBaseModel";
import Hatchery from "./Hatchery";

export default interface Selection extends AbstractBaseModel {
  name: string;
  hatchery: Hatchery;
}
