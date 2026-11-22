import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  collection,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { ArrowLeft, Award, Mail, MapPin, MessageCircle, Package, Receipt, Truck } from 'lucide-react';
import { OrderProgressTracker } from '../components/OrderProgressTracker';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../contexts/StoreContext';
import { formatINR } from '../data/demoData';
import type { Language } from '../i18n/translations';
import { OperationType, db, handleFirestoreError } from '../lib/firebase';
import { LOYALTY_COPY } from '../lib/loyalty';
import { triggerOrderEmailNotification } from '../lib/notifications';
import { computeTrackingId } from '../lib/orderTracking';
import { WHATSAPP_COPY, buildOrderMessage, buildWhatsAppUrl } from '../lib/whatsapp';
import type { EmailNotification, Order } from '../types';

const PAGE_COPY: Record<
  Language,
  {
    backToOrders: string;
    orderDetailsTitle: string;
    signInPrompt: string;
    signInBtn: string;
    publicTrackPrompt: string;
    loading: string;
    notFoundTitle: string;
    notFoundBody: string;
    itemsHeading: string;
    summaryHeading: string;
    subtotal: string;
    shipping: string;
    free: string;
    discount: string;
    total: string;
    paymentMethod: string;
    paymentStatus: string;
    customerNote: string;
    shippingHeading: string;
  }
> = {
  en: {
    backToOrders: 'Back to My Orders',
    orderDetailsTitle: 'Order Details',
    signInPrompt: 'Please sign in with the account used to place this order to view complete details.',
    signInBtn: 'Sign in with Google',
    publicTrackPrompt: 'Or check order progress publicly using Order ID & Email',
    loading: 'Loading order details...',
    notFoundTitle: 'Order Not Found',
    notFoundBody: 'We could not find this order under your account.',
    itemsHeading: 'Ordered Sarees',
    summaryHeading: 'Payment & Order Summary',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    free: 'Complimentary',
    discount: 'Discount',
    total: 'Order Total',
    paymentMethod: 'Payment Method',
    paymentStatus: 'Payment Status',
    customerNote: 'Order Note',
    shippingHeading: 'Delivery Destination',
  },
  hi: {
    backToOrders: 'मेरे ऑर्डर्स पर वापस जाएं',
    orderDetailsTitle: 'ऑर्डर विवरण',
    signInPrompt: 'पूरा ऑर्डर विवरण देखने के लिए कृपया उसी Google खाते से साइन इन करें।',
    signInBtn: 'Google से साइन इन करें',
    publicTrackPrompt: 'या ऑर्डर आईडी और ईमेल द्वारा ट्रैक करें',
    loading: 'ऑर्डर विवरण लोड हो रहा है...',
    notFoundTitle: 'ऑर्डर नहीं मिला',
    notFoundBody: 'आपके खाते में यह ऑर्डर उपलब्ध नहीं है।',
    itemsHeading: 'ऑर्डर की गई साड़ियाँ',
    summaryHeading: 'भुगतान और ऑर्डर सारांश',
    subtotal: 'उप-योग',
    shipping: 'डिलीवरी शुल्क',
    free: 'निःशुल्क',
    discount: 'छूट',
    total: 'कुल राशि',
    paymentMethod: 'भुगतान माध्यम',
    paymentStatus: 'भुगतान स्थिति',
    customerNote: 'ग्राहक नोट',
    shippingHeading: 'डिलीवरी पता',
  },
  kn: {
    backToOrders: 'ನನ್ನ ಆರ್ಡರ್‌ಗಳಿಗೆ ಹಿಂತಿರುಗಿ',
    orderDetailsTitle: 'ಆರ್ಡರ್ ವಿವರಗಳು',
    signInPrompt: 'ಸಂಪೂರ್ಣ ಆರ್ಡರ್ ವಿವರಗಳನ್ನು ನೋಡಲು ದಯವಿಟ್ಟು ನಿಮ್ಮ ಖಾತೆಗೆ ಸೈನ್ ಇನ್ ಮಾಡಿ.',
    signInBtn: 'Google ಮೂಲಕ ಸೈನ್ ಇನ್ ಮಾಡಿ',
    publicTrackPrompt: 'ಅಥವಾ ಆರ್ಡರ್ ಐಡಿ ಮತ್ತು ಇಮೇಲ್ ಮೂಲಕ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ',
    loading: 'ಆರ್ಡರ್ ವಿವರಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...',
    notFoundTitle: 'ಆರ್ಡರ್ ಕಂಡುಬಂದಿಲ್ಲ',
    notFoundBody: 'ನಿಮ್ಮ ಖಾತೆಯಲ್ಲಿ ಈ ಆರ್ಡರ್ ಲಭ್ಯವಿಲ್ಲ.',
    itemsHeading: 'ಆರ್ಡರ್ ಮಾಡಿದ ಸೀರೆಗಳು',
    summaryHeading: 'ಪಾವತಿ ಮತ್ತು ಆರ್ಡರ್ ಸಾರಾಂಶ',
    subtotal: 'ಉಪಮೊತ್ತ',
    shipping: 'ವಿತರಣಾ ಶುಲ್ಕ',
    free: 'ಉಚಿತ',
    discount: 'ರಿಯಾಯಿತಿ',
    total: 'ಒಟ್ಟು ಮೊತ್ತ',
    paymentMethod: 'ಪಾವತಿ ವಿಧಾನ',
    paymentStatus: 'ಪಾವತಿ ಸ್ಥಿತಿ',
    customerNote: 'ಗ್ರಾಹಕರ ಟಿಪ್ಪಣಿ',
    shippingHeading: 'ವಿತರಣಾ ವಿಳಾಸ',
  },
};

