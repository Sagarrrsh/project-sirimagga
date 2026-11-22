import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../contexts/StoreContext';
import { formatINR } from '../data/demoData';
import { WHATSAPP_COPY, buildProductMessage, buildWhatsAppUrl } from '../lib/whatsapp';

export function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useStore();
  const {
    lang,
    t,
    localizeCategoryName,
    localizeColor,
    localizeProductTitle,
    localizeProductDescription,
  } = useLanguage();
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedColor(quickViewProduct.colorOptions[0] || 'Classic');
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const displayTitle = localizeProductTitle(
    quickViewProduct.productCode,
    quickViewProduct.title
  );
  const displayDesc = localizeProductDescription(
    quickViewProduct.productCode,
    quickViewProduct.description
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#332821]/50 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
    >
      <div className="bg-[#FAF6EE] border border-[#B18A4A]/40 rounded-lg max-w-3xl w-full overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2 relative">
        <button
          type="button"
          onClick={() => setQuickViewProduct(null)}
          aria-label="Close quick view"
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 text-[#332821] hover:text-[#651D2D] flex items-center justify-center border border-[#B18A4A]/30"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="aspect-[4/3] md:aspect-auto md:h-full bg-[#EFE7D6]">
          <img
            src={quickViewProduct.images[0]}
            alt={displayTitle}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 flex flex-col justify-between gap-5">
          <div className="space-y-3">
            <div className="text-xs text-[#6A5A4E] flex items-center gap-2">
              <span>{localizeCategoryName(quickViewProduct.category)}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-code">{quickViewProduct.productCode}</span>
            </div>

            <h2
              id="quick-view-title"
              className="font-serif-display text-2xl font-semibold text-[#332821] leading-snug"
            >
              {displayTitle}
            </h2>

            <div className="flex items-baseline gap-3">
              <span className="text-xl font-semibold text-[#651D2D] tabular-nums">
                {formatINR(quickViewProduct.sellingPrice)}
              </span>
              {quickViewProduct.originalPrice &&
                quickViewProduct.originalPrice > quickViewProduct.sellingPrice && (
                  <span className="text-sm text-[#6A5A4E] line-through tabular-nums">
                    {formatINR(quickViewProduct.originalPrice)}
                  </span>
                )}
            </div>

            <p className="text-sm text-[#332821]/85 leading-relaxed">{displayDesc}</p>

            <div className="text-xs text-[#6A5A4E] space-y-1 pt-1">
              <p>
                <strong className="text-[#332821]">{t.product.quickViewFabric}</strong>{' '}
                {quickViewProduct.fabricInfo}
              </p>
              <p>
                <strong className="text-[#332821]">{t.product.quickViewLength}</strong>{' '}
                {quickViewProduct.sareeLength}
              </p>
            </div>

            <div className="pt-2">
              <p className="text-xs font-medium text-[#332821] mb-2">
                {t.product.quickViewSelectColour}{' '}
                <span className="text-[#651D2D]">{localizeColor(selectedColor)}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {quickViewProduct.colorOptions.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedColor(c)}
                    className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
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
          </div>

          <div className="space-y-2.5 pt-2 border-t border-[#B18A4A]/20">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                disabled={quickViewProduct.availabilityStatus === 'Out of Stock'}
                onClick={() => {
                  addToCart(quickViewProduct, selectedColor, 1, true);
                  setQuickViewProduct(null);
                }}
                className="flex-1 py-2.5 px-4 bg-[#651D2D] text-[#F5EFE4] text-sm font-medium rounded-md hover:bg-[#4F1522] disabled:opacity-50 transition-colors"
              >
                {t.product.quickViewAddToBag}
              </button>
              <Link
                to={`/product/${quickViewProduct.slug}`}
                onClick={() => setQuickViewProduct(null)}
                className="py-2.5 px-4 border border-[#651D2D] text-[#651D2D] text-sm font-medium rounded-md text-center hover:bg-[#651D2D]/5 transition-colors"
              >
                {t.product.quickViewFullDetails}
              </Link>
            </div>
            <a
              href={buildWhatsAppUrl(
                buildProductMessage({
                  lang,
                  title: displayTitle,
                  productCode: quickViewProduct.productCode,
                  color: localizeColor(selectedColor),
                  priceFormatted: formatINR(quickViewProduct.sellingPrice),
                })
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-4 border border-[#1B5E3A] text-[#1B5E3A] text-xs font-semibold rounded-md hover:bg-[#1B5E3A] hover:text-[#F5EFE4] transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{WHATSAPP_COPY[lang].askQuickViewBtn}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
