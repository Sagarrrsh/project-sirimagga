import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Globe,
  Heart,
  Menu,
  MessageCircle,
  Package,
  Search,
  ShoppingBag,
  Sparkles,
  User,
  X,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../contexts/StoreContext';
import { formatINR } from '../data/demoData';
import { LANGUAGE_OPTIONS, TRANSLATIONS, type Language } from '../i18n/translations';
import {
  WHATSAPP_COPY,
  buildGeneralMessage,
  buildOrderMessage,
  buildVipDropMessage,
  buildWhatsAppUrl,
} from '../lib/whatsapp';
import { BrandMark } from './BrandMark';

const LANGUAGE_SUBLABELS: Record<Language, string> = {
  en: 'Default Storefront',
  hi: 'Hindi',
  kn: 'Kannada',
};

export function Navbar() {
  const { cartCount, setCartDrawerOpen, showToast, storeSettings } = useStore();
  const { user, isAdmin, wishlistIds } = useAuth();
  const { lang, setLang, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerSection, setDrawerSection] = useState<'language' | 'whatsapp' | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const waCopy = WHATSAPP_COPY[lang];
  const tickerPhrases = waCopy.tickerItems(
    t.nav.announcement,
    formatINR(storeSettings.freeShippingThreshold)
  );

  const navLinks = [
    { label: t.nav.home, to: '/' },
    { label: t.nav.shopAll, to: '/shop' },
    { label: t.nav.ilkalSarees, to: '/collection/ilkal-sarees' },
    { label: t.nav.banahattiSarees, to: '/collection/banahatti-cotton-sarees' },
    { label: t.nav.cottonSarees, to: '/collection/traditional-cotton-sarees' },
    { label: t.nav.silkSarees, to: '/collection/silk-sarees' },
    { label: t.nav.newArrivals, to: '/shop?filter=new' },
    { label: t.nav.aboutUs, to: '/about' },
    { label: t.nav.trackOrder, to: '/track-order' },
  ];

  const activeLangOption =
    LANGUAGE_OPTIONS.find((opt) => opt.code === lang) || LANGUAGE_OPTIONS[0];

  const whatsappDrawerOptions = [
    {
      title: waCopy.optBrowseTitle,
      subtitle: waCopy.optBrowseSub,
      icon: MessageCircle,
      href: buildWhatsAppUrl(buildGeneralMessage(lang)),
    },
    {
      title: waCopy.optVipTitle,
      subtitle: waCopy.optVipSub,
      icon: Sparkles,
      href: buildWhatsAppUrl(buildVipDropMessage(lang)),
    },
    {
      title: waCopy.optOrderTitle,
      subtitle: waCopy.optOrderSub,
      icon: Package,
      href: buildWhatsAppUrl(buildOrderMessage({ lang })),
    },
  ];

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.search]);

  const handleSelectLanguage = (nextLang: Language) => {
    if (nextLang !== lang) {
      setLang(nextLang);
      showToast(TRANSLATIONS[nextLang].nav.languageChangedToast, 'info');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    setSearchOpen(false);
    navigate(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop');
  };

  const toggleDrawerSection = (section: 'language' | 'whatsapp') => {
    setDrawerSection((prev) => (prev === section ? null : section));
  };

  return (
    <>
      {/* Top Continuous Slowly-Moving Announcement Bar (Clean & Uncluttered) */}
      <div className="bg-[#651D2D] text-[#F5EFE4] py-2 text-xs sm:text-[13px] tracking-wide">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 overflow-hidden marquee-container relative">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#651D2D] to-transparent z-10"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#651D2D] to-transparent z-10"
            aria-hidden="true"
          />
          <div className="animate-marquee-slow">
            {[0, 1].map((dupIdx) => (
              <div
                key={dupIdx}
                aria-hidden={dupIdx === 1}
                className="flex items-center gap-7 pr-7 shrink-0 whitespace-nowrap"
              >
                {tickerPhrases.map((phrase, idx) => (
                  <span key={`${dupIdx}-${idx}`} className="inline-flex items-center gap-7">
                    <span>{phrase}</span>
                    <span className="text-[#B18A4A]" aria-hidden="true">
                      ✦
                    </span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle woven border accent strip */}
      <div className="h-[3px] w-full heritage-border-strip" aria-hidden="true" />

      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#F5EFE4]/95 backdrop-blur-sm border-b border-[#B18A4A]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3">
            {/* Hamburger Menu Trigger + Brand */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="p-2 -ml-2 text-[#332821] hover:text-[#651D2D] hover:bg-[#EFE7D6]/70 focus-visible:outline-2 focus-visible:outline-[#651D2D] rounded-md transition-colors"
                aria-label="Open navigation and preferences menu"
                aria-expanded={menuOpen}
              >
                <Menu className="w-5 h-5" />
              </button>
              <Link to="/" aria-label="SIRIMAGGA Home">
                <BrandMark />
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav
              aria-label="Main navigation"
              className="hidden lg:flex items-center gap-3.5 xl:gap-5 overflow-x-auto"
            >
              {navLinks.map((item) => {
                const isActive =
                  item.to === '/'
                    ? location.pathname === '/'
                    : location.pathname + location.search === item.to ||
                      (item.to !== '/shop?filter=new' &&
                        item.to !== '/' &&
                        location.pathname === item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`text-[13px] font-medium whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors ${
                      isActive
                        ? 'text-[#651D2D] border-[#651D2D]'
                        : 'text-[#332821] border-transparent hover:text-[#651D2D] hover:border-[#B18A4A]'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Clean Right Utility Icons */}
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              {isAdmin && (
                <Link
                  to="/admin"
                  className="hidden sm:inline-flex items-center px-2.5 py-1 text-xs font-medium text-[#651D2D] border border-[#651D2D]/35 rounded-md hover:bg-[#651D2D] hover:text-[#F5EFE4] transition-colors whitespace-nowrap shrink-0 mr-1"
                >
                  {t.nav.admin}
                </Link>
              )}

              <button
                type="button"
                onClick={() => setSearchOpen((prev) => !prev)}
                className="p-2 text-[#332821] hover:text-[#651D2D] transition-colors rounded-md focus-visible:outline-2 focus-visible:outline-[#651D2D]"
                aria-label={t.nav.searchButton}
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                to="/account"
                className="p-2 text-[#332821] hover:text-[#651D2D] transition-colors rounded-md focus-visible:outline-2 focus-visible:outline-[#651D2D] relative"
                aria-label={user ? t.nav.myAccountOrders : 'Sign in or create account'}
              >
                <User className="w-5 h-5" />
              </Link>

              <Link
                to="/account?tab=wishlist"
                className="p-2 text-[#332821] hover:text-[#651D2D] transition-colors rounded-md focus-visible:outline-2 focus-visible:outline-[#651D2D] relative"
                aria-label={`Wishlist (${wishlistIds.length})`}
              >
                <Heart className="w-5 h-5" />
                {wishlistIds.length > 0 && (
                  <span className="absolute top-1 right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-[#B18A4A] text-white text-[10px] font-semibold flex items-center justify-center tabular-nums">
                    {wishlistIds.length}
                  </span>
                )}
              </Link>

              <button
                type="button"
                onClick={() => setCartDrawerOpen(true)}
                className="p-2 text-[#332821] hover:text-[#651D2D] transition-colors rounded-md focus-visible:outline-2 focus-visible:outline-[#651D2D] relative"
                aria-label={`Shopping bag (${cartCount})`}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-[#651D2D] text-[#F5EFE4] text-[10px] font-semibold flex items-center justify-center tabular-nums">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Expandable Search Bar */}
          {searchOpen && (
            <form
              onSubmit={handleSearchSubmit}
              className="pb-3 pt-1 flex items-center gap-2 border-t border-[#B18A4A]/20"
            >
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#6A5A4E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.nav.searchPlaceholder}
                  autoFocus
                  className="w-full pl-10 pr-4 py-2 bg-white border border-[#B18A4A]/40 rounded-md text-sm text-[#332821] placeholder:text-[#6A5A4E] focus:outline-none focus:border-[#651D2D]"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#651D2D] text-[#F5EFE4] text-sm font-medium rounded-md hover:bg-[#4F1522] transition-colors whitespace-nowrap shrink-0"
              >
                {t.nav.searchButton}
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-2 text-[#6A5A4E] hover:text-[#332821]"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </header>

      {/* Slide-Out Heritage Hamburger Drawer (Mobile & Desktop) */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true" aria-label="SIRIMAGGA Menu">
          <div
            className="fixed inset-0 bg-[#332821]/45 backdrop-blur-[2px]"
            onClick={() => setMenuOpen(false)}
          />
          <aside className="relative w-88 max-w-[88vw] bg-[#F5EFE4] h-full shadow-2xl flex flex-col border-r border-[#B18A4A]/40">
            <div className="h-[3px] w-full heritage-border-strip shrink-0" aria-hidden="true" />

            <div className="flex items-center justify-between px-5 py-4 border-b border-[#B18A4A]/25 bg-[#FAF6EE]">
              <BrandMark />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="p-2 -mr-1 text-[#332821] hover:text-[#651D2D] rounded-md transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {/* Primary Navigation */}
              <nav aria-label="Drawer navigation" className="px-5 py-4">
                <ul className="divide-y divide-[#B18A4A]/15">
                  {navLinks.map((item) => {
                    const isActive =
                      item.to === '/'
                        ? location.pathname === '/'
                        : location.pathname + location.search === item.to ||
                          (item.to !== '/shop?filter=new' &&
                            item.to !== '/' &&
                            location.pathname === item.to);
                    return (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          onClick={() => setMenuOpen(false)}
                          className={`flex items-center justify-between py-2.5 px-2 text-[15px] transition-colors ${
                            isActive
                              ? 'text-[#651D2D] font-semibold'
                              : 'text-[#332821] font-medium hover:text-[#651D2D]'
                          }`}
                        >
                          <span>{item.label}</span>
                          {isActive && (
                            <span className="text-[#B18A4A] text-xs" aria-hidden="true">
                              ✦
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                  <li>
                    <Link
                      to="/account"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between py-2.5 px-2 text-[15px] font-medium text-[#332821] hover:text-[#651D2D] transition-colors"
                    >
                      <span>{t.nav.myAccountOrders}</span>
                    </Link>
                  </li>
                  {isAdmin && (
                    <li>
                      <Link
                        to="/admin"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center justify-between py-2.5 px-2 text-[15px] font-semibold text-[#651D2D]"
                      >
                        <span>{t.nav.adminDashboard}</span>
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>

              {/* Editorial Language & WhatsApp Concierge Accordions */}
              <div className="px-5 pb-5 pt-2 space-y-2.5 border-t border-[#B18A4A]/25 bg-[#FAF6EE]/70">
                {/* 1. Language Accordion Option */}
                <div className="rounded-md border border-[#B18A4A]/35 bg-white/85 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleDrawerSection('language')}
                    aria-expanded={drawerSection === 'language'}
                    className="w-full px-3.5 py-3 flex items-center justify-between gap-3 text-left hover:bg-[#FAF6EE] transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-8 h-8 rounded border border-[#B18A4A]/40 bg-[#FAF6EE] flex items-center justify-center text-[#651D2D] shrink-0">
                        <Globe className="w-4 h-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[#332821] leading-tight">
                          {t.nav.languageLabel}
                        </p>
                        <p className="text-[11px] text-[#651D2D] font-medium mt-0.5">
                          {activeLangOption.nativeLabel}
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-[#6A5A4E] shrink-0 transition-transform duration-200 ${
                        drawerSection === 'language' ? 'rotate-180 text-[#651D2D]' : ''
                      }`}
                    />
                  </button>

                  {drawerSection === 'language' && (
                    <div
                      role="radiogroup"
                      aria-label={t.nav.languageLabel}
                      className="border-t border-[#B18A4A]/20 divide-y divide-[#B18A4A]/15 bg-[#FAF6EE]/60"
                    >
                      {LANGUAGE_OPTIONS.map((opt) => {
                        const active = opt.code === lang;
                        return (
                          <button
                            key={opt.code}
                            type="button"
                            role="radio"
                            aria-checked={active}
                            onClick={() => handleSelectLanguage(opt.code)}
                            className={`w-full px-4 py-2.5 flex items-center justify-between text-left transition-colors ${
                              active
                                ? 'bg-[#651D2D]/[0.07] text-[#651D2D]'
                                : 'text-[#332821] hover:bg-white'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span
                                className={`w-2 h-2 rounded-full border ${
                                  active
                                    ? 'bg-[#651D2D] border-[#651D2D]'
                                    : 'border-[#B18A4A] bg-transparent'
                                }`}
                              />
                              <span className={`text-sm ${active ? 'font-semibold' : 'font-medium'}`}>
                                {opt.nativeLabel}
                              </span>
                              <span className="text-[11px] text-[#6A5A4E]">
                                · {LANGUAGE_SUBLABELS[opt.code]}
                              </span>
                            </div>
                            {active && <Check className="w-4 h-4 text-[#651D2D] shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 2. WhatsApp Concierge Accordion Option */}
                <div className="rounded-md border border-[#B18A4A]/35 bg-white/85 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleDrawerSection('whatsapp')}
                    aria-expanded={drawerSection === 'whatsapp'}
                    className="w-full px-3.5 py-3 flex items-center justify-between gap-3 text-left hover:bg-[#FAF6EE] transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-8 h-8 rounded border border-[#1B5E3A]/30 bg-[#1B5E3A]/10 flex items-center justify-center text-[#1B5E3A] shrink-0">
                        <MessageCircle className="w-4 h-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[#332821] leading-tight">
                          {t.footer.whatsappConcierge}
                        </p>
                        <p className="text-[11px] text-[#6A5A4E] mt-0.5 truncate">
                          {waCopy.widgetTitle}
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-[#6A5A4E] shrink-0 transition-transform duration-200 ${
                        drawerSection === 'whatsapp' ? 'rotate-180 text-[#1B5E3A]' : ''
                      }`}
                    />
                  </button>

                  {drawerSection === 'whatsapp' && (
                    <div className="border-t border-[#B18A4A]/20 divide-y divide-[#B18A4A]/15 bg-[#FAF6EE]/60">
                      <p className="px-4 py-2 text-[11px] text-[#6A5A4E]">
                        {waCopy.widgetSubtitle}
                      </p>
                      {whatsappDrawerOptions.map((item) => {
                        const Icon = item.icon;
                        return (
                          <a
                            key={item.title}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setMenuOpen(false)}
                            className="flex items-start gap-3 px-4 py-2.5 hover:bg-white transition-colors group"
                          >
                            <Icon className="w-4 h-4 text-[#1B5E3A] shrink-0 mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-[#332821] group-hover:text-[#1B5E3A] flex items-center justify-between gap-1">
                                <span>{item.title}</span>
                                <ArrowUpRight className="w-3.5 h-3.5 shrink-0 opacity-70" />
                              </p>
                              <p className="text-[11px] text-[#6A5A4E] mt-0.5 leading-snug">
                                {item.subtitle}
                              </p>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="px-5 py-3.5 border-t border-[#B18A4A]/25 bg-[#FAF6EE] text-[11px] text-[#6A5A4E] flex items-center gap-2">
              <span className="text-[#B18A4A]" aria-hidden="true">
                ✦
              </span>
              <span>{t.nav.mobileFooter}</span>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