function formatDate(ts: unknown): string {
  if (!ts || typeof ts !== 'object') return 'Just now';
  const seconds = (ts as { seconds?: number }).seconds;
  if (typeof seconds !== 'number') return 'Just now';
  return new Date(seconds * 1000).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export function OrderDetailsPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const { user, authReady, signInWithGoogle } = useAuth();
  const { showToast } = useStore();
  const { lang, t, localizeOrderStatus, localizeProductTitle, localizeColor } = useLanguage();

  const copy = PAGE_COPY[lang];
  const [order, setOrder] = useState<Order | null>(null);
  const [notifications, setNotifications] = useState<EmailNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    document.title = order
      ? `${order.orderNumber} · ${copy.orderDetailsTitle} | SIRIMAGGA`
      : `${copy.orderDetailsTitle} | SIRIMAGGA`;
  }, [order, copy.orderDetailsTitle]);

  useEffect(() => {
    if (!authReady) return;
    if (!user || !orderId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setNotFound(false);

    const path = `orders/${orderId}`;
    const unsubOrder = onSnapshot(
      doc(db, 'orders', orderId),
      (snap) => {
        setLoading(false);
        if (snap.exists()) {
          setOrder({ id: snap.id, ...snap.data() } as Order);
          setNotFound(false);
        } else {
          setOrder(null);
          setNotFound(true);
        }
      },
      (err) => {
        setLoading(false);
        setNotFound(true);
        handleFirestoreError(err, OperationType.GET, path);
      }
    );

    const notifQuery = query(
      collection(db, 'email_notifications'),
      where('customerId', '==', user.uid)
    );
    const unsubNotifs = onSnapshot(
      notifQuery,
      (snap) => {
        const list = snap.docs
          .map((d) => ({ id: d.id, ...d.data() }) as EmailNotification)
          .filter((n) => n.orderId === orderId);
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
      unsubOrder();
      unsubNotifs();
    };
  }, [authReady, user, orderId]);

  const handleCancelOrder = async () => {
    if (!order || order.status !== 'Order Placed') return;
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
        // Tracking projection optional
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

  if (!authReady || loading) {
    return (
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-sm text-[#6A5A4E]">
        {copy.loading}
      </main>
    );
  }

  if (!user) {
    return (
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section className="bg-[#FAF6EE] border border-[#B18A4A]/35 rounded-lg p-8 sm:p-12 text-center space-y-5">
          <Package className="w-10 h-10 text-[#651D2D] mx-auto" />
          <h1 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#332821]">
            {copy.orderDetailsTitle}
          </h1>
          <p className="text-sm text-[#6A5A4E] max-w-md mx-auto">{copy.signInPrompt}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => signInWithGoogle()}
              className="px-6 py-2.5 bg-[#651D2D] text-[#F5EFE4] text-sm font-semibold rounded-md hover:bg-[#4F1522] transition-colors"
            >
              {copy.signInBtn}
            </button>
            <Link
              to="/track-order"
              className="px-5 py-2.5 border border-[#B18A4A]/50 text-[#332821] text-sm font-medium rounded-md hover:border-[#651D2D] hover:text-[#651D2D]"
            >
              {copy.publicTrackPrompt}
            </Link>
          </div>
        </section>
      </main>
    );
  }

  if (notFound || !order) {
    return (
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4">
        <Package className="w-10 h-10 text-[#B18A4A] mx-auto" />
        <h1 className="font-serif-display text-2xl font-semibold text-[#332821]">
          {copy.notFoundTitle}
        </h1>
        <p className="text-sm text-[#6A5A4E]">{copy.notFoundBody}</p>
        <Link
          to="/account"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#651D2D] text-[#F5EFE4] text-sm font-medium rounded-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{copy.backToOrders}</span>
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#B18A4A]/25 pb-5">
        <div className="space-y-1">
          <Link
            to="/account"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#651D2D] hover:underline mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{copy.backToOrders}</span>
          </Link>
          <p className="text-xs text-[#6A5A4E]">
            {t.account.orderPrefix}{' '}
            <strong className="font-mono-code text-[#332821]">{order.orderNumber}</strong> ·{' '}
            {t.trackOrder.placedOn} {formatDate(order.createdAt)}
          </p>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#651D2D]">
            {localizeOrderStatus(order.status)}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to={`/track-order?orderId=${encodeURIComponent(order.orderNumber)}&email=${encodeURIComponent(order.customerEmail)}`}
            className="px-4 py-2 border border-[#B18A4A]/50 text-[#332821] text-xs font-semibold rounded-md hover:border-[#651D2D] hover:text-[#651D2D] transition-colors"
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#1B5E3A] text-[#F5EFE4] text-xs font-semibold rounded-md hover:bg-[#14472B] transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>{WHATSAPP_COPY[lang].orderHelpBtn}</span>
          </a>
        </div>
      </div>

      {/* Horizontal 5-Stage Saree Sourcing Order Progress Tracker */}
      <OrderProgressTracker status={order.status} />

      {/* Courier Details */}
      {(order.courierName || order.trackingNumber) && (
        <section className="bg-[#FAF6EE] border border-[#B18A4A]/35 rounded-lg p-5 flex items-start gap-3">
          <Truck className="w-5 h-5 text-[#651D2D] shrink-0 mt-0.5" />
          <div className="text-sm space-y-1">
            <p className="font-semibold text-[#332821]">{t.trackOrder.courierTitle}</p>
            <p className="text-xs text-[#6A5A4E]">
              {t.account.courierLabel}:{' '}
              <strong className="text-[#332821]">{order.courierName || 'Partner Courier'}</strong>
              {order.trackingNumber ? (
                <>
                  {' · '}
                  {t.account.trackingLabel}:{' '}
                  <strong className="font-mono-code text-[#651D2D]">{order.trackingNumber}</strong>
                </>
              ) : null}
            </p>
          </div>
        </section>
      )}

      {/* Items + Address & Payment Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-7 bg-[#FAF6EE] border border-[#B18A4A]/30 rounded-lg p-6 space-y-4">
          <h2 className="font-serif-display text-lg font-semibold text-[#332821]">
            {copy.itemsHeading} ({order.items.length})
          </h2>
          <div className="divide-y divide-[#B18A4A]/20">
            {order.items.map((item, idx) => {
              const displayTitle = localizeProductTitle(item.productCode, item.title);
              return (
                <div key={idx} className="py-3.5 first:pt-0 last:pb-0 flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={displayTitle}
                    referrerPolicy="no-referrer"
                    className="w-16 h-14 rounded object-cover bg-[#EFE7D6] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#332821]">{displayTitle}</p>
                    <p className="text-xs text-[#6A5A4E] mt-0.5">
                      {localizeColor(item.color)} · {t.account.qtyLabel} {item.quantity} ·{' '}
                      <span className="font-mono-code">{item.productCode}</span>
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-[#332821] tabular-nums shrink-0">
                    {formatINR(item.unitPrice * item.quantity)}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <div className="lg:col-span-5 space-y-6">
          <section className="bg-[#FAF6EE] border border-[#B18A4A]/30 rounded-lg p-6 space-y-3">
            <h2 className="font-serif-display text-lg font-semibold text-[#332821] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#651D2D]" />
              <span>{copy.shippingHeading}</span>
            </h2>
            <div className="text-xs text-[#6A5A4E] space-y-1 leading-relaxed">
              <p className="font-semibold text-sm text-[#332821]">{order.customerName}</p>
              <p>{order.shippingAddress.addressLine}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} –{' '}
                <span className="font-mono-code">{order.shippingAddress.pincode}</span>
              </p>
              <p className="pt-1 font-mono-code text-[#332821]">{order.customerPhone}</p>
            </div>
            {order.customerNote && (
              <p className="pt-2 border-t border-[#B18A4A]/20 text-xs text-[#6A5A4E]">
                <strong className="text-[#332821]">{copy.customerNote}:</strong> {order.customerNote}
              </p>
            )}
          </section>

          <section className="bg-[#FAF6EE] border border-[#B18A4A]/30 rounded-lg p-6 space-y-3">
            <h2 className="font-serif-display text-lg font-semibold text-[#332821] flex items-center gap-2">
              <Receipt className="w-4 h-4 text-[#651D2D]" />
              <span>{copy.summaryHeading}</span>
            </h2>
            <dl className="space-y-2 text-xs">
              <div className="flex justify-between text-[#6A5A4E]">
                <dt>{copy.subtotal}</dt>
                <dd className="tabular-nums font-medium text-[#332821]">{formatINR(order.subtotal)}</dd>
              </div>
              <div className="flex justify-between text-[#6A5A4E]">
                <dt>{copy.shipping}</dt>
                <dd className="tabular-nums font-medium text-[#332821]">
                  {order.shippingCharge === 0 ? copy.free : formatINR(order.shippingCharge)}
                </dd>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between text-[#1B5E3A]">
                  <dt>
                    {copy.discount}
                    {order.discountCode ? ` (${order.discountCode})` : ''}
                  </dt>
                  <dd className="tabular-nums font-medium">-{formatINR(order.discountAmount)}</dd>
                </div>
              )}
              <div className="flex justify-between pt-2.5 border-t border-[#B18A4A]/25 text-sm font-bold text-[#332821]">
                <dt>{copy.total}</dt>
                <dd className="tabular-nums text-[#651D2D]">{formatINR(order.totalAmount)}</dd>
              </div>
              <div className="flex justify-between pt-2 text-[#6A5A4E]">
                <dt>{copy.paymentMethod}</dt>
                <dd className="font-medium text-[#332821]">{order.paymentMethod}</dd>
              </div>
              <div className="flex justify-between text-[#6A5A4E]">
                <dt>{copy.paymentStatus}</dt>
                <dd className="font-medium text-[#332821]">{order.paymentStatus}</dd>
              </div>
              {typeof order.loyaltyPointsEarned === 'number' && order.loyaltyPointsEarned > 0 && (
                <div className="flex justify-between items-center pt-2 border-t border-[#B18A4A]/20 text-[#651D2D] font-semibold">
                  <dt className="inline-flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#B18A4A]" />
                    <span>{LOYALTY_COPY[lang].programTitle}</span>
                  </dt>
                  <dd className="tabular-nums">
                    +{order.loyaltyPointsEarned} {LOYALTY_COPY[lang].ptsRequired}
                  </dd>
                </div>
              )}
            </dl>

            {order.status === 'Order Placed' && (
              <div className="pt-3 border-t border-[#B18A4A]/20">
                <button
                  type="button"
                  onClick={handleCancelOrder}
                  className="text-xs font-semibold text-[#651D2D] hover:underline"
                >
                  {t.account.cancelOrderBtn}
                </button>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Email Status Notifications Log */}
      {notifications.length > 0 && (
        <section className="bg-white border border-[#B18A4A]/30 rounded-lg p-6 space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#651D2D] flex items-center gap-1.5">
            <Mail className="w-4 h-4" />
            <span>
              {t.account.emailUpdatesTitle} ({notifications.length})
            </span>
          </h2>
          <div className="divide-y divide-[#B18A4A]/15">
            {notifications.map((ntf) => (
              <div key={ntf.id} className="py-2.5 first:pt-0 last:pb-0 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-semibold text-[#332821]">{ntf.subject}</span>
                  <span className="text-[11px] text-[#6A5A4E] tabular-nums">
                    {ntf.deliveryState === 'sent_smtp'
                      ? t.account.sentEmail
                      : ntf.deliveryState === 'failed'
                      ? t.account.deliveryFailed
                      : t.account.loggedEmail}{' '}
                    · {formatDate(ntf.createdAt)}
                  </span>
                </div>
                <p className="text-[#6A5A4E] mt-0.5">{ntf.previewText}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
