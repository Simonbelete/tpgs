import AbstractBaseModel from "./AbstractBaseModel";
import Breed from "./Breed";
import Stage from "./Stage";
import Chicken from "./Chicken";
import ReductionReason from "./ReductionReason";

export default interface Hatchery extends AbstractBaseModel {
  name: string;
  incubation_moved_date: string;
  hatch_date: string;
  breed: number | Breed;
  note: string;
  incubation_count: number;
  hatchery_egg_count: number;
  stage?: Stage;
  from_state?: Stage;
  selected_from?: Hatchery[] | number[] | null;
  selected_chickens?: Chicken[] | number[] | null;
  unselected_chickens?: Chicken[] | number[] | null;
  reduction_date?: string | null;
  reduction_reason?: ReductionReason | number | null;
  generation?: number | null;

  total_egg_set?: number;
  total_infertile_eggs?: number;
  total_removed_eggs?: number;
  total_hatched_egg?: number;
}
