'use client';
import { useState, Suspense } from 'react';
import { Plus } from 'lucide-react';
import InventoryFilters from '@/features/inventory/components/InventoryFilters';
import ProductList from '@/features/inventory/components/ProductList';
import AddProductModal from '@/features/inventory/components/AddProductModal';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#F8FAFC] p-4 md:p-10">
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Gestión de Inventario
            </h1>
            <p className="text-slate-500 font-medium text-lg">
              Panel de control administrativo y métricas de stock.
            </p>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-200 active:scale-95 cursor-pointer"
          >
            <Plus size={20} strokeWidth={3} />
            <span>Nuevo Producto</span>
          </button>
        </header>

        <div className="space-y-8">
          <div>
            <Suspense fallback={
              <div className="h-14 w-full animate-pulse bg-slate-100 rounded-xl" />
            }>
              <InventoryFilters />
            </Suspense>
          </div>

          <section className="relative">
            <div className="flex items-center justify-between mb-4 px-2">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">
                Catálogo de Productos
              </h2>
            </div>
            <ProductList />
          </section>
        </div>

        <AddProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </main>
  );
}