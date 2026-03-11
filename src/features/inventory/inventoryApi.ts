import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { InventoryResponse, Product } from './types';

export const inventoryApi = createApi({
  reducerPath: 'inventoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query<InventoryResponse, { limit: number; skip: number }>({
      query: ({ limit, skip }) => `products?limit=${limit}&skip=${skip}`,
      providesTags: ['Products'],
    }),
  }),
});

export const { useGetProductsQuery } = inventoryApi;