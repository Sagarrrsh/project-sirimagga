import type { Language } from './translations';

const CATEGORY_NAME_MAP: Record<string, Record<Language, string>> = {
  'Ilkal Sarees': { en: 'Ilkal Sarees', hi: 'इलकल साड़ियाँ', kn: 'ಇಳಕಲ್ ಸೀರೆಗಳು' },
  'Banahatti Cotton Sarees': {
    en: 'Banahatti Cotton Sarees',
    hi: 'बनहट्टी कॉटन साड़ियाँ',
    kn: 'ಬನಹಟ್ಟಿ ಕಾಟನ್ ಸೀರೆಗಳು',
  },
  'Traditional Cotton Sarees': {
    en: 'Traditional Cotton Sarees',
    hi: 'पारंपरिक कॉटन साड़ियाँ',
    kn: 'ಸಾಂಪ್ರದಾಯಿಕ ಕಾಟನ್ ಸೀರೆಗಳು',
  },
  'Silk Sarees': { en: 'Silk Sarees', hi: 'सिल्क साड़ियाँ', kn: 'ರೇಷ್ಮೆ ಸೀರೆಗಳು' },
  'Festive Sarees': { en: 'Festive Sarees', hi: 'उत्सव साड़ियाँ', kn: 'ಹಬ್ಬದ ಸೀರೆಗಳು' },
  'Daily Wear Sarees': {
    en: 'Daily Wear Sarees',
    hi: 'दैनिक उपयोग साड़ियाँ',
    kn: 'ದೈನಂದಿನ ಉಡುಗೆ ಸೀರೆಗಳು',
  },
};

const CATEGORY_DESC_MAP: Record<string, Record<Language, string>> = {
  'ilkal-sarees': {
    en: 'Traditional Bagalkot Ilkal sarees featuring classic red-and-ivory pallu weaves and rich borders.',
    hi: 'बागलकोट की पारंपरिक इलकल साड़ियाँ, जिनमें लाल-आइवरी पल्लू और समृद्ध बॉर्डर शामिल हैं।',
    kn: 'ಕೆಂಪು ಮತ್ತು ದಂತದ ಬಣ್ಣದ ಸೆರಗು ಹಾಗೂ ಆಕರ್ಷಕ ಬಾರ್ಡರ್ ಹೊಂದಿರುವ ಬಾಗಲಕೋಟೆಯ ಸಾಂಪ್ರದಾಯಿಕ ಇಳಕಲ್ ಸೀರೆಗಳು.',
  },
  'banahatti-cotton-sarees': {
    en: 'Breathable, crisp cotton weaves from Banahatti designed for all-day grace in Indian weather.',
    hi: 'भारतीय मौसम में दिन भर की सहजता के लिए बनहट्टी की हवादार और सजीली कॉटन साड़ियाँ।',
    kn: 'ಭಾರತದ ಹವಾಮಾನದಲ್ಲಿ ದಿನವಿಡೀ ಹಿತಕರವಾಗಿರುವ ಬನಹಟ್ಟಿಯ ಗಾಳಿಯಾಡುವ ಕಾಟನ್ ಸೀರೆಗಳು.',
  },
  'traditional-cotton-sarees': {
    en: 'Everyday and temple-bordered cotton sarees inspired by North Karnataka weaving motifs.',
    hi: 'उत्तर कर्नाटक की बुनाई कला से प्रेरित दैनिक और टेम्पल-बॉर्डर कॉटन साड़ियाँ।',
    kn: 'ಉತ್ತರ ಕರ್ನಾಟಕದ ನೇಯ್ಗೆ ವಿನ್ಯಾಸಗಳಿಂದ ಪ್ರೇರಿತ ದೈನಂದಿನ ಮತ್ತು ಟೆಂಪಲ್-ಬಾರ್ಡರ್ ಕಾಟನ್ ಸೀರೆಗಳು.',
  },
  'silk-sarees': {
    en: 'Lustrous Karnataka silk and silk-blend sarees crafted for weddings, pujas, and family milestones.',
    hi: 'विवाह, पूजा और पारिवारिक अवसरों के लिए चमकदार कर्नाटक सिल्क और सिल्क-ब्लेंड साड़ियाँ।',
    kn: 'ಮದುವೆ, ಪೂಜೆ ಮತ್ತು ಕೌಟುಂಬಿಕ ಶುಭ ಸಮಾರಂಭಗಳಿಗೆ ಸೊಗಸಾದ ಕರ್ನಾಟಕ ರೇಷ್ಮೆ ಸೀರೆಗಳು.',
  },
  'festive-sarees': {
    en: 'Celebratory deep maroon, antique gold, and auspicious hues curated for auspicious occasions.',
    hi: 'शुभ अवसरों के लिए गहरे मैरून, एंटीक गोल्ड और मांगलिक रंगों का विशेष संग्रह।',
    kn: 'ಶುಭ ಸಂದರ್ಭಗಳಿಗಾಗಿ ಗಾಢ ಮೆರೂನ್, ಪುರಾತನ ಚಿನ್ನದ ಬಣ್ಣ ಮತ್ತು ಮಂಗಳಕರ ವರ್ಣಗಳ ಸಂಗ್ರಹ.',
  },
  'daily-wear-sarees': {
    en: 'Lightweight, easy-drape cotton sarees tailored for workdays, teaching, and refined daily comfort.',
    hi: 'कार्यालय, अध्यापन और आरामदायक दैनिक पहनने के लिए हल्की और सहज कॉटन साड़ियाँ।',
    kn: 'ಕಚೇರಿ, ಬೋಧನೆ ಮತ್ತು ದೈನಂದಿನ ಆರಾಮಕ್ಕಾಗಿ ಹಗುರ ಹಾಗೂ ಸುಲಭವಾಗಿ ಉಡುವ ಕಾಟನ್ ಸೀರೆಗಳು.',
  },
};

