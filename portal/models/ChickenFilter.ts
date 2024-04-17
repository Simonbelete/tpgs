import Breed from "./Breed";
import House from "./House";
import Pen from "./Pen";
import Hatchery from "./Hatchery";
import ReductionReason from "./ReductionReason";

export default interface ChickenFilter {
  chicken__breed?: null | number[] | Breed[];
  chicken__house?: null | number[] | House[];
  chicken__generation?: null | number[];
  chicken__pen?: null | number[] | Pen[];
  chicken__hatchery?: null | number[] | Hatchery[];
  chicken__sex?: null | string[];
  chicken__hatch_date?: null | string[];
  chicken__reduction_date?: null | string[];
  chicken__reduction_reason?: null | number[] | ReductionReason[];
  chicken__color?: null | string[];
}
