import { Directory } from "@/models";
import _ from "lodash";

export default function (data: Directory) {
  let name = "";
  if (data.farm) {
    name += (data.farm as any).name;
  }

  if (data.generation) {
    name += " / G" + _.get(data.generation, "generation", "all");
  }

  if (data.breed) {
    name += " / " + (data.breed as any).name;
  }

  if (data.hatchery) {
    name += " / B" + (data.hatchery as any).name;
  }

  if (data.house) {
    name += " / " + (data.house as any).name;
  }

  if (data.pen) {
    name += " / " + (data.pen as any).name;
  }

  if (data.sex) {
    name += " / " + (data.sex as any).name;
  }

  return name;
}
