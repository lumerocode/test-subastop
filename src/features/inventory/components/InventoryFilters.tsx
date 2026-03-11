'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, selectSearchTerm } from '../inventorySlice';
import { useEffect } from 'react';

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

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Buscar productos por nombre..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700 bg-white"
      />
    </div>
  );
}