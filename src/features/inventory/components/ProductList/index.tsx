'use client';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectSearchTerm } from '../../inventorySlice';
import { useGetProductsQuery, useDeleteProductMutation } from '../../inventoryApi';
import { ProductCard } from './ProductCard';
import { PaginationControls } from './PaginationControls';
import AddProductModal from '../AddProductModal';
import { Product } from '../../types';

export default function ProductList() {
  const searchTerm = useSelector(selectSearchTerm);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const itemsPerPage = 8;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const { data, isLoading, isError } = useGetProductsQuery({ search: searchTerm, page: currentPage });
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
      await deleteProduct(id).unwrap();
    }
  };

  if (isLoading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
  if (isError) return <div className="p-4 bg-red-50 text-red-700 rounded-lg">Error al cargar productos.</div>;

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onEdit={handleEdit}
            onDelete={handleDelete} 
            isDeleting={isDeleting} 
          />
        ))}
      </div>
      <PaginationControls 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage} 
      />
      <AddProductModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        initialData={selectedProduct}
      />
    </div>
  );
}