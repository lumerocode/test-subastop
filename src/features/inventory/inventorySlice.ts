import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { inventoryApi } from './inventoryApi';

interface InventoryState {
  searchTerm: string;
  selectedCategory: string;
}

const initialState: InventoryState = {
  searchTerm: '',
  selectedCategory: '',
};

export const inventorySlice = createSlice({
  name: 'inventoryUI',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setSearchTerm, setSelectedCategory } = inventorySlice.actions;

export const selectSearchTerm = (state: RootState) => state.inventoryUI.searchTerm;
export const selectSelectedCategory = (state: RootState) => state.inventoryUI.selectedCategory;

const selectGetProductsResult = (state: RootState) => {
  const searchTerm = selectSearchTerm(state);
  const category = selectSelectedCategory(state);
  
  return inventoryApi.endpoints.getProducts.select({
    search: searchTerm,
    category: category,
    page: 1,
    limit: 12 
  })(state);
};

export const selectInventoryStats = createSelector(
  [selectGetProductsResult],
  (productsResult) => {
    const products = productsResult?.data?.products || [];
    
    const totalValue = products.reduce((acc, curr) => acc + (curr.price * curr.stock), 0);
    const totalStock = products.reduce((acc, curr) => acc + curr.stock, 0);
    const avgPrice = products.length > 0 ? totalValue / totalStock : 0;

    return {
      totalValue,
      totalStock,
      avgPrice,
      count: products.length
    };
  }
);

export default inventorySlice.reducer;