const SAREE_TYPE_MAP: Record<string, Record<Language, string>> = {
  All: { en: 'All', hi: 'सभी', kn: 'ಎಲ್ಲಾ' },
  Ilkal: { en: 'Ilkal', hi: 'इलकल', kn: 'ಇಳಕಲ್' },
  'Banahatti Cotton': { en: 'Banahatti Cotton', hi: 'बनहट्टी कॉटन', kn: 'ಬನಹಟ್ಟಿ ಕಾಟನ್' },
  'Traditional Cotton': { en: 'Traditional Cotton', hi: 'पारंपरिक कॉटन', kn: 'ಸಾಂಪ್ರದಾಯಿಕ ಕಾಟನ್' },
  Silk: { en: 'Silk', hi: 'सिल्क', kn: 'ರೇಷ್ಮೆ' },
};

const COLOR_MAP: Record<string, Record<Language, string>> = {
  All: { en: 'All', hi: 'सभी', kn: 'ಎಲ್ಲಾ' },
  'Deep Maroon': { en: 'Deep Maroon', hi: 'गहरा मैरून', kn: 'ಗಾಢ ಮೆರೂನ್' },
  'Crimson Red': { en: 'Crimson Red', hi: 'सुर्ख लाल', kn: 'ಕಡು ಕೆಂಪು' },
  'Temple Gold': { en: 'Temple Gold', hi: 'टेम्पल गोल्ड', kn: 'ಟೆಂಪಲ್ ಗೋಲ್ಡ್' },
  'Antique Gold': { en: 'Antique Gold', hi: 'एंटीक गोल्ड', kn: 'ಪುರಾತನ ಚಿನ್ನ' },
  'Ivory Cream': { en: 'Ivory Cream', hi: 'आइवरी क्रीम', kn: 'ದಂತದ ಕೆನೆ' },
  'Mustard Ochre': { en: 'Mustard Ochre', hi: 'मस्टर्ड गेरुआ', kn: 'ಸಾಸಿವೆ ಹಳದಿ' },
  'Royal Plum': { en: 'Royal Plum', hi: 'रॉयल प्लम', kn: 'ರಾಜ ನೇರಳೆ' },
  'Indigo Blue': { en: 'Indigo Blue', hi: 'इंडिगो नीला', kn: 'ನೀಲಿ' },
  'Midnight Navy': { en: 'Midnight Navy', hi: 'गहरा नेवी', kn: 'ಗಾಢ ನೀಲಿ' },
  'Rust Copper': { en: 'Rust Copper', hi: 'ताम्र रंग', kn: 'ತಾಮ್ರ ಕೆಂಪು' },
  'Warm Sand': { en: 'Warm Sand', hi: 'सुनहरा रेत', kn: 'ಮರಳು ಬಣ್ಣ' },
  'Slate Blue': { en: 'Slate Blue', hi: 'स्लेट नीला', kn: 'ಸ್ಲೇಟ್ ನೀಲಿ' },
};

const AVAILABILITY_MAP: Record<string, Record<Language, string>> = {
  Available: { en: 'Available', hi: 'उपलब्ध', kn: 'ಲಭ್ಯವಿದೆ' },
  'Made to Order': { en: 'Made to Order', hi: 'ऑर्डर पर तैयार', kn: 'ಆರ್ಡರ್ ಮೇಲೆ ತಯಾರಿ' },
  'Out of Stock': { en: 'Out of Stock', hi: 'स्टॉक समाप्त', kn: 'ಸ್ಟಾಕ್ ಇಲ್ಲ' },
};

const ORDER_STATUS_MAP: Record<string, Record<Language, string>> = {
  'Order Placed': { en: 'Order Placed', hi: 'ऑर्डर प्राप्त हुआ', kn: 'ಆರ್ಡರ್ ಸಲ್ಲಿಸಲಾಗಿದೆ' },
  Confirmed: { en: 'Confirmed', hi: 'पुष्टिकृत', kn: 'ದೃಢೀಕರಿಸಲಾಗಿದೆ' },
  'Quality Inspection': { en: 'Quality Inspection', hi: 'गुणवत्ता जांच', kn: 'ಗುಣಮಟ್ಟ ಪರಿಶೀಲನೆ' },
  'Packaging in Progress': {
    en: 'Packaging in Progress',
    hi: 'पैकेजिंग जारी है',
    kn: 'ಪ್ಯಾಕೇಜಿಂಗ್ ನಡೆಯುತ್ತಿದೆ',
  },
  'Ready to Dispatch': { en: 'Ready to Dispatch', hi: 'भेजने के लिए तैयार', kn: 'ರವಾನೆಗೆ ಸಿದ್ಧವಾಗಿದೆ' },
  Shipped: { en: 'Shipped', hi: 'भेजा जा चुका है', kn: 'ಕಳುಹಿಸಲಾಗಿದೆ' },
  Delivered: { en: 'Delivered', hi: 'डिलीवर हो गया', kn: 'ತಲುಪಿಸಲಾಗಿದೆ' },
  'Unavailable - Action Needed': {
    en: 'Unavailable - Action Needed',
    hi: 'अनुपलब्ध - कार्रवाई आवश्यक',
    kn: 'ಲಭ್ಯವಿಲ್ಲ - ಕ್ರಮ ಅಗತ್ಯ',
  },
  Cancelled: { en: 'Cancelled', hi: 'रद्द', kn: 'ರದ್ದುಗೊಳಿಸಲಾಗಿದೆ' },
};

