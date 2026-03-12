'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { 
  setSearchTerm, 
  selectSearchTerm, 
  setSelectedCategory, 
  selectSelectedCategory 
} from '../../inventorySlice';
import { useGetCategoriesQuery } from '../../inventoryApi';
import { useEffect, useState, useCallback, useRef } from 'react';
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
  
  const isSyncingFromUrl = useRef(false);

  const updateFilters = useCallback((search: string, category: string) => {
    dispatch(setSearchTerm(search));
    dispatch(setSelectedCategory(category));

    const params = new URLSearchParams(searchParams.toString());
    
    if (search) {
      params.set('search', search);
    } else {
      params.delete('search');
    }

    if (category && category !== 'all' && category !== '') {
      params.set('category', category);
    } else {
      params.delete('category');
    }

    params.set('page', '1');
    
    router.replace(`${pathname}?${params.toString()}`);
  }, [dispatch, pathname, router, searchParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      isSyncingFromUrl.current = true;
      const querySearch = searchParams.get('search') || '';
      const queryCategory = searchParams.get('category') || '';
      
      if (querySearch !== searchTerm) {
        dispatch(setSearchTerm(querySearch));
        setInputValue(querySearch);
      }
      if (queryCategory !== selectedCategory) {
        dispatch(setSelectedCategory(queryCategory));
      }
      
      const resetTimer = setTimeout(() => {
        isSyncingFromUrl.current = false;
      }, 50);

      return () => clearTimeout(resetTimer);
    }, 0);

    return () => clearTimeout(timer);
  }, [searchParams, dispatch, searchTerm, selectedCategory]);

  useEffect(() => {
    if (isSyncingFromUrl.current) return;

    const timer = setTimeout(() => {
      if (inputValue !== searchTerm) {
        updateFilters(inputValue, selectedCategory);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, searchTerm, selectedCategory, updateFilters]);

  const handleCategoryChange = (category: string) => {
    updateFilters(inputValue, category);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setInputValue('');
      updateFilters('', selectedCategory);
    }
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
          className="w-full pl-11 pr-10 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all outline-none text-base shadow-sm cursor-pointer appearance-none"
        >
          <option value="all">Todas las categorías</option>
          {categories?.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <div className="absolute right-4 pointer-events-none">
          <ChevronDown size={18} className="text-slate-400" />
        </div>
      </div>
    </div>
  );
}