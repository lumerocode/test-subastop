'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const PaginationControls = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const pageInUrl = searchParams.get('page');
    if (pageInUrl) {
      const pageNum = parseInt(pageInUrl);
      if (pageNum !== currentPage && pageNum > 0 && pageNum <= totalPages) {
        onPageChange(pageNum);
      }
    }
  }, [searchParams, totalPages, onPageChange, currentPage]);

  const handlePageUpdate = (newPage: number) => {
    onPageChange(newPage);
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.replace(`${pathname}?${params.toString()}`);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col items-center gap-4 py-10 border-t border-slate-100">
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={() => handlePageUpdate(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30 transition-all shadow-sm cursor-pointer"
        >
          <ChevronLeft size={24} className="text-slate-600" />
        </button>
        
        <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400 font-medium">Página</span>
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-600 text-white font-bold shadow-md shadow-indigo-100">
                {currentPage}
            </span>
            <span className="text-sm text-slate-400 font-medium">de {totalPages}</span>
        </div>

        <button
          onClick={() => handlePageUpdate(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage >= totalPages}
          className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30 transition-all shadow-sm cursor-pointer"
        >
          <ChevronRight size={24} className="text-slate-600" />
        </button>
      </div>
    </div>
  );
};