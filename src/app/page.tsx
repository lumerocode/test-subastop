'use client';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Sidebar from '@/components/layout/Sidebar';
import LoginForm from '@/features/auth/components/LoginForm';
import StatsGrid from '@/features/dashboard/components/StatsGrid';
import InventoryFilters from '@/features/inventory/components/InventoryFilters';
import ProductList from '@/features/inventory/components/ProductList';
import AddProductModal from '@/features/inventory/components/AddProductModal';
import { Plus } from 'lucide-react';

export default function HomePage() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'inventory'>('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) return <LoginForm />;

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 w-full lg:ml-64 p-4 sm:p-6 lg:p-10 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          
          {/* DASHBOARD VIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <header className="mt-14 lg:mt-0">
                <h1 className="text-3xl font-extrabold text-slate-900">Bienvenido al Dashboard</h1>
                <p className="text-slate-500">Resumen general de tu negocio.</p>
              </header>
              <StatsGrid />
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm">
                 <h2 className="font-bold text-lg mb-4">Actividad Reciente</h2>
                 <p className="text-slate-400 text-sm italic">Próximamente: Gráficos de ventas y reportes...</p>
              </div>
            </div>
          )}

          {/* INVENTORY VIEW */}
          {activeTab === 'inventory' && (
            <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
              <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-14 lg:mt-0">
                <div>
                  <h1 className="text-3xl font-extrabold text-slate-900">Gestión de Inventario Pro</h1>
                  <p className="text-slate-500">Administra tus productos y stock.</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold flex gap-2 items-center justify-center transition-all shadow-lg shadow-indigo-100 active:scale-95"
                >
                  <Plus size={20} /> Nuevo Producto
                </button>
              </header>

              <InventoryFilters />
              <ProductList />
              <AddProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
          )}

        </div>
      </main>
    </div>
  );
}