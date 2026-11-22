import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { QuickViewModal } from './components/QuickViewModal';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { StoreProvider, useStore } from './contexts/StoreContext';
import { AboutPage } from './pages/AboutPage';
import { AccountPage } from './pages/AccountPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { CartPage } from './pages/CartPage';
import { CatalogPage } from './pages/CatalogPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { HomePage } from './pages/HomePage';
import { OrderDetailsPage } from './pages/OrderDetailsPage';
import { PolicyPage } from './pages/PolicyPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { TrackOrderPage } from './pages/TrackOrderPage';

function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, search]);
  return null;
}

function ToastBanner() {
  const { toast } = useStore();
  if (!toast) return null;

  const bg =
    toast.type === 'error'
      ? 'bg-red-900 text-white'
      : toast.type === 'info'
      ? 'bg-[#332821] text-[#F5EFE4]'
      : 'bg-[#651D2D] text-[#F5EFE4]';

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-5 right-5 z-50 px-5 py-3 rounded-md shadow-lg border border-[#B18A4A]/50 text-sm font-medium max-w-sm ${bg}`}
    >
      {toast.message}
    </div>
  );
}

function AppShell() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5EFE4] text-[#332821]">
      <ScrollToTop />
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<CatalogPage />} />
          <Route path="/collection/:slug" element={<CatalogPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/orders/:orderId" element={<OrderDetailsPage />} />
          <Route path="/account/orders/:orderId" element={<OrderDetailsPage />} />
          <Route path="/track-order" element={<TrackOrderPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<PolicyPage forcedType="contact" />} />
          <Route path="/policies/:type" element={<PolicyPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
      <Footer />
      <CartDrawer />
      <QuickViewModal />
      <WhatsAppWidget />
      <ToastBanner />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <StoreProvider>
            <AppShell />
          </StoreProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
