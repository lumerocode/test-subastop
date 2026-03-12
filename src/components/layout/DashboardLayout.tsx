'use client';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: 'dashboard' | 'inventory';
  onTabChange: (tab: 'dashboard' | 'inventory') => void;
}

export default function DashboardLayout({ 
  children, 
  activeTab, 
  onTabChange 
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar activeTab={activeTab} onTabChange={onTabChange} />
      <main className="flex-1 ml-64 p-4 md:p-10">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}