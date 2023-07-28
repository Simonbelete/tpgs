import Purpose from "./Purpose";

export default interface Formula {
  id: number;
  name: string;
  weight: number;
  purpose: number | Purpose;
  note: string;
}
