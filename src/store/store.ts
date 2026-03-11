import { configureStore } from '@reduxjs/toolkit';
import { inventoryApi } from '@/features/inventory/inventoryApi';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [inventoryApi.reducerPath]: inventoryApi.reducer, 
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(inventoryApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];