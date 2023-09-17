import { createApi } from '@reduxjs/toolkit/query/react'
import { clientBaseQuery } from './client';

// initialize an empty api service that we'll inject endpoints into later as needed
export const baseApi = createApi({
  baseQuery: clientBaseQuery({ baseUrl: '/api' }),
  endpoints: () => ({}),
})