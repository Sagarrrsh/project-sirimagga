import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { buildGeneralMessage, buildWhatsAppUrl } from '../lib/whatsapp';
import { BrandMark } from './BrandMark';

export function Footer() {
  const { lang, t, localizeCategoryName } = useLanguage();

  return (
    <footer className="bg-[#332821] text-[#F5EFE4] border-t-2 border-[#B18A4A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Introduction */}
          <div className="space-y-4">
            <div className="inline-block bg-[#F5EFE4] px-3 py-2 rounded-md">
              <BrandMark />
            </div>
            <p className="text-sm text-[#F5EFE4]/80 leading-relaxed max-w-xs">
              {t.footer.brandDesc}
            </p>
            <p className="text-xs text-[#B18A4A]">{t.footer.location}</p>
          </div>

          {/* Shop Categories */}
          <div>
            <h3 className="font-serif-display text-base font-semibold text-[#F5EFE4] mb-4">
              {t.footer.shopCategories}
            </h3>
            <ul className="space-y-2.5 text-sm text-[#F5EFE4]/80">
              <li>
                <Link to="/collection/ilkal-sarees" className="hover:text-[#B18A4A] transition-colors">
                  {localizeCategoryName('Ilkal Sarees')}
                </Link>
              </li>
              <li>
                <Link to="/collection/banahatti-cotton-sarees" className="hover:text-[#B18A4A] transition-colors">
                  {localizeCategoryName('Banahatti Cotton Sarees')}
                </Link>
              </li>
              <li>
                <Link to="/collection/traditional-cotton-sarees" className="hover:text-[#B18A4A] transition-colors">
                  {localizeCategoryName('Traditional Cotton Sarees')}
                </Link>
              </li>
              <li>
                <Link to="/collection/silk-sarees" className="hover:text-[#B18A4A] transition-colors">
                  {localizeCategoryName('Silk Sarees')}
                </Link>
              </li>
              <li>
                <Link to="/collection/festive-sarees" className="hover:text-[#B18A4A] transition-colors">
                  {localizeCategoryName('Festive Sarees')}
                </Link>
              </li>
              <li>
                <Link to="/collection/daily-wear-sarees" className="hover:text-[#B18A4A] transition-colors">
                  {localizeCategoryName('Daily Wear Sarees')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div>
            <h3 className="font-serif-display text-base font-semibold text-[#F5EFE4] mb-4">
              {t.footer.customerCare}
            </h3>
            <ul className="space-y-2.5 text-sm text-[#F5EFE4]/80">
              <li>
                <Link to="/track-order" className="hover:text-[#B18A4A] transition-colors">
                  {t.footer.trackOrder}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#B18A4A] transition-colors">
                  {t.footer.aboutUs}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#B18A4A] transition-colors">
                  {t.footer.contactUs}
                </Link>
              </li>
              <li>
                <Link to="/policies/shipping" className="hover:text-[#B18A4A] transition-colors">
                  {t.footer.shippingPolicy}
                </Link>
              </li>
              <li>
                <Link to="/policies/returns" className="hover:text-[#B18A4A] transition-colors">
                  {t.footer.returnPolicy}
                </Link>
              </li>
              <li>
                <Link to="/policies/privacy" className="hover:text-[#B18A4A] transition-colors">
                  {t.footer.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link to="/policies/terms" className="hover:text-[#B18A4A] transition-colors">
                  {t.footer.termsConditions}
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-serif-display text-base font-semibold text-[#F5EFE4] mb-4">
              {t.footer.connectTitle}
            </h3>
            <p className="text-sm text-[#F5EFE4]/80 mb-4 leading-relaxed">
              {t.footer.connectDesc}
            </p>
            <ul className="space-y-2.5 text-sm text-[#F5EFE4]/85">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#B18A4A] transition-colors"
                >
                  Instagram · @sirimagga
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#B18A4A] transition-colors"
                >
                  Facebook · SIRIMAGGA Karnataka
                </a>
              </li>
              <li>
                <a
                  href={buildWhatsAppUrl(buildGeneralMessage(lang))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#B18A4A] transition-colors"
                >
                  {t.footer.whatsappConcierge}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#B18A4A]/25 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F5EFE4]/70">
          <p>© {new Date().getFullYear()} SIRIMAGGA. {t.footer.copyright}</p>
          <div className="flex items-center gap-4">
            <span>{t.footer.demoNote}</span>
            <Link to="/admin" className="text-[#B18A4A] hover:underline whitespace-nowrap">
              {t.footer.adminPortal}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
