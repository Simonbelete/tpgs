import { AxiosResponse } from "axios";
import { Response, Formula, FormulaRequirement } from "@/models";
import client from "@/services/client";
import clientSSR from "@/services/client_ssr";
import { NextPageContext } from "next";

const URL = "/formulas";
const HISTORY_URL = `histories`;
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;
const REQUIREMENT_URL = `requirements`;

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
      ingredient_id: number
    ): Promise<AxiosResponse<Response<FormulaRequirement[]>>> =>
      client.get(`${URL}/${ingredient_id}/${REQUIREMENT_URL}/`),
    create: async (
      ingredient_id: number,
      data: Partial<FormulaRequirement>
    ): Promise<AxiosResponse<FormulaRequirement>> =>
      client.post(`${URL}/${ingredient_id}/${REQUIREMENT_URL}/`, data),
    update: async (
      ingredient_id: number,
      nutrient_id: number,
      data: Partial<FormulaRequirement>
    ): Promise<AxiosResponse<FormulaRequirement>> =>
      client.patch(
        `${URL}/${ingredient_id}/${REQUIREMENT_URL}/${nutrient_id}/`,
        data
      ),
    delete: async (ingredient_id: number, nutrient_id: number) =>
      client.delete(
        `${URL}/${ingredient_id}/${REQUIREMENT_URL}/${nutrient_id}/`
      ),
  },
};
