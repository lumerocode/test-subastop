import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { InventoryResponse, Product } from './types';

export const inventoryApi = createApi({
  reducerPath: 'inventoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),

  tagTypes: ['Products'], 
  endpoints: (builder) => ({
    getProducts: builder.query<InventoryResponse, { search: string }>({
      query: ({ search }) => 
        search ? `products/search?q=${search}` : `products?limit=10`,
      providesTags: ['Products'],
    }),
    
    addProduct: builder.mutation<Product, Partial<Product>>({
      query: (newProduct) => ({
        url: 'products/add',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: newProduct,
      }),

      invalidatesTags: ['Products'], 
    }),
  }),
});

export const { useGetProductsQuery, useAddProductMutation } = inventoryApi;