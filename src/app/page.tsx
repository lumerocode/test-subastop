import { Suspense } from 'react';
import InventoryFilters from '@/features/inventory/components/InventoryFilters';
import ProductList from '@/features/inventory/components/ProductList';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Inventario</h1>
        </header>

        <section>
          {}
          <Suspense fallback={<div className="h-10 w-full animate-pulse bg-gray-200 rounded-lg mb-6" />}>
            <InventoryFilters />
          </Suspense>
          
          <ProductList />
        </section>
      </div>
    </main>
  );
}