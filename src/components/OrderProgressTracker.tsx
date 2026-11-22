import {
  AlertTriangle,
  Check,
  ClipboardCheck,
  Layers,
  PackageCheck,
  ShieldCheck,
  Truck,
  XCircle,
  type LucideIcon,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Language } from '../i18n/translations';
import type { OrderStatus } from '../types';

interface SourcingStage {
  id: 'ordered' | 'procurement' | 'inspection' | 'packaging' | 'dispatched';
  icon: LucideIcon;
  label: Record<Language, string>;
  description: Record<Language, string>;
}

const SOURCING_STAGES: SourcingStage[] = [
  {
    id: 'ordered',
    icon: ClipboardCheck,
    label: {
      en: 'Ordered',
      hi: 'ऑर्डर दर्ज',
      kn: 'ಆರ್ಡರ್ ದಾಖಲು',
    },
    description: {
      en: 'Your order is registered with SIRIMAGGA in Bagalkot.',
      hi: 'आपका ऑर्डर बागलकोट में SIRIMAGGA के पास दर्ज हो चुका है।',
      kn: 'ನಿಮ್ಮ ಆರ್ಡರ್ ಬಾಗಲಕೋಟೆಯ SIRIMAGGA ದಲ್ಲಿ ದಾಖಲಾಗಿದೆ.',
    },
  },
  {
    id: 'procurement',
    icon: Layers,
    label: {
      en: 'Procurement',
      hi: 'साड़ी संकलन',
      kn: 'ಸೀರೆ ಸಂಗ್ರಹಣೆ',
    },
    description: {
      en: 'Confirmed and sourced fresh from our Karnataka weaving cluster.',
      hi: 'कर्नाटक बुनाई क्लस्टर से साड़ी की उपलब्धता पुष्टि व संकलन जारी है।',
      kn: 'ಕರ್ನಾಟಕದ ನೇಯ್ಗೆ ಕೇಂದ್ರದಿಂದ ಸೀರೆಯ ಲಭ್ಯತೆ ಖಚಿತಪಡಿಸಿ ಸಂಗ್ರಹಿಸಲಾಗುತ್ತಿದೆ.',
    },
  },
  {
    id: 'inspection',
    icon: ShieldCheck,
    label: {
      en: 'Inspection',
      hi: 'गुणवत्ता जांच',
      kn: 'ಗುಣಮಟ್ಟ ಪರೀಕ್ಷೆ',
    },
    description: {
      en: 'Every metre, border, pallu, and zari finish is checked by our team.',
      hi: 'बॉर्डर, पल्लू और ज़री फिनिश की बारीक गुणवत्ता जांच की जा रही है।',
      kn: 'ಸೀರೆಯ ಉದ್ದ, ಅಂಚು, ಸೆರಗು ಮತ್ತು ಜರಿ ವಿನ್ಯಾಸವನ್ನು ಸೂಕ್ಷ್ಮವಾಗಿ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ.',
    },
  },
  {
    id: 'packaging',
    icon: PackageCheck,
    label: {
      en: 'Packaging',
      hi: 'ब्रांड पैकेजिंग',
      kn: 'ಬ್ರ್ಯಾಂಡ್ ಪ್ಯಾಕಿಂಗ್',
    },
    description: {
      en: 'Tagged with the SIRIMAGGA seal, Heritage Story Card, and keepsake box.',
      hi: 'SIRIMAGGA ब्रांड टैग, हेरिटेज कार्ड और गिफ्ट बॉक्स में सहेजा जा रहा है।',
      kn: 'SIRIMAGGA ಬ್ರ್ಯಾಂಡ್ ಟ್ಯಾಗ್, ಹೆರಿಟೇಜ್ ಕಾರ್ಡ್ ಮತ್ತು ಗಿಫ್ಟ್ ಬಾಕ್ಸ್‌ನಲ್ಲಿ ಪ್ಯಾಕ್ ಮಾಡಲಾಗುತ್ತಿದೆ.',
    },
  },
  {
    id: 'dispatched',
    icon: Truck,
    label: {
      en: 'Dispatched',
      hi: 'प्रेषित',
      kn: 'ರವಾನಿಸಲಾಗಿದೆ',
    },
    description: {
      en: 'Handed over to our courier partner for safe pan-India delivery.',
      hi: 'संपूर्ण भारत में सुरक्षित डिलीवरी हेतु कूरियर पार्टनर को सौंप दिया गया है।',
      kn: 'ಭಾರತದಾದ್ಯಂತ ಸುರಕ್ಷಿತ ತಲುಪಿಸುವಿಕೆಗಾಗಿ ಕೊರಿಯರ್ ಪಾಲುದಾರರಿಗೆ ನೀಡಲಾಗಿದೆ.',
    },
  },
];

