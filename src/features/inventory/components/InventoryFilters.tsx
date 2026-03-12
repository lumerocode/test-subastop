'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, selectSearchTerm } from '../inventorySlice';
import { useEffect } from 'react';
import { Search } from 'lucide-react';

export default function InventoryFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);

  useEffect(() => {
    const query = searchParams.get('search') || '';
    dispatch(setSearchTerm(query));
  }, [searchParams, dispatch]);

  const handleSearch = (term: string) => {
    dispatch(setSearchTerm(term));
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      handleSearch('');
    }
  };

  return (
    <div className="w-full animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search 
            size={20} 
            className="text-slate-400 group-focus-within:text-indigo-500 transition-colors duration-200" 
          />
        </div>

        <input
          type="text"
          placeholder="Busca por nombre, categoría o descripción..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 placeholder:text-slate-400 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all duration-200 outline-none text-base shadow-sm"
        />

        <div className="absolute inset-y-0 right-0 pr-4 hidden sm:flex items-center pointer-events-none">
          <span className="text-[10px] font-bold text-slate-400 bg-slate-200/50 px-2 py-1 rounded-md uppercase tracking-tight">
            Esc para limpiar
          </span>
        </div>
      </div>
    </div>
  );
}