import type { Metadata } from 'next'; 
import './globals.css';
import StoreProvider from '@/store/StoreProvider';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Inventario | Panel de Control',
  description: 'Sistema inteligente de gestión de inventario',
  icons: {
    icon: '/images/profile.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning> 
      <body suppressHydrationWarning className="antialiased overflow-x-hidden">
        <Toaster position="top-right" richColors closeButton />
        <StoreProvider>
          <div className="relative z-[1]">
            {children}
          </div>
          <div id="modal-root" />
        </StoreProvider>
      </body>
    </html>
  );
}