const TRACKER_UI_COPY: Record<
  Language,
  {
    heading: string;
    currentBadge: string;
    completedBadge: string;
    deliveredNote: string;
    cancelledBanner: string;
    unavailableBanner: string;
  }
> = {
  en: {
    heading: 'Saree Sourcing & Fulfillment Progress',
    currentBadge: 'Current Stage',
    completedBadge: 'Delivered',
    deliveredNote: 'Delivered safely to your destination. Thank you for wearing Karnataka heritage.',
    cancelledBanner: 'This order has been cancelled. Payment or refund updates are shown below.',
    unavailableBanner:
      'Sourcing requires your attention for this weave. Our Bagalkot team will contact you with matching alternatives.',
  },
  hi: {
    heading: 'साड़ी संकलन एवं ऑर्डर प्रगति',
    currentBadge: 'वर्तमान चरण',
    completedBadge: 'डिलीवर हो चुका',
    deliveredNote: 'आपकी साड़ी सुरक्षित रूप से डिलीवर हो चुकी है। SIRIMAGGA चुनने के लिए धन्यवाद।',
    cancelledBanner: 'यह ऑर्डर रद्द कर दिया गया है। भुगतान या रिफंड विवरण नीचे देखें।',
    unavailableBanner:
      'इस बुनाई के संकलन हेतु आपकी सहमति आवश्यक है। हमारी बागलकोट टीम विकल्पों के साथ संपर्क करेगी।',
  },
  kn: {
    heading: 'ಸೀರೆ ಸಂಗ್ರಹಣೆ ಮತ್ತು ಆರ್ಡರ್ ಪ್ರಗತಿ',
    currentBadge: 'ಪ್ರಸ್ತುತ ಹಂತ',
    completedBadge: 'ತಲುಪಿಸಲಾಗಿದೆ',
    deliveredNote: 'ನಿಮ್ಮ ಸೀರೆ ಸುರಕ್ಷಿತವಾಗಿ ತಲುಪಿದೆ. ಕರ್ನಾಟಕ ನೇಯ್ಗೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿದ್ದಕ್ಕೆ ಧನ್ಯವಾದಗಳು.',
    cancelledBanner: 'ಈ ಆರ್ಡರ್ ರದ್ದುಗೊಳಿಸಲಾಗಿದೆ. ಪಾವತಿ ಅಥವಾ ಮರುಪಾವತಿ ವಿವರಗಳು ಕೆಳಗಿವೆ.',
    unavailableBanner:
      'ಈ ನೇಯ್ಗೆಯ ಸಂಗ್ರಹಣೆಗೆ ನಿಮ್ಮ ಗಮನ ಅಗತ್ಯವಿದೆ. ಬಾಗಲಕೋಟೆ ತಂಡವು ಪರ್ಯಾಯ ಆಯ್ಕೆಗಳೊಂದಿಗೆ ಸಂಪರ್ಕಿಸಲಿದೆ.',
  },
};

export function mapOrderStatusToStageIndex(status: OrderStatus): number {
  switch (status) {
    case 'Order Placed':
      return 0;
    case 'Confirmed':
      return 1;
    case 'Quality Inspection':
      return 2;
    case 'Packaging in Progress':
      return 3;
    case 'Ready to Dispatch':
    case 'Shipped':
    case 'Delivered':
      return 4;
    default:
      return -1;
  }
}

interface OrderProgressTrackerProps {
  status: OrderStatus;
  className?: string;
}

