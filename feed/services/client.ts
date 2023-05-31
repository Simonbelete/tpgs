import axios, { AxiosResponse } from "axios";
import { getSession } from "next-auth/react";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  timeout: 1000,
});

// instance.interceptors.request.use(async (config) => {
//   const session = await getSession();
//   console.log(session);
//   // if (session) {
//   //   config.headers.common = {
//   //     Authorization: `${session.token.accessToken}`,
//   //   };
//   // }
//   return config;
// });

// //127.0.0.1:8000/
// https: instance.get("/users");

export default instance;
