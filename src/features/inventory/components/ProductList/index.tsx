'use client';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSearchTerm, setSearchTerm } from '../../inventorySlice';
import { useGetProductsQuery, useDeleteProductMutation } from '../../inventoryApi';
import { ProductCard } from './ProductCard';
import { PaginationControls } from './PaginationControls';
import AddProductModal from '../AddProductModal';
import { Product } from '../../types';
import { toast } from 'sonner';
import ConfirmModal from '@/components/ui/ConfirmModal'; 
import { SearchX, RefreshCcw } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export default function ProductList() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchTerm = useSelector(selectSearchTerm);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null);
  
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 768 ? 6 : 12);
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
  }, { skip: !isMounted });

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const handleClearSearch = () => {
    dispatch(setSearchTerm(''));
    router.replace(pathname);
    
    setTimeout(() => {
      const searchInput = document.getElementById('inventory-search-input');
      if (searchInput) {
        searchInput.focus();
      }
    }, 100);
  };

  const handleConfirmDelete = async () => {
    if (productIdToDelete) {
      try {
        await deleteProduct(productIdToDelete).unwrap();
        toast.success('Producto eliminado exitosamente');
      } catch (error) {
        toast.error('No se pudo eliminar el producto');
      } finally {
        setShowDeleteConfirm(false);
        setProductIdToDelete(null);
      }
    }
  };

  if (!isMounted || isLoading) return (
    <div className="flex justify-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );
  
  if (isError) return <div className="p-4 bg-red-50 text-red-700 rounded-lg text-center font-medium">Error de conexión con el servidor.</div>;

  if (data?.products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="bg-slate-100 p-6 rounded-full mb-6">
          <SearchX size={48} className="text-slate-400" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          No se encontró el producto que buscabas
        </h3>
        <p className="text-slate-500 max-w-xs mb-8">
          Intenta ajustar los filtros o busca con términos más generales.
        </p>
        {searchTerm && (
          <button 
            onClick={handleClearSearch}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <RefreshCcw size={18} />
            Limpiar búsqueda
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 relative z-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data?.products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onEdit={(p) => { setSelectedProduct(p); setIsModalOpen(true); }}
            onDelete={(id) => { setProductIdToDelete(id); setShowDeleteConfirm(true); }}
            isDeleting={isDeleting} 
          />
        ))}
      </div>
      
      {Math.ceil((data?.total || 0) / itemsPerPage) > 1 && (
        <PaginationControls 
          currentPage={currentPage} 
          totalPages={Math.ceil((data?.total || 0) / itemsPerPage)} 
          onPageChange={setCurrentPage} 
        />
      )}

      <ConfirmModal 
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="¿Eliminar producto?"
        message="Esta acción no se puede deshacer."
        confirmText="Sí, eliminar"
        variant="danger"
      />

      <AddProductModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setSelectedProduct(undefined); }} 
        initialData={selectedProduct}
      />
    </div>
  );
}