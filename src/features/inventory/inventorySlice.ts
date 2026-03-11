import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

interface InventoryState {
  searchTerm: string;
}

const initialState: InventoryState = {
  searchTerm: '',
};

export const inventorySlice = createSlice({
  name: 'inventoryUI',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setSearchTerm } = inventorySlice.actions;

export const selectSearchTerm = (state: RootState) => state.inventoryUI.searchTerm;

export default inventorySlice.reducer;