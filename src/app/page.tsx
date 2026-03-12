'use client'; // Asegúrate de que page sea client si manejas estados de modal
import { useState, Suspense } from 'react';
import InventoryFilters from '@/features/inventory/components/InventoryFilters';
import ProductList from '@/features/inventory/components/ProductList';
import AddProductModal from '@/features/inventory/components/AddProductModal';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Inventario</h1>
            <p className="text-gray-600">Control pro de productos y stock</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition shadow-sm"
          >
            + Nuevo Producto
          </button>
        </header>

        <section>
          <Suspense fallback={<div className="h-10 w-full animate-pulse bg-gray-200 rounded-lg mb-6" />}>
            <InventoryFilters />
          </Suspense>
          <ProductList />
        </section>

        <AddProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </main>
  );
}