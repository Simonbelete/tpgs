import { Response } from "@/models";
import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { getSession, signOut } from "next-auth/react";
import NProgress from "nprogress";
import Cookies from "universal-cookie";
import { ClientQueyFn } from "@/types";

const cookies = new Cookies();

const calculatePercentage = (loaded: number, total: number) =>
  Math.floor(loaded * 1.0) / total;

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
});

instance.interceptors.request.use(async (config) => {
  if(["/farms/", "/inbox/notifications/unread_count/", "/analyses/count/", "/inbox/notifications/unread/"].includes(config.url ?? "") || config.method != "get") {
    const session = await getSession();
    if (session) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
  } 

  return config
});

export const defaultTenantInterceptor = async (
  config: InternalAxiosRequestConfig<any>
) => {
  config.headers["x-Request-Id"] = cookies.get("REQUEST_ID")
    ? cookies.get("REQUEST_ID")["name"]
    : "public";
  return config;
};

export const tenantInterceptor = instance.interceptors.request.use(
  defaultTenantInterceptor
);

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
        signOut();
      } else if (error.response?.status === 403) {
        // Unauthorized
        // TODO: Remove acess token(logout)
        // Service.logout().catch(() => {});
      }

      return Promise.reject(error.response);
    }
  );
}

export const clientBaseQuery =
  ({ baseUrl }: { baseUrl: string } = { baseUrl: "/api" }): ClientQueyFn =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await instance({
        url: url,
        method,
        data,
        params,
        headers: headers,
      });
      return {
        data: {
          ...result.data,
          status: result.status,
        },
      };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: {
          // @ts-ignore
          data: err?.data || {},
          status: err.status,
        },
      };
    }
  };

export default instance;
