import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { doc, getDoc, serverTimestamp, writeBatch } from 'firebase/firestore';
import {
  Award,
  CheckCircle2,
  CreditCard,
  Lock,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Truck,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../contexts/StoreContext';
import { DEMO_DISCOUNTS, formatINR } from '../data/demoData';
import { OperationType, db, handleFirestoreError } from '../lib/firebase';
import {
  LOYALTY_COPY,
  REDEMPTION_TIERS,
  RUPEE_VALUE_PER_POINT,
  calculatePointsEarned,
} from '../lib/loyalty';
import { triggerOrderEmailNotification } from '../lib/notifications';
import { buildOrderItemTitles, computeTrackingId } from '../lib/orderTracking';
import { WHATSAPP_COPY, buildOrderMessage, buildWhatsAppUrl } from '../lib/whatsapp';
import type { Discount, LoyaltyVoucher, PaymentMethod } from '../types';

const INDIAN_STATES = [
  'Karnataka',
  'Maharashtra',
  'Tamil Nadu',
  'Telangana',
  'Andhra Pradesh',
  'Kerala',
  'Gujarat',
  'Delhi',
  'Rajasthan',
  'West Bengal',
  'Uttar Pradesh',
  'Madhya Pradesh',
  'Other Indian State / UT',
];

interface PaymentGatewayConfig {
  provider: string;
  configured: boolean;
  mode: string;
  supportedMethods: PaymentMethod[];
}

export function CheckoutPage() {
  const { cart, cartSubtotal, clearCart, storeSettings, showToast } = useStore();
  const { user, profile, addresses, loyaltySummary, loyaltyVouchers, signInWithGoogle } = useAuth();
  const { lang, t, localizeProductTitle, localizeColor } = useLanguage();
  const location = useLocation();
  const navDiscount = (location.state as { appliedDiscount?: Discount } | null)?.appliedDiscount || null;

  const loyaltyCopy = LOYALTY_COPY[lang];

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('Karnataka');
  const [pincode, setPincode] = useState('');
  const [customerNote, setCustomerNote] = useState('');

  const [couponCode, setCouponCode] = useState(navDiscount?.code || '');
  const [appliedDiscount, setAppliedDiscount] = useState<Discount | null>(navDiscount);
  const [selectedLoyaltyVoucher, setSelectedLoyaltyVoucher] = useState<LoyaltyVoucher | null>(null);
  const [directRedeemPoints, setDirectRedeemPoints] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');
  const [gatewayConfig, setGatewayConfig] = useState<PaymentGatewayConfig | null>(null);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [placedOrderInfo, setPlacedOrderInfo] = useState<{
    orderNumber: string;
    email: string;
    total: number;
    paymentStatus: string;
    pointsEarned: number;
    pointsRedeemed: number;
  } | null>(null);

  useEffect(() => {
    document.title = `${t.checkout.title} | SIRIMAGGA`;
  }, [t.checkout.title]);

  useEffect(() => {
    fetch('/api/payments/config')
      .then((res) => res.json())
      .then((data: PaymentGatewayConfig) => setGatewayConfig(data))
      .catch(() =>
        setGatewayConfig({
          provider: 'Razorpay',
          configured: false,
          mode: 'test_placeholder',
          supportedMethods: ['UPI', 'Card', 'NetBanking', 'COD'],
        })
      );
  }, []);

  useEffect(() => {
    if (profile) {
      setCustomerName((prev) => prev || profile.displayName || '');
      setCustomerEmail((prev) => prev || profile.email || '');
      setCustomerPhone((prev) => prev || profile.phone || '');
    } else if (user) {
      setCustomerName((prev) => prev || user.displayName || '');
      setCustomerEmail((prev) => prev || user.email || '');
    }
  }, [user, profile]);

  useEffect(() => {
    if (addresses.length > 0 && !addressLine) {
      const def = addresses.find((a) => a.isDefault) || addresses[0];
      setAddressLine(def.addressLine);
      setCity(def.city);
      setStateName(def.state);
      setPincode(def.pincode);
      if (!customerPhone) setCustomerPhone(def.phone);
      if (!customerName) setCustomerName(def.recipientName);
    }
  }, [addresses, addressLine, customerPhone, customerName]);

  const shippingCharge =
    cartSubtotal === 0 || cartSubtotal >= storeSettings.freeShippingThreshold
      ? 0
      : storeSettings.standardShippingFee;

  const discountAmount = appliedDiscount
    ? appliedDiscount.discountType === 'percentage'
      ? Math.round((cartSubtotal * appliedDiscount.value) / 100)
      : Math.min(cartSubtotal, appliedDiscount.value)
    : 0;

  const loyaltyBalance = loyaltySummary?.pointsBalance ?? 0;
  const activeLoyaltyVouchers = loyaltyVouchers.filter((v) => v.status === 'active');
  const basePayableBeforeLoyalty = Math.max(0, cartSubtotal - discountAmount);

  const loyaltyDiscountAmount = selectedLoyaltyVoucher
    ? Math.min(basePayableBeforeLoyalty, selectedLoyaltyVoucher.discountValue)
    : directRedeemPoints > 0
    ? Math.min(basePayableBeforeLoyalty, directRedeemPoints * RUPEE_VALUE_PER_POINT)
    : 0;

  const totalAmount = Math.max(0, cartSubtotal + shippingCharge - discountAmount - loyaltyDiscountAmount);
  const netSareeSpend = Math.max(0, cartSubtotal - discountAmount - loyaltyDiscountAmount);
  const pointsToEarn = user ? calculatePointsEarned(netSareeSpend) : 0;

  const handleApplyLoyaltyVoucher = (voucher: LoyaltyVoucher) => {
    if (cartSubtotal < voucher.minOrderAmount) {
      showToast(`${t.cart.minOrderRequired} (${formatINR(voucher.minOrderAmount)})`, 'error');
      return;
    }
    setDirectRedeemPoints(0);
    setSelectedLoyaltyVoucher(voucher);
    showToast(`${t.cart.appliedSuccess}: ${voucher.code}`);
  };

  const handleSelectDirectPoints = (points: number) => {
    if (points <= 0 || directRedeemPoints === points) {
      setDirectRedeemPoints(0);
      return;
    }
    if (loyaltyBalance < points) return;
    setSelectedLoyaltyVoucher(null);
    setDirectRedeemPoints(points);
    const val = Math.min(basePayableBeforeLoyalty, points * RUPEE_VALUE_PER_POINT);
    showToast(loyaltyCopy.checkoutAppliedMsg(points, formatINR(val)));
  };

  const handleApplyCoupon = async () => {
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    const matchedVoucher = activeLoyaltyVouchers.find((v) => v.code === code);
    if (matchedVoucher) {
      handleApplyLoyaltyVoucher(matchedVoucher);
      return;
    }

    let found: Discount | null = null;
    try {
      const snap = await getDoc(doc(db, 'discounts', code));
      if (snap.exists()) found = { id: snap.id, ...snap.data() } as Discount;
    } catch {
      // fallback
    }
    if (!found) found = DEMO_DISCOUNTS.find((d) => d.code === code) || null;
    if (!found || !found.isActive) {
      showToast(t.cart.invalidDiscount, 'error');
      return;
    }
    if (cartSubtotal < found.minOrderAmount) {
      showToast(`${t.cart.minOrderRequired} (${formatINR(found.minOrderAmount)})`, 'error');
      return;
    }
    setAppliedDiscount(found);
    showToast(`${t.cart.appliedSuccess}: ${found.code}`);
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      showToast(t.checkout.errSignIn, 'info');
      return;
    }
    if (cart.length === 0) return;

    if (!/^[0-9]{6}$/.test(pincode.trim())) {
      showToast(t.checkout.errPincode, 'error');
      return;
    }

    setPlacingOrder(true);
    const orderId = `ord_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const orderNumber = `SRM-${new Date().getFullYear().toString().slice(-2)}${String(
      Math.floor(10000 + Math.random() * 89999)
    )}`;

    try {
      let paymentReference = 'COD-PAY-ON-DELIVERY';
      let paymentStatus: 'Pending' | 'Test Mode - Authorised' = 'Pending';

      if (paymentMethod !== 'COD' && totalAmount > 0) {
        const payRes = await fetch('/api/payments/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: totalAmount, receipt: orderNumber }),
        });
        const payData = (await payRes.json()) as {
          testMode?: boolean;
          providerOrderId?: string;
          error?: string;
        };
        if (!payRes.ok) {
          throw new Error(payData.error || 'Payment initialization failed');
        }
        paymentReference = payData.providerOrderId || `TEST_REF_${orderNumber}`;
        paymentStatus = 'Test Mode - Authorised';
      } else if (totalAmount === 0) {
        paymentReference = 'LOYALTY-REWARD-COVERED';
        paymentStatus = 'Test Mode - Authorised';
      }

      const combinedDiscountAmount = discountAmount + loyaltyDiscountAmount;

      const orderPayload = {
        orderNumber,
        customerId: user.uid,
        customerName: customerName.trim().slice(0, 120),
        customerEmail: customerEmail.trim().slice(0, 160),
        customerPhone: customerPhone.trim().slice(0, 20),
        shippingAddress: {
          addressLine: addressLine.trim().slice(0, 300),
          city: city.trim().slice(0, 80),
          state: stateName.trim().slice(0, 80),
          pincode: pincode.trim().slice(0, 6),
        },
        items: cart.map((item) => ({
          productId: item.productId,
          productCode: item.productCode,
          title: item.title,
          color: item.color,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          image: item.image,
        })),
        subtotal: cartSubtotal,
        shippingCharge,
        ...(appliedDiscount?.code ? { discountCode: appliedDiscount.code } : {}),
        discountAmount: combinedDiscountAmount,
        totalAmount,
        paymentMethod,
        paymentStatus,
        paymentReference,
        status: 'Order Placed',
        ...(customerNote.trim() ? { customerNote: customerNote.trim().slice(0, 500) } : {}),
        loyaltyPointsEarned: pointsToEarn,
        ...(directRedeemPoints > 0 ? { loyaltyPointsRedeemed: directRedeemPoints } : {}),
        ...(loyaltyDiscountAmount > 0 ? { loyaltyDiscountAmount } : {}),
        ...(selectedLoyaltyVoucher ? { loyaltyVoucherCode: selectedLoyaltyVoucher.code } : {}),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const trackingId = await computeTrackingId(orderNumber, customerEmail);
      const batch = writeBatch(db);

      batch.set(doc(db, 'orders', orderId), orderPayload);

      batch.set(doc(db, 'order_tracking', trackingId), {
        orderNumber,
        customerId: user.uid,
        status: 'Order Placed',
        paymentMethod,
        paymentStatus,
        itemCount: Math.max(
          1,
          Math.min(100, cart.reduce((sum, item) => sum + item.quantity, 0))
        ),
        itemTitles: buildOrderItemTitles(orderPayload.items),
        destinationCityState: `${city.trim()}, ${stateName.trim()}`.slice(0, 160),
        totalAmount,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      // Loyalty balance & ledger updates committed atomically with order creation
      const summaryRef = doc(db, 'users', user.uid, 'loyalty_summary', 'account');
      const prevBalance = loyaltySummary?.pointsBalance ?? 0;
      const prevLifetime = loyaltySummary?.lifetimeEarned ?? 0;
      const prevRedeemed = loyaltySummary?.totalRedeemed ?? 0;

      const nextBalance = Math.max(0, prevBalance - directRedeemPoints + pointsToEarn);
      const nextLifetime = prevLifetime + pointsToEarn;
      const nextRedeemed = prevRedeemed + directRedeemPoints;

      if (loyaltySummary) {
        batch.update(summaryRef, {
          pointsBalance: nextBalance,
          lifetimeEarned: nextLifetime,
          totalRedeemed: nextRedeemed,
          updatedAt: serverTimestamp(),
        });
      } else {
        batch.set(summaryRef, {
          userId: user.uid,
          pointsBalance: nextBalance,
          lifetimeEarned: nextLifetime,
          totalRedeemed: nextRedeemed,
          updatedAt: serverTimestamp(),
        });
      }

      if (pointsToEarn > 0) {
        const earnTxId = `ltx_earn_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
        batch.set(doc(db, 'users', user.uid, 'loyalty_transactions', earnTxId), {
          userId: user.uid,
          type: 'earn',
          points: pointsToEarn,
          rupeeValue: pointsToEarn * RUPEE_VALUE_PER_POINT,
          orderId,
          orderNumber,
          description: `Earned +${pointsToEarn} pts on order ${orderNumber}`,
          createdAt: serverTimestamp(),
        });
      }

      if (directRedeemPoints > 0 && loyaltyDiscountAmount > 0) {
        const redeemTxId = `ltx_rdm_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
        batch.set(doc(db, 'users', user.uid, 'loyalty_transactions', redeemTxId), {
          userId: user.uid,
          type: 'redeem',
          points: directRedeemPoints,
          rupeeValue: loyaltyDiscountAmount,
          orderId,
          orderNumber,
          description: `Redeemed ${directRedeemPoints} pts for ₹${loyaltyDiscountAmount} off order ${orderNumber}`,
          createdAt: serverTimestamp(),
        });
      }

      if (selectedLoyaltyVoucher) {
        batch.update(doc(db, 'users', user.uid, 'loyalty_vouchers', selectedLoyaltyVoucher.id), {
          status: 'used',
          usedOrderId: orderId,
          usedAt: serverTimestamp(),
        });
      }

      try {
        await batch.commit();
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `orders/${orderId}`);
      }

      const notifResult = await triggerOrderEmailNotification({
        orderId,
        orderNumber,
        customerId: user.uid,
        customerName: orderPayload.customerName,
        recipientEmail: orderPayload.customerEmail,
        eventStatus: 'Order Placed',
        totalAmount,
      });

      clearCart();
      setPlacedOrderInfo({
        orderNumber,
        email: customerEmail.trim().toLowerCase(),
        total: totalAmount,
        paymentStatus,
        pointsEarned: pointsToEarn,
        pointsRedeemed: directRedeemPoints,
      });
      showToast(
        notifResult.deliveryState === 'sent_smtp'
          ? `Order ${orderNumber} placed — confirmation email sent.`
          : `Order ${orderNumber} placed — status notification logged.`
      );
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Unable to place order.', 'error');
    } finally {
      setPlacingOrder(false);
    }
  };

  if (placedOrderInfo) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-[#FAF6EE] border border-[#B18A4A]/40 rounded-lg p-8 sm:p-10 text-center space-y-5">
          <CheckCircle2 className="w-12 h-12 text-[#651D2D] mx-auto" />
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.14em] text-[#651D2D] font-semibold">
              {t.checkout.orderReceivedKicker}
            </p>
            <h1 className="font-serif-display text-3xl font-semibold text-[#332821]">
              {t.checkout.thankYouTitle}
            </h1>
            <p className="text-sm text-[#6A5A4E]">
              <strong className="font-mono-code text-[#332821]">{placedOrderInfo.orderNumber}</strong> ·{' '}
              <strong className="tabular-nums text-[#332821]">{formatINR(placedOrderInfo.total)}</strong> ({placedOrderInfo.paymentStatus})
            </p>
          </div>

          <div className="bg-white border border-[#B18A4A]/25 rounded-md p-4 text-xs text-[#332821] text-left space-y-1.5">
            <p className="font-semibold text-[#651D2D]">{t.checkout.whatNext}</p>
            <p>{t.checkout.nextStep1}</p>
            <p>{t.checkout.nextStep2}</p>
            <p>{t.checkout.nextStep3}</p>
          </div>

          {placedOrderInfo.pointsEarned > 0 && (
            <div className="bg-white border border-[#B18A4A]/45 rounded-md p-3.5 flex items-center justify-center gap-2 text-xs font-semibold text-[#651D2D]">
              <Award className="w-4 h-4 text-[#B18A4A] shrink-0" />
              <span>{loyaltyCopy.confirmEarnedBanner(placedOrderInfo.pointsEarned)}</span>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              to={`/track-order?orderId=${encodeURIComponent(placedOrderInfo.orderNumber)}&email=${encodeURIComponent(placedOrderInfo.email)}`}
              className="px-6 py-2.5 bg-[#651D2D] text-[#F5EFE4] text-sm font-medium rounded-md hover:bg-[#4F1522]"
            >
              {t.checkout.trackLiveBtn}
            </Link>
            <Link
              to="/account"
              className="px-6 py-2.5 border border-[#651D2D] text-[#651D2D] text-sm font-medium rounded-md hover:bg-[#651D2D]/5"
            >
              {t.checkout.viewAccountBtn}
            </Link>
            <a
              href={buildWhatsAppUrl(
                buildOrderMessage({
                  lang,
                  orderNumber: placedOrderInfo.orderNumber,
                  status: 'Order Placed',
                })
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 border border-[#1B5E3A] text-[#1B5E3A] text-sm font-medium rounded-md hover:bg-[#1B5E3A] hover:text-[#F5EFE4] transition-colors inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>{WHATSAPP_COPY[lang].orderHelpBtn}</span>
            </a>
          </div>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="font-serif-display text-3xl text-[#332821]">{t.checkout.emptyTitle}</h1>
        <p className="text-sm text-[#6A5A4E]">{t.checkout.emptySub}</p>
        <Link
          to="/shop"
          className="inline-block px-6 py-2.5 bg-[#651D2D] text-[#F5EFE4] text-sm font-medium rounded-md"
        >
          {t.checkout.browseSarees}
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="border-b border-[#B18A4A]/30 pb-5 mb-8">
        <h1 className="font-serif-display text-3xl font-semibold text-[#332821]">
          {t.checkout.title}
        </h1>
      </div>

      {!user && (
        <div className="mb-8 bg-[#FAF6EE] border border-[#651D2D]/35 rounded-lg p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif-display text-lg font-semibold text-[#332821]">
              {t.checkout.signInHeading}
            </h2>
            <p className="text-sm text-[#6A5A4E]">{t.checkout.signInSub}</p>
          </div>
          <button
            type="button"
            onClick={() => signInWithGoogle()}
            className="px-5 py-2.5 bg-[#651D2D] text-[#F5EFE4] text-sm font-medium rounded-md hover:bg-[#4F1522] whitespace-nowrap shrink-0"
          >
            {t.checkout.continueGoogle}
          </button>
        </div>
      )}

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          {/* Saved Address Quick Fill */}
          {addresses.length > 0 && (
            <div className="bg-[#FAF6EE] border border-[#B18A4A]/30 rounded-lg p-5 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#651D2D]">
                {t.checkout.savedAddressesTitle}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {addresses.map((addr) => (
                  <button
                    key={addr.id}
                    type="button"
                    onClick={() => {
                      setCustomerName(addr.recipientName);
                      setCustomerPhone(addr.phone);
                      setAddressLine(addr.addressLine);
                      setCity(addr.city);
                      setStateName(addr.state);
                      setPincode(addr.pincode);
                    }}
                    className="text-left p-3 bg-white border border-[#B18A4A]/35 rounded-md hover:border-[#651D2D] transition-colors text-xs space-y-1"
                  >
                    <p className="font-semibold text-[#332821]">
                      {addr.label} · {addr.recipientName}
                    </p>
                    <p className="text-[#6A5A4E] line-clamp-2">
                      {addr.addressLine}, {addr.city}, {addr.state} – {addr.pincode}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Customer & Shipping Fields */}
          <section className="bg-[#FAF6EE] border border-[#B18A4A]/30 rounded-lg p-6 space-y-4">
            <h2 className="font-serif-display text-xl font-semibold text-[#332821]">
              {t.checkout.deliveryDetails}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#332821] mb-1">
                  {t.checkout.fullName}
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-[#B18A4A]/40 rounded-md text-sm focus:outline-none focus:border-[#651D2D]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#332821] mb-1">
                  {t.checkout.mobileNumber}
                </label>
                <input
                  type="tel"
                  required
                  minLength={10}
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+91 98XXXXXXXX"
                  className="w-full px-3.5 py-2 bg-white border border-[#B18A4A]/40 rounded-md text-sm focus:outline-none focus:border-[#651D2D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#332821] mb-1">
                {t.checkout.emailAddress}
              </label>
              <input
                type="email"
                required
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full px-3.5 py-2 bg-white border border-[#B18A4A]/40 rounded-md text-sm focus:outline-none focus:border-[#651D2D]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#332821] mb-1">
                {t.checkout.fullAddress}
              </label>
              <textarea
                required
                rows={2}
                minLength={5}
                value={addressLine}
                onChange={(e) => setAddressLine(e.target.value)}
                placeholder={t.checkout.addressPlaceholder}
                className="w-full px-3.5 py-2 bg-white border border-[#B18A4A]/40 rounded-md text-sm focus:outline-none focus:border-[#651D2D]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#332821] mb-1">
                  {t.checkout.city}
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-[#B18A4A]/40 rounded-md text-sm focus:outline-none focus:border-[#651D2D]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#332821] mb-1">
                  {t.checkout.state}
                </label>
                <select
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-[#B18A4A]/40 rounded-md text-sm focus:outline-none focus:border-[#651D2D]"
                >
                  {INDIAN_STATES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#332821] mb-1">
                  {t.checkout.pincode}
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  pattern="[0-9]{6}"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="587101"
                  className="w-full px-3.5 py-2 bg-white border border-[#B18A4A]/40 rounded-md text-sm font-mono-code focus:outline-none focus:border-[#651D2D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#332821] mb-1">
                {t.checkout.orderNote}
              </label>
              <input
                type="text"
                value={customerNote}
                onChange={(e) => setCustomerNote(e.target.value)}
                placeholder={t.checkout.orderNotePlaceholder}
                className="w-full px-3.5 py-2 bg-white border border-[#B18A4A]/40 rounded-md text-sm focus:outline-none focus:border-[#651D2D]"
              />
            </div>
          </section>

          {/* Indian Payment Gateway Section */}
          <section className="bg-[#FAF6EE] border border-[#B18A4A]/30 rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <h2 className="font-serif-display text-xl font-semibold text-[#332821] flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#651D2D]" />
                <span>{t.checkout.paymentMethod}</span>
              </h2>
              <span className="text-xs text-[#6A5A4E]">
                {gatewayConfig?.configured
                  ? t.checkout.razorpayConnected
                  : t.checkout.testModePlaceholder}
              </span>
            </div>

            {!gatewayConfig?.configured && (
              <p className="text-xs text-[#6A5A4E] bg-white border border-[#B18A4A]/25 rounded-md p-3">
                {t.checkout.testModeNotice}
              </p>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(['UPI', 'Card', 'NetBanking', 'COD'] as PaymentMethod[]).map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className={`p-3 rounded-md border text-xs font-semibold text-center transition-colors ${
                    paymentMethod === method
                      ? 'bg-[#651D2D] text-[#F5EFE4] border-[#651D2D]'
                      : 'bg-white text-[#332821] border-[#B18A4A]/40 hover:border-[#651D2D]'
                  }`}
                >
                  {method === 'NetBanking'
                    ? t.checkout.netBanking
                    : method === 'COD'
                    ? t.checkout.cod
                    : method}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Order Summary Right */}
        <aside className="lg:col-span-5 bg-[#FAF6EE] border border-[#B18A4A]/35 rounded-lg p-6 space-y-5 lg:sticky lg:top-24">
          <h2 className="font-serif-display text-xl font-semibold text-[#332821]">
            {t.checkout.yourOrder} ({cart.reduce((s, i) => s + i.quantity, 0)} {t.checkout.itemsLabel})
          </h2>

          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {cart.map((item) => {
              const displayTitle = localizeProductTitle(item.productCode, item.title);
              return (
                <div
                  key={`${item.productId}-${item.color}`}
                  className="flex items-center gap-3 pb-3 border-b border-[#B18A4A]/15"
                >
                  <img
                    src={item.image}
                    alt={displayTitle}
                    referrerPolicy="no-referrer"
                    className="w-14 h-12 rounded object-cover bg-[#EFE7D6] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#332821] truncate">{displayTitle}</p>
                    <p className="text-xs text-[#6A5A4E]">
                      {localizeColor(item.color)} · {t.checkout.qtyLabel} {item.quantity}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-[#332821] tabular-nums">
                    {formatINR(item.unitPrice * item.quantity)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              placeholder={t.checkout.discountPlaceholder}
              className="flex-1 px-3 py-2 bg-white border border-[#B18A4A]/40 rounded-md text-xs font-mono-code uppercase"
            />
            <button
              type="button"
              onClick={handleApplyCoupon}
              className="px-4 py-2 border border-[#651D2D] text-[#651D2D] text-xs font-semibold rounded-md hover:bg-[#651D2D] hover:text-[#F5EFE4]"
            >
              {t.checkout.apply}
            </button>
          </div>

          {/* SIRIMAGGA Loom Rewards Section */}
          {user && (loyaltyBalance >= 10 || activeLoyaltyVouchers.length > 0 || pointsToEarn > 0) && (
            <div className="bg-white border border-[#B18A4A]/35 rounded-md p-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold text-[#651D2D] flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#B18A4A]" />
                  <span>{loyaltyCopy.checkoutTitle}</span>
                </p>
                {(directRedeemPoints > 0 || selectedLoyaltyVoucher) && (
                  <button
                    type="button"
                    onClick={() => {
                      setDirectRedeemPoints(0);
                      setSelectedLoyaltyVoucher(null);
                    }}
                    className="text-[11px] font-medium text-[#651D2D] hover:underline"
                  >
                    {loyaltyCopy.checkoutClearReward}
                  </button>
                )}
              </div>

              {loyaltyBalance > 0 && (
                <p className="text-[11px] text-[#6A5A4E]">
                  {loyaltyCopy.checkoutRedeemHint(
                    loyaltyBalance,
                    loyaltyBalance * RUPEE_VALUE_PER_POINT
                  )}
                </p>
              )}

              {activeLoyaltyVouchers.length > 0 && (
                <div className="space-y-1.5">
                  <p className="text-[11px] font-medium text-[#332821]">
                    {loyaltyCopy.checkoutApplyVoucherLabel}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {activeLoyaltyVouchers.map((voucher) => {
                      const active = selectedLoyaltyVoucher?.id === voucher.id;
                      const eligible = cartSubtotal >= voucher.minOrderAmount;
                      return (
                        <button
                          key={voucher.id}
                          type="button"
                          disabled={!eligible}
                          onClick={() => handleApplyLoyaltyVoucher(voucher)}
                          className={`px-2.5 py-1 rounded border text-[11px] font-medium transition-colors ${
                            active
                              ? 'bg-[#651D2D] text-[#F5EFE4] border-[#651D2D]'
                              : eligible
                              ? 'bg-[#FAF6EE] text-[#332821] border-[#B18A4A]/50 hover:border-[#651D2D]'
                              : 'bg-gray-50 text-[#6A5A4E] border-gray-200 opacity-60 cursor-not-allowed'
                          }`}
                        >
                          {voucher.code} (-{formatINR(voucher.discountValue)})
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {loyaltyBalance >= 10 && !selectedLoyaltyVoucher && basePayableBeforeLoyalty >= 50 && (
                <div className="space-y-1.5">
                  <p className="text-[11px] font-medium text-[#332821]">
                    {loyaltyCopy.checkoutDirectPtsLabel}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {REDEMPTION_TIERS.filter(
                      (tier) =>
                        loyaltyBalance >= tier.points &&
                        basePayableBeforeLoyalty >= tier.discountValue
                    ).map((tier) => {
                      const active = directRedeemPoints === tier.points;
                      return (
                        <button
                          key={tier.points}
                          type="button"
                          onClick={() => handleSelectDirectPoints(tier.points)}
                          className={`px-2.5 py-1 rounded border text-[11px] font-medium transition-colors ${
                            active
                              ? 'bg-[#651D2D] text-[#F5EFE4] border-[#651D2D]'
                              : 'bg-[#FAF6EE] text-[#332821] border-[#B18A4A]/50 hover:border-[#651D2D]'
                          }`}
                        >
                          {tier.points} {loyaltyCopy.ptsRequired} (-{formatINR(tier.discountValue)})
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {pointsToEarn > 0 && (
                <p className="text-[11px] font-medium text-[#1B5E3A] flex items-center gap-1.5 pt-1 border-t border-[#B18A4A]/20">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>{loyaltyCopy.checkoutEarnPreview(pointsToEarn)}</span>
                </p>
              )}
            </div>
          )}

          <div className="space-y-2 text-sm pt-2 border-t border-[#B18A4A]/25">
            <div className="flex justify-between text-[#6A5A4E]">
              <span>{t.checkout.subtotal}</span>
              <span className="tabular-nums text-[#332821]">{formatINR(cartSubtotal)}</span>
            </div>
            <div className="flex justify-between text-[#6A5A4E]">
              <span>{t.checkout.shipping}</span>
              <span className="tabular-nums text-[#332821]">
                {shippingCharge === 0 ? t.checkout.complimentary : formatINR(shippingCharge)}
              </span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-[#651D2D]">
                <span>
                  {t.checkout.discount} ({appliedDiscount?.code})
                </span>
                <span className="tabular-nums">- {formatINR(discountAmount)}</span>
              </div>
            )}
            {loyaltyDiscountAmount > 0 && (
              <div className="flex justify-between text-[#1B5E3A] font-medium">
                <span>
                  {loyaltyCopy.checkoutDiscountLine}
                  {selectedLoyaltyVoucher ? ` (${selectedLoyaltyVoucher.code})` : ''}
                </span>
                <span className="tabular-nums">- {formatINR(loyaltyDiscountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold text-[#332821] pt-3 border-t border-[#B18A4A]/25">
              <span>{t.checkout.payableTotal}</span>
              <span className="tabular-nums text-[#651D2D]">{formatINR(totalAmount)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={placingOrder || !user}
            className="w-full py-3.5 px-5 bg-[#651D2D] text-[#F5EFE4] text-sm font-semibold rounded-md hover:bg-[#4F1522] disabled:opacity-50 transition-colors inline-flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>
              {placingOrder
                ? t.checkout.submittingOrder
                : paymentMethod === 'COD'
                ? t.checkout.placeCod
                : `${t.checkout.confirmTestModePrefix} (${paymentMethod} ${t.checkout.confirmTestModeSuffix})`}
            </span>
          </button>

          <div className="text-xs text-[#6A5A4E] space-y-1.5 pt-1">
            <p className="flex items-center gap-2">
              <Truck className="w-3.5 h-3.5 text-[#651D2D]" />
              <span>{storeSettings.estimatedDeliveryWindow}</span>
            </p>
            <p className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#651D2D]" />
              <span>{t.checkout.inspectedTaggedNote}</span>
            </p>
          </div>
        </aside>
      </form>
    </main>
  );
}
