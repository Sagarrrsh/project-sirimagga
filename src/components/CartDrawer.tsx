import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../contexts/StoreContext';
import { formatINR } from '../data/demoData';

export function CartDrawer() {
  const {
    cart,
    cartSubtotal,
    cartDrawerOpen,
    setCartDrawerOpen,
    updateCartQuantity,
    removeFromCart,
    storeSettings,
  } = useStore();
  const { t, localizeProductTitle, localizeColor } = useLanguage();
  const navigate = useNavigate();

  if (!cartDrawerOpen) return null;

  const shippingFee =
    cartSubtotal === 0 || cartSubtotal >= storeSettings.freeShippingThreshold
      ? 0
      : storeSettings.standardShippingFee;

  const remainingForFreeShipping = Math.max(
    0,
    storeSettings.freeShippingThreshold - cartSubtotal
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-[#332821]/45 backdrop-blur-[2px]"
        onClick={() => setCartDrawerOpen(false)}
      />
      <aside
        className="relative w-full max-w-md bg-[#F5EFE4] h-full shadow-2xl border-l border-[#B18A4A]/40 flex flex-col"
        aria-label={t.cart.drawerTitle}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#B18A4A]/25 bg-[#FAF6EE]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#651D2D]" />
            <h2 className="font-serif-display text-lg font-semibold text-[#332821]">
              {t.cart.drawerTitle}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setCartDrawerOpen(false)}
            className="p-2 text-[#332821] hover:text-[#651D2D]"
            aria-label="Close shopping bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free shipping indicator */}
        {cart.length > 0 && (
          <div className="px-6 py-2.5 bg-[#FAF6EE] border-b border-[#B18A4A]/20 text-xs text-[#332821]">
            {remainingForFreeShipping === 0 ? (
              <span className="font-medium text-[#651D2D]">
                {t.cart.freeShippingUnlocked}
              </span>
            ) : (
              <span>
                {t.cart.addMorePrefix}{' '}
                <strong className="tabular-nums">{formatINR(remainingForFreeShipping)}</strong>{' '}
                {t.cart.addMoreSuffix}
              </span>
            )}
          </div>
        )}

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
              <ShoppingBag className="w-10 h-10 text-[#B18A4A]" />
              <div>
                <p className="font-serif-display text-lg text-[#332821]">{t.cart.emptyTitle}</p>
                <p className="text-sm text-[#6A5A4E] mt-1">{t.cart.emptySub}</p>
              </div>
              <Link
                to="/shop"
                onClick={() => setCartDrawerOpen(false)}
                className="px-5 py-2.5 bg-[#651D2D] text-[#F5EFE4] text-sm font-medium rounded-md hover:bg-[#4F1522] transition-colors"
              >
                {t.cart.browseSarees}
              </Link>
            </div>
          ) : (
            cart.map((item) => {
              const displayTitle = localizeProductTitle(item.productCode, item.title);
              return (
                <div
                  key={`${item.productId}-${item.color}`}
                  className="flex gap-4 pb-4 border-b border-[#B18A4A]/20"
                >
                  <Link
                    to={`/product/${item.slug}`}
                    onClick={() => setCartDrawerOpen(false)}
                    className="w-20 h-20 rounded-md overflow-hidden bg-[#EFE7D6] shrink-0 border border-[#B18A4A]/25"
                  >
                    <img
                      src={item.image}
                      alt={displayTitle}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </Link>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <Link
                        to={`/product/${item.slug}`}
                        onClick={() => setCartDrawerOpen(false)}
                        className="font-serif-display text-sm font-semibold text-[#332821] hover:text-[#651D2D] line-clamp-2"
                      >
                        {displayTitle}
                      </Link>
                      <p className="text-xs text-[#6A5A4E] mt-0.5">
                        {localizeColor(item.color)} ·{' '}
                        <span className="font-mono-code">{item.productCode}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="inline-flex items-center border border-[#B18A4A]/40 rounded-md bg-white">
                        <button
                          type="button"
                          onClick={() =>
                            updateCartQuantity(item.productId, item.color, item.quantity - 1)
                          }
                          aria-label="Decrease quantity"
                          className="p-1.5 text-[#332821] hover:text-[#651D2D]"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-medium tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateCartQuantity(item.productId, item.color, item.quantity + 1)
                          }
                          aria-label="Increase quantity"
                          className="p-1.5 text-[#332821] hover:text-[#651D2D]"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-[#332821] tabular-nums">
                          {formatINR(item.unitPrice * item.quantity)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.productId, item.color)}
                          aria-label={`Remove ${displayTitle}`}
                          className="text-[#6A5A4E] hover:text-[#651D2D]"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className="p-6 bg-[#FAF6EE] border-t border-[#B18A4A]/30 space-y-4">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-[#6A5A4E]">
                <span>{t.cart.subtotal}</span>
                <span className="tabular-nums text-[#332821] font-medium">
                  {formatINR(cartSubtotal)}
                </span>
              </div>
              <div className="flex justify-between text-[#6A5A4E]">
                <span>{t.cart.estimatedShipping}</span>
                <span className="tabular-nums text-[#332821]">
                  {shippingFee === 0 ? t.cart.complimentary : formatINR(shippingFee)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setCartDrawerOpen(false);
                  navigate('/cart');
                }}
                className="py-2.5 px-4 border border-[#651D2D] text-[#651D2D] text-sm font-medium rounded-md hover:bg-[#651D2D]/5 transition-colors"
              >
                {t.cart.viewCart}
              </button>
              <button
                type="button"
                onClick={() => {
                  setCartDrawerOpen(false);
                  navigate('/checkout');
                }}
                className="py-2.5 px-4 bg-[#651D2D] text-[#F5EFE4] text-sm font-medium rounded-md hover:bg-[#4F1522] transition-colors"
              >
                {t.cart.checkout}
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
