import { Directory } from "@/models";
import _ from "lodash";

export default function buildDirectoryQuery(directory: Directory) {
  return {
    farm: _.get(directory.farm, "id", null),
    hatchery: _.get(directory.hatchery, "id", null),
    generation: _.get(directory.generation, "id", null),
    breed: _.get(directory.breed, "id", null),
    house: _.get(directory.house, "id", null),
    pen: _.get(directory.pen, "id", null),
    start_week: _.get(directory, "start_week", 0),
    end_week: _.get(directory, "end_week", 0),
    sex: _.get(directory.sex, "value", null),
  };
}
