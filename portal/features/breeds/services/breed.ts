import { baseApi } from "@/services/baseApi";
import {
  AbstractSummary,
  Response,
  Breed,
  BreedHistory,
  BreedWeightGuideline,
  HDEPGuideline,
  HHEPGuideline,
  FeedGuideline,
  EggGuideline,
} from "@/models";
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";

export const URL = "/breeds";
const HISTORY_URL = `histories`;
const SUMMARY_URL = `summary`;
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;

const WEIGHT_URL = "guidelines/weights";
const FEED_URL = "guidelines/feeds";
const EGG_URL = "guidelines/feeds";
const HDEP_URL = "guidelines/hdep";
const HHEP_URL = "guidelines/hhep";

export const breedApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getBreeds: build.query<Response<Breed[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: query,
        }),
      }),
      getBreedHistory: build.query<
        Response<BreedHistory[]>,
        { id: number; query: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${HISTORY_URL}`,
          method: "get",
          params: query,
        }),
      }),
      getBreedSummary: build.query<AbstractSummary, number>({
        query: (id: number) => ({
          url: `${URL}/${id}/${SUMMARY_URL}/`,
          method: "get",
        }),
      }),
      createBreed: build.mutation<Promise<Breed>, Partial<Breed>>({
        query: (data: Partial<Breed>) => ({
          url: `${URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateBreed: build.mutation<
        Promise<Breed>,
        Pick<Breed, "id"> & Partial<Breed>
      >({
        query: ({ id, ...patch }) => ({
          url: `${URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteBreed: build.mutation<any, number>({
        query: (id: number) => ({ url: `${URL}/${id}/`, method: "delete" }),
      }),

      // HDEP Guideline
      getHDEPGuidelineOfBreed: build.query<
        Response<HDEPGuideline[]>,
        { id: number; query?: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${HDEP_URL}/`,
          method: "get",
          params: query,
        }),
      }),
      createHDEPGuidelineForBreed: build.mutation<
        Promise<HDEPGuideline>,
        { id: number; data: Partial<HDEPGuideline> }
      >({
        query: ({ id, data }) => ({
          url: `${URL}/${id}/${HDEP_URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateHDEPGuidelineOfBreed: build.mutation<
        Promise<HDEPGuideline>,
        Partial<HDEPGuideline>
      >({
        query: ({ breed, id, ...patch }) => ({
          url: `${URL}/${breed}/${HDEP_URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteHDEPGuidelineOfBreed: build.mutation<
        any,
        Pick<HDEPGuideline, "breed" | "id">
      >({
        query: ({ breed, id }) => ({
          url: `${URL}/${breed}/${HDEP_URL}/${id}`,
          method: "delete",
        }),
      }),

      // HHEP Guideline
      getHHEPGuidelineOfBreed: build.query<
        Response<HHEPGuideline[]>,
        { id: number; query?: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${HHEP_URL}/`,
          method: "get",
          params: query,
        }),
      }),
      createHHEPGuidelineForBreed: build.mutation<
        Promise<HHEPGuideline>,
        { id: number; data: Partial<HHEPGuideline> }
      >({
        query: ({ id, data }) => ({
          url: `${URL}/${id}/${HHEP_URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateHHEPGuidelineOfBreed: build.mutation<
        Promise<HHEPGuideline>,
        Partial<HHEPGuideline>
      >({
        query: ({ breed, id, ...patch }) => ({
          url: `${URL}/${breed}/${HHEP_URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteHHEPGuidelineOfBreed: build.mutation<
        any,
        Pick<HHEPGuideline, "breed" | "id">
      >({
        query: ({ breed, id }) => ({
          url: `${URL}/${breed}/${HHEP_URL}/${id}`,
          method: "delete",
        }),
      }),

      // Weight Guideline
      getWeightGuidelineOfBreed: build.query<
        Response<BreedWeightGuideline[]>,
        { id: number; query?: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${WEIGHT_URL}/`,
          method: "get",
          params: query,
        }),
      }),
      createWeightGuidelineForBreed: build.mutation<
        Promise<BreedWeightGuideline>,
        { id: number; data: Partial<BreedWeightGuideline> }
      >({
        query: ({ id, data }) => ({
          url: `${URL}/${id}/${WEIGHT_URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateWeightGuidelineOfBreed: build.mutation<
        Promise<BreedWeightGuideline>,
        Partial<BreedWeightGuideline>
      >({
        query: ({ breed, id, ...patch }) => ({
          url: `${URL}/${breed}/${WEIGHT_URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteWeightGuidelineOfBreed: build.mutation<
        any,
        Pick<BreedWeightGuideline, "breed" | "id">
      >({
        query: ({ breed, id }) => ({
          url: `${URL}/${breed}/${WEIGHT_URL}/${id}`,
          method: "delete",
        }),
      }),

      // Feed Guideline
      getFeedGuidelineOfBreed: build.query<
        Response<FeedGuideline[]>,
        { id: number; query?: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${FEED_URL}/`,
          method: "get",
          params: query,
        }),
      }),
      createFeedGuidelineForBreed: build.mutation<
        Promise<FeedGuideline>,
        { id: number; data: Partial<FeedGuideline> }
      >({
        query: ({ id, data }) => ({
          url: `${URL}/${id}/${FEED_URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateFeedGuidelineOfBreed: build.mutation<
        Promise<FeedGuideline>,
        Partial<FeedGuideline>
      >({
        query: ({ breed, id, ...patch }) => ({
          url: `${URL}/${breed}/${FEED_URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteFeedGuidelineOfBreed: build.mutation<
        any,
        Pick<FeedGuideline, "breed" | "id">
      >({
        query: ({ breed, id }) => ({
          url: `${URL}/${breed}/${FEED_URL}/${id}`,
          method: "delete",
        }),
      }),

      // Egg Guideline
      getEggGuidelineOfBreed: build.query<
        Response<EggGuideline[]>,
        { id: number; query?: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${EGG_URL}/`,
          method: "get",
          params: query,
        }),
      }),
      createEggGuidelineForBreed: build.mutation<
        Promise<EggGuideline>,
        { id: number; data: Partial<EggGuideline> }
      >({
        query: ({ id, data }) => ({
          url: `${URL}/${id}/${EGG_URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateEggGuidelineOfBreed: build.mutation<
        Promise<EggGuideline>,
        Partial<EggGuideline>
      >({
        query: ({ breed, id, ...patch }) => ({
          url: `${URL}/${breed}/${EGG_URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteEggGuidelineOfBreed: build.mutation<
        any,
        Pick<EggGuideline, "breed" | "id">
      >({
        query: ({ breed, id }) => ({
          url: `${URL}/${breed}/${EGG_URL}/${id}`,
          method: "delete",
        }),
      }),
    };
  },
  overrideExisting: false,
});

export const getBreedByIdSSR = async (
  context: NextPageContext,
  id: number
): Promise<AxiosResponse<Response<Breed>>> =>
  clientSSR(context).get(`${URL}/${id}`);
export const exportBreedsXLSX = async () => client.get(`${EXPORT_URL}/xlsx`);
export const exportBreedsXLS = async () => client.get(`${EXPORT_URL}/xls`);
export const exportBreedsCSV = async () =>
  client.get(`${EXPORT_URL}/csv`, { responseType: "blob" });
export const importBreedsXLSX = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xlsx`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importBreedsCSV = async (data: FormData) =>
  client.post(`${IMPORT_URL}/csv/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importBreedsXLS = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xls`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const {
  useGetBreedsQuery,
  useLazyGetBreedsQuery,
  useGetBreedHistoryQuery,
  useGetBreedSummaryQuery,
  useCreateBreedMutation,
  useUpdateBreedMutation,
  useDeleteBreedMutation,

  useLazyGetHDEPGuidelineOfBreedQuery,
  useLazyGetHHEPGuidelineOfBreedQuery,
} = breedApi;
