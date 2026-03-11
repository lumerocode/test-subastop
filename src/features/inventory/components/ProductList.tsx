'use client';
import { useSelector } from 'react-redux';
import { selectSearchTerm } from '../inventorySlice';
import { useGetProductsQuery } from '../inventoryApi';

export default function ProductList() {
  const searchTerm = useSelector(selectSearchTerm);

  const { data, isLoading, isError } = useGetProductsQuery({ search: searchTerm });

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );
  
  if (isError) return (
    <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
      Error al cargar los productos. Por favor, intenta de nuevo.
    </div>
  );

  if (data?.products.length === 0) return (
    <div className="text-center py-10">
      <p className="text-gray-500">No se encontraron productos para "{searchTerm}"</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data?.products.map((product) => (
        <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
          {}
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
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-900 truncate flex-1">{product.title}</h3>
              <span className="ml-2 text-xs text-gray-500 uppercase tracking-wider">{product.category}</span>
            </div>
            <p className="text-sm text-gray-500 line-clamp-2 mb-4 h-10">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${product.stock < 20 ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                Stock: {product.stock}
              </span>
              <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                Editar Producto
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}