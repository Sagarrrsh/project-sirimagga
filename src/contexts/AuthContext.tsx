import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import {
  ADMIN_EMAIL,
  OperationType,
  auth,
  db,
  googleProvider,
  handleFirestoreError,
} from '../lib/firebase';
import type {
  CustomerAddress,
  LoyaltySummary,
  LoyaltyTransaction,
  LoyaltyVoucher,
  UserProfile,
} from '../types';

interface AuthContextValue {
  user: User | null;
  profile: UserProfile | null;
  isAdmin: boolean;
  authReady: boolean;
  addresses: CustomerAddress[];
  wishlistIds: string[];
  loyaltySummary: LoyaltySummary | null;
  loyaltyTransactions: LoyaltyTransaction[];
  loyaltyVouchers: LoyaltyVoucher[];
  signInWithGoogle: () => Promise<User | null>;
  signOut: () => Promise<void>;
  updateProfileDetails: (displayName: string, phone: string) => Promise<void>;
  saveAddress: (address: Omit<CustomerAddress, 'id' | 'userId' | 'createdAt'>, existingId?: string) => Promise<void>;
  deleteAddress: (addressId: string) => Promise<void>;
  toggleWishlist: (productId: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const GUEST_WISHLIST_KEY = 'sirimagga_guest_wishlist';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const [addresses, setAddresses] = useState<CustomerAddress[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(GUEST_WISHLIST_KEY);
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  });
  const [loyaltySummary, setLoyaltySummary] = useState<LoyaltySummary | null>(null);
  const [loyaltyTransactions, setLoyaltyTransactions] = useState<LoyaltyTransaction[]>([]);
  const [loyaltyVouchers, setLoyaltyVouchers] = useState<LoyaltyVoucher[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (!firebaseUser) {
        setProfile(null);
        setIsAdmin(false);
        setAddresses([]);
        setLoyaltySummary(null);
        setLoyaltyTransactions([]);
        setLoyaltyVouchers([]);
        setAuthReady(true);
        return;
      }

      const verifiedEmail = Boolean(firebaseUser.emailVerified);
      let adminStatus = verifiedEmail && firebaseUser.email === ADMIN_EMAIL;

      if (!adminStatus && verifiedEmail) {
        try {
          const adminDoc = await getDoc(doc(db, 'admins', firebaseUser.uid));
          if (adminDoc.exists()) {
            adminStatus = true;
          }
        } catch {
          // Non-admins receive permission denied or not found; keep false.
        }
      }
      setIsAdmin(adminStatus);

      // Ensure user profile document exists
      const userRef = doc(db, 'users', firebaseUser.uid);
      try {
        const snap = await getDoc(userRef);
        if (!snap.exists() && firebaseUser.emailVerified) {
          await setDoc(userRef, {
            uid: firebaseUser.uid,
            displayName: (firebaseUser.displayName || 'Valued Guest').slice(0, 120),
            email: (firebaseUser.email || '').slice(0, 160),
            phone: '',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        }
      } catch (err) {
        console.warn('Profile check note:', err);
      }

      setAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  // Attach user-scoped snapshots only when authReady && user
  useEffect(() => {
    if (!authReady || !user) return;

    const userPath = `users/${user.uid}`;
    const unsubProfile = onSnapshot(
      doc(db, 'users', user.uid),
      (snap) => {
        if (snap.exists()) {
          setProfile(snap.data() as UserProfile);
        }
      },
      (err) => handleFirestoreError(err, OperationType.GET, userPath)
    );

    const addrPath = `users/${user.uid}/addresses`;
    const unsubAddr = onSnapshot(
      query(collection(db, 'users', user.uid, 'addresses'), orderBy('createdAt', 'desc')),
      (snap) => {
        setAddresses(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as CustomerAddress));
      },
      (err) => handleFirestoreError(err, OperationType.LIST, addrPath)
    );

    const wishPath = `users/${user.uid}/wishlist`;
    const unsubWish = onSnapshot(
      collection(db, 'users', user.uid, 'wishlist'),
      (snap) => {
        setWishlistIds(snap.docs.map((d) => d.id));
      },
      (err) => handleFirestoreError(err, OperationType.LIST, wishPath)
    );

    const loyaltySummaryPath = `users/${user.uid}/loyalty_summary/account`;
    const unsubLoyaltySummary = onSnapshot(
      doc(db, 'users', user.uid, 'loyalty_summary', 'account'),
      (snap) => {
        if (snap.exists()) {
          setLoyaltySummary(snap.data() as LoyaltySummary);
        } else {
          setLoyaltySummary(null);
        }
      },
      (err) => handleFirestoreError(err, OperationType.GET, loyaltySummaryPath)
    );

    const loyaltyTxPath = `users/${user.uid}/loyalty_transactions`;
    const unsubLoyaltyTx = onSnapshot(
      query(collection(db, 'users', user.uid, 'loyalty_transactions'), orderBy('createdAt', 'desc')),
      (snap) => {
        setLoyaltyTransactions(
          snap.docs.map((d) => ({ id: d.id, ...d.data() }) as LoyaltyTransaction)
        );
      },
      (err) => handleFirestoreError(err, OperationType.LIST, loyaltyTxPath)
    );

    const loyaltyVoucherPath = `users/${user.uid}/loyalty_vouchers`;
    const unsubLoyaltyVouchers = onSnapshot(
      query(collection(db, 'users', user.uid, 'loyalty_vouchers'), orderBy('createdAt', 'desc')),
      (snap) => {
        setLoyaltyVouchers(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as LoyaltyVoucher));
      },
      (err) => handleFirestoreError(err, OperationType.LIST, loyaltyVoucherPath)
    );

    return () => {
      unsubProfile();
      unsubAddr();
      unsubWish();
      unsubLoyaltySummary();
      unsubLoyaltyTx();
      unsubLoyaltyVouchers();
    };
  }, [authReady, user]);

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  const updateProfileDetails = async (displayName: string, phone: string) => {
    if (!user) return;
    const path = `users/${user.uid}`;
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        displayName: displayName.trim().slice(0, 120),
        phone: phone.trim().slice(0, 24),
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    }
  };

