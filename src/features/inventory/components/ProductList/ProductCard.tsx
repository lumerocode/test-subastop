import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  isDeleting: boolean;
}

export const ProductCard = ({ product, onEdit, onDelete, isDeleting }: ProductCardProps) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
    <div className="relative h-48 w-full bg-gray-50">
      <img 
        src={product.thumbnail} 
        alt={product.title} 
        className="w-full h-full object-contain p-4"
      />
      <span className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold text-indigo-600 shadow-sm">
        ${product.price}
      </span>
    </div>
    <div className="p-4">
      <h3 className="font-bold text-gray-900 truncate">{product.title}</h3>
      <p className="text-sm text-gray-500 line-clamp-2 mb-4 h-10">{product.description}</p>
      
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-50">
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700">
          Stock: {product.stock}
        </span>
        
        <div className="flex gap-2">
          <button 
            onClick={() => onEdit(product)}
            className="text-xs font-bold text-indigo-600 cursor-pointer hover:text-indigo-800 flex items-center gap-1"
          >
            Editar
          </button>
          <button 
            onClick={() => onDelete(product.id)}
            disabled={isDeleting}
            className="text-xs font-bold text-red-500 cursor-pointer hover:text-red-700 disabled:opacity-50 flex items-center gap-1"
          >
            {isDeleting ? '...' : 'Eliminar'}
          </button>
        </div>
      </div>
    </div>
  </div>
);