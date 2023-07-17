import axios, { AxiosResponse } from "axios";
import { NextPageContext } from "next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import Cookies from "universal-cookie";

const instance = (context: NextPageContext) => {
  const inst = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
    timeout: 1000,
  });

  inst.interceptors.request.use(async (config) => {
    const session = await getServerSession(
      // @ts-ignore
      context.req,
      context.res,
      authOptions
    );

    // @ts-ignore
    const cookies = new Cookies(context.req.headers.cookie);

    console.log(cookies);

    if (session) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
      config.headers["x-Request-Id"] = cookies.get("REQUEST_ID") ?? "public";
    }
    return config;
  });

  return inst;
};
export default instance;
