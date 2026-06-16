import { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { Product, PRODUCTS } from '../data/products';

// ── CUSTOMERS / USERS INTERFACES ──
export interface User {
  name: string;
  email: string | null;
}

// ─────────────────────────────────────────────────────────────────────
// 1. UI CONTEXT PROVIDER
// ─────────────────────────────────────────────────────────────────────
interface UIContextType {
  activeOverlay: string | null;
  openOverlay: (id: string) => void;
  closeOverlay: (id: string) => void;
  closeAllOverlays: () => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResult: Product[];
  setSearchResult: (results: Product[]) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedSize: number | null;
  setSelectedSize: (size: number | null) => void;
  detailQuantity: number;
  setDetailQuantity: (qty: number) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  paymentTab: string;
  setPaymentTab: (tab: string) => void;
  checkoutForm: {
    isValid: boolean;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
    cardNum: string;
    cardExp: string;
    cardCvv: string;
    upiId: string;
  };
  updateCheckoutFields: (fields: Partial<UIContextType['checkoutForm']>) => void;
  isOrdering: boolean;
  setIsOrdering: (val: boolean) => void;
  createdOrderId: string | null;
  setCreatedOrderId: (id: string | null) => void;
  // New States added for Story overlays and intercept actions
  selectedStoryId: string | null;
  setSelectedStoryId: (id: string | null) => void;
  pendingAction: string | null;
  setPendingAction: (action: string | null) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [activeOverlay, setActiveOverlay] = useState<string | null>(null);
  
  // Hydrate directly in initializer to prevent layout shift / auth latency
  const [currentUser, setCurrentUserState] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        try {
          return JSON.parse(storedUser);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return null;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [detailQuantity, setDetailQuantity] = useState<number>(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [paymentTab, setPaymentTab] = useState('card');
  const [isOrdering, setIsOrdering] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);
  
  // New State variables
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<string | null>(null);

  const [checkoutForm, setCheckoutForm] = useState({
    isValid: false,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    cardNum: '',
    cardExp: '',
    cardCvv: '',
    upiId: '',
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const setCurrentUser = (user: User | null) => {
    setCurrentUserState(user);
    if (typeof window !== 'undefined') {
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      } else {
        localStorage.removeItem('currentUser');
      }
    }
  };

  const openOverlay = (id: string) => {
    setActiveOverlay(id);
    document.body.classList.add('overlay-open');
  };

  const closeOverlay = (id: string) => {
    if (activeOverlay === id) {
      setActiveOverlay(null);
    }
    // Check if any other overlay backdrop is lingering, otherwise clean body
    setTimeout(() => {
      const activeBackdrops = document.querySelectorAll('.overlay-backdrop.active');
      if (activeBackdrops.length <= 1) {
        document.body.classList.remove('overlay-open');
      }
    }, 50);
  };

  const closeAllOverlays = () => {
    setActiveOverlay(null);
    document.body.classList.remove('overlay-open');
  };

  // Prevent toast timer race conditions using refs
  const toastTimerRef1 = useRef<NodeJS.Timeout | null>(null);
  const toastTimerRef2 = useRef<NodeJS.Timeout | null>(null);

  const showToast = (msg: string) => {
    if (toastTimerRef1.current) clearTimeout(toastTimerRef1.current);
    if (toastTimerRef2.current) clearTimeout(toastTimerRef2.current);

    setToastMessage(msg);
    const toast = document.getElementById('customToast');
    if (toast) {
      toast.classList.add('active');
    }

    toastTimerRef1.current = setTimeout(() => {
      if (toast) {
        toast.classList.remove('active');
      }
      // Delay cleaning the state to allow transition-out to complete (450ms)
      toastTimerRef2.current = setTimeout(() => {
        setToastMessage(null);
      }, 500);
    }, 3000);
  };

  const updateCheckoutFields = (fields: Partial<typeof checkoutForm>) => {
    setCheckoutForm((prev) => ({ ...prev, ...fields }));
  };

  return (
    <UIContext.Provider
      value={{
        activeOverlay,
        openOverlay,
        closeOverlay,
        closeAllOverlays,
        currentUser,
        setCurrentUser,
        searchQuery,
        setSearchQuery,
        searchResult,
        setSearchResult,
        selectedProductId,
        setSelectedProductId,
        selectedSize,
        setSelectedSize,
        detailQuantity,
        setDetailQuantity,
        toastMessage,
        showToast,
        paymentTab,
        setPaymentTab,
        checkoutForm,
        updateCheckoutFields,
        isOrdering,
        setIsOrdering,
        createdOrderId,
        setCreatedOrderId,
        selectedStoryId,
        setSelectedStoryId,
        pendingAction,
        setPendingAction,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) throw new Error('useUI must be used within UIProvider');
  return context;
}

// ─────────────────────────────────────────────────────────────────────
// 2. CART CONTEXT PROVIDER
// ─────────────────────────────────────────────────────────────────────
export interface CartItem {
  key: string; // "productId_size"
  id: string;  // Product ID
  name: string;
  price: number;
  image: string;
  img: string; // for compatibility
  size: number;
  qty: number;
}

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  cartGST: number;
  cartGrandTotal: number;
  addToCart: (productId: string, size: number, qty: number) => void;
  removeFromCart: (key: string) => void;
  changeCartQty: (key: string, delta: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  // Hydrate directly in initializer to prevent visual flash on first render
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        try {
          return JSON.parse(storedCart);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return [];
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const saveCartAndSet = (newCart: CartItem[]) => {
    setCart(newCart);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };

  const addToCart = (productId: string, size: number, qty: number) => {
    const p = PRODUCTS.find((x) => x.id === productId);
    if (!p) return;

    const key = `${productId}_${size}`;
    const existing = cart.find((item) => item.key === key);
    let newCart: CartItem[];

    if (existing) {
      newCart = cart.map((item) =>
        item.key === key ? { ...item, qty: Math.min(10, item.qty + qty) } : item
      );
    } else {
      newCart = [
        ...cart,
        {
          key,
          id: productId,
          name: p.name,
          price: p.price,
          image: p.img,
          img: p.img,
          size,
          qty,
        },
      ];
    }
    saveCartAndSet(newCart);
  };

  const removeFromCart = (key: string) => {
    const newCart = cart.filter((item) => item.key !== key);
    saveCartAndSet(newCart);
  };

  const changeCartQty = (key: string, delta: number) => {
    const newCart = cart.map((item) => {
      if (item.key === key) {
        const nextQty = Math.max(1, Math.min(10, item.qty + delta));
        return { ...item, qty: nextQty };
      }
      return item;
    });
    saveCartAndSet(newCart);
  };

  const clearCart = () => {
    saveCartAndSet([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const cartGST = Math.round(cartSubtotal * 0.18);
  const cartGrandTotal = cartSubtotal + cartGST;

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartSubtotal,
        cartGST,
        cartGrandTotal,
        addToCart,
        removeFromCart,
        changeCartQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}

// ─────────────────────────────────────────────────────────────────────
// 3. WISHLIST CONTEXT PROVIDER
// ─────────────────────────────────────────────────────────────────────
export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  img: string;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  wishlistCount: number;
  isSaved: (id: string) => boolean;
  toggleWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  // Hydrate directly in initializer to prevent visual flash on first render
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    if (typeof window !== 'undefined') {
      const storedWishlist = localStorage.getItem('wishlist');
      if (storedWishlist) {
        try {
          return JSON.parse(storedWishlist);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return [];
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const saveWishlistAndSet = (newWish: WishlistItem[]) => {
    setWishlist(newWish);
    if (typeof window !== 'undefined') {
      localStorage.setItem('wishlist', JSON.stringify(newWish));
    }
  };

  const isSaved = (id: string) => wishlist.some((item) => item.id === id);

  const toggleWishlist = (id: string) => {
    const p = PRODUCTS.find((x) => x.id === id);
    if (!p) return;

    const saved = isSaved(id);
    let newWish: WishlistItem[];

    if (saved) {
      newWish = wishlist.filter((item) => item.id !== id);
    } else {
      newWish = [
        ...wishlist,
        {
          id,
          name: p.name,
          price: p.price,
          image: p.img,
          img: p.img,
        },
      ];
    }
    saveWishlistAndSet(newWish);
  };

  const removeFromWishlist = (id: string) => {
    const newWish = wishlist.filter((item) => item.id !== id);
    saveWishlistAndSet(newWish);
  };

  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount,
        isSaved,
        toggleWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
}
