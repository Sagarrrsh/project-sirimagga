import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import {
  DEFAULT_ADMIN_COST_SETTINGS,
  DEFAULT_STORE_SETTINGS,
  DEMO_CATEGORIES,
  DEMO_DISCOUNTS,
  DEMO_MANUFACTURERS,
  DEMO_PRODUCTS,
  DEMO_REVIEWS,
} from '../data/demoData';
import { OperationType, db, handleFirestoreError } from '../lib/firebase';
import type { CartItem, Category, Product, Review, StoreSetting } from '../types';

interface ToastState {
  message: string;
  type: 'success' | 'info' | 'error';
}

interface StoreContextValue {
  products: Product[];
  categories: Category[];
  reviews: Review[];
  storeSettings: StoreSetting;
  catalogLoaded: boolean;
  usingDemoCatalog: boolean;
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  cartDrawerOpen: boolean;
  setCartDrawerOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  addToCart: (product: Product, color?: string, qty?: number, openDrawer?: boolean) => void;
  updateCartQuantity: (productId: string, color: string, quantity: number) => void;
  removeFromCart: (productId: string, color: string) => void;
  clearCart: () => void;
  toast: ToastState | null;
  showToast: (message: string, type?: ToastState['type']) => void;
  subscribeNewsletter: (email: string) => Promise<void>;
  seedDemoCatalogToFirestore: () => Promise<void>;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);
const CART_STORAGE_KEY = 'sirimagga_cart_v1';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [firestoreProducts, setFirestoreProducts] = useState<Product[]>([]);
  const [firestoreCategories, setFirestoreCategories] = useState<Category[]>([]);
  const [firestoreReviews, setFirestoreReviews] = useState<Review[]>([]);
  const [storeSettings, setStoreSettings] = useState<StoreSetting>(DEFAULT_STORE_SETTINGS);
  const [catalogLoaded, setCatalogLoaded] = useState(false);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as CartItem[]) : [];
    } catch {
      return [];
    }
  });
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    const unsubProducts = onSnapshot(
      collection(db, 'products'),
      (snap) => {
        setFirestoreProducts(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Product));
        setCatalogLoaded(true);
      },
      (err) => {
        console.warn('Products snapshot note:', err);
        setCatalogLoaded(true);
      }
    );

    const unsubCategories = onSnapshot(
      query(collection(db, 'categories'), orderBy('displayOrder', 'asc')),
      (snap) => {
        setFirestoreCategories(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Category));
      },
      (err) => console.warn('Categories snapshot note:', err)
    );

    const unsubReviews = onSnapshot(
      query(collection(db, 'reviews'), where('status', '==', 'approved')),
      (snap) => {
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Review);
        list.sort((a, b) => {
          const tA = (a.createdAt as { seconds?: number } | undefined)?.seconds || 0;
          const tB = (b.createdAt as { seconds?: number } | undefined)?.seconds || 0;
          return tB - tA;
        });
        setFirestoreReviews(list);
      },
      (err) => console.warn('Reviews snapshot note:', err)
    );

    const unsubSettings = onSnapshot(
      doc(db, 'settings', 'storefront'),
      (snap) => {
        if (snap.exists()) {
          setStoreSettings(snap.data() as StoreSetting);
        }
      },
      (err) => console.warn('Settings snapshot note:', err)
    );

    return () => {
      unsubProducts();
      unsubCategories();
      unsubReviews();
      unsubSettings();
    };
  }, []);

  const products = firestoreProducts.length > 0 ? firestoreProducts : DEMO_PRODUCTS;
  const categories = firestoreCategories.length > 0 ? firestoreCategories : DEMO_CATEGORIES;
  const reviews = firestoreReviews.length > 0 ? firestoreReviews : DEMO_REVIEWS;
  const usingDemoCatalog = firestoreProducts.length === 0;

  const showToast = (message: string, type: ToastState['type'] = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 3400);
  };

  const addToCart = (product: Product, color?: string, qty = 1, openDrawer = true) => {
    const chosenColor = color || product.colorOptions[0] || 'Classic';
    setCart((prev) => {
      const idx = prev.findIndex(
        (item) => item.productId === product.id && item.color === chosenColor
      );
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          quantity: Math.min(10, updated[idx].quantity + qty),
        };
        return updated;
      }
      return [
        ...prev,
        {
          productId: product.id,
          productCode: product.productCode,
          slug: product.slug,
          title: product.title,
          color: chosenColor,
          quantity: qty,
          unitPrice: product.sellingPrice,
          image: product.images[0] || '',
        },
      ];
    });
    if (openDrawer) {
      setCartDrawerOpen(true);
    } else {
      showToast(`Added ${product.title} to your bag`);
    }
  };

  const updateCartQuantity = (productId: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, color);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId && item.color === color
          ? { ...item, quantity: Math.min(10, quantity) }
          : item
      )
    );
  };

  const removeFromCart = (productId: string, color: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.productId === productId && item.color === color))
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const subscribeNewsletter = async (email: string) => {
    const clean = email.trim().toLowerCase();
    const id = `sub_${clean.replace(/[^a-z0-9]/g, '_').slice(0, 96)}`;
    const path = `newsletter/${id}`;
    try {
      await setDoc(doc(db, 'newsletter', id), {
        email: clean.slice(0, 160),
        createdAt: serverTimestamp(),
      });
      showToast('Thank you for subscribing to SIRIMAGGA updates.');
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, path);
    }
  };

  const seedDemoCatalogToFirestore = async () => {
    const batch = writeBatch(db);
    try {
      for (const p of DEMO_PRODUCTS) {
        const { id, ...productData } = p;
        batch.set(doc(db, 'products', id), {
          ...productData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
      for (const c of DEMO_CATEGORIES) {
        const { id, ...categoryData } = c;
        batch.set(doc(db, 'categories', id), categoryData);
      }
      for (const r of DEMO_REVIEWS) {
        const { id, ...reviewData } = r;
        batch.set(doc(db, 'reviews', id), {
          ...reviewData,
          status: 'approved',
          createdAt: serverTimestamp(),
        });
      }
      for (const d of DEMO_DISCOUNTS) {
        batch.set(doc(db, 'discounts', d.id), {
          code: d.code,
          description: d.description || '',
          discountType: d.discountType,
          value: d.value,
          minOrderAmount: d.minOrderAmount,
          isActive: d.isActive,
          createdAt: serverTimestamp(),
        });
      }
      for (const m of DEMO_MANUFACTURERS) {
        const { id, ...manufacturerData } = m;
        batch.set(doc(db, 'manufacturers', id), {
          ...manufacturerData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
      batch.set(doc(db, 'settings', 'storefront'), {
        ...DEFAULT_STORE_SETTINGS,
        updatedAt: serverTimestamp(),
      });
      batch.set(doc(db, 'admin_settings', 'costing'), {
        ...DEFAULT_ADMIN_COST_SETTINGS,
        updatedAt: serverTimestamp(),
      });
      await batch.commit();
      showToast('Demo catalog, categories, discounts, and admin manufacturers seeded to Firestore.');
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'batch_seed');
    }
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        reviews,
        storeSettings,
        catalogLoaded,
        usingDemoCatalog,
        cart,
        cartCount,
        cartSubtotal,
        cartDrawerOpen,
        setCartDrawerOpen,
        quickViewProduct,
        setQuickViewProduct,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toast,
        showToast,
        subscribeNewsletter,
        seedDemoCatalogToFirestore,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
