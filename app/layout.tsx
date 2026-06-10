import { ReactNode, useRef } from 'react';
import { UIProvider, CartProvider, WishlistProvider, useUI } from '@/lib/context/AppContext';
import { AnimationProvider } from '@/lib/animations';
import { useCursorRefs, useCursor } from '@/lib/animations/hooks/useCursor';
import { usePageTransition } from '@/lib/animations/hooks/usePageTransition';
import LenisProvider from '@/components/animations/LenisProvider';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';

// Universal Overlays Slots
import Cart from '@/components/overlays/Cart';
import Wishlist from '@/components/overlays/Wishlist';
import Search from '@/components/overlays/Search';
import Auth from '@/components/overlays/Auth';
import Checkout from '@/components/overlays/Checkout';
import Success from '@/components/overlays/Success';
import About from '@/components/overlays/About';
import Hamburger from '@/components/overlays/Hamburger';
import ProductModal from '@/components/products/ProductModal';

function CursorSpotlight() {
  const { cursorRef, ringRef } = useCursorRefs();
  useCursor(cursorRef, ringRef);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" aria-hidden="true"></div>
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true"></div>
    </>
  );
}

function GlobalToast() {
  const { toastMessage } = useUI();
  return (
    <div className="luxury-toast" id="customToast">
      {toastMessage || 'Portfolio Updated'}
    </div>
  );
}

function LayoutContent({ children }: { children: ReactNode }) {
  const mainRef = useRef<HTMLElement>(null);
  usePageTransition(mainRef);

  return (
    <>
      {/* Cinematic Film Grains */}
      <div className="grain-overlay" aria-hidden="true"></div>

      {/* Interactive Cursor Spotlight */}
      <CursorSpotlight />

      {/* Global Header */}
      <Navbar />

      {/* Pages Container */}
      <main ref={mainRef} className="page-container" style={{ minHeight: '85vh' }}>
        {children}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Floating Sticky Mobile Navbar */}
      <MobileNav />

      {/* Universal Drawer overlays system slots */}
      <Cart />
      <Wishlist />
      <Search />
      <Auth />
      <Checkout />
      <Success />
      <About />
      <Hamburger />
      <ProductModal />

      {/* Toast popup */}
      <GlobalToast />
    </>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <UIProvider>
      <CartProvider>
        <WishlistProvider>
          <AnimationProvider>
            <LenisProvider>
              <LayoutContent>{children}</LayoutContent>
            </LenisProvider>
          </AnimationProvider>
        </WishlistProvider>
      </CartProvider>
    </UIProvider>
  );
}
export { RootLayout };
