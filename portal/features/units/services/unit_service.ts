import { AxiosResponse } from "axios";
import { Response, Unit } from "@/models";
import client from "@/services/client";

const URL = "/units/";

export default {
  get: async (): Promise<AxiosResponse<Response<Unit[]>>> => client.get(URL),
  create: async (data: Partial<Unit>) => client.post(URL, data),
};
