import AbstractBaseModel from "./AbstractBaseModel";
import Egg from "./Egg";
import Hatchery from "./Hatchery";

export default interface HatcheryEgg extends AbstractBaseModel {
  hatchery: number | Hatchery;
  egg: number | Egg;
  no_eggs: number;
  canndle_date: string;
  candled_eggs: number;
  infertile_egg: number;
  no_of_hatched: number;
  no_dead: number;
  no_culled: number;
}
