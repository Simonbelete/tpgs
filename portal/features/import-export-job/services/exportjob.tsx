import { baseApi } from "@/services/baseApi";
import { AbstractSummary, Response, ExportJob } from "@/models";
import { NextPageContext } from "next";
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";

const URL = "/export/jobs";

export const exportjobApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getExportJobs: build.query<Response<ExportJob[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: query,
        }),
      }),
      createExportJob: build.mutation<Promise<ExportJob>, Partial<ExportJob>>({
        query: (data: Partial<ExportJob>) => ({
          url: `${URL}/`,
          method: "post",
          data: data,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
      }),
      updateExportJob: build.mutation<
        Promise<ExportJob>,
        Pick<ExportJob, "id"> & Partial<ExportJob>
      >({
        query: ({ id, ...patch }) => ({
          url: `${URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteExportJob: build.mutation<any, number>({
        query: (id: number) => ({ url: `${URL}/${id}/`, method: "delete" }),
      }),
    };
  },
  overrideExisting: false,
});

export const getExportJobByIdSSR = async (
  context: NextPageContext,
  id: number
): Promise<AxiosResponse<Response<ExportJob>>> =>
  clientSSR(context).get(`${URL}/${id}`);

export const {
  useGetExportJobsQuery,
  useLazyGetExportJobsQuery,
  useCreateExportJobMutation,
  useUpdateExportJobMutation,
  useDeleteExportJobMutation,
} = exportjobApi;
