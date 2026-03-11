import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { InventoryResponse, Product } from './types';

export const inventoryApi = createApi({
  reducerPath: 'inventoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getProducts: builder.query<InventoryResponse, { search: string }>({
      query: ({ search }) => 
        search ? `products/search?q=${search}` : `products?limit=10`,
    }),
  }),
});

export const { useGetProductsQuery } = inventoryApi;