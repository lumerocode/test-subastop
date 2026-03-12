'use client';
import { StatCardProps } from '@/features/inventory/types';

export function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <div className="group bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-all duration-300 min-w-0">
      <div className={`${color} text-white p-4 rounded-2xl shadow-lg shadow-current/20 shrink-0 group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      
      <div className="flex flex-col min-w-0 overflow-hidden">
        <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest truncate">
          {title}
        </p>
        <h3 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight mt-0.5 truncate">
          {value}
        </h3>
      </div>
    </div>
  );
}