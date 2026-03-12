'use client';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectSearchTerm } from '../../inventorySlice';
import { useGetProductsQuery, useDeleteProductMutation } from '../../inventoryApi';
import { ProductCard } from './ProductCard';
import { PaginationControls } from './PaginationControls';
import AddProductModal from '../AddProductModal';
import { Product } from '../../types';
import { toast } from 'sonner';

export default function ProductList() {
  const searchTerm = useSelector(selectSearchTerm);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  
  const [itemsPerPage, setItemsPerPage] = useState(12);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(6);
      } else {
        setItemsPerPage(12);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage]);

  const { data, isLoading, isError } = useGetProductsQuery({ 
    search: searchTerm, 
    page: currentPage, 
    limit: itemsPerPage
  });

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const totalPages = Math.ceil((data?.total || 0) / itemsPerPage);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(undefined);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Eliminar producto?')) {
      try {
        await deleteProduct(id).unwrap();
        toast.success('Producto eliminado exitosamente');
      } catch (error) {
        console.error('Error al eliminar:', error);
        toast.error('No se pudo eliminar el producto');
      }
    }
  };

  if (isLoading) return (
    <div className="flex justify-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );
  
  if (isError) return (
    <div className="p-4 bg-red-50 text-red-700 rounded-lg">
      Error al cargar productos. Por favor, verifica la conexión.
    </div>
  );

  if (!data?.products || data.products.length === 0) {
    return <div className="text-center py-10 text-slate-500">No se encontraron productos.</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onEdit={handleEdit}
            onDelete={handleDelete} 
            isDeleting={isDeleting} 
          />
        ))}
      </div>
      
      {totalPages > 1 && (
        <PaginationControls 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage} 
        />
      )}

      <AddProductModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        initialData={selectedProduct}
      />
    </div>
  );
}