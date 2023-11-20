import AbstractBaseModel from "./AbstractBaseModel";
import Country from "./Country";
import FormulaIngredient from "./FormulaIngredient";
import FormulaRation from "./FormulaRation";
import FormulaRequirement from "./FormulaRequirement";
import Purpose from "./Purpose";
import Unit from "./Unit";

export default interface Formula extends AbstractBaseModel {
  name: string;
  purpose: null | number | Purpose;
  sex: null | string;
  weight: number;
  weight_unit: number | Unit;
  country: null | number | Country;
  age_from_week: number;
  age_to_week: number;
  formula_basis: null | string;
  unit_price: null | number;
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
  ration_weight: number;
  ration_dm: number;
}
