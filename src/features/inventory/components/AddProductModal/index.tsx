'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema, ProductFormData } from '../../schemas/productSchema';
import { useAddProductMutation } from '../../inventoryApi';
import { ProductFormFields } from './ProductFormFields';
import { X } from 'lucide-react';
import { Product } from '../../types';
import { toast } from 'sonner';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Product;
}

export default function AddProductModal({ isOpen, onClose, initialData }: AddProductModalProps) {
  const [mounted, setMounted] = useState(false);
  const [addProduct, { isLoading }] = useAddProductMutation();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema) as Resolver<ProductFormData>,
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: { title: '', price: 0, stock: 0, category: '', description: '' }
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
      
      toast.success(initialData ? 'Producto actualizado exitosamente' : 'Producto creado con éxito');
      
      reset();
      onClose();
    } catch (error) {
      console.error('Handled by middleware:', error);
    }
  };

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100000] flex justify-center items-center p-4">
      <div 
        className="fixed inset-0 modal-overlay-glass animate-modal-fade" 
        onClick={onClose}
      />

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-modal-zoom border border-slate-100 z-[100001]">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-900">
            {initialData ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer p-1">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
          <ProductFormFields register={register} errors={errors} />
          
          <div className="flex justify-end gap-4 mt-8">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 py-4 text-slate-600 font-bold border border-slate-200 hover:bg-slate-50 rounded-2xl transition-all cursor-pointer active:scale-95"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={isLoading}
              className="flex-1 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50 cursor-pointer active:scale-95"
            >
              {isLoading ? 'Guardando...' : initialData ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}