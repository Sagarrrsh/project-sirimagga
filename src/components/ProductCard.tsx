import { Link } from 'react-router-dom';
import { Eye, Heart, ShoppingBag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../contexts/StoreContext';
import { formatINR } from '../data/demoData';
import type { Product } from '../types';

const COLOR_HEX_MAP: Record<string, string> = {
  'Deep Maroon': '#651D2D',
  'Crimson Red': '#9B2226',
  'Temple Gold': '#B18A4A',
  'Antique Gold': '#B18A4A',
  'Ivory Cream': '#EFE7D6',
  'Mustard Ochre': '#C48A2C',
  'Royal Plum': '#4B1D3F',
  'Indigo Blue': '#1E3A5F',
  'Midnight Navy': '#16263B',
  'Rust Copper': '#9A4A2E',
  'Warm Sand': '#D7C7AE',
  'Slate Blue': '#415A77',
};

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, setQuickViewProduct, showToast } = useStore();
  const { wishlistIds, toggleWishlist } = useAuth();
  const { t, localizeCategoryName, localizeColor, localizeProductTitle } = useLanguage();
  const isWishlisted = wishlistIds.includes(product.id);

  const displayTitle = localizeProductTitle(product.productCode, product.title);
  const displayCategory = localizeCategoryName(product.category);

  const handleWishlist = async () => {
    const added = await toggleWishlist(product.id);
    showToast(added ? t.product.savedWishlist : t.product.removedWishlist, 'info');
  };

  return (
    <article className="group bg-[#FAF6EE] border border-[#B18A4A]/25 rounded-lg overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      {/* Image Frame */}
      <div className="relative aspect-[4/3] bg-[#EFE7D6] overflow-hidden">
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          {product.images[0] ? (
            <img
              src={product.images[0]}
              alt={`${displayTitle} – ${displayCategory}`}
              referrerPolicy="no-referrer"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#F5EFE4] to-[#E6D9C3] text-[#651D2D] text-sm font-serif-display p-4 text-center">
              {displayTitle}
            </div>
          )}
        </Link>

        {/* Action Overlay Buttons (Wishlist & Quick View) */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            type="button"
            onClick={handleWishlist}
            aria-label={isWishlisted ? t.product.removedWishlist : t.product.savedWishlist}
            className={`w-9 h-9 rounded-full flex items-center justify-center border transition-colors ${
              isWishlisted
                ? 'bg-[#651D2D] text-[#F5EFE4] border-[#651D2D]'
                : 'bg-white/95 text-[#332821] border-[#B18A4A]/30 hover:text-[#651D2D]'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
          <button
            type="button"
            onClick={() => setQuickViewProduct(product)}
            aria-label={`Quick view ${displayTitle}`}
            className="w-9 h-9 rounded-full bg-white/95 text-[#332821] border border-[#B18A4A]/30 hover:text-[#651D2D] flex items-center justify-center transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3">
        <div>
          {/* Unboxed clean metadata line */}
          <div className="flex items-center flex-wrap gap-1.5 text-xs text-[#6A5A4E] mb-1.5">
            <span>{displayCategory}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-code">{product.productCode}</span>
            {product.isDemo && (
              <>
                <span aria-hidden="true">·</span>
                <span>{t.product.demoItem}</span>
              </>
            )}
          </div>

          <Link
            to={`/product/${product.slug}`}
            className="block font-serif-display text-base sm:text-[17px] font-semibold text-[#332821] hover:text-[#651D2D] transition-colors leading-snug line-clamp-2"
          >
            {displayTitle}
          </Link>

          {/* Color Options */}
          <div className="flex items-center gap-2 mt-2.5">
            <div className="flex items-center gap-1.5">
              {product.colorOptions.slice(0, 4).map((color) => (
                <span
                  key={color}
                  title={localizeColor(color)}
                  className="w-3.5 h-3.5 rounded-full border border-[#332821]/25 shrink-0"
                  style={{ backgroundColor: COLOR_HEX_MAP[color] || '#B18A4A' }}
                />
              ))}
            </div>
            <span className="text-xs text-[#6A5A4E] truncate">
              {product.colorOptions.map((c) => localizeColor(c)).join(', ')}
            </span>
          </div>
        </div>

        {/* Pricing + Add to Cart */}
        <div className="pt-3 border-t border-[#B18A4A]/20 flex items-center justify-between gap-2">
          <div className="flex items-baseline flex-wrap gap-x-2">
            <span className="text-base font-semibold text-[#332821] tabular-nums">
              {formatINR(product.sellingPrice)}
            </span>
            {product.originalPrice && product.originalPrice > product.sellingPrice && (
              <>
                <span className="text-xs text-[#6A5A4E] line-through tabular-nums">
                  {formatINR(product.originalPrice)}
                </span>
                {product.discountPercent ? (
                  <span className="text-xs font-medium text-[#651D2D] tabular-nums">
                    {product.discountPercent}% off
                  </span>
                ) : null}
              </>
            )}
          </div>

          <button
            type="button"
            disabled={product.availabilityStatus === 'Out of Stock'}
            onClick={() => addToCart(product, product.colorOptions[0], 1, true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-[#651D2D] text-[#F5EFE4] text-xs font-medium hover:bg-[#4F1522] disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>
              {product.availabilityStatus === 'Out of Stock'
                ? t.product.soldOut
                : t.product.addToCart}
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}
