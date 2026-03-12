import { z } from 'zod';

export const productSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  price: z.coerce.number().min(0.01, 'El precio debe ser mayor a 0'),
  stock: z.coerce.number().int().min(0, 'El stock no puede ser negativo'),
  category: z.string().min(1, 'La categoría es obligatoria'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
});

export type ProductFormData = z.infer<typeof productSchema>;