const PRODUCT_TITLE_MAP: Record<string, Record<Language, string>> = {
  'SRM-ILK-101': {
    en: 'Bagalkot Tope Teni Ilkal Saree in Deep Maroon',
    hi: 'गहरे मैरून में बागलकोट तोपे तेनी इलकल साड़ी',
    kn: 'ಗಾಢ ಮೆರೂನ್ ಬಣ್ಣದ ಬಾಗಲಕೋಟೆ ತೋಪು ತೆನೆ ಇಳಕಲ್ ಸೀರೆ',
  },
  'SRM-BAN-204': {
    en: 'Banahatti Soft Cotton Saree in Ivory & Mustard Border',
    hi: 'आइवरी और मस्टर्ड बॉर्डर में बनहट्टी सॉफ्ट कॉटन साड़ी',
    kn: 'ದಂತದ ಬಿಳಿ ಮತ್ತು ಸಾಸಿವೆ ಹಳದಿ ಬಾರ್ಡರ್ ಬನಹಟ್ಟಿ ಕಾಟನ್ ಸೀರೆ',
  },
  'SRM-SLK-309': {
    en: 'Kundala Zari Border Festive Silk Saree',
    hi: 'कुंदला ज़री बॉर्डर उत्सव सिल्क साड़ी',
    kn: 'ಕುಂದಲ ಜರಿ ಬಾರ್ಡರ್ ಹಬ್ಬದ ರೇಷ್ಮೆ ಸೀರೆ',
  },
  'SRM-DLY-412': {
    en: 'Neeli Indigo Daily Wear Cotton Saree with Copper Border',
    hi: 'ताम्र बॉर्डर के साथ नीली इंडिगो दैनिक कॉटन साड़ी',
    kn: 'ತಾಮ್ರ ಬಾರ್ಡರ್ ಹೊಂದಿರುವ ನೀಲಿ ದೈನಂದಿನ ಕಾಟನ್ ಸೀರೆ',
  },
  'SRM-FST-501': {
    en: 'Chikki Paraspet Ilkal Festive Saree',
    hi: 'चिक्की पारसपेट इलकल उत्सव साड़ी',
    kn: 'ಚಿಕ್ಕಿ ಪಾರಸ್‌ಪೇಟ್ ಇಳಕಲ್ ಹಬ್ಬದ ಸೀರೆ',
  },
  'SRM-COT-608': {
    en: 'Rabkavi Temple Border Traditional Cotton Saree',
    hi: 'रबकवी टेम्पल बॉर्डर पारंपरिक कॉटन साड़ी',
    kn: 'ರಬಕವಿ ಟೆಂಪಲ್ ಬಾರ್ಡರ್ ಸಾಂಪ್ರದಾಯಿಕ ಕಾಟನ್ ಸೀರೆ',
  },
  'SRM-SLK-715': {
    en: 'Gajendra Maroon & Antique Gold Bridal Silk Saree',
    hi: 'गजेंद्र मैरून और एंटीक गोल्ड ब्राइडल सिल्क साड़ी',
    kn: 'ಗಜೇಂದ್ರ ಮೆರೂನ್ ಮತ್ತು ಪುರಾತನ ಚಿನ್ನದ ವಧುವಿನ ರೇಷ್ಮೆ ಸೀರೆ',
  },
  'SRM-BAN-820': {
    en: 'Bagalkot Everyday Indigo & Zari Cotton Saree',
    hi: 'बागलकोट दैनिक इंडिगो और ज़री कॉटन साड़ी',
    kn: 'ಬಾಗಲಕೋಟೆ ದೈನಂದಿನ ನೀಲಿ ಮತ್ತು ಜರಿ ಕಾಟನ್ ಸೀರೆ',
  },
};

