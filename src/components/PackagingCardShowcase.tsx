import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, FileText, PackageCheck, RotateCw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function PackagingCardShowcase() {
  const { t } = useLanguage();
  const [cardSide, setCardSide] = useState<'front' | 'back'>('front');

  return (
    <section
      id="unboxing-card"
      className="py-16 lg:py-20 bg-[#FAF6EE] border-y border-[#B18A4A]/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Editorial Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#B18A4A]/25 pb-6">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#651D2D]">
              {t.packaging.kicker}
            </p>
            <h2 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#332821] text-balance">
              {t.packaging.title}
            </h2>
          </div>
          <p className="text-sm text-[#6A5A4E] max-w-md">{t.packaging.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left: Actual Packaging Box & Cards Photography */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
            <div className="rounded-lg overflow-hidden border border-[#B18A4A]/40 bg-[#EFE7D6] aspect-[16/10]">
              <img
                src="/assets/aistudio/IMG_0741.JPG_818da4da.jpeg"
                alt="SIRIMAGGA kraft gift box tied with crimson and gold yarn beside the enclosed company story card and wash care guide"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <div className="bg-white border border-[#B18A4A]/25 rounded-md p-4 space-y-1.5">
                <p className="font-mono-code text-[11px] text-[#651D2D] font-semibold">
                  {t.packaging.boxStep}
                </p>
                <h3 className="font-serif-display text-sm font-semibold text-[#332821]">
                  {t.packaging.boxTitle}
                </h3>
                <p className="text-xs text-[#6A5A4E] leading-relaxed">{t.packaging.boxDesc}</p>
              </div>

              <div className="bg-white border border-[#B18A4A]/25 rounded-md p-4 space-y-1.5">
                <p className="font-mono-code text-[11px] text-[#651D2D] font-semibold">
                  {t.packaging.tieStep}
                </p>
                <h3 className="font-serif-display text-sm font-semibold text-[#332821]">
                  {t.packaging.tieTitle}
                </h3>
                <p className="text-xs text-[#6A5A4E] leading-relaxed">{t.packaging.tieDesc}</p>
              </div>

              <div className="bg-white border border-[#B18A4A]/25 rounded-md p-4 space-y-1.5">
                <p className="font-mono-code text-[11px] text-[#651D2D] font-semibold">
                  {t.packaging.cardStep}
                </p>
                <h3 className="font-serif-display text-sm font-semibold text-[#332821]">
                  {t.packaging.cardTitle}
                </h3>
                <p className="text-xs text-[#6A5A4E] leading-relaxed">{t.packaging.cardDesc}</p>
              </div>
            </div>
          </div>

          {/* Right: Interactive Front/Back Enclosed Company Card Preview */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-[#EFE7D6]/60 border border-[#B18A4A]/35 rounded-lg p-6 sm:p-8 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-medium text-[#332821]">
                <FileText className="w-4 h-4 text-[#651D2D]" />
                <span>{t.packaging.previewLabel}</span>
              </div>

              <div
                role="tablist"
                aria-label="Company insert card side"
                className="inline-flex p-1 bg-white border border-[#B18A4A]/30 rounded-md"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={cardSide === 'front'}
                  onClick={() => setCardSide('front')}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                    cardSide === 'front'
                      ? 'bg-[#651D2D] text-[#F5EFE4]'
                      : 'text-[#332821] hover:text-[#651D2D]'
                  }`}
                >
                  {t.packaging.frontTab}
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={cardSide === 'back'}
                  onClick={() => setCardSide('back')}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                    cardSide === 'back'
                      ? 'bg-[#651D2D] text-[#F5EFE4]'
                      : 'text-[#332821] hover:text-[#651D2D]'
                  }`}
                >
                  {t.packaging.backTab}
                </button>
              </div>
            </div>

            {/* Tactile Printed Card Specimen */}
            <div className="flex-1 bg-[#FAF6EE] archival-card-frame rounded-md p-6 sm:p-8 flex flex-col justify-between min-h-[340px]">
              {cardSide === 'front' ? (
                <div className="space-y-5 my-auto">
                  <div className="flex flex-col items-center text-center space-y-3 pb-4 border-b border-[#B18A4A]/25">
                    <div className="w-48 sm:w-56 h-20 rounded overflow-hidden bg-[#FAF6EE]">
                      <img
                        src="/assets/aistudio/IMG_0740.JPG_c59c9d58.jpeg"
                        alt="SIRIMAGGA woven M wordmark in English and Kannada"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-[#651D2D] font-semibold">
                      {t.packaging.cardHeader}
                    </p>
                  </div>

                  <div className="space-y-3 text-sm text-[#332821] leading-relaxed text-center max-w-md mx-auto">
                    <p className="font-serif-display text-lg font-semibold text-[#332821]">
                      {t.packaging.cardQuote}
                    </p>
                    <p className="text-[13px] text-[#6A5A4E]">{t.packaging.cardP1}</p>
                    <p className="text-[13px] text-[#6A5A4E]">{t.packaging.cardP2}</p>
                  </div>

                  <div className="pt-3 border-t border-[#B18A4A]/20 flex items-center justify-between text-[11px] text-[#6A5A4E]">
                    <span>{t.packaging.cardCurated}</span>
                    <span className="font-mono-code text-[#332821]">SIRIMAGGA.IN</span>
                    <span>ಸಿರಿಮಗ್ಗ</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-5 my-auto">
                  <div className="flex items-center justify-between gap-4 pb-3 border-b border-[#B18A4A]/25">
                    <div className="flex items-center gap-3">
                      <img
                        src="/assets/aistudio/image_22b36c68.png"
                        alt="SIRIMAGGA Shuttle Emblem"
                        referrerPolicy="no-referrer"
                        className="w-16 h-11 object-contain rounded bg-[#FAF6EE]"
                      />
                      <div>
                        <h3 className="font-serif-display text-base font-semibold text-[#332821]">
                          {t.packaging.backTitle}
                        </h3>
                        <p className="text-[11px] text-[#6A5A4E]">{t.packaging.backSub}</p>
                      </div>
                    </div>
                    <PackageCheck className="w-5 h-5 text-[#651D2D] shrink-0" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-2">
                      <p className="font-semibold text-[#651D2D] uppercase tracking-wider text-[11px]">
                        {t.packaging.inspectionMarkTitle}
                      </p>
                      <ul className="space-y-1.5 text-[#332821]">
                        {t.packaging.inspectionSteps.map((step) => (
                          <li key={step} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#651D2D] shrink-0 mt-0.5" />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2 sm:border-l sm:border-[#B18A4A]/20 sm:pl-4">
                      <p className="font-semibold text-[#651D2D] uppercase tracking-wider text-[11px]">
                        {t.packaging.careTitle}
                      </p>
                      <ul className="space-y-1.5 text-[#6A5A4E]">
                        {t.packaging.careSteps.map((care) => (
                          <li key={care}>{care}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#B18A4A]/20 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="text-[#6A5A4E]">{t.packaging.liveUpdatesNote}</span>
                    <Link
                      to="/track-order"
                      className="inline-flex items-center gap-1 font-semibold text-[#651D2D] hover:underline"
                    >
                      <span>{t.packaging.trackParcel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-[#6A5A4E]">
              <button
                type="button"
                onClick={() => setCardSide((s) => (s === 'front' ? 'back' : 'front'))}
                className="inline-flex items-center gap-1.5 font-medium text-[#651D2D] hover:underline"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>
                  {t.packaging.turnCard} (
                  {cardSide === 'front' ? t.packaging.viewBack : t.packaging.viewFront})
                </span>
              </button>
              <span>{t.packaging.complimentaryNote}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
