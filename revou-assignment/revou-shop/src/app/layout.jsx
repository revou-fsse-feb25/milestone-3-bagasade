// ... (imports)
import { CartProvider } from '@/context/CartContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProviderWrapper>
          <CartProvider> {/* Add CartProvider here */}
            <Navbar />
            <main className="min-h-[calc(100vh-100px)]">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}