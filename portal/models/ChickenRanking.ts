import Chicken from "./Chicken";

export default interface ChickenRanking {
  id: number;
  feed_weight_avg?: number | null;
  body_weight_total: number | null;
  body_weight_avg?: number | null;
  egg_number_total?: number | null;
  egg_number_avg?: number | null;
  egg_weight_total?: number | null;
  egg_weight_avg?: number | null;
  chicken?: Chicken | number;
}
