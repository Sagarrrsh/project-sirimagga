import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Compass, Globe, PackageCheck, ShieldCheck, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const MILESTONE_ASSETS: Record<
  string,
  { icon: typeof Compass; image?: string; imageAlt?: string }
> = {
  'heritage-roots': { icon: Compass },
  'humble-desk': { icon: Sparkles },
  'quality-seal': { icon: ShieldCheck },
  'signature-box': {
    icon: PackageCheck,
    image: '/assets/aistudio/IMG_0741.JPG_818da4da.jpeg',
    imageAlt:
      'SIRIMAGGA kraft keepsake box wrapped with crimson-gold yarn beside the enclosed company story and care cards',
  },
  'online-boutique': {
    icon: Globe,
    image: '/assets/aistudio/IMG_0746.JPG__1__b99ff44a.jpeg',
    imageAlt:
      'Curated maroon, ochre, and ivory SIRIMAGGA sarees styled beside raw cotton bolls and a wooden shuttle',
  },
};

export function OurJourneySection() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const milestones = t.journey.milestones;
  const [focusedStep, setFocusedStep] = useState<string>(
    milestones[0]?.id || 'heritage-roots'
  );

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 75%'],
  });

  const spineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const handleJumpTo = (id: string) => {
    setFocusedStep(id);
    const el = document.getElementById(`journey-step-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth', block: 'center' });
    }
  };

  return (
    <section
      id="our-journey"
      className="py-16 lg:py-20 linen-editorial-surface border-y border-[#B18A4A]/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#B18A4A]/30 pb-6">
          <div className="space-y-2.5 max-w-2xl">
            <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#651D2D]">
              {t.journey.kicker}
            </p>
            <h2 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#332821] text-balance">
              {t.journey.title}
            </h2>
          </div>

          <p className="text-sm text-[#6A5A4E] max-w-md leading-relaxed">
            {t.journey.subtitle}
          </p>
        </div>

        {/* Interactive Era Jump Strip */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5"
          aria-label="Jump to brand journey milestone"
        >
          {milestones.map((item) => {
            const active = focusedStep === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleJumpTo(item.id)}
                className={`text-left px-3.5 py-2.5 rounded-md border transition-colors ${
                  active
                    ? 'bg-[#651D2D] text-[#F5EFE4] border-[#651D2D]'
                    : 'bg-white text-[#332821] border-[#B18A4A]/30 hover:border-[#651D2D]'
                }`}
              >
                <span
                  className={`block font-mono-code text-[11px] font-semibold tabular-nums ${
                    active ? 'text-[#B18A4A]' : 'text-[#651D2D]'
                  }`}
                >
                  {item.step} · {item.timeframe}
                </span>
                <span className="block text-xs font-medium mt-0.5 truncate">{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Animated Vertical Timeline */}
        <div ref={containerRef} className="relative pl-8 lg:pl-0">
          {/* Base Neutral Spine Line */}
          <div
            className="absolute left-3.5 lg:left-1/2 lg:-translate-x-px top-2 bottom-2 w-[2px] bg-[#B18A4A]/25"
            aria-hidden="true"
          />

          {/* Scroll-Animated Deep Maroon & Gold Progress Spine */}
          <motion.div
            aria-hidden="true"
            style={
              shouldReduceMotion
                ? undefined
                : { scaleY: spineScaleY, transformOrigin: 'top' }
            }
            className="absolute left-3.5 lg:left-1/2 lg:-translate-x-px top-2 bottom-2 w-[2px] bg-[#651D2D]"
          />

          <div className="space-y-10 lg:space-y-12">
            {milestones.map((milestone, idx) => {
              const asset = MILESTONE_ASSETS[milestone.id] || { icon: Compass };
              const Icon = asset.icon;
              const isLeft = idx % 2 === 0;
              const isSelected = focusedStep === milestone.id;

              return (
                <motion.article
                  key={milestone.id}
                  id={`journey-step-${milestone.id}`}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 20 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.45,
                    delay: shouldReduceMotion ? 0 : 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onViewportEnter={() => setFocusedStep(milestone.id)}
                  className="relative grid grid-cols-1 lg:grid-cols-12 items-start"
                >
                  {/* Diamond Timeline Node */}
                  <div
                    aria-hidden="true"
                    className={`absolute -left-[25px] lg:left-1/2 lg:-translate-x-1/2 top-6 w-4 h-4 rotate-45 border-2 transition-colors ${
                      isSelected
                        ? 'bg-[#651D2D] border-[#B18A4A]'
                        : 'bg-[#FAF6EE] border-[#651D2D]'
                    }`}
                  />

                  {/* Spacer / Date Counterweight on Desktop */}
                  <div
                    className={`hidden lg:flex flex-col justify-center pt-5 ${
                      isLeft
                        ? 'lg:col-start-7 lg:col-span-5 lg:pl-10 items-start text-left lg:order-2'
                        : 'lg:col-start-2 lg:col-span-5 lg:pr-10 items-end text-right lg:order-1'
                    }`}
                  >
                    <p className="font-mono-code text-xs font-semibold text-[#651D2D] tabular-nums">
                      {t.journey.stagePrefix} {milestone.step} · {milestone.timeframe}
                    </p>
                    <p className="text-xs text-[#6A5A4E] mt-1">{milestone.location}</p>
                  </div>

                  {/* Milestone Card */}
                  <div
                    className={`${
                      isLeft
                        ? 'lg:col-start-1 lg:col-span-6 lg:pr-10 lg:order-1'
                        : 'lg:col-start-7 lg:col-span-6 lg:pl-10 lg:order-2'
                    }`}
                  >
                    <div
                      onClick={() => setFocusedStep(milestone.id)}
                      className={`bg-white rounded-lg border transition-colors p-6 space-y-4 ${
                        isSelected
                          ? 'border-[#651D2D]/50 shadow-sm'
                          : 'border-[#B18A4A]/35 hover:border-[#651D2D]/40'
                      }`}
                    >
                      {/* Unboxed Metadata Row */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#6A5A4E]">
                          <span className="font-mono-code font-semibold text-[#651D2D] tabular-nums">
                            {milestone.step} · {milestone.timeframe}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{milestone.location}</span>
                        </div>
                        <Icon className="w-4 h-4 text-[#B18A4A] shrink-0" />
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="font-serif-display text-xl font-semibold text-[#332821]">
                          {milestone.title}
                        </h3>
                        <p className="text-xs font-medium text-[#651D2D]">
                          {milestone.subtitle}
                        </p>
                      </div>

                      <p className="text-sm text-[#332821]/85 leading-relaxed">
                        {milestone.description}
                      </p>

                      {asset.image && (
                        <div className="rounded-md overflow-hidden border border-[#B18A4A]/25 bg-[#EFE7D6] aspect-[16/9]">
                          <img
                            src={asset.image}
                            alt={asset.imageAlt || milestone.title}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <div className="pt-3 border-t border-[#B18A4A]/20 text-xs text-[#6A5A4E]">
                        <span className="font-semibold text-[#332821]">
                          {t.journey.milestoneLabel}
                        </span>{' '}
                        {milestone.highlight}
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* Journey Footer CTA */}
        <div className="bg-[#FAF6EE] border border-[#B18A4A]/35 rounded-lg p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-serif-display text-lg font-semibold text-[#332821]">
              {t.journey.footerTitle}
            </h3>
            <p className="text-xs sm:text-sm text-[#6A5A4E]">{t.journey.footerSub}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#651D2D] text-[#F5EFE4] text-xs font-semibold rounded-md hover:bg-[#4F1522] transition-colors whitespace-nowrap"
            >
              <span>{t.journey.browseSarees}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/track-order"
              className="px-5 py-2.5 border border-[#651D2D] text-[#651D2D] text-xs font-semibold rounded-md hover:bg-[#651D2D]/5 transition-colors whitespace-nowrap"
            >
              {t.journey.trackOrder}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
