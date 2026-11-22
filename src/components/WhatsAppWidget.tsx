import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUpRight, MessageCircle, Package, Sparkles, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  WHATSAPP_COPY,
  buildGeneralMessage,
  buildOrderMessage,
  buildVipDropMessage,
  buildWhatsAppUrl,
} from '../lib/whatsapp';

export function WhatsAppWidget() {
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const copy = WHATSAPP_COPY[lang];

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  if (pathname.startsWith('/admin')) {
    return null;
  }

  const quickActions = [
    {
      title: copy.optBrowseTitle,
      subtitle: copy.optBrowseSub,
      icon: MessageCircle,
      href: buildWhatsAppUrl(buildGeneralMessage(lang)),
    },
    {
      title: copy.optVipTitle,
      subtitle: copy.optVipSub,
      icon: Sparkles,
      href: buildWhatsAppUrl(buildVipDropMessage(lang)),
    },
    {
      title: copy.optOrderTitle,
      subtitle: copy.optOrderSub,
      icon: Package,
      href: buildWhatsAppUrl(buildOrderMessage({ lang })),
    },
  ];

  return (
    <div ref={containerRef} className="fixed bottom-5 left-5 z-40">
      {open && (
        <div
          role="dialog"
          aria-label={copy.widgetTitle}
          className="mb-3 w-80 max-w-[calc(100vw-2.5rem)] bg-[#FAF6EE] border border-[#B18A4A]/60 rounded-lg shadow-2xl overflow-hidden"
        >
          <div className="bg-[#651D2D] text-[#F5EFE4] px-4 py-3.5 flex items-start justify-between gap-2 border-b border-[#B18A4A]/40">
            <div>
              <p className="font-serif-display text-base font-semibold">{copy.widgetTitle}</p>
              <p className="text-[11px] text-[#F5EFE4]/80 mt-0.5">{copy.widgetSubtitle}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close WhatsApp concierge"
              className="p-1 text-[#F5EFE4]/80 hover:text-white rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 space-y-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <a
                  key={action.title}
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-start gap-3 p-3 bg-white border border-[#B18A4A]/30 rounded-md hover:border-[#1B5E3A] hover:bg-[#1B5E3A]/[0.04] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-md bg-[#1B5E3A]/10 text-[#1B5E3A] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#332821] group-hover:text-[#1B5E3A] flex items-center justify-between gap-1">
                      <span>{action.title}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 shrink-0 opacity-70" />
                    </p>
                    <p className="text-[11px] text-[#6A5A4E] mt-0.5 leading-snug">
                      {action.subtitle}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={copy.widgetAria}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-[#1B5E3A] text-[#F5EFE4] border border-[#B18A4A]/70 shadow-lg hover:bg-[#14472B] transition-colors text-xs sm:text-sm font-medium"
      >
        <MessageCircle className="w-4 h-4 shrink-0" />
        <span>{copy.navChipLabel}</span>
      </button>
    </div>
  );
}
