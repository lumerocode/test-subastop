import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';
import { toast } from 'sonner';

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const errorData = action.payload as { data?: { message?: string }; status?: number };
    const errorMessage = errorData.data?.message || `Error de servidor (${errorData.status || 'Fetch Error'})`;

    toast.error(errorMessage, {
      description: 'Ocurrió un problema al procesar la solicitud en el inventario.',
    });
  }

  return next(action);
};