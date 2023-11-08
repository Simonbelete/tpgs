import { Directory } from "@/models";

export default function (data: Directory) {
  let name = "";
  if (data.farm) {
    name += (data.farm as any).name;
  }

  if (data.hatchery) {
    name += " / " + (data.hatchery as any).name;
  }

  if (data.generation) {
    name += "/ G" + data.generation;
  }

  if (data.breed) {
    name += " / " + (data.breed as any).name;
  }

  if (data.house) {
    name += " / " + (data.house as any).name;
  }

  if (data.pen) {
    name += " / " + (data.pen as any).name;
  }

  return name;
}
