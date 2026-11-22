import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, MessageCircle, PackageCheck, ShieldCheck, Truck } from 'lucide-react';
import { GrowthAndArrivalSection } from '../components/GrowthAndArrivalSection';
import { OurJourneySection } from '../components/OurJourneySection';
import { PackagingCardShowcase } from '../components/PackagingCardShowcase';
import { ProductCard } from '../components/ProductCard';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../contexts/StoreContext';
import { HERITAGE_IMAGE, HERO_IMAGE } from '../data/demoData';
import { WHATSAPP_COPY, buildVipDropMessage, buildWhatsAppUrl } from '../lib/whatsapp';

const WHY_CHOOSE_ICONS = [ShieldCheck, CheckCircle2, PackageCheck, Truck];

function SectionDiamondHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-10">
      <div className="flex items-center justify-center gap-3 mb-2">
        <span className="h-[1px] w-10 bg-[#B18A4A]/70" aria-hidden="true" />
        <span className="w-2 h-2 rotate-45 border border-[#B18A4A] inline-block" aria-hidden="true" />
        <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#332821] text-balance">
          {title}
        </h2>
        <span className="w-2 h-2 rotate-45 border border-[#B18A4A] inline-block" aria-hidden="true" />
        <span className="h-[1px] w-10 bg-[#B18A4A]/70" aria-hidden="true" />
      </div>
      {subtitle && <p className="text-sm text-[#6A5A4E]">{subtitle}</p>}
    </div>
  );
}

