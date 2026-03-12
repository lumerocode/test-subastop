import Image from 'next/image';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  isDeleting: boolean;
}

export const ProductCard = ({ product, onEdit, onDelete, isDeleting }: ProductCardProps) => (
  <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-md transition-shadow">
    <div className="relative h-48 w-full bg-gray-50 flex items-center justify-center">
      <Image 
        src={product.thumbnail} 
        alt={product.title} 
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        className="object-contain p-4 z-0"
        priority={false}
      />

      <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-indigo-600 shadow-sm z-10">
        ${product.price}
      </span>
    </div>
    <div className="p-4 relative z-0">
      <h3 className="font-bold text-gray-900 truncate">{product.title}</h3>
      <p className="text-sm text-gray-500 line-clamp-2 mb-4 h-10 leading-snug">{product.description}</p>
      
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-50 relative z-0">
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700">
          Stock: {product.stock}
        </span>
        
        <div className="flex gap-4 relative z-0">
          <button onClick={() => onEdit(product)} className="text-xs font-bold text-indigo-600 cursor-pointer hover:underline">
            Editar
          </button>
          <button onClick={() => onDelete(product.id)} disabled={isDeleting} className="text-xs font-bold text-red-500 cursor-pointer hover:underline disabled:opacity-50">
            {isDeleting ? '...' : 'Eliminar'}
          </button>
        </div>
      </div>
    </div>
  </div>
);