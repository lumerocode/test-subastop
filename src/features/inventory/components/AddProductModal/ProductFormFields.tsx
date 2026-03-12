import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { ProductFormData } from '../../schemas/productSchema';

interface Props {
  register: UseFormRegister<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
}

export const ProductFormFields = ({ register, errors }: Props) => (
  <div className="space-y-5">
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1">Nombre del Producto</label>
      <input 
        {...register('title')} 
        placeholder="Ej. iPhone 15 Pro"
        className="w-full border p-2.5 rounded-xl border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900 transition-all" 
      />
      {errors.title && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.title.message}</p>}
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Precio ($)</label>
        <input 
          type="number" 
          step="0.01" 
          {...register('price', { valueAsNumber: true })} 
          placeholder="0.00"
          className="w-full border p-2.5 rounded-xl border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900 transition-all" 
        />
        {errors.price && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.price.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Stock disponible</label>
        <input 
          type="number" 
          {...register('stock', { valueAsNumber: true })} 
          placeholder="0"
          className="w-full border p-2.5 rounded-xl border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900 transition-all" 
        />
        {errors.stock && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.stock.message}</p>}
      </div>
    </div>

    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1">Categoría</label>
      <input 
        {...register('category')} 
        placeholder="Ej. smartphones, laptops..."
        className="w-full border p-2.5 rounded-xl border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900 transition-all" 
      />
      {errors.category && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.category.message}</p>}
    </div>

    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1">Descripción</label>
      <textarea 
        {...register('description')} 
        placeholder="Describe brevemente el producto (mín. 10 caracteres)..."
        rows={3}
        className="w-full border p-2.5 rounded-xl border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900 transition-all resize-none" 
      />
      {errors.description && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.description.message}</p>}
    </div>
  </div>
);