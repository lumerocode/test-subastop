import { configureStore } from '@reduxjs/toolkit';
import { inventoryApi } from '@/features/inventory/inventoryApi';
import inventoryReducer from '@/features/inventory/inventorySlice';
import authReducer from '@/features/auth/authSlice';
import { rtkQueryErrorLogger } from './middleware/errorMiddleware';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [inventoryApi.reducerPath]: inventoryApi.reducer,
      inventoryUI: inventoryReducer,
      auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(inventoryApi.middleware, rtkQueryErrorLogger),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];