  const saveAddress = async (
    address: Omit<CustomerAddress, 'id' | 'userId' | 'createdAt'>,
    existingId?: string
  ) => {
    if (!user) return;
    const addressId = existingId || `addr_${Date.now()}`;
    const path = `users/${user.uid}/addresses/${addressId}`;
    try {
      if (existingId) {
        const existingSnap = await getDoc(doc(db, 'users', user.uid, 'addresses', existingId));
        const prevCreatedAt = existingSnap.exists() ? existingSnap.data().createdAt : serverTimestamp();
        await setDoc(doc(db, 'users', user.uid, 'addresses', existingId), {
          userId: user.uid,
          label: address.label.trim().slice(0, 40),
          recipientName: address.recipientName.trim().slice(0, 120),
          phone: address.phone.trim().slice(0, 20),
          addressLine: address.addressLine.trim().slice(0, 300),
          city: address.city.trim().slice(0, 80),
          state: address.state.trim().slice(0, 80),
          pincode: address.pincode.trim().slice(0, 6),
          isDefault: Boolean(address.isDefault),
          createdAt: prevCreatedAt,
        });
      } else {
        await setDoc(doc(db, 'users', user.uid, 'addresses', addressId), {
          userId: user.uid,
          label: address.label.trim().slice(0, 40),
          recipientName: address.recipientName.trim().slice(0, 120),
          phone: address.phone.trim().slice(0, 20),
          addressLine: address.addressLine.trim().slice(0, 300),
          city: address.city.trim().slice(0, 80),
          state: address.state.trim().slice(0, 80),
          pincode: address.pincode.trim().slice(0, 6),
          isDefault: Boolean(address.isDefault),
          createdAt: serverTimestamp(),
        });
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, path);
    }
  };

  const deleteAddress = async (addressId: string) => {
    if (!user) return;
    const path = `users/${user.uid}/addresses/${addressId}`;
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'addresses', addressId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, path);
    }
  };

  const toggleWishlist = async (productId: string): Promise<boolean> => {
    const exists = wishlistIds.includes(productId);
    if (!user) {
      const next = exists
        ? wishlistIds.filter((id) => id !== productId)
        : [...wishlistIds, productId];
      setWishlistIds(next);
      try {
        localStorage.setItem(GUEST_WISHLIST_KEY, JSON.stringify(next));
      } catch {
        // ignore storage failure
      }
      return !exists;
    }

    const path = `users/${user.uid}/wishlist/${productId}`;
    try {
      if (exists) {
        await deleteDoc(doc(db, 'users', user.uid, 'wishlist', productId));
        return false;
      } else {
        await setDoc(doc(db, 'users', user.uid, 'wishlist', productId), {
          userId: user.uid,
          productId,
          addedAt: serverTimestamp(),
        });
        return true;
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, path);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAdmin,
        authReady,
        addresses,
        wishlistIds,
        loyaltySummary,
        loyaltyTransactions,
        loyaltyVouchers,
        signInWithGoogle,
        signOut,
        updateProfileDetails,
        saveAddress,
        deleteAddress,
        toggleWishlist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
