import Chicken from "./Chicken";
import ChickenFilter from "./ChickenFilter";

export default interface ChickenRecordSet extends ChickenFilter {
  chicken: number | Chicken;

  // Filters
  start_week: number;
  end_week: number;
}
