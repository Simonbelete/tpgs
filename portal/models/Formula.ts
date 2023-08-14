import Country from "./Country";
import FormulaIngredient from "./FormulaIngredient";
import FormulaRation from "./FormulaRation";
import FormulaRequirement from "./FormulaRequirement";
import Purpose from "./Purpose";
import Unit from "./Unit";

export default interface Formula {
  id: number;
  name: string;
  purpose: number | Purpose;
  sex: string;
  weight: number;
  weight_unit: number | Unit;
  country: number | Country;
  age_from_week: number;
  age_to_week: number;
  formula_basis: string;
  note: string;
  requirements: number[] | FormulaRequirement[];
  budget: number;
  desired_ratio: number;
  desired_dm: number;
  ingredients: number[] | FormulaIngredient[];
  requirement_count?: number;
  ingredient_count?: number;
  rations: number[] | FormulaRation[];
  ration_price: number;
  ration_ratio: number;
  ration_dm: number;
}
