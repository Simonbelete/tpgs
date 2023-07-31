import { AxiosResponse } from "axios";
import {
  Response,
  Formula,
  FormulaRequirement,
  FormulaIngredient,
  Nutrient,
} from "@/models";
import client from "@/services/client";
import clientSSR from "@/services/client_ssr";
import { NextPageContext } from "next";

const URL = "/formulas";
const HISTORY_URL = `histories`;
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;
const REQUIREMENT_URL = `requirements`;
const INGREDIENT_URL = `ingredients`;
const NUTRIENT_URL = `nutrients`;

export default {
  get: async (): Promise<AxiosResponse<Response<Formula[]>>> =>
    client.get(`${URL}/`),
  getById: async (id: number): Promise<AxiosResponse<Response<Formula>>> =>
    client.get(`${URL}/${id}`),
  create: async (data: Partial<Formula>) => client.post(`${URL}/`, data),
  update: async (id: number, data: Partial<Formula>) =>
    client.patch(`${URL}/${id}/`, data),
  delete: async (id: number) => client.delete(`${URL}/${id}/`),
  getByIdSSR: async (
    context: NextPageContext,
    id: number
  ): Promise<AxiosResponse<Response<Formula>>> =>
    clientSSR(context).get(`${URL}/${id}`),
  requirement: {
    get: async (
      formula_id: number
    ): Promise<AxiosResponse<Response<FormulaRequirement[]>>> =>
      client.get(`${URL}/${formula_id}/${REQUIREMENT_URL}/`),
    create: async (
      formula_id: number,
      data: Partial<FormulaRequirement>
    ): Promise<AxiosResponse<FormulaRequirement>> =>
      client.post(`${URL}/${formula_id}/${REQUIREMENT_URL}/`, data),
    update: async (
      formula_id: number,
      requirement_id: number,
      data: Partial<FormulaRequirement>
    ): Promise<AxiosResponse<FormulaRequirement>> =>
      client.patch(
        `${URL}/${formula_id}/${REQUIREMENT_URL}/${requirement_id}/`,
        data
      ),
    delete: async (formula_id: number, requirement_id: number) =>
      client.delete(
        `${URL}/${formula_id}/${REQUIREMENT_URL}/${requirement_id}/`
      ),
  },
  ingredient: {
    get: async (
      formula_id: number
    ): Promise<AxiosResponse<Response<FormulaIngredient[]>>> =>
      client.get(`${URL}/${formula_id}/${INGREDIENT_URL}/`),
    create: async (
      formula_id: number,
      data: Partial<FormulaIngredient>
    ): Promise<AxiosResponse<FormulaIngredient>> =>
      client.post(`${URL}/${formula_id}/${INGREDIENT_URL}/`, data),
    update: async (
      formula_id: number,
      ingredient_id: number,
      data: Partial<FormulaIngredient>
    ): Promise<AxiosResponse<FormulaIngredient>> =>
      client.patch(
        `${URL}/${formula_id}/${INGREDIENT_URL}/${ingredient_id}/`,
        data
      ),
    delete: async (formula_id: number, ingredient_id: number) =>
      client.delete(`${URL}/${formula_id}/${INGREDIENT_URL}/${ingredient_id}/`),
    nutrient: {
      /**
       *
       * @param formula_id
       * @param ingredient_id Formula's ingredient id i.e @FormulaIngredient id
       * @returns
       */
      get: async (
        formula_id: number,
        ingredient_id: number
      ): Promise<AxiosResponse<Response<Nutrient[]>>> =>
        client.get(
          `${URL}/${formula_id}/${INGREDIENT_URL}/${ingredient_id}/${NUTRIENT_URL}/`
        ),
    },
  },
};
