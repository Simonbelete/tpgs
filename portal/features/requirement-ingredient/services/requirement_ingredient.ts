import { baseApi } from "@/services/baseApi";
import {
  AbstractSummary,
  Response,
  RequirementIngredient,
  RequirementIngredientHistory,
} from "@/models";
import clientSSR from "@/services/client_ssr";
import { NextPageContext } from "next";
import { AxiosResponse } from "axios";

export const URL = "/requirement-ingredients";
const HISTORY_URL = `histories`;
const SUMMARY_URL = `summary`;

export const requirementIngredientApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getRequirementIngredients: build.query<
        Response<RequirementIngredient[]>,
        Object
      >({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: query,
        }),
      }),
      getRequirementIngredientHistory: build.query<
        Response<RequirementIngredientHistory[]>,
        { id: number; query: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${HISTORY_URL}`,
          method: "get",
          params: query,
        }),
      }),
      getRequirementIngredientSummary: build.query<AbstractSummary, number>({
        query: (id: number) => ({
          url: `${URL}/${id}/${SUMMARY_URL}/`,
          method: "get",
        }),
      }),
      createRequirementIngredient: build.mutation<
        Promise<RequirementIngredient>,
        Partial<RequirementIngredient>
      >({
        query: (data: Partial<RequirementIngredient>) => ({
          url: `${URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateRequirementIngredient: build.mutation<
        Promise<RequirementIngredient>,
        Pick<RequirementIngredient, "id"> & Partial<RequirementIngredient>
      >({
        query: ({ id, ...patch }) => ({
          url: `${URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteRequirementIngredient: build.mutation<any, number>({
        query: (id: number) => ({ url: `${URL}/${id}/`, method: "delete" }),
      }),
    };
  },
  overrideExisting: false,
});

export const getRequirementIngredientByIdSSR = async (
  context: NextPageContext,
  id: number
): Promise<AxiosResponse<Response<RequirementIngredient>>> =>
  clientSSR(context).get(`${URL}/${id}`);

export const {
  useGetRequirementIngredientsQuery,
  useLazyGetRequirementIngredientsQuery,
  useGetRequirementIngredientHistoryQuery,
  useGetRequirementIngredientSummaryQuery,
  useCreateRequirementIngredientMutation,
  useUpdateRequirementIngredientMutation,
  useDeleteRequirementIngredientMutation,
} = requirementIngredientApi;
