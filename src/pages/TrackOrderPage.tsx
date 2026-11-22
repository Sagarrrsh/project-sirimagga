import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { AlertTriangle, CheckCircle2, MessageCircle, Package, Search, Truck } from 'lucide-react';
import { OrderProgressTracker } from '../components/OrderProgressTracker';
import { useLanguage } from '../contexts/LanguageContext';
import { formatINR } from '../data/demoData';
import { OperationType, db, handleFirestoreError } from '../lib/firebase';
import { computeTrackingId } from '../lib/orderTracking';
import { WHATSAPP_COPY, buildOrderMessage, buildWhatsAppUrl } from '../lib/whatsapp';
import type { OrderStatus, OrderTracking } from '../types';

const TRACKING_STEP_STATUSES: OrderStatus[] = [
  'Order Placed',
  'Confirmed',
  'Quality Inspection',
  'Packaging in Progress',
  'Ready to Dispatch',
  'Shipped',
  'Delivered',
];

function formatTimestamp(ts: unknown): string {
  if (!ts || typeof ts !== 'object') return 'Just now';
  const seconds = (ts as { seconds?: number }).seconds;
  if (typeof seconds !== 'number') return 'Just now';
  return new Date(seconds * 1000).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export function TrackOrderPage() {
  const { lang, t, localizeOrderStatus } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialOrderId = searchParams.get('orderId') || '';
  const initialEmail = searchParams.get('email') || '';

  const [orderIdInput, setOrderIdInput] = useState(initialOrderId);
  const [emailInput, setEmailInput] = useState(initialEmail);
  const [activeLookup, setActiveLookup] = useState<{
    trackingId: string;
    orderNumber: string;
  } | null>(null);
  const [trackingData, setTrackingData] = useState<OrderTracking | null>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [lookupError, setLookupError] = useState('');

  useEffect(() => {
    document.title = `${t.trackOrder.title} | SIRIMAGGA`;
  }, [t.trackOrder.title]);

  // Auto-start real-time lookup if URL query params are provided
  useEffect(() => {
    const qOrder = searchParams.get('orderId')?.trim();
    const qEmail = searchParams.get('email')?.trim();
    if (qOrder && qEmail) {
      setOrderIdInput(qOrder);
      setEmailInput(qEmail);
      computeTrackingId(qOrder, qEmail).then((trackingId) => {
        setActiveLookup({ trackingId, orderNumber: qOrder.toUpperCase() });
      });
    }
  }, [searchParams]);

  // Real-time Firestore listener on order_tracking/{trackingId}
  useEffect(() => {
    if (!activeLookup) return;

    setLoading(true);
    setNotFound(false);
    setLookupError('');

    const path = `order_tracking/${activeLookup.trackingId}`;
    const unsubscribe = onSnapshot(
      doc(db, 'order_tracking', activeLookup.trackingId),
      (snap) => {
        setLoading(false);
        if (snap.exists()) {
          setTrackingData({ id: snap.id, ...snap.data() } as OrderTracking);
          setNotFound(false);
        } else {
          setTrackingData(null);
          setNotFound(true);
        }
      },
      (err) => {
        setLoading(false);
        setLookupError('Unable to retrieve tracking details at the moment. Please verify your details and try again.');
        handleFirestoreError(err, OperationType.GET, path);
      }
    );

    return () => unsubscribe();
  }, [activeLookup]);

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanOrder = orderIdInput.trim().toUpperCase();
    const cleanEmail = emailInput.trim().toLowerCase();
    if (!cleanOrder || !cleanEmail) return;

    const trackingId = await computeTrackingId(cleanOrder, cleanEmail);
    setSearchParams({ orderId: cleanOrder, email: cleanEmail });
    setActiveLookup({ trackingId, orderNumber: cleanOrder });
  };

  const currentStageIndex = trackingData
    ? TRACKING_STEP_STATUSES.indexOf(trackingData.status)
    : -1;

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <header className="text-center space-y-3 max-w-xl mx-auto">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#651D2D]">
          {t.trackOrder.kicker}
        </p>
        <h1 className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#332821]">
          {t.trackOrder.title}
        </h1>
        <p className="text-sm text-[#6A5A4E]">{t.trackOrder.subtitle}</p>
      </header>

      {/* Lookup Form */}
      <section className="bg-[#FAF6EE] border border-[#B18A4A]/35 rounded-lg p-6 sm:p-8">
        <form onSubmit={handleTrackSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
          <div className="sm:col-span-5">
            <label htmlFor="track-order-id" className="block text-xs font-semibold text-[#332821] mb-1.5">
              {t.trackOrder.orderIdLabel}
            </label>
            <input
              id="track-order-id"
              type="text"
              required
              value={orderIdInput}
              onChange={(e) => setOrderIdInput(e.target.value.toUpperCase())}
              placeholder="e.g. SRM-2612345"
              className="w-full px-3.5 py-2.5 bg-white border border-[#B18A4A]/45 rounded-md text-sm font-mono-code uppercase focus:outline-none focus:border-[#651D2D]"
            />
          </div>

          <div className="sm:col-span-5">
            <label htmlFor="track-order-email" className="block text-xs font-semibold text-[#332821] mb-1.5">
              {t.trackOrder.emailLabel}
            </label>
            <input
              id="track-order-email"
              type="email"
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3.5 py-2.5 bg-white border border-[#B18A4A]/45 rounded-md text-sm focus:outline-none focus:border-[#651D2D]"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-[#651D2D] text-[#F5EFE4] text-sm font-semibold rounded-md hover:bg-[#4F1522] disabled:opacity-60 transition-colors inline-flex items-center justify-center gap-1.5 whitespace-nowrap"
            >
              <Search className="w-4 h-4" />
              <span>{t.trackOrder.trackBtn}</span>
            </button>
          </div>
        </form>
      </section>

      {/* Loading State */}
      {loading && (
        <div className="bg-white border border-[#B18A4A]/25 rounded-lg p-10 text-center text-sm text-[#6A5A4E]">
          {t.trackOrder.loading}
        </div>
      )}

      {/* Not Found State */}
      {!loading && notFound && activeLookup && (
        <div className="bg-[#FAF6EE] border border-[#651D2D]/35 rounded-lg p-8 text-center space-y-3">
          <Package className="w-10 h-10 text-[#651D2D] mx-auto" />
          <h2 className="font-serif-display text-xl font-semibold text-[#332821]">
            {t.trackOrder.notFoundTitle}
          </h2>
          <p className="text-sm text-[#6A5A4E] max-w-md mx-auto">
            {t.trackOrder.notFoundBody} (
            <span className="font-mono-code font-semibold text-[#332821]">
              {activeLookup.orderNumber}
            </span>
            )
          </p>
        </div>
      )}

      {!loading && lookupError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-sm text-red-800">
          {lookupError}
        </div>
      )}

      {/* Real-Time Order Status Card */}
      {!loading && trackingData && (
        <section className="bg-white border border-[#B18A4A]/35 rounded-lg p-6 sm:p-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#B18A4A]/20">
            <div>
              <p className="text-xs text-[#6A5A4E]">
                <strong className="font-mono-code text-[#332821]">{trackingData.orderNumber}</strong> ·{' '}
                {t.trackOrder.realtimeActive}
              </p>
              <h2 className="font-serif-display text-2xl font-semibold text-[#651D2D] mt-1">
                {localizeOrderStatus(trackingData.status)}
              </h2>
              <p className="text-xs text-[#6A5A4E] mt-1">
                {t.trackOrder.lastUpdated}: {formatTimestamp(trackingData.updatedAt)}
              </p>
            </div>

            <div className="text-left sm:text-right space-y-0.5">
              <p className="text-xs text-[#6A5A4E]">{t.trackOrder.orderTotal}</p>
              <p className="text-xl font-bold text-[#332821] tabular-nums">
                {formatINR(trackingData.totalAmount)}
              </p>
              <p className="text-xs text-[#6A5A4E]">
                {trackingData.paymentMethod} · {trackingData.paymentStatus}
              </p>
            </div>
          </div>

          {/* Special States */}
          {trackingData.status === 'Unavailable - Action Needed' && (
            <div className="bg-[#FAF6EE] border border-[#651D2D]/40 rounded-md p-4 flex items-start gap-3 text-sm text-[#332821]">
              <AlertTriangle className="w-5 h-5 text-[#651D2D] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#651D2D]">{t.trackOrder.actionNeededTitle}</p>
                <p className="text-xs text-[#6A5A4E] mt-1">{t.trackOrder.actionNeededBody}</p>
              </div>
            </div>
          )}

          {trackingData.status === 'Cancelled' && (
            <div className="bg-[#FAF6EE] border border-[#B18A4A]/40 rounded-md p-4 text-sm text-[#332821]">
              <p className="font-semibold">{t.trackOrder.cancelledTitle}</p>
              <p className="text-xs text-[#6A5A4E] mt-1">
                {t.trackOrder.paymentStatusLabel}: {trackingData.paymentStatus}.{' '}
                {t.trackOrder.cancelledHelp}
              </p>
            </div>
          )}

          {/* 5-Stage Horizontal Saree Sourcing Order Progress Tracker */}
          <OrderProgressTracker status={trackingData.status} />

          {/* 7-Step Fulfillment Timeline */}
          {trackingData.status !== 'Cancelled' &&
            trackingData.status !== 'Unavailable - Action Needed' && (
              <div className="space-y-4">
                <h3 className="font-serif-display text-base font-semibold text-[#332821]">
                  {t.trackOrder.fulfillmentProgress}
                </h3>
                <div className="space-y-3">
                  {TRACKING_STEP_STATUSES.map((stepStatus, index) => {
                    const isCompleted = currentStageIndex >= index;
                    const isCurrent = currentStageIndex === index;
                    return (
                      <div
                        key={stepStatus}
                        className={`flex items-start gap-3.5 p-3.5 rounded-md border transition-colors ${
                          isCurrent
                            ? 'bg-[#FAF6EE] border-[#651D2D]'
                            : isCompleted
                            ? 'bg-[#FAF6EE]/50 border-[#B18A4A]/30'
                            : 'bg-white border-[#B18A4A]/15 opacity-60'
                        }`}
                      >
                        <CheckCircle2
                          className={`w-5 h-5 shrink-0 mt-0.5 ${
                            isCompleted ? 'text-[#651D2D]' : 'text-[#B18A4A]/50'
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p
                              className={`text-sm font-semibold ${
                                isCompleted ? 'text-[#332821]' : 'text-[#6A5A4E]'
                              }`}
                            >
                              {localizeOrderStatus(stepStatus)}
                            </p>
                            {isCurrent && (
                              <span className="text-[11px] font-semibold text-[#651D2D]">
                                {t.trackOrder.currentStage}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#6A5A4E] mt-0.5">
                            {t.trackOrder.stepDetails[stepStatus] || ''}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          {/* Courier & Tracking Details */}
          {(trackingData.courierName || trackingData.trackingNumber) && (
            <div className="bg-[#FAF6EE] border border-[#B18A4A]/35 rounded-md p-4 flex items-start gap-3">
              <Truck className="w-5 h-5 text-[#651D2D] shrink-0 mt-0.5" />
              <div className="text-sm space-y-1">
                <p className="font-semibold text-[#332821]">{t.trackOrder.courierTitle}</p>
                <p className="text-xs text-[#6A5A4E]">
                  {t.trackOrder.courierPartner}:{' '}
                  <strong className="text-[#332821]">
                    {trackingData.courierName || 'Assigned Courier'}
                  </strong>
                  {trackingData.trackingNumber ? (
                    <>
                      {' · '}
                      {t.trackOrder.trackingNumber}:{' '}
                      <strong className="font-mono-code text-[#651D2D]">
                        {trackingData.trackingNumber}
                      </strong>
                    </>
                  ) : null}
                </p>
              </div>
            </div>
          )}

          {/* Item & Destination Summary (Zero PII) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#B18A4A]/20 text-sm">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#651D2D] mb-2">
                {t.trackOrder.itemsInOrder} ({trackingData.itemCount})
              </p>
              <ul className="space-y-1 text-xs text-[#332821]">
                {trackingData.itemTitles.map((title, idx) => (
                  <li key={idx}>• {title}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#651D2D] mb-2">
                {t.trackOrder.destinationDates}
              </p>
              <p className="text-xs text-[#332821]">
                <strong>{t.trackOrder.destination}:</strong> {trackingData.destinationCityState}
              </p>
              <p className="text-xs text-[#6A5A4E] mt-1">
                <strong>{t.trackOrder.placedOn}:</strong> {formatTimestamp(trackingData.createdAt)}
              </p>
              <div className="pt-3">
                <a
                  href={buildWhatsAppUrl(
                    buildOrderMessage({
                      lang,
                      orderNumber: trackingData.orderNumber,
                      status: trackingData.status,
                    })
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-[#1B5E3A] text-[#1B5E3A] text-xs font-semibold rounded-md hover:bg-[#1B5E3A] hover:text-[#F5EFE4] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{WHATSAPP_COPY[lang].orderHelpBtn}</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="text-center text-xs text-[#6A5A4E]">
        {t.trackOrder.accountPrompt}{' '}
        <Link to="/account" className="text-[#651D2D] font-medium hover:underline">
          {t.trackOrder.myAccountLink}
        </Link>
        .
      </div>
    </main>
  );
}
