import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { POLICY_TRANSLATIONS } from '../i18n/catalogTranslations';

export function PolicyPage({ forcedType }: { forcedType?: string }) {
  const { type } = useParams<{ type?: string }>();
  const { lang, t } = useLanguage();
  const key = forcedType || type || 'shipping';
  const langPolicies = POLICY_TRANSLATIONS[lang] || POLICY_TRANSLATIONS.en;
  const policy = langPolicies[key] || langPolicies.shipping;

  useEffect(() => {
    document.title = `${policy.title} | SIRIMAGGA`;
  }, [policy.title]);

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <header className="border-b border-[#B18A4A]/30 pb-4">
        <p className="text-xs uppercase tracking-[0.14em] text-[#651D2D] font-medium">
          SIRIMAGGA · {t.footer.customerCare}
        </p>
        <h1 className="font-serif-display text-3xl font-semibold text-[#332821] mt-1">
          {policy.title}
        </h1>
      </header>

      <div className="space-y-6">
        {policy.sections.map((sec) => (
          <section
            key={sec.heading}
            className="bg-[#FAF6EE] border border-[#B18A4A]/25 rounded-lg p-6 space-y-2"
          >
            <h2 className="font-serif-display text-lg font-semibold text-[#332821]">
              {sec.heading}
            </h2>
            <p className="text-sm text-[#332821]/85 leading-relaxed">{sec.body}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
