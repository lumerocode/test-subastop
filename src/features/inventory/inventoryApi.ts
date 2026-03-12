import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { InventoryResponse, Product, GetProductsArgs } from './types';

export const inventoryApi = createApi({
  reducerPath: 'inventoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  tagTypes: ['Products', 'Categories'], 
  endpoints: (builder) => ({
    getProducts: builder.query<InventoryResponse, GetProductsArgs>({
      query: ({ search, category, page, limit }) => {
        if (category && category !== 'all' && category !== '') {
          return `products/category/${category}?limit=0`; 
        }
        
        const skip = (page - 1) * limit;
        if (search) {
          return `products/search?q=${search}&limit=${limit}&skip=${skip}`;
        }

        return `products?limit=${limit}&skip=${skip}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ id }) => ({ type: 'Products' as const, id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),

    getCategories: builder.query<string[], void>({
      query: () => 'products/category-list',
      providesTags: ['Categories'],
    }),
    
    addProduct: builder.mutation<Product, Partial<Product>>({
      query: (newProduct) => ({
        url: 'products/add',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: newProduct,
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }], 
    }),

    updateProduct: builder.mutation<Product, { id: number; data: Partial<Product> }>({
      query: ({ id, data }) => ({
        url: `products/${id}`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: data,
      }),
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled, getState }) {
        const state = getState() as any;
        const searchTerm = state.inventoryUI?.searchTerm || '';
        const category = state.inventoryUI?.selectedCategory || '';
        
        const patchResult = dispatch(
          inventoryApi.util.updateQueryData('getProducts', { search: searchTerm, category, page: 1, limit: 12 }, (draft) => {
            const product = draft.products.find((p) => p.id === id);
            if (product) {
              Object.assign(product, data);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'Products', id },
        { type: 'Products', id: 'LIST' },
      ],
    }),

    deleteProduct: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Products', id },
        { type: 'Products', id: 'LIST' },
      ],
    }),
  }),
});

export const { 
  useGetProductsQuery, 
  useGetCategoriesQuery,
  useAddProductMutation, 
  useUpdateProductMutation,
  useDeleteProductMutation 
} = inventoryApi;