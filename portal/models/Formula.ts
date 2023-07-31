import FormulaIngredient from "./FormulaIngredient";
import FormulaRequirement from "./FormulaRequirement";
import Purpose from "./Purpose";

export default interface Formula {
  id: number;
  name: string;
  weight: number;
  purpose: number | Purpose;
  note: string;
  requirements: number[] | FormulaRequirement[];
  ingredients: number[] | FormulaIngredient[];
  requirement_count?: number;
  ingredient_count?: number;
}