export function OrderProgressTracker({ status, className = '' }: OrderProgressTrackerProps) {
  const { lang } = useLanguage();
  const copy = TRACKER_UI_COPY[lang];

  const isCancelled = status === 'Cancelled';
  const isUnavailable = status === 'Unavailable - Action Needed';
  const isDelivered = status === 'Delivered';
  const activeIndex = mapOrderStatusToStageIndex(status);

  if (isCancelled || isUnavailable) {
    return (
      <div
        className={`rounded-lg border p-4 sm:p-5 flex items-start gap-3 ${
          isCancelled
            ? 'bg-[#FAF6EE] border-[#B18A4A]/40 text-[#332821]'
            : 'bg-[#FAF6EE] border-[#651D2D]/45 text-[#332821]'
        } ${className}`}
      >
        {isCancelled ? (
          <XCircle className="w-5 h-5 text-[#651D2D] shrink-0 mt-0.5" />
        ) : (
          <AlertTriangle className="w-5 h-5 text-[#651D2D] shrink-0 mt-0.5" />
        )}
        <div className="space-y-1">
          <p className="text-sm font-semibold text-[#651D2D]">{status}</p>
          <p className="text-xs text-[#6A5A4E]">
            {isCancelled ? copy.cancelledBanner : copy.unavailableBanner}
          </p>
        </div>
      </div>
    );
  }

  const safeIndex = activeIndex >= 0 ? activeIndex : 0;
  const progressPercent = (safeIndex / (SOURCING_STAGES.length - 1)) * 100;
  const activeStage = SOURCING_STAGES[safeIndex];
  const ActiveIcon = activeStage.icon;

  return (
    <div
      className={`bg-white border border-[#B18A4A]/35 rounded-lg p-5 sm:p-6 space-y-6 ${className}`}
      aria-label={copy.heading}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-serif-display text-base sm:text-lg font-semibold text-[#332821]">
          {copy.heading}
        </h3>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#651D2D] text-[#F5EFE4] text-[11px] font-semibold tracking-wide">
          {isDelivered ? copy.completedBadge : activeStage.label[lang]}
        </span>
      </div>

      {/* Visual Horizontal Timeline */}
      <div className="overflow-x-auto pb-2 -mx-1 px-1">
        <div className="relative min-w-[540px] sm:min-w-0 pt-2">
          {/* Background Horizontal Rail */}
          <div
            className="absolute top-7 left-[10%] right-[10%] h-[3px] bg-[#B18A4A]/25 rounded-full"
            aria-hidden="true"
          />
          {/* Active Progress Fill Rail */}
          <div
            className="absolute top-7 left-[10%] h-[3px] bg-[#651D2D] rounded-full transition-all duration-500"
            style={{ width: `${progressPercent * 0.8}%` }}
            aria-hidden="true"
          />

          <ol className="relative grid grid-cols-5 gap-2">
            {SOURCING_STAGES.map((stage, index) => {
              const Icon = stage.icon;
              const isCompleted = index < safeIndex || (isDelivered && index === safeIndex);
              const isCurrent = index === safeIndex;

              return (
                <li
                  key={stage.id}
                  aria-current={isCurrent ? 'step' : undefined}
                  className="flex flex-col items-center text-center px-1"
                >
                  <div className="relative flex items-center justify-center">
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                        isCurrent
                          ? 'bg-[#651D2D] border-[#651D2D] text-[#F5EFE4] ring-4 ring-[#651D2D]/20 shadow-md scale-105'
                          : isCompleted
                          ? 'bg-[#FAF6EE] border-[#651D2D] text-[#651D2D]'
                          : 'bg-[#FAF6EE] border-[#B18A4A]/40 text-[#6A5A4E]/75'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    {isCompleted && !isCurrent && (
                      <span
                        className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#B18A4A] text-white flex items-center justify-center border border-white"
                        aria-hidden="true"
                      >
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}
                  </div>

                  <p
                    className={`mt-3 text-xs sm:text-sm leading-tight ${
                      isCurrent
                        ? 'font-bold text-[#651D2D]'
                        : isCompleted
                        ? 'font-semibold text-[#332821]'
                        : 'font-medium text-[#6A5A4E]'
                    }`}
                  >
                    {stage.label[lang]}
                  </p>

                  {isCurrent && (
                    <span className="mt-1 inline-block text-[10px] font-semibold uppercase tracking-wider text-[#651D2D]">
                      {isDelivered ? copy.completedBadge : copy.currentBadge}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* Active Stage Explanation Strip */}
      <div className="bg-[#FAF6EE] border-l-4 border-[#651D2D] rounded-r-md p-3.5 sm:p-4 flex items-start gap-3">
        <ActiveIcon className="w-5 h-5 text-[#651D2D] shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="text-xs sm:text-sm font-semibold text-[#651D2D]">
            {activeStage.label[lang]}
            {isDelivered ? ` · ${copy.completedBadge}` : ''}
          </p>
          <p className="text-xs text-[#6A5A4E] leading-relaxed">
            {isDelivered ? copy.deliveredNote : activeStage.description[lang]}
          </p>
        </div>
      </div>
    </div>
  );
}
