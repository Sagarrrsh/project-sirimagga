import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { ArrowRight, MessageCircle, Minus, Plus, ShoppingBag, Tag, Trash2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../contexts/StoreContext';
import { DEMO_DISCOUNTS, formatINR } from '../data/demoData';
import { db } from '../lib/firebase';
import { WHATSAPP_COPY, buildCartMessage, buildWhatsAppUrl } from '../lib/whatsapp';
import type { Discount } from '../types';

export function CartPage() {
  const {
    cart,
    cartSubtotal,
    updateCartQuantity,
    removeFromCart,
    storeSettings,
    showToast,
  } = useStore();
  const { lang, t, localizeProductTitle, localizeColor } = useLanguage();
  const navigate = useNavigate();

  const [couponInput, setCouponInput] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<Discount | null>(null);
  const [applyingCoupon, setApplyingCoupon] = useState(false);

  useEffect(() => {
    document.title = `${t.cart.bagTitle} | SIRIMAGGA`;
  }, [t.cart.bagTitle]);

  const shippingCharge =
    cartSubtotal === 0 || cartSubtotal >= storeSettings.freeShippingThreshold
      ? 0
      : storeSettings.standardShippingFee;

  const discountAmount = appliedDiscount
    ? appliedDiscount.discountType === 'percentage'
      ? Math.round((cartSubtotal * appliedDiscount.value) / 100)
      : Math.min(cartSubtotal, appliedDiscount.value)
    : 0;

  const finalTotal = Math.max(0, cartSubtotal + shippingCharge - discountAmount);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    setApplyingCoupon(true);
    try {
      let found: Discount | null = null;
      try {
        const snap = await getDoc(doc(db, 'discounts', code));
        if (snap.exists()) {
          found = { id: snap.id, ...snap.data() } as Discount;
        }
      } catch {
        // Fallback to demo discounts if not seeded yet
      }
      if (!found) {
        found = DEMO_DISCOUNTS.find((d) => d.code === code) || null;
      }

      if (!found || !found.isActive) {
        showToast(t.cart.invalidDiscount, 'error');
        return;
      }
      if (cartSubtotal < found.minOrderAmount) {
        showToast(
          `${t.cart.minOrderRequired} (${formatINR(found.minOrderAmount)} — ${found.code})`,
          'error'
        );
        return;
      }
      setAppliedDiscount(found);
      showToast(`${t.cart.appliedSuccess}: ${found.code}`);
    } finally {
      setApplyingCoupon(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="border-b border-[#B18A4A]/30 pb-5 mb-8">
        <h1 className="font-serif-display text-3xl font-semibold text-[#332821]">
          {t.cart.bagTitle}
        </h1>
      </div>

      {cart.length === 0 ? (
        <div className="bg-[#FAF6EE] border border-[#B18A4A]/30 rounded-lg p-14 text-center space-y-4">
          <ShoppingBag className="w-12 h-12 text-[#B18A4A] mx-auto" />
          <h2 className="font-serif-display text-2xl text-[#332821]">{t.cart.emptyTitle}</h2>
          <p className="text-sm text-[#6A5A4E] max-w-md mx-auto">{t.cart.emptySub}</p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#651D2D] text-[#F5EFE4] text-sm font-medium rounded-md hover:bg-[#4F1522] transition-colors"
          >
            <span>{t.cart.continueShopping}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => {
              const displayTitle = localizeProductTitle(item.productCode, item.title);
              return (
                <div
                  key={`${item.productId}-${item.color}`}
                  className="bg-[#FAF6EE] border border-[#B18A4A]/30 rounded-lg p-4 sm:p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center"
                >
                  <Link
                    to={`/product/${item.slug}`}
                    className="w-28 aspect-[4/3] rounded-md overflow-hidden bg-[#EFE7D6] shrink-0 border border-[#B18A4A]/25"
                  >
                    <img
                      src={item.image}
                      alt={displayTitle}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="flex-1 min-w-0 space-y-1">
                    <Link
                      to={`/product/${item.slug}`}
                      className="font-serif-display text-lg font-semibold text-[#332821] hover:text-[#651D2D]"
                    >
                      {displayTitle}
                    </Link>
                    <p className="text-xs text-[#6A5A4E]">
                      {t.cart.colourLabel}: {localizeColor(item.color)} · {t.cart.codeLabel}:{' '}
                      <span className="font-mono-code">{item.productCode}</span>
                    </p>
                    <p className="text-sm font-medium text-[#651D2D] tabular-nums">
                      {formatINR(item.unitPrice)} {t.cart.eachLabel}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-center">
                    <div className="inline-flex items-center border border-[#B18A4A]/45 rounded-md bg-white">
                      <button
                        type="button"
                        onClick={() =>
                          updateCartQuantity(item.productId, item.color, item.quantity - 1)
                        }
                        aria-label="Decrease quantity"
                        className="p-2 text-[#332821] hover:text-[#651D2D]"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-sm font-semibold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateCartQuantity(item.productId, item.color, item.quantity + 1)
                        }
                        aria-label="Increase quantity"
                        className="p-2 text-[#332821] hover:text-[#651D2D]"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right min-w-[84px]">
                      <p className="text-base font-semibold text-[#332821] tabular-nums">
                        {formatINR(item.unitPrice * item.quantity)}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.productId, item.color)}
                      aria-label={`Remove ${displayTitle}`}
                      className="p-2 text-[#6A5A4E] hover:text-[#651D2D]"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="pt-2">
              <Link
                to="/shop"
                className="text-sm font-medium text-[#651D2D] hover:underline"
              >
                ← {t.cart.continueShopping}
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <aside className="lg:col-span-4 bg-[#FAF6EE] border border-[#B18A4A]/35 rounded-lg p-6 space-y-5">
            <h2 className="font-serif-display text-xl font-semibold text-[#332821]">
              {t.cart.orderSummary}
            </h2>

            {/* Discount Code */}
            <form onSubmit={handleApplyCoupon} className="space-y-2">
              <label className="block text-xs font-medium text-[#332821]">
                {t.cart.discountCodeLabel} ({t.cart.tryDemo}:{' '}
                <span className="font-mono-code">SIRI10</span>)
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-[#6A5A4E] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder={t.cart.enterCode}
                    className="w-full pl-8 pr-3 py-2 bg-white border border-[#B18A4A]/40 rounded-md text-sm font-mono-code uppercase focus:outline-none focus:border-[#651D2D]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={applyingCoupon}
                  className="px-4 py-2 border border-[#651D2D] text-[#651D2D] text-xs font-semibold rounded-md hover:bg-[#651D2D] hover:text-[#F5EFE4] transition-colors"
                >
                  {t.cart.apply}
                </button>
              </div>
              {appliedDiscount && (
                <div className="flex items-center justify-between text-xs text-[#651D2D] pt-1">
                  <span>
                    {t.cart.appliedPrefix}: {appliedDiscount.code}
                  </span>
                  <button
                    type="button"
                    onClick={() => setAppliedDiscount(null)}
                    className="underline"
                  >
                    {t.cart.remove}
                  </button>
                </div>
              )}
            </form>

            <div className="space-y-2.5 text-sm pt-3 border-t border-[#B18A4A]/25">
              <div className="flex justify-between text-[#6A5A4E]">
                <span>{t.cart.subtotal}</span>
                <span className="tabular-nums text-[#332821] font-medium">
                  {formatINR(cartSubtotal)}
                </span>
              </div>
              <div className="flex justify-between text-[#6A5A4E]">
                <span>{t.cart.shipping}</span>
                <span className="tabular-nums text-[#332821]">
                  {shippingCharge === 0 ? t.cart.complimentary : formatINR(shippingCharge)}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#651D2D]">
                  <span>
                    {t.cart.discountLabel} ({appliedDiscount?.code})
                  </span>
                  <span className="tabular-nums">- {formatINR(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-[#332821] pt-3 border-t border-[#B18A4A]/25">
                <span>{t.cart.total}</span>
                <span className="tabular-nums text-[#651D2D]">{formatINR(finalTotal)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate('/checkout', {
                  state: { appliedDiscount },
                })
              }
              className="w-full py-3 px-5 bg-[#651D2D] text-[#F5EFE4] text-sm font-semibold rounded-md hover:bg-[#4F1522] transition-colors"
            >
              {t.cart.proceedCheckout}
            </button>

            <a
              href={buildWhatsAppUrl(
                buildCartMessage({
                  lang,
                  itemsSummary: cart
                    .map(
                      (i) =>
                        `• ${localizeProductTitle(i.productCode, i.title)} (${i.productCode}, ${localizeColor(i.color)}) × ${i.quantity}`
                    )
                    .join('\n'),
                  totalFormatted: formatINR(finalTotal),
                })
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 border border-[#1B5E3A] text-[#1B5E3A] text-xs font-semibold rounded-md hover:bg-[#1B5E3A] hover:text-[#F5EFE4] transition-colors inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>{WHATSAPP_COPY[lang].cartInquiryBtn}</span>
            </a>
          </aside>
        </div>
      )}
    </main>
  );
}
