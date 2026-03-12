'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { LayoutDashboard, Package, LogOut, Menu, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/features/auth/authSlice';
import { RootState } from '@/store/store';
import ConfirmModal from '../ui/ConfirmModal';

interface SidebarProps {
  activeTab: 'dashboard' | 'inventory';
  onTabChange: (tab: 'dashboard' | 'inventory') => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleTabClick = (tab: 'dashboard' | 'inventory') => {
    onTabChange(tab);
    setIsOpen(false);
  };

  const sidebarContent = (
    <>
      <button 
        onClick={toggleMenu}
        className="lg:hidden fixed top-4 left-4 z-[100000] p-2 bg-slate-900 text-white rounded-lg shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[99998] lg:hidden backdrop-blur-sm" 
          onClick={toggleMenu}
        />
      )}

      <aside className={`
        w-64 bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0 border-r border-slate-800 z-[99999]
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 text-2xl font-bold border-b border-slate-800">AdminPanel</div>
        <div className="flex items-center gap-3 p-6 border-b border-slate-800">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-500/50">
            <Image src="/images/profile.png" alt="Profile" fill className="object-cover" />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-bold truncate">{user || 'Usuario'}</span>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Admin</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => handleTabClick('dashboard')} className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-indigo-600' : 'text-slate-400 hover:bg-slate-800'}`}>
            <LayoutDashboard size={20} /> <span className="font-medium">Dashboard</span>
          </button>
          <button onClick={() => handleTabClick('inventory')} className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activeTab === 'inventory' ? 'bg-indigo-600' : 'text-slate-400 hover:bg-slate-800'}`}>
            <Package size={20} /> <span className="font-medium">Inventario</span>
          </button>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button onClick={() => setShowLogoutConfirm(true)} className="flex items-center gap-3 p-3 w-full rounded-xl text-red-500 hover:bg-red-500/10 transition-all">
            <LogOut size={20} /> <span className="font-bold text-sm">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      <ConfirmModal 
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={() => { dispatch(logout()); setShowLogoutConfirm(false); }}
        title="¿Cerrar sesión?"
        message="¿Estás seguro de que deseas salir?"
        confirmText="Aceptar"
        variant="primary"
      />
    </>
  );

  if (!mounted) return null;

  return createPortal(sidebarContent, document.body);
}