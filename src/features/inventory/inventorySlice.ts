import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

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
export default inventorySlice.reducer;