const PRODUCT_DESC_MAP: Record<string, Record<Language, string>> = {
  'SRM-ILK-101': {
    en: 'A quintessential Karnataka Ilkal saree in rich deep maroon featuring the classic red-and-ivory Tope Teni pallu and woven antique gold temple border. Individually quality-inspected and finished in SIRIMAGGA signature packaging.',
    hi: 'गहरे मैरून रंग में कर्नाटक की प्रामाणिक इलकल साड़ी, जिसमें पारंपरिक लाल-आइवरी तोपे तेनी पल्लू और एंटीक गोल्ड टेम्पल बॉर्डर है। SIRIMAGGA पैकेजिंग में गुणवत्ता जांच के बाद उपलब्ध।',
    kn: 'ಸಾಂಪ್ರದಾಯಿಕ ಕೆಂಪು-ದಂತದ ಬಣ್ಣದ ತೋಪು ತೆನೆ ಸೆರಗು ಮತ್ತು ಪುರಾತನ ಚಿನ್ನದ ಟೆಂಪಲ್ ಬಾರ್ಡರ್ ಹೊಂದಿರುವ ಗಾಢ ಮೆರೂನ್ ಇಳಕಲ್ ಸೀರೆ. SIRIMAGGA ಪ್ಯಾಕೇಜಿಂಗ್‌ನಲ್ಲಿ ಗುಣಮಟ್ಟ ಪರೀಕ್ಷೆಯೊಂದಿಗೆ ಲಭ್ಯ.',
  },
  'SRM-BAN-204': {
    en: 'Airy ivory cream cotton body accented by a warm mustard-gold woven border. Tailored for effortless drape from morning office hours through evening gatherings.',
    hi: 'हल्का आइवरी क्रीम कॉटन और मस्टर्ड-गोल्ड बुनाई बॉर्डर। सुबह के ऑफिस से शाम के कार्यक्रमों तक सहज और सुंदर पहनावे के लिए तैयार।',
    kn: 'ಹಗುರವಾದ ದಂತದ ಕೆನೆ ಬಣ್ಣದ ಕಾಟನ್ ಮತ್ತು ಸಾಸಿವೆ-ಚಿನ್ನದ ನೇಯ್ಗೆ ಬಾರ್ಡರ್. ಬೆಳಗಿನ ಕಚೇರಿಯಿಂದ ಸಂಜೆಯ ಸಮಾರಂಭಗಳವರೆಗೆ ಸುಂದರವಾಗಿ ಒಪ್ಪುತ್ತದೆ.',
  },
  'SRM-SLK-309': {
    en: 'An heirloom-inspired deep burgundy silk saree adorned with finely woven antique gold motifs along a broad border and richly patterned pallu. Selected for weddings, festivals, and cherished celebrations.',
    hi: 'शादियों, त्यौहारों और शुभ अवसरों के लिए चौड़े एंटीक गोल्ड बॉर्डर और सुंदर पल्लू से सजी गहरी बरगंडी सिल्क साड़ी।',
    kn: 'ಮದುವೆ, ಹಬ್ಬ ಮತ್ತು ಶುಭ ಸಮಾರಂಭಗಳಿಗಾಗಿ ಅಗಲವಾದ ಚಿನ್ನದ ಬಾರ್ಡರ್ ಮತ್ತು ಶ್ರೀಮಂತ ಸೆರಗಿನೊಂದಿಗೆ ನೇಯ್ದ ಗಾಢ ರೇಷ್ಮೆ ಸೀರೆ.',
  },
  'SRM-DLY-412': {
    en: 'Composed in calm indigo blue with geometric antique copper-gold borders, this crisp yet supple saree brings North Karnataka elegance to everyday wear.',
    hi: 'शांत इंडिगो नीले रंग और ताम्र-स्वर्ण ज्यामितीय बॉर्डर के साथ यह साड़ी दैनिक जीवन में उत्तर कर्नाटक की शालीनता लाती है।',
    kn: 'ಶಾಂತ ನೀಲಿ ಬಣ್ಣ ಮತ್ತು ತಾಮ್ರ-ಚಿನ್ನದ ಜ್ಯಾಮಿತೀಯ ಬಾರ್ಡರ್ ಹೊಂದಿರುವ ಈ ಸೀರೆ ದೈನಂದಿನ ಉಡುಗೆಗೆ ಉತ್ತರ ಕರ್ನಾಟಕದ ಸೊಬಗನ್ನು ನೀಡುತ್ತದೆ.',
  },
  'SRM-FST-501': {
    en: 'Classic checked border geometry paired with deep festive maroon sheen and traditional red-white end-piece detailing. A celebrated silhouette from Bagalkot.',
    hi: 'पारंपरिक चेक बॉर्डर, गहरी मैरून चमक और लाल-सफेद पल्लू डिटेलिंग के साथ बागलकोट की प्रसिद्ध उत्सव साड़ी।',
    kn: 'ಸಾಂಪ್ರದಾಯಿಕ ಚೆಕ್ಸ್ ಬಾರ್ಡರ್, ಹಬ್ಬದ ಮೆರೂನ್ ಹೊಳಪು ಮತ್ತು ಕೆಂಪು-ಬಿಳಿ ಸೆರಗು ಹೊಂದಿರುವ ಬಾಗಲಕೋಟೆಯ ಪ್ರಸಿದ್ಧ ಸೀರೆ.',
  },
  'SRM-COT-608': {
    en: 'Warm cream-and-ochre cotton drape woven with understated temple border artistry. Softens gracefully with every wear while retaining crisp pleat structure.',
    hi: 'क्रीम और गेरुए रंग में शालीन टेम्पल बॉर्डर कॉटन साड़ी, जो हर पहनने के साथ और भी कोमल हो जाती है।',
    kn: 'ದಂತದ ಕೆನೆ ಮತ್ತು ಕಾವಿ ಬಣ್ಣದ ಟೆಂಪಲ್ ಬಾರ್ಡರ್ ಕಾಟನ್ ಸೀರೆ. ಪ್ರತಿ ಬಾರಿ ಉಟ್ಟಾಗಲೂ ಮತ್ತಷ್ಟು ಮೃದುವಾಗುತ್ತಾ ಸೊಗಸಾಗಿ ನಿಲ್ಲುತ್ತದೆ.',
  },
  'SRM-SLK-715': {
    en: 'Richly textured silk drape crafted in deep maroon with ornate antique gold border panels and fine butti accents across the body.',
    hi: 'गहरे मैरून रंग में अलंकृत एंटीक गोल्ड बॉर्डर और बारीक बुट्टी डिज़ाइन वाली समृद्ध ब्राइडल सिल्क साड़ी।',
    kn: 'ಗಾಢ ಮೆರೂನ್ ಬಣ್ಣದಲ್ಲಿ ಅಲಂಕೃತ ಪುರಾತನ ಚಿನ್ನದ ಬಾರ್ಡರ್ ಮತ್ತು ಸೂಕ್ಷ್ಮ ಬುಟ್ಟಿ ವಿನ್ಯಾಸ ಹೊಂದಿರುವ ವಧುವಿನ ರೇಷ್ಮೆ ಸೀರೆ.',
  },
  'SRM-BAN-820': {
    en: 'Deep indigo cotton weave finished with a refined antique gold border. Light enough for warm Karnataka afternoons yet polished for formal occasions.',
    hi: 'एंटीक गोल्ड बॉर्डर के साथ गहरा इंडिगो कॉटन, जो गर्म दोपहर के लिए हल्का और औपचारिक अवसरों के लिए सुरुचिपूर्ण है।',
    kn: 'ಪುರಾತನ ಚಿನ್ನದ ಬಾರ್ಡರ್ ಹೊಂದಿರುವ ಗಾಢ ನೀಲಿ ಕಾಟನ್ ಸೀರೆ. ಬೇಸಿಗೆಯ ಮಧ್ಯಾಹ್ನಕ್ಕೆ ಹಗುರವಾಗಿ ಮತ್ತು ಸಮಾರಂಭಗಳಿಗೆ ಅಂದವಾಗಿ ಒಪ್ಪುತ್ತದೆ.',
  },
};

