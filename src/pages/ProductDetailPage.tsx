import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Check, Heart, MessageCircle, Minus, Plus, ShieldCheck, ShoppingBag, Star, Truck } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { ProductReviewsSection } from '../components/ProductReviewsSection';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../contexts/StoreContext';
import { formatINR } from '../data/demoData';
import { WHATSAPP_COPY, buildProductMessage, buildWhatsAppUrl } from '../lib/whatsapp';

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { products, reviews, addToCart, showToast, storeSettings } = useStore();
  const { wishlistIds, toggleWishlist } = useAuth();
  const {
    lang,
    t,
    localizeCategoryName,
    localizeColor,
    localizeAvailability,
    localizeProductTitle,
    localizeProductDescription,
  } = useLanguage();

  const product = products.find((p) => p.slug === slug) || products[0];
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  const displayTitle = product
    ? localizeProductTitle(product.productCode, product.title)
    : '';
  const displayDesc = product
    ? localizeProductDescription(product.productCode, product.description)
    : '';

  useEffect(() => {
    if (product) {
      setActiveImageIdx(0);
      setSelectedColor(product.colorOptions[0] || 'Classic');
      setQuantity(1);
      document.title = `${displayTitle} (${product.productCode}) | SIRIMAGGA`;
    }
  }, [product, displayTitle]);

  if (!product) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-serif-display text-3xl text-[#332821]">
          {t.product.sareeNotFound}
        </h1>
        <Link
          to="/shop"
          className="inline-block px-5 py-2.5 bg-[#651D2D] text-[#F5EFE4] rounded-md text-sm font-medium"
        >
          {t.product.returnCatalogue}
        </Link>
      </main>
    );
  }

  const isWishlisted = wishlistIds.includes(product.id);
  const approvedProductReviews = reviews.filter(
    (r) =>
      r.status === 'approved' &&
      (r.productId === product.id ||
        (!r.productId && r.sareePurchased?.toLowerCase() === product.title.toLowerCase()))
  );
  const avgRating =
    approvedProductReviews.length > 0
      ? Number(
          (
            approvedProductReviews.reduce((sum, r) => sum + r.rating, 0) /
            approvedProductReviews.length
          ).toFixed(1)
        )
      : 0;

  const related = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.sareeType === product.sareeType))
    .slice(0, 4);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    sku: product.productCode,
    description: product.description,
    brand: { '@type': 'Brand', name: 'SIRIMAGGA' },
    ...(approvedProductReviews.length > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: avgRating,
            reviewCount: approvedProductReviews.length,
          },
        }
      : {}),
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: product.sellingPrice,
      availability:
        product.availabilityStatus === 'Out of Stock'
          ? 'https://schema.org/OutOfStock'
          : 'https://schema.org/InStock',
    },
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-[#6A5A4E] mb-6 flex items-center gap-2 flex-wrap">
        <Link to="/" className="hover:text-[#651D2D]">
          {t.product.homeCrumb}
        </Link>
        <span aria-hidden="true">/</span>
        <Link to="/shop" className="hover:text-[#651D2D]">
          {t.product.shopAllCrumb}
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-[#332821] font-medium truncate">{displayTitle}</span>
      </nav>

      {/* Main Contiguous Purchase Module */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Gallery Left */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-[4/3] rounded-lg overflow-hidden bg-[#EFE7D6] border border-[#B18A4A]/30">
            <img
              src={product.images[activeImageIdx] || product.images[0]}
              alt={`${displayTitle} view ${activeImageIdx + 1}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {product.images.map((imgUrl, idx) => (
                <button
                  key={`${imgUrl}-${idx}`}
                  type="button"
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-24 aspect-[4/3] rounded-md overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIdx === idx
                      ? 'border-[#651D2D]'
                      : 'border-[#B18A4A]/25 opacity-75 hover:opacity-100'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${displayTitle} thumbnail ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sticky Purchase Details Right */}
        <div className="lg:col-span-5 bg-[#FAF6EE] border border-[#B18A4A]/35 rounded-lg p-6 sm:p-8 space-y-6 lg:sticky lg:top-24">
          <div>
            <div className="flex items-center flex-wrap gap-2 text-xs text-[#6A5A4E] mb-2">
              <span>{localizeCategoryName(product.category)}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-code text-[#332821]">{product.productCode}</span>
              {product.isDemo && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{t.product.demoProduct}</span>
                </>
              )}
            </div>

            <h1 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#332821] leading-snug">
              {displayTitle}
            </h1>

            {approvedProductReviews.length > 0 ? (
              <a
                href="#customer-reviews"
                className="inline-flex items-center gap-2 text-xs text-[#332821] hover:text-[#651D2D] mt-2"
              >
                <span className="inline-flex items-center gap-1 text-[#B18A4A] font-semibold tabular-nums">
                  <Star className="w-3.5 h-3.5 fill-[#B18A4A] text-[#B18A4A]" />
                  {avgRating.toFixed(1)}
                </span>
                <span aria-hidden="true" className="text-[#B18A4A]">·</span>
                <span className="underline decoration-[#B18A4A]/60 underline-offset-2 tabular-nums">
                  {approvedProductReviews.length}{' '}
                  {approvedProductReviews.length === 1
                    ? t.product.patronReviewSingular
                    : t.product.patronReviewPlural}
                </span>
              </a>
            ) : (
              <a
                href="#customer-reviews"
                className="inline-block text-xs text-[#6A5A4E] hover:text-[#651D2D] underline decoration-[#B18A4A]/50 underline-offset-2 mt-2"
              >
                {t.product.beFirstReview}
              </a>
            )}

            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-2xl font-bold text-[#651D2D] tabular-nums">
                {formatINR(product.sellingPrice)}
              </span>
              {product.originalPrice && product.originalPrice > product.sellingPrice && (
                <>
                  <span className="text-base text-[#6A5A4E] line-through tabular-nums">
                    {formatINR(product.originalPrice)}
                  </span>
                  {product.discountPercent ? (
                    <span className="text-sm font-semibold text-[#651D2D] tabular-nums">
                      ({product.discountPercent}% off)
                    </span>
                  ) : null}
                </>
              )}
            </div>
            <p className="text-xs text-[#6A5A4E] mt-1">{t.product.inclusiveTaxes}</p>
          </div>

          <p className="text-sm text-[#332821]/90 leading-relaxed">{displayDesc}</p>

          {/* Colour Selector */}
          <div>
            <p className="text-xs font-semibold text-[#332821] mb-2">
              {t.product.colourLabel}{' '}
              <span className="text-[#651D2D]">{localizeColor(selectedColor)}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {product.colorOptions.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelectedColor(c)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-md border transition-colors ${
                    selectedColor === c
                      ? 'bg-[#651D2D] text-[#F5EFE4] border-[#651D2D]'
                      : 'bg-white text-[#332821] border-[#B18A4A]/40 hover:border-[#651D2D]'
                  }`}
                >
                  {localizeColor(c)}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Availability */}
          <div className="flex items-center justify-between gap-4 pt-1">
            <div>
              <p className="text-xs font-semibold text-[#332821] mb-1.5">
                {t.product.quantityLabel}
              </p>
              <div className="inline-flex items-center border border-[#B18A4A]/45 rounded-md bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="p-2.5 text-[#332821] hover:text-[#651D2D]"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-sm font-semibold tabular-nums">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  aria-label="Increase quantity"
                  className="p-2.5 text-[#332821] hover:text-[#651D2D]"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs text-[#6A5A4E]">{t.product.availabilityLabel}</p>
              <p className="text-sm font-semibold text-[#332821] inline-flex items-center gap-1.5 mt-0.5">
                <Check className="w-4 h-4 text-[#651D2D]" />
                {localizeAvailability(product.availabilityStatus)}
              </p>
            </div>
          </div>

          {/* Primary Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              <button
                type="button"
                disabled={product.availabilityStatus === 'Out of Stock'}
                onClick={() => addToCart(product, selectedColor, quantity, true)}
                className="flex-1 py-3 px-5 bg-[#651D2D] text-[#F5EFE4] text-sm font-semibold rounded-md hover:bg-[#4F1522] disabled:opacity-50 transition-colors inline-flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {product.availabilityStatus === 'Out of Stock'
                    ? t.product.soldOut
                    : t.product.addToCart}
                </span>
              </button>

              <button
                type="button"
                onClick={async () => {
                  const added = await toggleWishlist(product.id);
                  showToast(added ? t.product.savedWishlist : t.product.removedWishlist, 'info');
                }}
                aria-label="Toggle wishlist"
                className={`px-4 py-3 rounded-md border transition-colors ${
                  isWishlisted
                    ? 'bg-[#651D2D] text-[#F5EFE4] border-[#651D2D]'
                    : 'bg-white text-[#332821] border-[#B18A4A]/45 hover:border-[#651D2D]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            <button
              type="button"
              disabled={product.availabilityStatus === 'Out of Stock'}
              onClick={() => {
                addToCart(product, selectedColor, quantity, false);
                navigate('/checkout');
              }}
              className="w-full py-3 px-5 border border-[#651D2D] text-[#651D2D] text-sm font-semibold rounded-md hover:bg-[#651D2D]/5 disabled:opacity-50 transition-colors"
            >
              {t.product.buyNow}
            </button>

            <a
              href={buildWhatsAppUrl(
                buildProductMessage({
                  lang,
                  title: displayTitle,
                  productCode: product.productCode,
                  color: localizeColor(selectedColor),
                  priceFormatted: formatINR(product.sellingPrice),
                  url: typeof window !== 'undefined' ? window.location.href : undefined,
                })
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-5 border border-[#1B5E3A] bg-[#1B5E3A]/5 text-[#1B5E3A] text-sm font-semibold rounded-md hover:bg-[#1B5E3A] hover:text-[#F5EFE4] transition-colors inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>{WHATSAPP_COPY[lang].askProductBtn}</span>
            </a>
          </div>

          {/* Product Specifications */}
          <div className="pt-4 border-t border-[#B18A4A]/25 space-y-3 text-sm">
            <div className="grid grid-cols-3 gap-2">
              <span className="text-[#6A5A4E]">{t.product.fabricLabel}</span>
              <span className="col-span-2 text-[#332821] font-medium">{product.fabricInfo}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-[#6A5A4E]">{t.product.lengthLabel}</span>
              <span className="col-span-2 text-[#332821] font-medium">{product.sareeLength}</span>
            </div>
            {product.blousePieceInfo && (
              <div className="grid grid-cols-3 gap-2">
                <span className="text-[#6A5A4E]">{t.product.blouseLabel}</span>
                <span className="col-span-2 text-[#332821] font-medium">
                  {product.blousePieceInfo}
                </span>
              </div>
            )}
            <div className="grid grid-cols-3 gap-2">
              <span className="text-[#6A5A4E]">{t.product.careLabel}</span>
              <span className="col-span-2 text-[#332821]">{product.careInstructions}</span>
            </div>
          </div>

          {/* Delivery & Packaging Promise */}
          <div className="bg-white border border-[#B18A4A]/25 rounded-md p-4 space-y-2.5 text-xs text-[#332821]">
            <div className="flex items-start gap-2.5">
              <Truck className="w-4 h-4 text-[#651D2D] shrink-0 mt-0.5" />
              <span>
                <strong>{t.product.howWhenTitle}</strong>{' '}
                {product.estimatedDispatchDays || storeSettings.estimatedDeliveryWindow}.{' '}
                {t.product.freeShippingAbove} {formatINR(storeSettings.freeShippingThreshold)}.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#651D2D] shrink-0 mt-0.5" />
              <span>
                {t.product.packagingPromise}{' '}
                <Link to="/about#unboxing-card" className="text-[#651D2D] font-medium hover:underline">
                  {t.product.previewUnboxing}
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews & Submission */}
      <ProductReviewsSection product={product} />

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-16 pt-12 border-t border-[#B18A4A]/25">
          <h2 className="font-serif-display text-2xl font-semibold text-[#332821] mb-6">
            {t.product.relatedTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
