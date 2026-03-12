'use client';
import { Package, AlertTriangle, DollarSign, TrendingUp } from 'lucide-react';
import { useGetProductsQuery } from '@/features/inventory/inventoryApi';
import { StatCard } from './StatCard';

export default function StatsGrid() {
  const { data, isLoading } = useGetProductsQuery({ search: '', page: 1, limit: 100 });
  
  if (isLoading || !data) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-slate-200/60 rounded-3xl" />
        ))}
      </div>
    );
  }

  const products = data.products || [];
  const totalProducts = data.total || 0;
  const lowStock = products.filter(p => p.stock < 15).length;
  const totalValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
      <StatCard 
        title="Productos Totales" 
        value={totalProducts} 
        icon={<Package size={24} />} 
        color="bg-blue-600" 
      />
      <StatCard 
        title="Stock Crítico" 
        value={lowStock} 
        icon={<AlertTriangle size={24} />} 
        color="bg-amber-500" 
      />
      <StatCard 
        title="Valor Inventario" 
        value={`$${totalValue.toLocaleString()}`} 
        icon={<DollarSign size={24} />} 
        color="bg-emerald-500" 
      />
      <StatCard 
        title="Rendimiento" 
        value="+12.5%" 
        icon={<TrendingUp size={24} />} 
        color="bg-indigo-600" 
      />
    </div>
  );
}