import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GrowthAndArrivalSection } from '../components/GrowthAndArrivalSection';
import { OurJourneySection } from '../components/OurJourneySection';
import { PackagingCardShowcase } from '../components/PackagingCardShowcase';
import { useLanguage } from '../contexts/LanguageContext';
import { HERITAGE_IMAGE } from '../data/demoData';

const ARCHIVE_MEDIA = [
  {
    image: '/assets/aistudio/IMG_0748.JPG_452e0d35.jpeg',
    alt: 'SIRIMAGGA curated textile lookbook showing Ilkal borders, Banahatti cotton, and patron stories',
  },
  {
    image: '/assets/aistudio/IMG_0747.JPG_58a2a976.jpeg',
    alt: 'SIRIMAGGA bilingual Kannada and English heritage seals for Ilkal, Banahatti, Our Weavers, and Care Guide',
  },
  {
    image: '/assets/aistudio/IMG_0750.JPG_f2914aa7.jpeg',
    alt: 'SIRIMAGGA wide heritage campaign banner with wooden shuttle and folded Karnataka sarees',
  },
];

export function AboutPage() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = `${t.footer.aboutUs} | SIRIMAGGA`;
  }, [t.footer.aboutUs]);

  return (
    <main className="pb-16">
      {/* Archival Masthead */}
      <section className="linen-editorial-surface border-b border-[#B18A4A]/30 py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="w-64 sm:w-72 h-24 mx-auto rounded-md overflow-hidden border border-[#B18A4A]/35 bg-[#FAF6EE]">
            <img
              src="/assets/aistudio/IMG_0740.JPG_c59c9d58.jpeg"
              alt="SIRIMAGGA woven wordmark in English and Kannada"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#651D2D]">
            {t.about.kicker}
          </p>
          <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-[42px] font-semibold text-[#332821] text-balance">
            {t.about.title}
          </h1>
          <p className="text-sm sm:text-base text-[#6A5A4E] leading-relaxed max-w-2xl mx-auto">
            {t.about.subtitle}
          </p>
        </div>
      </section>

      {/* Regional Roots & Craft Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 rounded-lg overflow-hidden border border-[#B18A4A]/35 bg-[#EFE7D6] min-h-[280px]">
            <img
              src={HERITAGE_IMAGE}
              alt="Traditional Karnataka textiles and weaving tools in Bagalkot District"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-5 bg-[#FAF6EE] border border-[#B18A4A]/30 rounded-lg p-6 sm:p-8 flex flex-col justify-center space-y-4">
            <h2 className="font-serif-display text-2xl font-semibold text-[#332821]">
              {t.about.heritageTitle}
            </h2>
            <p className="text-sm text-[#332821]/85 leading-relaxed">{t.about.heritageP1}</p>
            <p className="text-sm text-[#332821]/85 leading-relaxed">{t.about.heritageP2}</p>
          </div>
        </div>

        {/* Brand Identity & Editorial Lookbook Strip */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#B18A4A]/25 pb-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#651D2D]">
                {t.about.archiveKicker}
              </p>
              <h2 className="font-serif-display text-2xl font-semibold text-[#332821]">
                {t.about.archiveTitle}
              </h2>
            </div>
            <span className="text-xs text-[#6A5A4E]">{t.about.archiveTag}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ARCHIVE_MEDIA.map((media, idx) => {
              const cardCopy = t.about.cards[idx];
              if (!cardCopy) return null;
              return (
                <article
                  key={media.image}
                  className="bg-[#FAF6EE] border border-[#B18A4A]/30 rounded-lg overflow-hidden flex flex-col"
                >
                  <div className="aspect-[4/3] bg-[#EFE7D6] overflow-hidden">
                    <img
                      src={media.image}
                      alt={media.alt}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 space-y-1">
                    <h3 className="font-serif-display text-base font-semibold text-[#332821]">
                      {cardCopy.title}
                    </h3>
                    <p className="text-xs text-[#6A5A4E]">{cardCopy.desc}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Journey Animated Timeline */}
      <OurJourneySection />

      {/* Keepsake Packaging & Enclosed Company Card */}
      <PackagingCardShowcase />

      {/* How & When Orders Arrive */}
      <GrowthAndArrivalSection />

      {/* Bottom CTA */}
      <div className="max-w-5xl mx-auto px-4 pt-12 text-center flex flex-wrap justify-center gap-4">
        <Link
          to="/shop"
          className="px-6 py-3 bg-[#651D2D] text-[#F5EFE4] text-sm font-medium rounded-md hover:bg-[#4F1522] transition-colors"
        >
          {t.about.ctaExplore}
        </Link>
        <Link
          to="/track-order"
          className="px-6 py-3 border border-[#651D2D] text-[#651D2D] text-sm font-medium rounded-md hover:bg-[#651D2D]/5 transition-colors"
        >
          {t.about.ctaTrack}
        </Link>
      </div>
    </main>
  );
}
