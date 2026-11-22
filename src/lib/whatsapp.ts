import type { Language } from '../i18n/translations';

const RAW_WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '919000000000';
export const WHATSAPP_NUMBER = RAW_WHATSAPP_NUMBER.replace(/\D/g, '') || '919000000000';

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

interface WhatsAppCopy {
  navChipLabel: string;
  navChipAria: string;
  widgetAria: string;
  widgetTitle: string;
  widgetSubtitle: string;
  optBrowseTitle: string;
  optBrowseSub: string;
  optVipTitle: string;
  optVipSub: string;
  optOrderTitle: string;
  optOrderSub: string;
  askProductBtn: string;
  askQuickViewBtn: string;
  joinVipDropBtn: string;
  orderHelpBtn: string;
  cartInquiryBtn: string;
  tickerItems: (announcement: string, freeShippingAmount: string) => string[];
}

export const WHATSAPP_COPY: Record<Language, WhatsAppCopy> = {
  en: {
    navChipLabel: 'WhatsApp',
    navChipAria: 'Chat with SIRIMAGGA on WhatsApp',
    widgetAria: 'SIRIMAGGA WhatsApp Concierge',
    widgetTitle: 'SIRIMAGGA WhatsApp Desk',
    widgetSubtitle: 'Bagalkot textile guidance · Mon–Sat, 10 AM–6:30 PM IST',
    optBrowseTitle: 'Saree Styling & Drape Videos',
    optBrowseSub: 'Request close-up pallu/border photos or pairing advice',
    optVipTitle: 'Join Friday 6 PM Loom Drop',
    optVipSub: 'First look at fresh Ilkal & Banahatti weaves on WhatsApp',
    optOrderTitle: 'Order & Dispatch Assistance',
    optOrderSub: 'Check preparation stage, courier, or gift packaging',
    askProductBtn: 'Ask / Request Video on WhatsApp',
    askQuickViewBtn: 'WhatsApp Inquiry',
    joinVipDropBtn: 'Join Friday 6 PM Loom Drop on WhatsApp',
    orderHelpBtn: 'Order Updates & Support on WhatsApp',
    cartInquiryBtn: 'Ask Stylist About This Bag on WhatsApp',
    tickerItems: (announcement, freeShippingAmount) => [
      announcement,
      `Complimentary Pan-India Delivery above ${freeShippingAmount}`,
      'Inspected, Brand-Tagged & Packed in Bagalkot District',
      'Friday 6 PM VIP Loom Drop — Connect via WhatsApp Concierge',
    ],
  },
  hi: {
    navChipLabel: 'व्हाट्सएप',
    navChipAria: 'व्हाट्सएप पर SIRIMAGGA से चैट करें',
    widgetAria: 'SIRIMAGGA व्हाट्सएप सहायता',
    widgetTitle: 'SIRIMAGGA व्हाट्सएप डेस्क',
    widgetSubtitle: 'बागलकोट वस्त्र मार्गदर्शन · सोम–शनि, सुबह 10 – शाम 6:30 IST',
    optBrowseTitle: 'साड़ी स्टाइलिंग और ड्रेप वीडियो',
    optBrowseSub: 'पल्लू/बॉर्डर की नजदीकी तस्वीरें या मैचिंग सलाह पाएं',
    optVipTitle: 'शुक्रवार शाम 6 बजे लूम ड्रॉप से जुड़ें',
    optVipSub: 'व्हाट्सएप पर नई इलकल और बनाहट्टी बुनाई की पहली झलक',
    optOrderTitle: 'ऑर्डर और डिस्पैच सहायता',
    optOrderSub: 'तैयारी, कूरियर या गिफ्ट पैकेजिंग की जानकारी लें',
    askProductBtn: 'व्हाट्सएप पर वीडियो या जानकारी पूछें',
    askQuickViewBtn: 'व्हाट्सएप पूछताछ',
    joinVipDropBtn: 'शुक्रवार शाम 6 बजे VIP लूम ड्रॉप (व्हाट्सएप)',
    orderHelpBtn: 'व्हाट्सएप पर ऑर्डर सहायता पाएं',
    cartInquiryBtn: 'इस बैग के बारे में व्हाट्सएप पर पूछें',
    tickerItems: (announcement, freeShippingAmount) => [
      announcement,
      `${freeShippingAmount} से अधिक के ऑर्डर पर भारत भर में निःशुल्क डिलीवरी`,
      'बागलकोट जिले में गुणवत्ता जांच के बाद ब्रांडेड पैकेजिंग',
      'शुक्रवार शाम 6 बजे VIP लूम ड्रॉप — व्हाट्सएप पर जुड़ें',
    ],
  },
  kn: {
    navChipLabel: 'ವಾಟ್ಸಾಪ್',
    navChipAria: 'ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ SIRIMAGGA ಜೊತೆ ಚಾಟ್ ಮಾಡಿ',
    widgetAria: 'SIRIMAGGA ವಾಟ್ಸಾಪ್ ಸಹಾಯವಾಣಿ',
    widgetTitle: 'SIRIMAGGA ವಾಟ್ಸಾಪ್ ಡೆಸ್ಕ್',
    widgetSubtitle: 'ಬಾಗಲಕೋಟೆ ನೇಯ್ಗೆ ಮಾರ್ಗದರ್ಶನ · ಸೋಮ–ಶನಿ, ಬೆಳಗ್ಗೆ 10 – ಸಂಜೆ 6:30 IST',
    optBrowseTitle: 'ಸೀರೆ ವಿವರ ಮತ್ತು ಡ್ರೇಪ್ ವೀಡಿಯೊ',
    optBrowseSub: 'ಸೆರಗು/ಬಾರ್ಡರ್ ಹತ್ತಿರದ ಫೋಟೋ ಅಥವಾ ಸಲಹೆ ಪಡೆಯಿರಿ',
    optVipTitle: 'ಶುಕ್ರವಾರ ಸಂಜೆ 6 ಗಂಟೆ ಲೂಮ್ ಡ್ರಾಪ್ ಸೇರಿ',
    optVipSub: 'ಹೊಸ ಇಳಕಲ್ ಮತ್ತು ಬನಹಟ್ಟಿ ಸೀರೆಗಳ ಮೊದಲ ನೋಟ ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ',
    optOrderTitle: 'ಆರ್ಡರ್ ಮತ್ತು ರವಾನೆ ಸಹಾಯ',
    optOrderSub: 'ಸಿದ್ಧತೆ ಹಂತ, ಕೊರಿಯರ್ ಅಥವಾ ಗಿಫ್ಟ್ ಪ್ಯಾಕಿಂಗ್ ವಿವರ ಕೇಳಿ',
    askProductBtn: 'ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ವೀಡಿಯೊ ಅಥವಾ ವಿವರ ಕೇಳಿ',
    askQuickViewBtn: 'ವಾಟ್ಸಾಪ್ ವಿಚಾರಣೆ',
    joinVipDropBtn: 'ಶುಕ್ರವಾರ ಸಂಜೆ 6 ಗಂಟೆ VIP ಲೂಮ್ ಡ್ರಾಪ್ (ವಾಟ್ಸಾಪ್)',
    orderHelpBtn: 'ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಆರ್ಡರ್ ಸಹಾಯ ಪಡೆಯಿರಿ',
    cartInquiryBtn: 'ಈ ಬ್ಯಾಗ್ ಬಗ್ಗೆ ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಕೇಳಿ',
    tickerItems: (announcement, freeShippingAmount) => [
      announcement,
      `${freeShippingAmount} ಮೇಲ್ಪಟ್ಟ ಆರ್ಡರ್‌ಗಳಿಗೆ ಭಾರತದಾದ್ಯಂತ ಉಚಿತ ವಿತರಣೆ`,
      'ಬಾಗಲಕೋಟೆ ಜಿಲ್ಲೆಯಲ್ಲಿ ಗುಣಮಟ್ಟ ಪರೀಕ್ಷೆ ಮತ್ತು ಬ್ರ್ಯಾಂಡ್ ಪ್ಯಾಕೇಜಿಂಗ್',
      'ಶುಕ್ರವಾರ ಸಂಜೆ 6 ಗಂಟೆ VIP ಲೂಮ್ ಡ್ರಾಪ್ — ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಸಂಪರ್ಕಿಸಿ',
    ],
  },
};

