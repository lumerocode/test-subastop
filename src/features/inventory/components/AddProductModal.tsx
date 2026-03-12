'use client';
import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema, ProductFormData } from '../schemas/productSchema';
import { useAddProductMutation } from '../inventoryApi';

export default function AddProductModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [addProduct, { isLoading }] = useAddProductMutation();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema) as Resolver<ProductFormData>, 
    defaultValues: {
      title: '',
      price: 0,
      stock: 0,
      category: '',
      description: '',
    }
  });

  const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
    try {
      await addProduct(data).unwrap();
      alert('Producto agregado con éxito');
      reset();
      onClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Agregar Nuevo Producto</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Título</label>
            <input {...register('title')} className="w-full border p-2 rounded-md border-gray-300 outline-indigo-500 text-gray-900" />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Precio</label>
              <input type="number" step="0.01" {...register('price')} className="w-full border p-2 rounded-md border-gray-300 outline-indigo-500 text-gray-900" />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Stock</label>
              <input type="number" {...register('stock')} className="w-full border p-2 rounded-md border-gray-300 outline-indigo-500 text-gray-900" />
              {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Categoría</label>
            <input {...register('category')} className="w-full border p-2 rounded-md border-gray-300 outline-indigo-500 text-gray-900" />
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea {...register('description')} className="w-full border p-2 rounded-md border-gray-300 outline-indigo-500 text-gray-900 h-20" />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={isLoading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-300 font-semibold transition-all"
            >
              {isLoading ? 'Guardando...' : 'Guardar Producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}