'use client';
import { AlertCircle, LogOut, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  variant?: 'danger' | 'primary';
}

export default function ConfirmModal({ 
  isOpen, onClose, onConfirm, title, message, confirmText = "Aceptar", variant = 'primary' 
}: ConfirmModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  const isDanger = variant === 'danger';

  return createPortal(
    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 modal-overlay-glass animate-modal-fade" 
        onClick={onClose} 
      />
      
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 animate-modal-zoom border border-slate-100 z-[100001]">
        <button onClick={onClose} className="absolute right-6 top-6 text-slate-400 hover:text-slate-600 p-1">
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center pt-2">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 border-4 border-white shadow-sm ${
            isDanger ? 'bg-red-50 text-red-500' : 'bg-indigo-50 text-indigo-600'
          }`}>
            {isDanger ? <AlertCircle size={32} /> : <LogOut size={32} />}
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{title}</h2>
          <p className="text-slate-500 leading-relaxed mb-8 px-4">{message}</p>

          <div className="flex gap-4 w-full">
            <button onClick={onClose} className="flex-1 py-4 rounded-2xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all active:scale-95">
              Cancelar
            </button>
            <button onClick={onConfirm} className="flex-1 py-4 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95">
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}