export function buildGeneralMessage(lang: Language): string {
  if (lang === 'hi') {
    return 'नमस्ते SIRIMAGGA टीम, मुझे आपकी इलकल और बनाहट्टी साड़ियों के बारे में जानकारी चाहिए।';
  }
  if (lang === 'kn') {
    return 'ನಮಸ್ಕಾರ SIRIMAGGA ತಂಡ, ನಿಮ್ಮ ಇಳಕಲ್ ಮತ್ತು ಬನಹಟ್ಟಿ ಸೀರೆಗಳ ಕುರಿತು ಮಾಹಿತಿ ಬೇಕಾಗಿದೆ.';
  }
  return 'Namaste SIRIMAGGA team, I would like guidance on your Ilkal and Banahatti sarees.';
}

export function buildVipDropMessage(lang: Language): string {
  if (lang === 'hi') {
    return 'नमस्ते SIRIMAGGA, कृपया मुझे शुक्रवार शाम 6 बजे VIP लूम ड्रॉप व्हाट्सएप सूची में जोड़ें।';
  }
  if (lang === 'kn') {
    return 'ನಮಸ್ಕಾರ SIRIMAGGA, ದಯವಿಟ್ಟು ನನ್ನನ್ನು ಶುಕ್ರವಾರ ಸಂಜೆ 6 ಗಂಟೆಯ VIP ಲೂಮ್ ಡ್ರಾಪ್ ವಾಟ್ಸಾಪ್ ಪಟ್ಟಿಗೆ ಸೇರಿಸಿ.';
  }
  return 'Namaste SIRIMAGGA, please add me to your Friday 6 PM VIP Loom Drop WhatsApp list for first picks.';
}

