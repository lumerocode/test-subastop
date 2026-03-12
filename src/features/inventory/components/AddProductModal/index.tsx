'use client';
import { useEffect } from 'react';
import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema, ProductFormData } from '../../schemas/productSchema';
import { useAddProductMutation } from '../../inventoryApi';
import { ProductFormFields } from './ProductFormFields';
import { X } from 'lucide-react';
import { Product } from '../../types';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Product;
}

export default function AddProductModal({ 
  isOpen, 
  onClose, 
  initialData 
}: AddProductModalProps) {
  const [addProduct, { isLoading }] = useAddProductMutation();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema) as Resolver<ProductFormData>,
    defaultValues: { title: '', price: 0, stock: 0, category: '', description: '' }
  });

  useEffect(() => {
    if (initialData && isOpen) {
      reset({
        title: initialData.title,
        price: initialData.price,
        stock: initialData.stock,
        category: initialData.category,
        description: initialData.description
      });
    } else if (!initialData && isOpen) {
      reset({ title: '', price: 0, stock: 0, category: '', description: '' });
    }
  }, [initialData, reset, isOpen]);

  const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
    try {
      await addProduct(data).unwrap();
      alert(initialData ? 'Producto actualizado con éxito (Simulado)' : 'Producto agregado con éxito (Simulado)');
      reset();
      onClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900">
            {initialData ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <ProductFormFields register={register} errors={errors} />
          
          <div className="flex justify-end gap-3 mt-8">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-slate-600 font-semibold hover:bg-slate-50 rounded-xl transition-colors cursor-pointer">
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={isLoading}
              className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? 'Guardando...' : initialData ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}