import { Response } from "@/models";
import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import { getCsrfToken, getSession } from "next-auth/react";
import NProgress from "nprogress";
import Cookies from "universal-cookie";
import type { BaseQueryFn } from '@reduxjs/toolkit/query'

const cookies = new Cookies();

const calculatePercentage = (loaded: number, total: number) =>
  Math.floor(loaded * 1.0) / total;

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  timeout: 1000,
});

instance.interceptors.request.use(async (config) => {
  const session = await getSession();
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

export const clientBaseQuery =  (
  { baseUrl }: { baseUrl: string } = { baseUrl: '' }
): BaseQueryFn<
  {
    url: string
    method: AxiosRequestConfig['method']
    data?: AxiosRequestConfig['data']
    params?: AxiosRequestConfig['params']
  },
  unknown,
  unknown
> =>
async ({ url, method, data, params }) => {
  try {
    const result = await instance({ url: baseUrl + url, method, data, params })
    return { data: result.data }
  } catch (axiosError) {
    let err = axiosError as AxiosError
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      },
    }
  }  
}


export default instance;