export function buildProductMessage(params: {
  lang: Language;
  title: string;
  productCode: string;
  color: string;
  priceFormatted: string;
  url?: string;
}): string {
  const { lang, title, productCode, color, priceFormatted, url } = params;
  const linkSuffix = url ? `\nLink: ${url}` : '';
  if (lang === 'hi') {
    return `नमस्ते SIRIMAGGA, कृपया इस साड़ी के बारे में बताएं:\n• ${title}\n• कोड: ${productCode}\n• रंग: ${color}\n• मूल्य: ${priceFormatted}${linkSuffix}`;
  }
  if (lang === 'kn') {
    return `ನಮಸ್ಕಾರ SIRIMAGGA, ದಯವಿಟ್ಟು ಈ ಸೀರೆಯ ಕುರಿತು ವಿವರ ನೀಡಿ:\n• ${title}\n• ಕೋಡ್: ${productCode}\n• ಬಣ್ಣ: ${color}\n• ಬೆಲೆ: ${priceFormatted}${linkSuffix}`;
  }
  return `Namaste SIRIMAGGA, I am interested in this saree and would love drape photos/availability details:\n• ${title}\n• Code: ${productCode}\n• Colour: ${color}\n• Price: ${priceFormatted}${linkSuffix}`;
}

export function buildCartMessage(params: {
  lang: Language;
  itemsSummary: string;
  totalFormatted: string;
}): string {
  const { lang, itemsSummary, totalFormatted } = params;
  if (lang === 'hi') {
    return `नमस्ते SIRIMAGGA, मेरे शॉपिंग बैग की जानकारी:\n${itemsSummary}\nअनुमानित योग: ${totalFormatted}\nकृपया डिलीवरी और बुनाई से जुड़ी सहायता करें।`;
  }
  if (lang === 'kn') {
    return `ನಮಸ್ಕಾರ SIRIMAGGA, ನನ್ನ ಶಾಪಿಂಗ್ ಬ್ಯಾಗ್ ವಿವರಗಳು:\n${itemsSummary}\nಅಂದಾಜು ಮೊತ್ತ: ${totalFormatted}\nದಯವಿಟ್ಟು ವಿತರಣೆ ಮತ್ತು ಸೀರೆ ಕುರಿತು ಸಹಾಯ ಮಾಡಿ.`;
  }
  return `Namaste SIRIMAGGA, here are the sarees in my bag:\n${itemsSummary}\nSubtotal: ${totalFormatted}\nCould you please assist with styling or dispatch timing?`;
}

export function buildOrderMessage(params: {
  lang: Language;
  orderNumber?: string;
  status?: string;
}): string {
  const { lang, orderNumber, status } = params;
  if (!orderNumber) {
    if (lang === 'hi') {
      return 'नमस्ते SIRIMAGGA, मुझे अपने ऑर्डर की स्थिति और डिलीवरी के बारे में सहायता चाहिए।';
    }
    if (lang === 'kn') {
      return 'ನಮಸ್ಕಾರ SIRIMAGGA, ನನ್ನ ಆರ್ಡರ್ ಸ್ಥಿತಿ ಮತ್ತು ವಿತರಣೆಯ ಕುರಿತು ಸಹಾಯ ಬೇಕಾಗಿದೆ.';
    }
    return 'Namaste SIRIMAGGA, I need assistance with an existing order and dispatch status.';
  }
  const statusLine = status ? ` (${status})` : '';
  if (lang === 'hi') {
    return `नमस्ते SIRIMAGGA, मुझे अपने ऑर्डर ${orderNumber}${statusLine} के बारे में अपडेट/सहायता चाहिए।`;
  }
  if (lang === 'kn') {
    return `ನಮಸ್ಕಾರ SIRIMAGGA, ನನ್ನ ಆರ್ಡರ್ ${orderNumber}${statusLine} ಕುರಿತು ಮಾಹಿತಿ/ಸಹಾಯ ಬೇಕಾಗಿದೆ.`;
  }
  return `Namaste SIRIMAGGA, I would like an update/assistance for Order ${orderNumber}${statusLine}.`;
}
