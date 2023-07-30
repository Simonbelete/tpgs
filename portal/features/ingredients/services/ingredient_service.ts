import { AxiosResponse } from "axios";
import { Response, Ingredient, Nutrient, IngredientNutrient } from "@/models";
import client from "@/services/client";
import clientSSR from "@/services/client_ssr";
import { NextPageContext } from "next";

const URL = "/ingredients";
const HISTORY_URL = `histories`;
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;
const NUTRIENT_URL = `nutrients`;

export default {
  get: async (): Promise<AxiosResponse<Response<Ingredient[]>>> =>
    client.get(`${URL}/`),
  getById: async (id: number): Promise<AxiosResponse<Response<Ingredient>>> =>
    client.get(`${URL}/${id}`),
  create: async (data: Partial<Ingredient>) => client.post(`${URL}/`, data),
  update: async (id: number, data: Partial<Ingredient>) =>
    client.patch(`${URL}/${id}/`, data),
  delete: async (id: number) => client.delete(`${URL}/${id}/`),
  getByIdSSR: async (
    context: NextPageContext,
    id: number
  ): Promise<AxiosResponse<Response<Ingredient>>> =>
    clientSSR(context).get(`${URL}/${id}`),
  history: {
    get: async (id: number): Promise<AxiosResponse<Response<Ingredient[]>>> =>
      client.get(`${URL}/${id}/${HISTORY_URL}/`),
  },
  export: {
    xlsx: async () => client.get(`${EXPORT_URL}/xlsx`),
    xls: async () => client.get(`${EXPORT_URL}/xls`),
    csv: async () => client.get(`${EXPORT_URL}/csv`, { responseType: "blob" }),
  },
  import: {
    xlsx: async (data: FormData) =>
      client.post(`${IMPORT_URL}/xlsx`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    xls: async (data: FormData) =>
      client.post(`${IMPORT_URL}/xls`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    csv: async (data: FormData) =>
      client.post(`${IMPORT_URL}/csv`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
  },
  nutrient: {
    get: async (
      ingredient_id: number
    ): Promise<AxiosResponse<Response<IngredientNutrient[]>>> =>
      client.get(`${URL}/${ingredient_id}/${NUTRIENT_URL}/`),
    create: async (
      ingredient_id: number,
      data: Partial<IngredientNutrient>
    ): Promise<AxiosResponse<Response<IngredientNutrient[]>>> =>
      client.post(`${URL}/${ingredient_id}/${NUTRIENT_URL}/`, data),
    update: async (
      ingredient_id: number,
      nutrient_id: number,
      data: Partial<IngredientNutrient>
    ): Promise<AxiosResponse<Response<IngredientNutrient[]>>> =>
      client.post(
        `${URL}/${ingredient_id}/${NUTRIENT_URL}/${nutrient_id}/`,
        data
      ),
    delete: async (ingredient_id: number, nutrient_id: number) =>
      client.delete(`${URL}/${ingredient_id}/${NUTRIENT_URL}/${nutrient_id}/`),
  },
};
