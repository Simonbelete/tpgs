import { Response } from "@/models";
import axios, { AxiosResponse } from "axios";
import { getSession } from "next-auth/react";
import NProgress from "nprogress";

const calculatePercentage = (loaded: number, total: number) =>
  Math.floor(loaded * 1.0) / total;

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

if (typeof window !== "undefined") {
  instance.interceptors.request.use(
    (config) => {
      NProgress.start();
      return config;
    },
    (error) => {
      NProgress.done();
      return Promise.reject(error);
    }
  );

  instance.defaults.onDownloadProgress = (e: any) => {
    const percentage = calculatePercentage(e.loaded, e.total);
    NProgress.set(percentage);
  };

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      NProgress.done(true);
      return response;
    },
    (error) => {
      NProgress.done();
      // TODO: Log error
      // console.log(error.response);
      if (error.response?.status === 401) {
        // Unauthorized
        // TODO: Remove acess token(logout)
        // Service.logout().catch(() => {});
      } else if (error.response?.status === 403) {
        // Unauthorized
        // TODO: Remove acess token(logout)
        // Service.logout().catch(() => {});
      }

      return Promise.reject(error.response);
    }
  );
}

export default instance;
