import { AxiosResponse } from "axios";
import { Response, IngredientType } from "@/models";
import client from "@/services/client";

const URL = "/ingredients/types/";

export default {
  get: async (): Promise<AxiosResponse<Response<IngredientType[]>>> =>
    client.get(URL),
  create: async (data: Partial<IngredientType>) => client.post(URL, data),
};
