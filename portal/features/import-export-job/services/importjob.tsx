import { baseApi } from "@/services/baseApi";
import { AbstractSummary, Response, ImportJob } from "@/models";
import { NextPageContext } from "next";
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";

export const URL = "/import/jobs";

export const importjobApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getImportJobs: build.query<Response<ImportJob[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: query,
        }),
      }),
      createImportJob: build.mutation<Promise<ImportJob>, Partial<ImportJob>>({
        query: (data: Partial<ImportJob>) => ({
          url: `${URL}/`,
          method: "post",
          data: data,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
      }),
      updateImportJob: build.mutation<
        Promise<ImportJob>,
        Pick<ImportJob, "id"> & Partial<ImportJob>
      >({
        query: ({ id, ...patch }) => ({
          url: `${URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteImportJob: build.mutation<any, number>({
        query: (id: number) => ({ url: `${URL}/${id}/`, method: "delete" }),
      }),
    };
  },
  overrideExisting: false,
});

export const getImportJobByIdSSR = async (
  context: NextPageContext,
  id: number
): Promise<AxiosResponse<Response<ImportJob>>> =>
  clientSSR(context).get(`${URL}/${id}`);

export const {
  useGetImportJobsQuery,
  useLazyGetImportJobsQuery,
  useCreateImportJobMutation,
  useUpdateImportJobMutation,
  useDeleteImportJobMutation,
} = importjobApi;