export function HomePage() {
  const { products, categories, reviews, usingDemoCatalog, subscribeNewsletter } = useStore();
  const { lang, t, localizeCategoryName, localizeCategoryDesc } = useLanguage();
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    document.title = 'SIRIMAGGA – Traditional Karnataka Sarees from Bagalkot';
  }, []);

  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 4);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    try {
      await subscribeNewsletter(email);
      setSubscribed(true);
      setEmail('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main>
      {/* C. Hero Banner */}
      <section className="relative bg-[#EFE7D6] border-b border-[#B18A4A]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Hero Photography */}
            <div className="lg:col-span-7 relative rounded-lg overflow-hidden border border-[#B18A4A]/35 bg-[#FAF6EE] min-h-[280px] sm:min-h-[380px]">
              <img
                src={HERO_IMAGE}
                alt="Traditional Karnataka Ilkal, Banahatti cotton, indigo, and ivory sarees arranged on cream silk"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Hero Editorial Copy */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-5 py-2 lg:py-6">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/aistudio/image_22b36c68.png"
                  alt="SIRIMAGGA Uttar Karnataka Handlooms Crest"
                  referrerPolicy="no-referrer"
                  className="w-16 h-11 object-contain rounded border border-[#B18A4A]/35 bg-[#FAF6EE]"
                />
                <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#651D2D]">
                  {t.home.heroKicker}
                </p>
              </div>

              <h1 className="font-serif-display text-3xl sm:text-4xl xl:text-[44px] font-bold text-[#332821] leading-[1.15] text-balance">
                {t.home.heroTitle}
              </h1>

              <p className="text-base text-[#332821]/85 leading-relaxed max-w-lg">
                {t.home.heroSubtitle}
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#651D2D] text-[#F5EFE4] text-sm font-medium rounded-md hover:bg-[#4F1522] transition-colors whitespace-nowrap"
                >
                  <span>{t.home.shopCollection}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/shop?filter=new"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[#651D2D] text-[#651D2D] text-sm font-medium rounded-md hover:bg-[#651D2D]/5 transition-colors whitespace-nowrap"
                >
                  <span>{t.home.exploreNewArrivals}</span>
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#6A5A4E] pt-1">
                <a href="#our-journey" className="text-[#651D2D] font-medium hover:underline">
                  {t.home.jumpJourney}
                </a>
                <span aria-hidden="true">·</span>
                <a href="#unboxing-card" className="text-[#651D2D] font-medium hover:underline">
                  {t.home.jumpBoxCard}
                </a>
                <span aria-hidden="true">·</span>
                <a href="#how-it-arrives" className="text-[#651D2D] font-medium hover:underline">
                  {t.home.jumpDelivery}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* D. Shop by Collection */}
      <section className="py-14 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionDiamondHeading
          title={t.home.shopByCollection}
          subtitle={t.home.shopByCollectionSub}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories
            .filter((c) => c.isActive)
            .slice(0, 6)
            .map((cat) => {
              const displayCatName = localizeCategoryName(cat.name);
              const displayCatDesc = localizeCategoryDesc(cat.slug, cat.description);
              return (
                <Link
                  key={cat.id}
                  to={`/collection/${cat.slug}`}
                  className="group bg-[#FAF6EE] border border-[#B18A4A]/30 rounded-lg overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex flex-col"
                >
                  <div className="aspect-[16/10] bg-[#EFE7D6] overflow-hidden">
                    <img
                      src={cat.image}
                      alt={displayCatName}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-5 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="font-serif-display text-lg font-semibold text-[#332821] group-hover:text-[#651D2D] transition-colors">
                        {displayCatName}
                      </h3>
                      <p className="text-xs text-[#6A5A4E] mt-1 line-clamp-1">
                        {displayCatDesc}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#651D2D] whitespace-nowrap shrink-0">
                      {t.home.shopNow} <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
        </div>
      </section>

      {/* E. Bestselling Products */}
      <section className="py-14 lg:py-16 bg-[#FAF6EE]/70 border-y border-[#B18A4A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#332821]">
                {t.home.bestsellingSarees}
              </h2>
              <p className="text-sm text-[#6A5A4E] mt-1">
                {t.home.bestsellingSub}
                {usingDemoCatalog ? t.home.bestsellingDemoSuffix : ''}.
              </p>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#651D2D] hover:underline whitespace-nowrap"
            >
              <span>{t.home.viewCompleteCatalogue}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* F. Our Heritage Section */}
      <section className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 rounded-lg overflow-hidden border border-[#B18A4A]/30 bg-[#EFE7D6] min-h-[280px]">
            <img
              src={HERITAGE_IMAGE}
              alt="Traditional Karnataka weaving shuttle, natural dyed yarns, and bordered sarees on a teakwood table"
              referrerPolicy="no-referrer"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center space-y-5">
            <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#651D2D]">
              {t.home.ourHeritageKicker}
            </p>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#332821] leading-tight text-balance">
              {t.home.ourHeritageTitle}
            </h2>
            <p className="text-[15px] text-[#332821]/85 leading-relaxed">
              {t.home.ourHeritageP1}
            </p>
            <p className="text-[15px] text-[#332821]/85 leading-relaxed">
              {t.home.ourHeritageP2}
            </p>
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#651D2D] hover:underline"
              >
                <span>{t.home.readStory}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* G. Why Choose SIRIMAGGA? */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#651D2D] text-[#F5EFE4] rounded-t-lg px-6 py-4 text-center">
          <h2 className="font-serif-display text-xl sm:text-2xl font-semibold tracking-wide">
            {t.home.whyChooseTitle}
          </h2>
        </div>
        <div className="bg-white border-x border-b border-[#B18A4A]/35 rounded-b-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#B18A4A]/25">
          {t.home.whyChooseFeatures.map((feat, idx) => {
            const Icon = WHY_CHOOSE_ICONS[idx] || ShieldCheck;
            return (
              <div key={feat.title} className="p-6 space-y-2.5 text-center sm:text-left">
                <Icon className="w-5 h-5 text-[#651D2D] mx-auto sm:mx-0" />
                <h3 className="font-serif-display text-base font-semibold text-[#332821]">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#6A5A4E] leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* G2. Our Journey — Animated Brand Evolution Timeline */}
      <OurJourneySection />

      {/* G3. Signature Packaging & Enclosed Company Card */}
      <PackagingCardShowcase />

      {/* G4. Dispatch Workflow & Pan-India Arrival Schedule */}
      <GrowthAndArrivalSection />

      {/* H. New Arrivals */}
      <section className="py-14 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#332821]">
              {t.home.newArrivalsTitle}
            </h2>
            <p className="text-sm text-[#6A5A4E] mt-1">{t.home.newArrivalsSub}</p>
          </div>
          <Link
            to="/shop?filter=new"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#651D2D] hover:underline whitespace-nowrap"
          >
            <span>{t.home.exploreNewArrivalsBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* I. Customer Testimonials */}
      <section className="py-14 lg:py-16 bg-[#FAF6EE]/80 border-y border-[#B18A4A]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionDiamondHeading
            title={t.home.testimonialsTitle}
            subtitle={t.home.testimonialsSub}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((review) => (
              <blockquote
                key={review.id}
                className="bg-white border border-[#B18A4A]/25 rounded-lg p-6 flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  <div className="text-xs text-[#B18A4A] font-medium flex items-center justify-between">
                    <span>{'★'.repeat(Math.round(review.rating))}</span>
                    {review.isDemo && (
                      <span className="text-[#6A5A4E]">{t.home.demoReviewBadge}</span>
                    )}
                  </div>
                  <p className="text-sm text-[#332821] leading-relaxed">
                    "{review.comment}"
                  </p>
                </div>
                <footer className="pt-3 border-t border-[#B18A4A]/15 text-xs">
                  <p className="font-semibold text-[#332821]">{review.customerName}</p>
                  <p className="text-[#6A5A4E]">
                    {review.city}
                    {review.sareePurchased ? ` · ${review.sareePurchased}` : ''}
                  </p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* J. Newsletter Subscription */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[#FAF6EE] border border-[#B18A4A]/35 rounded-lg px-6 py-10 sm:px-12 space-y-5">
          <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#332821]">
            {t.home.newsletterTitle}
          </h2>
          <p className="text-sm text-[#6A5A4E] max-w-lg mx-auto">
            {t.home.newsletterSub}
          </p>

          {subscribed ? (
            <p className="text-sm font-medium text-[#651D2D]">
              {t.home.newsletterSuccess}
            </p>
          ) : (
            <form
              onSubmit={handleNewsletter}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-md mx-auto pt-1"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.home.newsletterPlaceholder}
                aria-label={t.home.newsletterPlaceholder}
                className="flex-1 px-4 py-2.5 bg-white border border-[#B18A4A]/45 rounded-md text-sm text-[#332821] placeholder:text-[#6A5A4E] focus:outline-none focus:border-[#651D2D]"
              />
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 bg-[#651D2D] text-[#F5EFE4] text-sm font-medium rounded-md hover:bg-[#4F1522] disabled:opacity-60 transition-colors whitespace-nowrap"
              >
                {submitting ? t.home.subscribing : t.home.subscribe}
              </button>
            </form>
          )}

          <div className="pt-2">
            <a
              href={buildWhatsAppUrl(buildVipDropMessage(lang))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#1B5E3A] text-[#F5EFE4] border border-[#B18A4A]/50 text-xs sm:text-sm font-medium hover:bg-[#14472B] transition-colors"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>{WHATSAPP_COPY[lang].joinVipDropBtn}</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
