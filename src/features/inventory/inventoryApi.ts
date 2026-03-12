import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { InventoryResponse, Product } from './types';

export const inventoryApi = createApi({
  reducerPath: 'inventoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),

  tagTypes: ['Products'], 
  endpoints: (builder) => ({
    getProducts: builder.query<InventoryResponse, { search: string; page: number }>({
      query: ({ search, page }) => {
        const limit = 12;
        const skip = (page - 1) * limit;
        
        if (search) {
          return `products/search?q=${search}&limit=${limit}&skip=${skip}`;
        }
        return `products?limit=${limit}&skip=${skip}`;
      },
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

    deleteProduct: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const { 
  useGetProductsQuery, 
  useAddProductMutation, 
  useDeleteProductMutation 
} = inventoryApi;