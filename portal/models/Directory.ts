import Farm from "./Farm";
import Breed from "./Breed";
import Hatchery from "./Hatchery";
import House from "./House";
import Pen from "./Pen";

export default interface Directory {
  id: number;
  name: string;
  unique_id: string;
  farm_name: string;
  farm_id: number;
  breed_name: string;
  breed_id: number;
  hatchery_name: string;
  hatchery_id: number;
  house_name: string;
  house_id: number;
  pen_id: number;
  pen_name: string;

  farm: number | Farm;
  breed: number | Breed;
  hatchery: number | Hatchery;
  generation: number;
  house: number | House;
  pen: number | Pen;
  sex: any;
  start_week: number;
  end_week: number;
}
