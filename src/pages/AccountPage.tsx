import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { collection, doc, onSnapshot, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import {
  Award,
  Heart,
  LogOut,
  Mail,
  MapPin,
  MessageCircle,
  Package,
  Plus,
  Trash2,
  User,
} from 'lucide-react';
import { LoyaltyDashboard } from '../components/LoyaltyDashboard';
import { OrderProgressTracker } from '../components/OrderProgressTracker';
import { ProductCard } from '../components/ProductCard';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../contexts/StoreContext';
import { formatINR } from '../data/demoData';
import { OperationType, db, handleFirestoreError } from '../lib/firebase';
import { LOYALTY_COPY, RUPEE_VALUE_PER_POINT } from '../lib/loyalty';
import { triggerOrderEmailNotification } from '../lib/notifications';
import { computeTrackingId } from '../lib/orderTracking';
import { WHATSAPP_COPY, buildOrderMessage, buildWhatsAppUrl } from '../lib/whatsapp';
import type { EmailNotification, Order } from '../types';

export function AccountPage() {
  const {
    user,
    profile,
    isAdmin,
    authReady,
    addresses,
    wishlistIds,
    loyaltySummary,
    signInWithGoogle,
    signOut,
    updateProfileDetails,
    saveAddress,
    deleteAddress,
  } = useAuth();
  const { products, showToast } = useStore();
  const { lang, t, localizeOrderStatus, localizeProductTitle, localizeColor } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get('tab') || 'orders';
  const [orders, setOrders] = useState<Order[]>([]);
  const [notifications, setNotifications] = useState<EmailNotification[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  // Profile Form
  const [displayName, setDisplayName] = useState('');
  const [phone, setPhone] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);

  // New Address Form
  const [showAddrForm, setShowAddrForm] = useState(false);
  const [addrLabel, setAddrLabel] = useState('Home');
  const [recipientName, setRecipientName] = useState('');
  const [addrPhone, setAddrPhone] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('Karnataka');
  const [pincode, setPincode] = useState('');

  useEffect(() => {
    document.title = `${t.account.kicker} | SIRIMAGGA`;
  }, [t.account.kicker]);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName || '');
      setPhone(profile.phone || '');
    } else if (user) {
      setDisplayName(user.displayName || '');
    }
  }, [profile, user]);

  useEffect(() => {
    if (!authReady || !user) {
      setOrders([]);
      setOrdersLoading(false);
      return;
    }

    const q = query(collection(db, 'orders'), where('customerId', '==', user.uid));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Order);
        list.sort((a, b) => {
          const tA = (a.createdAt as { seconds?: number } | undefined)?.seconds || 0;
          const tB = (b.createdAt as { seconds?: number } | undefined)?.seconds || 0;
          return tB - tA;
        });
        setOrders(list);
        setOrdersLoading(false);
      },
      (err) => {
        setOrdersLoading(false);
        handleFirestoreError(err, OperationType.LIST, 'orders');
      }
    );

    const nq = query(
      collection(db, 'email_notifications'),
      where('customerId', '==', user.uid)
    );
    const unsubNotif = onSnapshot(
      nq,
      (snap) => {
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as EmailNotification);
        list.sort((a, b) => {
          const tA = (a.createdAt as { seconds?: number } | undefined)?.seconds || 0;
          const tB = (b.createdAt as { seconds?: number } | undefined)?.seconds || 0;
          return tB - tA;
        });
        setNotifications(list);
      },
      (err) => {
        handleFirestoreError(err, OperationType.LIST, 'email_notifications');
      }
    );

    return () => {
      unsub();
      unsubNotif();
    };
  }, [authReady, user]);

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      await updateProfileDetails(displayName, phone);
      showToast(t.account.profileUpdatedToast);
    } finally {
      setSavingProfile(false);
    }
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[0-9]{6}$/.test(pincode)) {
      showToast(t.account.invalidPincodeToast, 'error');
      return;
    }
    await saveAddress({
      label: addrLabel,
      recipientName,
      phone: addrPhone,
      addressLine,
      city,
      state: stateName,
      pincode,
      isDefault: addresses.length === 0,
    });
    setShowAddrForm(false);
    setAddressLine('');
    setCity('');
    setPincode('');
    showToast(t.account.addressSavedToast);
  };

  const handleCancelOrder = async (order: Order) => {
    if (order.status !== 'Order Placed') return;
    const path = `orders/${order.id}`;
    try {
      await updateDoc(doc(db, 'orders', order.id), {
        status: 'Cancelled',
        updatedAt: serverTimestamp(),
      });
      try {
        const trackingId = await computeTrackingId(order.orderNumber, order.customerEmail);
        await updateDoc(doc(db, 'order_tracking', trackingId), {
          status: 'Cancelled',
          updatedAt: serverTimestamp(),
        });
      } catch {
        // Ignore if tracking projection does not exist yet
      }
      await triggerOrderEmailNotification({
        orderId: order.id,
        orderNumber: order.orderNumber,
        customerId: order.customerId,
        customerName: order.customerName,
        recipientEmail: order.customerEmail,
        eventStatus: 'Cancelled',
        totalAmount: order.totalAmount,
      });
      showToast(`${order.orderNumber} — ${localizeOrderStatus('Cancelled')}`, 'info');
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    }
  };

  if (!user) {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        <section className="bg-[#FAF6EE] border border-[#B18A4A]/35 rounded-lg p-8 sm:p-12 text-center space-y-5">
          <User className="w-10 h-10 text-[#651D2D] mx-auto" />
          <h1 className="font-serif-display text-3xl font-semibold text-[#332821]">
            {t.account.welcomeTitle}
          </h1>
          <p className="text-sm text-[#6A5A4E] max-w-md mx-auto">{t.account.welcomeSub}</p>
          <button
            type="button"
            onClick={() => signInWithGoogle()}
            className="px-6 py-3 bg-[#651D2D] text-[#F5EFE4] text-sm font-semibold rounded-md hover:bg-[#4F1522] transition-colors"
          >
            {t.account.signInBtn}
          </button>
        </section>

        {wishlistProducts.length > 0 && (
          <section className="space-y-4">
            <h2 className="font-serif-display text-2xl font-semibold text-[#332821]">
              {t.account.savedWishlist} ({wishlistProducts.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="border-b border-[#B18A4A]/30 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#651D2D]">
            {t.account.kicker}
          </p>
          <h1 className="font-serif-display text-3xl font-semibold text-[#332821] mt-1">
            {profile?.displayName || user.displayName || t.account.yourAccountFallback}
          </h1>
          <p className="text-sm text-[#6A5A4E]">{user.email}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setSearchParams({ tab: 'loyalty' })}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-[#FAF6EE] border border-[#B18A4A]/50 text-xs font-semibold text-[#651D2D] hover:border-[#651D2D] transition-colors"
          >
            <Award className="w-4 h-4 text-[#B18A4A]" />
            <span className="tabular-nums">
              {loyaltySummary?.pointsBalance ?? 0} {LOYALTY_COPY[lang].headerBadgeSuffix} ·{' '}
              {formatINR((loyaltySummary?.pointsBalance ?? 0) * RUPEE_VALUE_PER_POINT)}
            </span>
          </button>
          {isAdmin && (
            <Link
              to="/admin"
              className="px-4 py-2 bg-[#651D2D] text-[#F5EFE4] text-xs font-semibold rounded-md hover:bg-[#4F1522]"
            >
              {t.account.openAdmin}
            </Link>
          )}
          <button
            type="button"
            onClick={() => signOut()}
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#B18A4A]/50 text-[#332821] text-xs font-medium rounded-md hover:border-[#651D2D] hover:text-[#651D2D]"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t.account.signOut}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-[#B18A4A]/20 pb-3">
        {[
          { id: 'orders', label: t.account.tabOrders, icon: Package },
          {
            id: 'loyalty',
            label: `${LOYALTY_COPY[lang].tabLabel} (${loyaltySummary?.pointsBalance ?? 0})`,
            icon: Award,
          },
          { id: 'wishlist', label: `${t.account.tabWishlist} (${wishlistProducts.length})`, icon: Heart },
          { id: 'addresses', label: `${t.account.tabAddresses} (${addresses.length})`, icon: MapPin },
          { id: 'profile', label: t.account.tabProfile, icon: User },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSearchParams({ tab: tab.id })}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                active
                  ? 'bg-[#651D2D] text-[#F5EFE4]'
                  : 'bg-[#FAF6EE] text-[#332821] hover:bg-[#EFE7D6]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'orders' && (
        <section className="space-y-6">
          {ordersLoading ? (
            <p className="text-sm text-[#6A5A4E]">{t.account.loadingOrders}</p>
          ) : orders.length === 0 ? (
            <div className="bg-[#FAF6EE] border border-[#B18A4A]/30 rounded-lg p-12 text-center space-y-4">
              <Package className="w-10 h-10 text-[#B18A4A] mx-auto" />
              <p className="font-serif-display text-xl text-[#332821]">{t.account.noOrdersTitle}</p>
              <Link
                to="/shop"
                className="inline-block px-5 py-2.5 bg-[#651D2D] text-[#F5EFE4] text-sm font-medium rounded-md"
              >
                {t.account.exploreSarees}
              </Link>
            </div>
          ) : (
            orders.map((order) => (
                <article
                  key={order.id}
                  className="bg-[#FAF6EE] border border-[#B18A4A]/30 rounded-lg p-6 space-y-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#B18A4A]/20">
                    <div>
                      <p className="text-xs text-[#6A5A4E]">
                        {t.account.orderPrefix}{' '}
                        <strong className="font-mono-code text-[#332821]">{order.orderNumber}</strong>
                      </p>
                      <p className="font-serif-display text-lg font-semibold text-[#651D2D] mt-0.5">
                        {t.account.statusPrefix}: {localizeOrderStatus(order.status)}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-base font-bold text-[#332821] tabular-nums">
                        {formatINR(order.totalAmount)}
                      </p>
                      <p className="text-xs text-[#6A5A4E]">
                        {order.paymentMethod} · {order.paymentStatus}
                      </p>
                    </div>
                  </div>

                  {/* Horizontal 5-Stage Saree Sourcing Order Progress Tracker */}
                  <OrderProgressTracker status={order.status} />

                  {order.trackingNumber && (
                    <div className="bg-white border border-[#B18A4A]/30 rounded-md p-3.5 text-xs text-[#332821] flex flex-wrap gap-4">
                      <span>
                        <strong>{t.account.courierLabel}:</strong>{' '}
                        {order.courierName || 'Partner Courier'}
                      </span>
                      <span>
                        <strong>{t.account.trackingLabel}:</strong>{' '}
                        <span className="font-mono-code">{order.trackingNumber}</span>
                      </span>
                    </div>
                  )}

                  {/* Line Items */}
                  <div className="space-y-2.5">
                    {order.items.map((item, idx) => {
                      const displayTitle = localizeProductTitle(item.productCode, item.title);
                      return (
                        <div key={idx} className="flex items-center gap-3 text-sm">
                          <img
                            src={item.image}
                            alt={displayTitle}
                            referrerPolicy="no-referrer"
                            className="w-12 h-10 rounded object-cover bg-[#EFE7D6]"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-[#332821] truncate">{displayTitle}</p>
                            <p className="text-xs text-[#6A5A4E]">
                              {localizeColor(item.color)} · {t.account.qtyLabel} {item.quantity} ·{' '}
                              <span className="font-mono-code">{item.productCode}</span>
                            </p>
                          </div>
                          <span className="tabular-nums font-medium">
                            {formatINR(item.unitPrice * item.quantity)}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Order Status Email Notifications Log */}
                  {(() => {
                    const orderNotifs = notifications.filter((n) => n.orderId === order.id);
                    if (orderNotifs.length === 0) return null;
                    return (
                      <div className="bg-white border border-[#B18A4A]/25 rounded-md p-3.5 space-y-2">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#651D2D] flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5" />
                          <span>
                            {t.account.emailUpdatesTitle} ({orderNotifs.length})
                          </span>
                        </p>
                        <div className="divide-y divide-[#B18A4A]/15">
                          {orderNotifs.slice(0, 4).map((ntf) => {
                            const ts = (ntf.createdAt as { seconds?: number } | undefined)?.seconds;
                            const dateStr = ts
                              ? new Date(ts * 1000).toLocaleString('en-IN', {
                                  dateStyle: 'medium',
                                  timeStyle: 'short',
                                })
                              : 'Just now';
                            return (
                              <div key={ntf.id} className="py-2 first:pt-0 last:pb-0 text-xs">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <span className="font-medium text-[#332821]">{ntf.subject}</span>
                                  <span className="text-[11px] text-[#6A5A4E] tabular-nums">
                                    {ntf.deliveryState === 'sent_smtp'
                                      ? t.account.sentEmail
                                      : ntf.deliveryState === 'failed'
                                      ? t.account.deliveryFailed
                                      : t.account.loggedEmail}{' '}
                                    · {dateStr}
                                  </span>
                                </div>
                                <p className="text-[#6A5A4E] mt-0.5 line-clamp-2">{ntf.previewText}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}

                  <div className="pt-3 border-t border-[#B18A4A]/20 flex flex-wrap items-center justify-between gap-3 text-xs text-[#6A5A4E]">
                    <span>
                      {t.account.deliverTo}: {order.shippingAddress.addressLine},{' '}
                      {order.shippingAddress.city}, {order.shippingAddress.state} –{' '}
                      {order.shippingAddress.pincode}
                    </span>
                    <div className="flex flex-wrap items-center gap-4">
                      <Link
                        to={`/orders/${order.id}`}
                        className="text-[#651D2D] font-semibold hover:underline"
                      >
                        {lang === 'hi'
                          ? 'ऑर्डर विवरण'
                          : lang === 'kn'
                          ? 'ಆರ್ಡರ್ ವಿವರಗಳು'
                          : 'Order Details'}
                      </Link>
                      <Link
                        to={`/track-order?orderId=${encodeURIComponent(order.orderNumber)}&email=${encodeURIComponent(order.customerEmail)}`}
                        className="text-[#651D2D] font-medium hover:underline"
                      >
                        {t.account.liveTrackingLink}
                      </Link>
                      <a
                        href={buildWhatsAppUrl(
                          buildOrderMessage({
                            lang,
                            orderNumber: order.orderNumber,
                            status: order.status,
                          })
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#1B5E3A] font-medium hover:underline"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{WHATSAPP_COPY[lang].navChipLabel}</span>
                      </a>
                      {order.status === 'Order Placed' && (
                        <button
                          type="button"
                          onClick={() => handleCancelOrder(order)}
                          className="text-[#651D2D] font-medium hover:underline"
                        >
                          {t.account.cancelOrderBtn}
                        </button>
                      )}
                    </div>
                  </div>
                </article>
            ))
          )}
        </section>
      )}

      {activeTab === 'loyalty' && <LoyaltyDashboard />}

      {activeTab === 'wishlist' && (
        <section>
          {wishlistProducts.length === 0 ? (
            <div className="bg-[#FAF6EE] border border-[#B18A4A]/30 rounded-lg p-12 text-center space-y-3">
              <p className="font-serif-display text-xl text-[#332821]">{t.account.emptyWishlist}</p>
              <Link
                to="/shop"
                className="inline-block px-5 py-2.5 bg-[#651D2D] text-[#F5EFE4] text-sm font-medium rounded-md"
              >
                {t.account.exploreSarees}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>
      )}

      {activeTab === 'addresses' && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif-display text-xl font-semibold text-[#332821]">
              {t.account.savedAddressesHeading}
            </h2>
            <button
              type="button"
              onClick={() => setShowAddrForm((v) => !v)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#651D2D] text-[#F5EFE4] text-xs font-semibold rounded-md hover:bg-[#4F1522]"
            >
              <Plus className="w-4 h-4" />
              <span>{t.account.addNewAddress}</span>
            </button>
          </div>

          {showAddrForm && (
            <form
              onSubmit={handleAddAddress}
              className="bg-[#FAF6EE] border border-[#B18A4A]/35 rounded-lg p-6 space-y-4 max-w-2xl"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1">{t.account.labelField}</label>
                  <input
                    type="text"
                    required
                    value={addrLabel}
                    onChange={(e) => setAddrLabel(e.target.value)}
                    placeholder="Home / Office"
                    className="w-full px-3 py-2 bg-white border border-[#B18A4A]/40 rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">{t.account.recipientField}</label>
                  <input
                    type="text"
                    required
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#B18A4A]/40 rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">{t.account.mobileField}</label>
                  <input
                    type="tel"
                    required
                    minLength={10}
                    value={addrPhone}
                    onChange={(e) => setAddrPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#B18A4A]/40 rounded-md text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">{t.account.fullAddressField}</label>
                <input
                  type="text"
                  required
                  minLength={5}
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#B18A4A]/40 rounded-md text-sm"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1">{t.account.cityField}</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#B18A4A]/40 rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">{t.account.stateField}</label>
                  <input
                    type="text"
                    required
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#B18A4A]/40 rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">{t.account.pinField}</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="w-full px-3 py-2 bg-white border border-[#B18A4A]/40 rounded-md text-sm font-mono-code"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#651D2D] text-[#F5EFE4] text-sm font-medium rounded-md"
                >
                  {t.account.saveAddressBtn}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddrForm(false)}
                  className="px-4 py-2 text-sm text-[#6A5A4E]"
                >
                  {t.account.cancelBtn}
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className="bg-[#FAF6EE] border border-[#B18A4A]/30 rounded-lg p-5 flex justify-between gap-4"
              >
                <div className="space-y-1 text-sm">
                  <p className="font-semibold text-[#332821]">
                    {addr.label} · {addr.recipientName}
                  </p>
                  <p className="text-[#6A5A4E] text-xs">{addr.addressLine}</p>
                  <p className="text-[#6A5A4E] text-xs">
                    {addr.city}, {addr.state} – {addr.pincode}
                  </p>
                  <p className="text-[#332821] text-xs font-mono-code pt-1">{addr.phone}</p>
                </div>
                <button
                  type="button"
                  onClick={() => deleteAddress(addr.id)}
                  aria-label="Delete address"
                  className="text-[#6A5A4E] hover:text-[#651D2D] self-start p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'profile' && (
        <section className="max-w-lg bg-[#FAF6EE] border border-[#B18A4A]/30 rounded-lg p-6">
          <h2 className="font-serif-display text-xl font-semibold text-[#332821] mb-4">
            {t.account.profileTitle}
          </h2>
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#332821] mb-1">
                {t.account.fullNameField}
              </label>
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-3.5 py-2 bg-white border border-[#B18A4A]/40 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#332821] mb-1">
                {t.account.emailField}
              </label>
              <input
                type="email"
                disabled
                value={user.email || ''}
                className="w-full px-3.5 py-2 bg-[#EFE7D6] border border-[#B18A4A]/30 rounded-md text-sm text-[#6A5A4E]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#332821] mb-1">
                {t.account.mobileOptionalField}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98XXXXXXXX"
                className="w-full px-3.5 py-2 bg-white border border-[#B18A4A]/40 rounded-md text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={savingProfile}
              className="px-5 py-2.5 bg-[#651D2D] text-[#F5EFE4] text-sm font-medium rounded-md hover:bg-[#4F1522]"
            >
              {savingProfile ? t.account.savingProfileBtn : t.account.saveProfileBtn}
            </button>
          </form>
        </section>
      )}
    </main>
  );
}
