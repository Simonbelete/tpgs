import { baseApi } from "@/services/baseApi";
import { AbstractSummary, Response, Stage, StageHistory } from "@/models";
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";

export const URL = "/stages";
const HISTORY_URL = `histories`;
const SUMMARY_URL = `summary`;

export const stageApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getStages: build.query<Response<Stage[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: query,
        }),
      }),
      getStageHistory: build.query<
        Response<StageHistory[]>,
        { id: number; query: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${HISTORY_URL}`,
          method: "get",
          params: query,
        }),
      }),
      getStageSummary: build.query<AbstractSummary, number>({
        query: (id: number) => ({
          url: `${URL}/${id}/${SUMMARY_URL}/`,
          method: "get",
        }),
      }),
      createStage: build.mutation<Promise<Stage>, Partial<Stage>>({
        query: (data: Partial<Stage>) => ({
          url: `${URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateStage: build.mutation<
        Promise<Stage>,
        Pick<Stage, "id"> & Partial<Stage>
      >({
        query: ({ id, ...patch }) => ({
          url: `${URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteStage: build.mutation<any, number>({
        query: (id: number) => ({ url: `${URL}/${id}/`, method: "delete" }),
      }),
    };
  },
  overrideExisting: false,
});

export const getStageByIdSSR = async (
  context: NextPageContext,
  id: number
): Promise<AxiosResponse<Response<Stage>>> =>
  clientSSR(context).get(`${URL}/${id}`);

export const {
  useGetStagesQuery,
  useLazyGetStagesQuery,
  useGetStageHistoryQuery,
  useGetStageSummaryQuery,
  useCreateStageMutation,
  useUpdateStageMutation,
  useDeleteStageMutation,
} = stageApi;
