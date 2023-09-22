import { baseApi } from '@/services/baseApi';
import { AbstractSummary, Response, Breed } from '@/models';
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";

const URL = "/breeds";
const HISTORY_URL = `histories`;
const SUMMARY_URL = `summary`;
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;

export const breedApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getBreeds: build.query<Response<Breed>, Object>({ query: (query?: Object) => ({ url: `${URL}/`, method: 'get', params: query }) }),
      getBreedHistory: build.query<Response<Breed>, {id: number, query: Object}>({ query: ({id, query}) => ({ url: `${URL}/${id}/${HISTORY_URL}`, method: 'get', params: query }) }),
      getBreedSummary: build.query<AbstractSummary, number>({ query: (id: number) => ({ url: `${URL}/${id}/${SUMMARY_URL}/`, method: 'get' }) }),
      createBreed: build.mutation<Promise<AxiosResponse<Breed>>, Partial<Breed>>({
        query: (data: Partial<Breed>) => ({ url: `${URL}/`, method: 'post', data: data }),
      }),
      updateBreed: build.mutation<Breed, Pick<Breed, 'id'> & Partial<Breed>>({
        query: ({id, ...patch}) => ({ url: `${URL}/${id}/`, method: 'patch', data: patch }),
      }),
      deleteBreed: build.mutation<any, number>({
        query: (id: number) => ({ url: `${URL}/${id}/`, method: 'delete' }),
      })
    }
  },
  overrideExisting: false,
});

export const getHouseByIdSSR = async (
    context: NextPageContext,
    id: number
  ): Promise<AxiosResponse<Response<Breed>>> =>
    clientSSR(context).get(`${URL}/${id}`);
export const exportBreedsXLSX = async () => client.get(`${EXPORT_URL}/xlsx`);
export const exportBreedsXLS = async () => client.get(`${EXPORT_URL}/xls`);
export const exportBreedsCSV = async () => client.get(`${EXPORT_URL}/csv`, { responseType: "blob" });
export const  importBreedsXLSX = async (data: FormData) =>
    client.post(`${IMPORT_URL}/xlsx`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
export const importBreedsCSV = async (data: FormData) =>
  client.post(`${IMPORT_URL}/csv`, data, {
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
  useGetBreedHistoryQuery,
  useGetBreedSummaryQuery, 
  useCreateBreedMutation,
  useUpdateBreedMutation,
  useDeleteBreedMutation,
} = breedApi;