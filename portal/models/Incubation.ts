import AbstractBaseModel from "./AbstractBaseModel";
import Hatchery from "./Hatchery";

export default interface Incubation extends AbstractBaseModel {
  hatchery: number | Hatchery;
  date_time: string;
  temperature_celsius: string;
  humidity_fahrenheit: string;
  humidity_percent: string;
  remark: string;
}
