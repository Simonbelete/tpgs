import { AxiosResponse } from "axios";
import { Response, Nutrient } from "@/models";
import client from "@/services/client";

const URL = "/nutrients/";

export default {
  get: async (): Promise<AxiosResponse<Response<Nutrient[]>>> =>
    client.get(URL),
  create: async (data: Partial<Nutrient>) => client.post(URL, data),
};
