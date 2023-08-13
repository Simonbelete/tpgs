import Country from "./Country";
import FormulaIngredient from "./FormulaIngredient";
import FormulaRequirement from "./FormulaRequirement";
import Purpose from "./Purpose";
import Unit from "./Unit";

export default interface Formula {
  id: number;
  name: string;
  purpose: number | Purpose;
  weight: number;
  weight_unit: number | Unit;
  country: number | Country;
  budget: string;
  age_from_week: number;
  age_to_week: number;
  formula_basis: string;
  note: string;
  requirements: number[] | FormulaRequirement[];
  ingredients: number[] | FormulaIngredient[];
  requirement_count?: number;
  ingredient_count?: number;
}
