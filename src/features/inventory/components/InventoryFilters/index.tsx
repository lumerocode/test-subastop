'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, selectSearchTerm, setSelectedCategory, selectSelectedCategory } from '../../inventorySlice';
import { useGetCategoriesQuery } from '../../inventoryApi';
import { useEffect, useState } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';

export default function InventoryFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  
  const searchTerm = useSelector(selectSearchTerm);
  const selectedCategory = useSelector(selectSelectedCategory);
  
  const { data: categories } = useGetCategoriesQuery();
  const [inputValue, setInputValue] = useState(searchTerm);

  useEffect(() => {
    const querySearch = searchParams.get('search') || '';
    const queryCategory = searchParams.get('category') || '';
    
    setInputValue(querySearch);
    dispatch(setSearchTerm(querySearch));
    dispatch(setSelectedCategory(queryCategory));
  }, [searchParams, dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== searchTerm) {
        updateFilters(inputValue, selectedCategory);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [inputValue]);

  const updateFilters = (search: string, category: string) => {
    dispatch(setSearchTerm(search));
    dispatch(setSelectedCategory(category));

    const params = new URLSearchParams(searchParams.toString());
    
    if (search) params.set('search', search);
    else params.delete('search');

    if (category && category !== 'all' && category !== '') params.set('category', category);
    else params.delete('category');

    params.set('page', '1');
    
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleCategoryChange = (category: string) => {
    updateFilters(inputValue, category);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') setInputValue('');
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="relative flex-1 group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search size={20} className="text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
        </div>
        <input
          id="inventory-search-input"
          placeholder="Busca productos..."
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 placeholder:text-slate-400 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all outline-none text-base shadow-sm"
        />
      </div>

      <div className="relative min-w-[240px] flex items-center">
        <div className="absolute left-4 flex items-center pointer-events-none z-10">
          <Filter size={18} className="text-slate-400" />
        </div>
        
        <select
          value={selectedCategory || 'all'}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="w-full pl-11 pr-10 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all outline-none text-base shadow-sm cursor-pointer appearance-none-forced"
        >
          <option value="all">Todas las categorías</option>
          {categories?.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <div className="select-custom-arrow">
          <ChevronDown size={18} className="text-slate-400" />
        </div>
      </div>
    </div>
  );
}