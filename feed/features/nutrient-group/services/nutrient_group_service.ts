import { AxiosResponse } from "axios";
import { Response, NutrientGroup } from "@/models";
import client from "@/services/client";

const URL = "/nutrient-groups/";

export default {
  get: async (): Promise<AxiosResponse<Response<NutrientGroup[]>>> =>
    client.get(URL),
  create: async (data: Partial<NutrientGroup>) => client.post(URL, data),
};