export interface PolicyTranslation {
  title: string;
  sections: { heading: string; body: string }[];
}

export const POLICY_TRANSLATIONS: Record<Language, Record<string, PolicyTranslation>> = {
  en: {
    shipping: {
      title: 'Shipping Policy',
      sections: [
        {
          heading: 'Order Processing & Quality Inspection',
          body: 'Once your order is placed, SIRIMAGGA confirms availability, conducts a detailed quality inspection, and completes signature brand packaging within 2–4 business days prior to dispatch from Bagalkot District, Karnataka.',
        },
        {
          heading: 'Pan-India Delivery Timeline',
          body: 'Orders within Karnataka typically arrive within 3–5 business days after dispatch. Deliveries across other Indian states take 4–7 business days depending on PIN code serviceability.',
        },
        {
          heading: 'Shipping Charges',
          body: 'Complimentary standard shipping is offered on orders above our storefront threshold (currently ₹1,999). Orders below the threshold carry a flat Pan-India delivery charge shown clearly at checkout.',
        },
      ],
    },
    returns: {
      title: 'Return and Refund Policy',
      sections: [
        {
          heading: 'Eligibility for Returns',
          body: 'Unused, unwashed sarees with the original SIRIMAGGA brand tag and packaging intact may be requested for return within 7 days of delivery in the event of transit damage or an incorrect item received.',
        },
        {
          heading: 'Availability Exceptions',
          body: 'In the rare case where a selected saree becomes unavailable during final pre-dispatch verification, our team will contact you promptly to offer a curated alternative or issue a full refund.',
        },
        {
          heading: 'Refund Timeline',
          body: 'Approved refunds are initiated back to your original payment method within 5–7 business days following receipt and inspection.',
        },
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      sections: [
        {
          heading: 'Information We Collect',
          body: 'SIRIMAGGA collects only the details required to fulfil your order and personalise your account: your name, email address, mobile number, and Indian delivery addresses.',
        },
        {
          heading: 'Data Security',
          body: 'Customer profiles, saved addresses, and order history are protected by strict access controls and encrypted transport. Payment credentials are handled exclusively through configured Indian payment gateways.',
        },
      ],
    },
    terms: {
      title: 'Terms and Conditions',
      sections: [
        {
          heading: 'Product Representation',
          body: 'We make every effort to photograph sarees under natural light so colours and textures appear accurately. Minor tonal variations may occur across display screens. Demo items on preview storefronts are clearly labelled.',
        },
        {
          heading: 'Pricing & Orders',
          body: 'All prices are listed in Indian Rupees (INR). SIRIMAGGA reserves the right to cancel and refund any order if availability cannot be confirmed prior to dispatch.',
        },
      ],
    },
    contact: {
      title: 'Contact SIRIMAGGA',
      sections: [
        {
          heading: 'Customer Care Desk',
          body: 'Bagalkot District, Karnataka, India · Monday to Saturday, 10:00 AM – 6:30 PM IST.',
        },
        {
          heading: 'Order & Styling Inquiries',
          body: 'Reach out via your Account Order History page, WhatsApp concierge, or email support@sirimagga.example (placeholder contact until domain email is connected).',
        },
      ],
    },
  },
  hi: {
    shipping: {
      title: 'शिपिंग नीति',
      sections: [
        {
          heading: 'ऑर्डर प्रोसेसिंग और गुणवत्ता जांच',
          body: 'ऑर्डर मिलने के बाद SIRIMAGGA उपलब्धता की पुष्टि करता है, विस्तृत गुणवत्ता जांच करता है और बागलकोट जिले, कर्नाटक से प्रेषण से पहले 2–4 कार्यदिवसों के भीतर सिग्नेचर ब्रांड पैकेजिंग पूरी करता है।',
        },
        {
          heading: 'संपूर्ण भारत में डिलीवरी समय',
          body: 'कर्नाटक के भीतर ऑर्डर आमतौर पर प्रेषण के 3–5 कार्यदिवसों में पहुंचते हैं। अन्य भारतीय राज्यों में पिन कोड के अनुसार 4–7 कार्यदिवस लगते हैं।',
        },
        {
          heading: 'शिपिंग शुल्क',
          body: '₹1,999 से अधिक के ऑर्डर पर मानक शिपिंग निःशुल्क है। इससे कम के ऑर्डर पर चेकआउट में दिखाया गया निश्चित डिलीवरी शुल्क लागू होता है।',
        },
      ],
    },
    returns: {
      title: 'रिटर्न और रिफंड नीति',
      sections: [
        {
          heading: 'रिटर्न की पात्रता',
          body: 'यदि परिवहन में क्षति हुई हो या गलत उत्पाद प्राप्त हुआ हो, तो मूल SIRIMAGGA टैग और पैकेजिंग के साथ बिना उपयोग की गई और बिना धुली साड़ी के लिए डिलीवरी के 7 दिनों के भीतर रिटर्न का अनुरोध किया जा सकता है।',
        },
        {
          heading: 'उपलब्धता अपवाद',
          body: 'यदि अंतिम जांच के दौरान कोई साड़ी अनुपलब्ध हो जाती है, तो हमारी टीम तुरंत आपको विकल्प या पूर्ण रिफंड के लिए संपर्क करेगी।',
        },
        {
          heading: 'रिफंड समय-सीमा',
          body: 'स्वीकृत रिफंड उत्पाद प्राप्त होने और जांच के 5–7 कार्यदिवसों के भीतर आपके मूल भुगतान माध्यम में वापस कर दिए जाते हैं।',
        },
      ],
    },
    privacy: {
      title: 'गोपनीयता नीति',
      sections: [
        {
          heading: 'हम कौन सी जानकारी एकत्र करते हैं',
          body: 'SIRIMAGGA केवल आपके ऑर्डर को पूरा करने और खाते के लिए आवश्यक जानकारी (नाम, ईमेल, मोबाइल नंबर और डिलीवरी पता) एकत्र करता है।',
        },
        {
          heading: 'डेटा सुरक्षा',
          body: 'ग्राहक प्रोफ़ाइल, पते और ऑर्डर इतिहास सख्त सुरक्षा नियंत्रणों से सुरक्षित हैं। भुगतान विवरण केवल भारतीय पेमेंट गेटवे के माध्यम से संभाले जाते हैं।',
        },
      ],
    },
    terms: {
      title: 'नियम एवं शर्तें',
      sections: [
        {
          heading: 'उत्पाद प्रस्तुति',
          body: 'हम प्राकृतिक रोशनी में साड़ियों की तस्वीर लेने का पूरा प्रयास करते हैं। स्क्रीन सेटिंग के अनुसार रंगों में हल्का अंतर हो सकता है। डेमो आइटम स्पष्ट रूप से चिह्नित हैं।',
        },
        {
          heading: 'मूल्य निर्धारण एवं ऑर्डर',
          body: 'सभी मूल्य भारतीय रुपये (INR) में हैं। यदि प्रेषण से पहले उपलब्धता की पुष्टि नहीं हो पाती, तो SIRIMAGGA के पास ऑर्डर रद्द कर पूर्ण रिफंड करने का अधिकार सुरक्षित है।',
        },
      ],
    },
    contact: {
      title: 'SIRIMAGGA से संपर्क करें',
      sections: [
        {
          heading: 'ग्राहक सेवा केंद्र',
          body: 'बागलकोट जिला, कर्नाटक, भारत · सोमवार से शनिवार, सुबह 10:00 – शाम 6:30 IST।',
        },
        {
          heading: 'ऑर्डर व स्टाइलिंग सहायता',
          body: 'अपने खाता ऑर्डर इतिहास पृष्ठ, व्हाट्सएप सहायता या support@sirimagga.example के माध्यम से संपर्क करें।',
        },
      ],
    },
  },
  kn: {
    shipping: {
      title: 'ಶಿಪ್ಪಿಂಗ್ ನೀತಿ',
      sections: [
        {
          heading: 'ಆರ್ಡರ್ ಪ್ರಕ್ರಿಯೆ ಮತ್ತು ಗುಣಮಟ್ಟ ಪರೀಕ್ಷೆ',
          body: 'ಆರ್ಡರ್ ನೀಡಿದ ನಂತರ SIRIMAGGA ಲಭ್ಯತೆಯನ್ನು ಖಚಿತಪಡಿಸಿ, ವಿವರವಾದ ಗುಣಮಟ್ಟ ಪರೀಕ್ಷೆ ನಡೆಸಿ, ಬಾಗಲಕೋಟೆ ಜಿಲ್ಲೆಯಿಂದ ಕಳುಹಿಸುವ ಮೊದಲು 2–4 ಕೆಲಸದ ದಿನಗಳಲ್ಲಿ ಬ್ರ್ಯಾಂಡ್ ಪ್ಯಾಕೇಜಿಂಗ್ ಪೂರ್ಣಗೊಳಿಸುತ್ತದೆ.',
        },
        {
          heading: 'ಭಾರತದಾದ್ಯಂತ ತಲುಪುವ ಸಮಯ',
          body: 'ಕರ್ನಾಟಕದೊಳಗಿನ ಆರ್ಡರ್‌ಗಳು ರವಾನೆಯಾದ 3–5 ಕೆಲಸದ ದಿನಗಳಲ್ಲಿ ತಲುಪುತ್ತವೆ. ಇತರ ರಾಜ್ಯಗಳಿಗೆ ಪಿನ್ ಕೋಡ್ ಆಧಾರದ ಮೇಲೆ 4–7 ಕೆಲಸದ ದಿನಗಳು ಬೇಕಾಗುತ್ತದೆ.',
        },
        {
          heading: 'ಶಿಪ್ಪಿಂಗ್ ಶುಲ್ಕ',
          body: '₹1,999 ಕ್ಕಿಂತ ಹೆಚ್ಚಿನ ಆರ್ಡರ್‌ಗಳಿಗೆ ಉಚಿತ ವಿತರಣೆ ಲಭ್ಯವಿದೆ. ಅದಕ್ಕಿಂತ ಕಡಿಮೆ ಮೊತ್ತದ ಆರ್ಡರ್‌ಗಳಿಗೆ ಚೆಕ್‌ಔಟ್‌ನಲ್ಲಿ ತೋರಿಸುವ ನಿಗದಿತ ಶುಲ್ಕ ಅನ್ವಯವಾಗುತ್ತದೆ.',
        },
      ],
    },
    returns: {
      title: 'ರಿಟರ್ನ್ ಮತ್ತು ರೀಫಂಡ್ ನೀತಿ',
      sections: [
        {
          heading: 'ರಿಟರ್ನ್ ಅರ್ಹತೆ',
          body: 'ಸಾಗಣೆಯಲ್ಲಿ ಹಾನಿಯಾಗಿದ್ದರೆ ಅಥವಾ ತಪ್ಪಾದ ಸೀರೆ ಬಂದಿದ್ದರೆ, ಬಳಸದ ಮತ್ತು ಒಗೆಯದ ಸೀರೆಯನ್ನು ಮೂಲ SIRIMAGGA ಟ್ಯಾಗ್ ಹಾಗೂ ಬಾಕ್ಸ್‌ನೊಂದಿಗೆ ತಲುಪಿದ 7 ದಿನಗಳೊಳಗೆ ಹಿಂತಿರುಗಿಸಲು ವಿನಂತಿಸಬಹುದು.',
        },
        {
          heading: 'ಲಭ್ಯತೆ ವಿನಾಯಿತಿಗಳು',
          body: 'ಅಂತಿಮ ಪರಿಶೀಲನೆ ವೇಳೆ ಆಯ್ಕೆ ಮಾಡಿದ ಸೀರೆ ಲಭ್ಯವಿಲ್ಲದಿದ್ದಲ್ಲಿ, ಪರ್ಯಾಯ ಸೀರೆ ಅಥವಾ ಪೂರ್ಣ ಹಣ ವಾಪಸಾತಿಗಾಗಿ ನಮ್ಮ ತಂಡ ತಕ್ಷಣವೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತದೆ.',
        },
        {
          heading: 'ರೀಫಂಡ್ ಅವಧಿ',
          body: 'ಅನುಮೋದಿತ ಹಣ ವಾಪಸಾತಿಯನ್ನು ಸೀರೆ ಪರಿಶೀಲನೆಯ ನಂತರ 5–7 ಕೆಲಸದ ದಿನಗಳಲ್ಲಿ ನಿಮ್ಮ ಮೂಲ ಪಾವತಿ ವಿಧಾನಕ್ಕೆ ಕಳುಹಿಸಲಾಗುತ್ತದೆ.',
        },
      ],
    },
    privacy: {
      title: 'ಗೌಪ್ಯತಾ ನೀತಿ',
      sections: [
        {
          heading: 'ನಾವು ಸಂಗ್ರಹಿಸುವ ಮಾಹಿತಿ',
          body: 'ನಿಮ್ಮ ಆರ್ಡರ್ ಪೂರೈಸಲು ಮತ್ತು ಖಾತೆ ನಿರ್ವಹಿಸಲು ಅಗತ್ಯವಿರುವ ಹೆಸರು, ಇಮೇಲ್, ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಮತ್ತು ವಿಳಾಸವನ್ನು ಮಾತ್ರ SIRIMAGGA ಸಂಗ್ರಹಿಸುತ್ತದೆ.',
        },
        {
          heading: 'ಡೇಟಾ ಸುರಕ್ಷತೆ',
          body: 'ಗ್ರಾಹಕರ ವಿವರಗಳು, ವಿಳಾಸಗಳು ಮತ್ತು ಆರ್ಡರ್ ಇತಿಹಾಸವನ್ನು ಕಠಿಣ ಪ್ರವೇಶ ನಿಯಂತ್ರಣಗಳಿಂದ ರಕ್ಷಿಸಲಾಗಿದೆ. ಪಾವತಿ ಮಾಹಿತಿಯನ್ನು ಭಾರತೀಯ ಪಾವತಿ ಗೇಟ್‌ವೇ ಮೂಲಕ ಮಾತ್ರ ನಿರ್ವಹಿಸಲಾಗುತ್ತದೆ.',
        },
      ],
    },
    terms: {
      title: 'ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳು',
      sections: [
        {
          heading: 'ಉತ್ಪನ್ನ ಪ್ರದರ್ಶನ',
          body: 'ನೈಸರ್ಗಿಕ ಬೆಳಕಿನಲ್ಲಿ ಸೀರೆಗಳ ಫೋಟೋ ತೆಗೆಯಲು ನಾವು ಶ್ರಮಿಸುತ್ತೇವೆ. ಪರದೆಯ ಸೆಟ್ಟಿಂಗ್‌ಗಳಿಗೆ ಅನುಗುಣವಾಗಿ ಬಣ್ಣದಲ್ಲಿ ಸಣ್ಣ ವ್ಯತ್ಯಾಸವಿರಬಹುದು. ಡೆಮೊ ಉತ್ಪನ್ನಗಳನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ಗುರುತಿಸಲಾಗಿದೆ.',
        },
        {
          heading: 'ಬೆಲೆ ಮತ್ತು ಆರ್ಡರ್‌ಗಳು',
          body: 'ಎಲ್ಲಾ ಬೆಲೆಗಳನ್ನು ಭಾರತೀಯ ರೂಪಾಯಿಗಳಲ್ಲಿ (INR) ನೀಡಲಾಗಿದೆ. ರವಾನೆಗೆ ಮುನ್ನ ಲಭ್ಯತೆ ಖಚಿತವಾಗದಿದ್ದಲ್ಲಿ ಆರ್ಡರ್ ರದ್ದುಪಡಿಸಿ ಪೂರ್ಣ ಹಣ ಮರುಪಾವತಿಸುವ ಹಕ್ಕನ್ನು SIRIMAGGA ಕಾಯ್ದಿರಿಸಿದೆ.',
        },
      ],
    },
    contact: {
      title: 'SIRIMAGGA ಸಂಪರ್ಕಿಸಿ',
      sections: [
        {
          heading: 'ಗ್ರಾಹಕ ಸೇವಾ ಕೇಂದ್ರ',
          body: 'ಬಾಗಲಕೋಟೆ ಜಿಲ್ಲೆ, ಕರ್ನಾಟಕ, ಭಾರತ · ಸೋಮವಾರದಿಂದ ಶನಿವಾರದವರೆಗೆ, ಬೆಳಗ್ಗೆ 10:00 – ಸಂಜೆ 6:30 IST.',
        },
        {
          heading: 'ಆರ್ಡರ್ ಮತ್ತು ಸ್ಟೈಲಿಂಗ್ ವಿಚಾರಣೆಗಳು',
          body: 'ನಿಮ್ಮ ಖಾತೆಯ ಆರ್ಡರ್ ಇತಿಹಾಸ ಪುಟ, ವಾಟ್ಸಾಪ್ ಸಹಾಯವಾಣಿ ಅಥವಾ support@sirimagga.example ಮೂಲಕ ಸಂಪರ್ಕಿಸಿ.',
        },
      ],
    },
  },
};

export function localizeCategoryName(name: string, lang: Language): string {
  return CATEGORY_NAME_MAP[name]?.[lang] || name;
}

export function localizeCategoryDescription(slug: string, fallback: string, lang: Language): string {
  return CATEGORY_DESC_MAP[slug]?.[lang] || fallback;
}

export function localizeSareeType(type: string, lang: Language): string {
  return SAREE_TYPE_MAP[type]?.[lang] || type;
}

export function localizeColor(color: string, lang: Language): string {
  return COLOR_MAP[color]?.[lang] || color;
}

export function localizeAvailability(status: string, lang: Language): string {
  return AVAILABILITY_MAP[status]?.[lang] || status;
}

export function localizeOrderStatus(status: string, lang: Language): string {
  return ORDER_STATUS_MAP[status]?.[lang] || status;
}

export function localizeProductTitle(code: string, fallback: string, lang: Language): string {
  return PRODUCT_TITLE_MAP[code]?.[lang] || fallback;
}

export function localizeProductDescription(code: string, fallback: string, lang: Language): string {
  return PRODUCT_DESC_MAP[code]?.[lang] || fallback;
}
