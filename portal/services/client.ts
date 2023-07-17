import { Response } from "@/models";
import axios, { AxiosResponse } from "axios";
import { getCsrfToken, getSession } from "next-auth/react";
import NProgress from "nprogress";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const calculatePercentage = (loaded: number, total: number) =>
  Math.floor(loaded * 1.0) / total;

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  timeout: 1000,
});

instance.interceptors.request.use(async (config) => {
  const session = await getSession();
  console.log("----------");
  console.log(session);
  if (session) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
    config.headers["x-Request-Id"] = cookies.get("REQUEST_ID") ?? "public";
  }
  return config;
});

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
      NProgress.done();
      return response;
    },
    (error) => {
      NProgress.set(100);
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
