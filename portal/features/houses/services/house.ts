import { baseApi } from '@/services/baseApi';
import { AbstractSummary } from '@/models';

const URL = "/houses";
const HISTORY_URL = `histories`;
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;

export const houseApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getSummary: build.query<AbstractSummary, number>({ query: (id: number) => ({ url: `${URL}/${id}`, method: 'get' }) }),
    }
  },
  overrideExisting: false,
})

export const { useGetSummaryQuery } = houseApi;