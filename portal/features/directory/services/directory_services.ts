import client from "@/services/client";

const URL = "/directories";
const REFRESH_URL = `${URL}/refresh`;

export default {
  refresh: async () => client.post(`${REFRESH_URL}/`, {}),
}