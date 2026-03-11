import StoreProvider from '@/store/StoreProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}