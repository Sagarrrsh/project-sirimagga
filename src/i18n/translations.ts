export type Language = 'en' | 'hi' | 'kn';

export const LANGUAGE_OPTIONS: { code: Language; shortLabel: string; nativeLabel: string }[] = [
  { code: 'en', shortLabel: 'EN', nativeLabel: 'English' },
  { code: 'hi', shortLabel: 'हिन्दी', nativeLabel: 'हिन्दी' },
  { code: 'kn', shortLabel: 'ಕನ್ನಡ', nativeLabel: 'ಕನ್ನಡ' },
];

export interface JourneyMilestoneCopy {
  id: string;
  step: string;
  timeframe: string;
  location: string;
  title: string;
  subtitle: string;
  description: string;
  highlight: string;
}

export interface TranslationSchema {
  nav: {
    announcement: string;
    languageLabel: string;
    home: string;
    shopAll: string;
    ilkalSarees: string;
    banahattiSarees: string;
    cottonSarees: string;
    silkSarees: string;
    newArrivals: string;
    aboutUs: string;
    trackOrder: string;
    admin: string;
    adminDashboard: string;
    myAccountOrders: string;
    searchPlaceholder: string;
    searchButton: string;
    mobileFooter: string;
    languageChangedToast: string;
  };
  footer: {
    brandDesc: string;
    location: string;
    shopCategories: string;
    customerCare: string;
    trackOrder: string;
    aboutUs: string;
    contactUs: string;
    shippingPolicy: string;
    returnPolicy: string;
    privacyPolicy: string;
    termsConditions: string;
    connectTitle: string;
    connectDesc: string;
    whatsappConcierge: string;
    copyright: string;
    demoNote: string;
    adminPortal: string;
  };
  home: {
    heroKicker: string;
    heroTitle: string;
    heroSubtitle: string;
    shopCollection: string;
    exploreNewArrivals: string;
    jumpJourney: string;
    jumpBoxCard: string;
    jumpDelivery: string;
    shopByCollection: string;
    shopByCollectionSub: string;
    shopNow: string;
    bestsellingSarees: string;
    bestsellingSub: string;
    bestsellingDemoSuffix: string;
    viewCompleteCatalogue: string;
    ourHeritageKicker: string;
    ourHeritageTitle: string;
    ourHeritageP1: string;
    ourHeritageP2: string;
    readStory: string;
    whyChooseTitle: string;
    whyChooseFeatures: { title: string; description: string }[];
    newArrivalsTitle: string;
    newArrivalsSub: string;
    exploreNewArrivalsBtn: string;
    testimonialsTitle: string;
    testimonialsSub: string;
    demoReviewBadge: string;
    newsletterTitle: string;
    newsletterSub: string;
    newsletterSuccess: string;
    newsletterPlaceholder: string;
    subscribe: string;
    subscribing: string;
  };
  journey: {
    kicker: string;
    title: string;
    subtitle: string;
    stagePrefix: string;
    milestoneLabel: string;
    footerTitle: string;
    footerSub: string;
    browseSarees: string;
    trackOrder: string;
    milestones: JourneyMilestoneCopy[];
  };
  packaging: {
    kicker: string;
    title: string;
    subtitle: string;
    boxStep: string;
    boxTitle: string;
    boxDesc: string;
    tieStep: string;
    tieTitle: string;
    tieDesc: string;
    cardStep: string;
    cardTitle: string;
    cardDesc: string;
    previewLabel: string;
    frontTab: string;
    backTab: string;
    cardHeader: string;
    cardQuote: string;
    cardP1: string;
    cardP2: string;
    cardCurated: string;
    backTitle: string;
    backSub: string;
    inspectionMarkTitle: string;
    inspectionSteps: string[];
    careTitle: string;
    careSteps: string[];
    liveUpdatesNote: string;
    trackParcel: string;
    turnCard: string;
    viewBack: string;
    viewFront: string;
    complimentaryNote: string;
  };
  arrival: {
    kicker: string;
    title: string;
    trackExisting: string;
    steps: { step: string; title: string; text: string }[];
    scheduleTitle: string;
    scheduleSub: string;
    prepLabel: string;
    transitLabel: string;
    etaLabel: string;
    tableRegion: string;
    tablePrep: string;
    tableTransit: string;
    tableTotalEta: string;
    calendarKicker: string;
    calendarTitle: string;
    browseLink: string;
    madeToOrderNote: string;
    newDropsBtn: string;
    zones: {
      id: string;
      zone: string;
      prepWindow: string;
      transitWindow: string;
      totalWindow: string;
      carrierNote: string;
    }[];
    drops: {
      cadence: string;
      title: string;
      detail: string;
      filterLink: string;
    }[];
  };
  catalog: {
    collectionKicker: string;
    newArrivalsTitle: string;
    allSareesTitle: string;
    defaultSub: string;
    demoSuffix: string;
    filtersBtn: string;
    sortPopularity: string;
    sortNewest: string;
    sortPriceAsc: string;
    sortPriceDesc: string;
    refineTitle: string;
    reset: string;
    searchLabel: string;
    searchPlaceholder: string;
    categoryLabel: string;
    allOption: string;
    priceRangeLabel: string;
    allPrices: string;
    under2000: string;
    range2000to4000: string;
    above4000: string;
    sareeTypeLabel: string;
    colourPaletteLabel: string;
    newArrivalsOnly: string;
    showingPrefix: string;
    ofLabel: string;
    sareesUnit: string;
    clearFilters: string;
    emptyTitle: string;
    emptySub: string;
    showAllBtn: string;
    loadMoreBtn: string;
  };
  product: {
    demoItem: string;
    demoProduct: string;
    addToCart: string;
    soldOut: string;
    savedWishlist: string;
    removedWishlist: string;
    addedToBagPrefix: string;
    sareeNotFound: string;
    returnCatalogue: string;
    homeCrumb: string;
    shopAllCrumb: string;
    patronReviewSingular: string;
    patronReviewPlural: string;
    beFirstReview: string;
    inclusiveTaxes: string;
    colourLabel: string;
    quantityLabel: string;
    availabilityLabel: string;
    buyNow: string;
    fabricLabel: string;
    lengthLabel: string;
    blouseLabel: string;
    careLabel: string;
    howWhenTitle: string;
    freeShippingAbove: string;
    packagingPromise: string;
    previewUnboxing: string;
    relatedTitle: string;
    quickViewFabric: string;
    quickViewLength: string;
    quickViewSelectColour: string;
    quickViewAddToBag: string;
    quickViewFullDetails: string;
  };
  reviews: {
    kicker: string;
    title: string;
    moderationNote: string;
    publishedSingular: string;
    publishedPlural: string;
    shareTitle: string;
    reviewingPrefix: string;
    checkingAuth: string;
    signInPrompt: string;
    signInBtn: string;
    submittedBanner: string;
    yourRating: string;
    ratingLabels: Record<number, string>;
    yourName: string;
    cityState: string;
    yourReview: string;
    commentPlaceholder: string;
    submitBtn: string;
    submittingBtn: string;
    errName: string;
    errCity: string;
    errComment: string;
    toastSubmitted: string;
    pendingBadge: string;
    rejectedBadge: string;
    visibleOnlyYou: string;
    adminNotePrefix: string;
    noReviewsTitle: string;
    noReviewsSub: string;
    demoFeaturedLabel: string;
    verifiedPatronLabel: string;
  };
  cart: {
    bagTitle: string;
    drawerTitle: string;
    freeShippingUnlocked: string;
    addMorePrefix: string;
    addMoreSuffix: string;
    emptyTitle: string;
    emptySub: string;
    browseSarees: string;
    continueShopping: string;
    eachLabel: string;
    colourLabel: string;
    codeLabel: string;
    subtotal: string;
    shipping: string;
    estimatedShipping: string;
    complimentary: string;
    discountLabel: string;
    total: string;
    viewCart: string;
    checkout: string;
    orderSummary: string;
    discountCodeLabel: string;
    tryDemo: string;
    enterCode: string;
    apply: string;
    appliedPrefix: string;
    remove: string;
    proceedCheckout: string;
    invalidDiscount: string;
    minOrderRequired: string;
    appliedSuccess: string;
  };
  checkout: {
    title: string;
    emptyTitle: string;
    emptySub: string;
    browseSarees: string;
    signInHeading: string;
    signInSub: string;
    continueGoogle: string;
    savedAddressesTitle: string;
    deliveryDetails: string;
    fullName: string;
    mobileNumber: string;
    emailAddress: string;
    fullAddress: string;
    addressPlaceholder: string;
    city: string;
    state: string;
    pincode: string;
    orderNote: string;
    orderNotePlaceholder: string;
    paymentMethod: string;
    razorpayConnected: string;
    testModePlaceholder: string;
    testModeNotice: string;
    netBanking: string;
    cod: string;
    yourOrder: string;
    itemsLabel: string;
    qtyLabel: string;
    discountPlaceholder: string;
    apply: string;
    subtotal: string;
    shipping: string;
    complimentary: string;
    discount: string;
    payableTotal: string;
    submittingOrder: string;
    placeCod: string;
    confirmTestModePrefix: string;
    confirmTestModeSuffix: string;
    inspectedTaggedNote: string;
    orderReceivedKicker: string;
    thankYouTitle: string;
    whatNext: string;
    nextStep1: string;
    nextStep2: string;
    nextStep3: string;
    trackLiveBtn: string;
    viewAccountBtn: string;
    errSignIn: string;
    errPincode: string;
  };
  trackOrder: {
    kicker: string;
    title: string;
    subtitle: string;
    orderIdLabel: string;
    emailLabel: string;
    trackBtn: string;
    loading: string;
    notFoundTitle: string;
    notFoundBody: string;
    realtimeActive: string;
    lastUpdated: string;
    orderTotal: string;
    actionNeededTitle: string;
    actionNeededBody: string;
    cancelledTitle: string;
    paymentStatusLabel: string;
    cancelledHelp: string;
    fulfillmentProgress: string;
    currentStage: string;
    courierTitle: string;
    courierPartner: string;
    trackingNumber: string;
    itemsInOrder: string;
    destinationDates: string;
    destination: string;
    placedOn: string;
    accountPrompt: string;
    myAccountLink: string;
    stepDetails: Record<string, string>;
  };
  account: {
    welcomeTitle: string;
    welcomeSub: string;
    signInBtn: string;
    savedWishlist: string;
    kicker: string;
    yourAccountFallback: string;
    openAdmin: string;
    signOut: string;
    tabOrders: string;
    tabWishlist: string;
    tabAddresses: string;
    tabProfile: string;
    loadingOrders: string;
    noOrdersTitle: string;
    exploreSarees: string;
    orderPrefix: string;
    statusPrefix: string;
    unavailableNotice: string;
    courierLabel: string;
    trackingLabel: string;
    qtyLabel: string;
    emailUpdatesTitle: string;
    sentEmail: string;
    deliveryFailed: string;
    loggedEmail: string;
    deliverTo: string;
    liveTrackingLink: string;
    cancelOrderBtn: string;
    emptyWishlist: string;
    savedAddressesHeading: string;
    addNewAddress: string;
    labelField: string;
    recipientField: string;
    mobileField: string;
    fullAddressField: string;
    cityField: string;
    stateField: string;
    pinField: string;
    saveAddressBtn: string;
    cancelBtn: string;
    profileTitle: string;
    fullNameField: string;
    emailField: string;
    mobileOptionalField: string;
    saveProfileBtn: string;
    savingProfileBtn: string;
    profileUpdatedToast: string;
    addressSavedToast: string;
    invalidPincodeToast: string;
  };
  about: {
    kicker: string;
    title: string;
    subtitle: string;
    heritageTitle: string;
    heritageP1: string;
    heritageP2: string;
    archiveKicker: string;
    archiveTitle: string;
    archiveTag: string;
    cards: { title: string; desc: string }[];
    ctaExplore: string;
    ctaTrack: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationSchema> = {
  en: {
    nav: {
      announcement: 'Traditional Weaves from Bagalkot | Discover the Heritage of Karnataka',
      languageLabel: 'Language',
      home: 'Home',
      shopAll: 'Shop All',
      ilkalSarees: 'Ilkal Sarees',
      banahattiSarees: 'Banahatti Sarees',
      cottonSarees: 'Cotton Sarees',
      silkSarees: 'Silk Sarees',
      newArrivals: 'New Arrivals',
      aboutUs: 'About Us',
      trackOrder: 'Track Order',
      admin: 'Admin',
      adminDashboard: 'Admin Dashboard',
      myAccountOrders: 'My Account & Orders',
      searchPlaceholder: 'Search by saree name, weave (Ilkal, Banahatti), colour, or code...',
      searchButton: 'Search',
      mobileFooter: 'Bagalkot District, Karnataka · Pan-India Dispatch',
      languageChangedToast: 'Language switched to English',
    },
    footer: {
      brandDesc:
        'Curating traditional sarees inspired by the weaving heritage of Bagalkot District, Karnataka. Every piece is individually inspected and presented in signature SIRIMAGGA packaging.',
      location: 'Bagalkot District, Karnataka, India',
      shopCategories: 'Shop Categories',
      customerCare: 'Customer Care & Policies',
      trackOrder: 'Track Your Order',
      aboutUs: 'About Us',
      contactUs: 'Contact Us',
      shippingPolicy: 'Shipping Policy',
      returnPolicy: 'Return and Refund Policy',
      privacyPolicy: 'Privacy Policy',
      termsConditions: 'Terms and Conditions',
      connectTitle: 'Connect With Us',
      connectDesc:
        'For styling guidance, saree inquiries, or order assistance, reach out through our channels.',
      whatsappConcierge: 'WhatsApp Concierge',
      copyright: 'All rights reserved. Bagalkot District, Karnataka.',
      demoNote: 'Demo catalog prices & reviews clearly indicated until store inventory is live.',
      adminPortal: 'Admin Portal',
    },
    home: {
      heroKicker: 'Bagalkot District · Karnataka · Est. Heritage Craft',
      heroTitle: 'Heritage Woven in Bagalkot. Styled for Today.',
      heroSubtitle:
        "Discover the timeless beauty of Karnataka's traditional sarees, individually inspected, wrapped in our keepsake box with an enclosed Company Story Card, and delivered across India.",
      shopCollection: 'Shop the Collection',
      exploreNewArrivals: 'Explore New Arrivals',
      jumpJourney: 'Our Journey',
      jumpBoxCard: 'Keepsake Box & Company Card',
      jumpDelivery: 'Delivery Schedule',
      shopByCollection: 'Shop by Collection',
      shopByCollectionSub: 'Six curated expressions of North Karnataka drapery and regional textile craft.',
      shopNow: 'Shop Now',
      bestsellingSarees: 'Bestselling Sarees',
      bestsellingSub: 'Most requested weaves from our curated Karnataka collection',
      bestsellingDemoSuffix: ' · Demo catalog entries shown for preview',
      viewCompleteCatalogue: 'View Complete Catalogue',
      ourHeritageKicker: 'Our Heritage',
      ourHeritageTitle: 'Rooted in Tradition. Woven for Generations.',
      ourHeritageP1:
        'Across Bagalkot District—from the storied looms of Ilkal to the cotton-weaving towns of Rabkavi and Banahatti—textile craft has shaped daily life and festive celebration for generations.',
      ourHeritageP2:
        'SIRIMAGGA brings these regional styles to discerning wardrobes across India. Every saree ordered is carefully reviewed for border clarity, fabric feel, and finish before receiving the SIRIMAGGA mark and protective boutique packaging.',
      readStory: 'Read the SIRIMAGGA Story',
      whyChooseTitle: 'Why Choose SIRIMAGGA?',
      whyChooseFeatures: [
        {
          title: 'Carefully Selected Sarees',
          description:
            'Each saree is individually reviewed for weave uniformity, border finish, and fabric drape before it enters our collection.',
        },
        {
          title: 'Karnataka Textile Heritage',
          description:
            'Curated from the historic weaving belt of Bagalkot District, celebrating Ilkal, Banahatti, and timeless regional motifs.',
        },
        {
          title: 'Premium Brand Packaging',
          description:
            'Every order is inspected, tagged with the SIRIMAGGA mark, and thoughtfully folded in protective signature packaging.',
        },
        {
          title: 'Reliable Delivery Across India',
          description:
            'Tracked Pan-India shipping with clear status updates from confirmation and quality inspection through doorstep arrival.',
        },
      ],
      newArrivalsTitle: 'New Arrivals',
      newArrivalsSub: 'Recently added cotton, Ilkal, and festive silk drapes.',
      exploreNewArrivalsBtn: 'Explore New Arrivals',
      testimonialsTitle: 'Words from Our Patrons',
      testimonialsSub: 'Patron impressions illustrating the SIRIMAGGA experience.',
      demoReviewBadge: 'Demo Review',
      newsletterTitle: 'Stay Connected with SIRIMAGGA',
      newsletterSub:
        'Receive thoughtful announcements when new Bagalkot weaves, seasonal cottons, and festive silk editions arrive.',
      newsletterSuccess: 'Thank you for joining the SIRIMAGGA circle.',
      newsletterPlaceholder: 'Enter your email address',
      subscribe: 'Subscribe',
      subscribing: 'Subscribing...',
    },
    journey: {
      kicker: 'Our Journey · From Bagalkot Looms to Your Wardrobe',
      title: 'How Humble Beginnings Grew Into SIRIMAGGA',
      subtitle:
        'Trace our evolution from a single regional inspection desk in Bagalkot District to a curated online house honouring Karnataka’s traditional weaves.',
      stagePrefix: 'Stage',
      milestoneLabel: 'Milestone:',
      footerTitle: 'From Bagalkot’s Loom Heritage to Your Doorstep Today',
      footerSub:
        'Explore our current collections or inspect how every order is boxed and shipped across India.',
      browseSarees: 'Browse Sarees',
      trackOrder: 'Track Order',
      milestones: [
        {
          id: 'heritage-roots',
          step: '01',
          timeframe: 'Generations Past',
          location: 'Ilkal, Rabkavi & Banahatti',
          title: 'Rooted in Bagalkot Weaving Heritage',
          subtitle: 'Where the love for regional cottons and temple borders began',
          description:
            'Long before SIRIMAGGA existed online, Bagalkot District was celebrated across Karnataka for breathable everyday cottons, hand-interlocked Ilkal pallus, and enduring festive drapes crafted with quiet family pride.',
          highlight: 'Living textile craft passed down across North Karnataka towns.',
        },
        {
          id: 'humble-desk',
          step: '02',
          timeframe: '2023',
          location: 'Bagalkot District · Humble Beginnings',
          title: 'A Single Inspection Table & Curated Selections',
          subtitle: 'Starting modestly—one saree reviewed at a time',
          description:
            'SIRIMAGGA started small from a single regional workspace in Bagalkot. Instead of holding impersonal warehouse bulk, we began hand-selecting small lots of Banahatti cottons and classic maroon Ilkal sarees, checking border tension and drape quality personally for early patrons.',
          highlight: 'First 100+ sarees inspected and delivered on personal trust.',
        },
        {
          id: 'quality-seal',
          step: '03',
          timeframe: 'Early 2024',
          location: 'Quality & Tagging Desk',
          title: 'Every Piece Unrolled, Verified & Brand-Tagged',
          subtitle: 'Establishing boutique-grade inspection standards',
          description:
            'As word spread beyond nearby districts, we formalized a dedicated inspection checklist before dispatch—verifying zari clarity, colourfastness, blouse-piece length, and finishing before attaching the SIRIMAGGA shuttle seal.',
          highlight: 'Consistent quality assurance on every drape before packing.',
        },
        {
          id: 'signature-box',
          step: '04',
          timeframe: 'Late 2024',
          location: 'Packaging Studio · Bagalkot',
          title: 'Keepsake Kraft Boxes & Enclosed Company Card',
          subtitle: 'Turning regional drapery into a memorable unboxing ritual',
          description:
            'We introduced our signature archival kraft keepsake boxes tied with crimson-and-gold twisted yarn, paired with our printed Company Story & Wash Care Card so every customer receives Bagalkot’s story in their hands.',
          highlight: 'Protective keepsake presentation ready for gifting or safekeeping.',
        },
        {
          id: 'online-boutique',
          step: '05',
          timeframe: '2025 – 2026',
          location: 'Bagalkot to Pan-India',
          title: 'A Modern Online House for Heritage Sarees',
          subtitle: 'Old-world textiles paired with digital precision',
          description:
            'Today, SIRIMAGGA connects Bagalkot’s textile heritage with wardrobes across India—combining weekly Friday Loom Drops, transparent delivery ETAs, automated order status emails, and real-time order tracking from confirmation to doorstep arrival.',
          highlight: 'Pan-India tracked delivery with transparent status updates.',
        },
      ],
    },
    packaging: {
      kicker: 'Signature Presentation · Included With Every Saree',
      title: 'The SIRIMAGGA Keepsake Box & Enclosed Company Card',
      subtitle:
        'Every parcel leaves Bagalkot hand-folded in our archival kraft box, tied in crimson-and-gold yarn, and accompanied by our printed story and care card.',
      boxStep: '01 · BOX',
      boxTitle: 'Archival Kraft Keepsake',
      boxDesc: 'Rigid moisture-protective box sealed with the SIRIMAGGA shuttle crest.',
      tieStep: '02 · TIE',
      tieTitle: 'Crimson & Gold Yarn',
      tieDesc: 'Wrapped in festive two-tone yarn with our hand-inspected promise seal.',
      cardStep: '03 · CARD',
      cardTitle: 'Company & Care Insert',
      cardDesc: 'Tells the SIRIMAGGA story, inspection mark, and saree care symbols.',
      previewLabel: 'Inside Your Box — Preview the Enclosed Company Card',
      frontTab: 'Front · Company Story',
      backTab: 'Back · Arrival & Care',
      cardHeader: 'About Our House · Bagalkot District, Karnataka',
      cardQuote: '"Old-World Karnataka Looms, Presented for Today."',
      cardP1:
        'Born in the weaving belt of Ilkal, Rabkavi, and Banahatti, SIRIMAGGA began with a simple promise: every traditional saree should reach its wearer with full transparency, calm inspection, and boutique care.',
      cardP2:
        'Before this box was tied, your saree was individually unrolled, checked along every yard of border and pallu, tagged with the SIRIMAGGA seal, and folded in protective paper.',
      cardCurated: 'Curated in Bagalkot',
      backTitle: 'How It Came & Care Guide',
      backSub: 'Inspection · Packaging · Garment Longevity',
      inspectionMarkTitle: 'Inspection & Dispatch Mark',
      inspectionSteps: [
        'Day 0–1: Order & Availability Confirmed',
        'Day 1–2: Border & Drape Quality Passed',
        'Day 2: Tagged, Boxed & Card Enclosed',
        'Day 3–7: Pan-India Tracked Arrival',
      ],
      careTitle: 'Wash & Storage Guide',
      careSteps: [
        '• Cold gentle hand wash separately for cottons',
        '• Dry clean recommended for festive silk weaves',
        '• Shade dry only; avoid harsh direct noon sun',
        '• Refold in breathable muslin every 3 months',
      ],
      liveUpdatesNote: 'Live updates sent via order status email',
      trackParcel: 'Track Your Parcel',
      turnCard: 'Turn Card Over',
      viewBack: 'View Back',
      viewFront: 'View Front',
      complimentaryNote: 'Included complimentary with all orders',
    },
    arrival: {
      kicker: 'Dispatch & Drop Schedule · Transparent Timelines',
      title: 'How Your Saree Will Come & When It Arrives',
      trackExisting: 'Track an Existing Order',
      steps: [
        {
          step: 'Day 0 – 1',
          title: '01. Confirmation',
          text: 'Availability is verified on your selected saree and your confirmation email + live tracker link go out.',
        },
        {
          step: 'Day 1 – 2',
          title: '02. Quality Check & Tag',
          text: 'Border interlock, pallu weave, and fabric finish are inspected by hand before attaching the SIRIMAGGA tag.',
        },
        {
          step: 'Day 2',
          title: '03. Box & Company Card',
          text: 'Folded inside our archival kraft box, wrapped with crimson-gold yarn, and paired with your Story & Care Card.',
        },
        {
          step: 'Day 3 – 7',
          title: '04. Doorstep Delivery',
          text: 'Handed over to tracked Pan-India courier with automated Shipped and Delivered email updates.',
        },
      ],
      scheduleTitle: 'When Will Your Order Arrive? (Pan-India Schedule)',
      scheduleSub: 'Select your delivery region to check preparation and courier transit days.',
      prepLabel: 'Inspection & Packing',
      transitLabel: 'Courier Transit',
      etaLabel: 'Estimated Doorstep Arrival',
      tableRegion: 'Region',
      tablePrep: 'Prep',
      tableTransit: 'Transit',
      tableTotalEta: 'Total ETA',
      calendarKicker: 'When New Sarees Arrive',
      calendarTitle: 'The SIRIMAGGA Loom Drop Calendar',
      browseLink: 'Browse →',
      madeToOrderNote: 'Made-to-order pieces ship within 5–7 business days.',
      newDropsBtn: 'New Drops',
      zones: [
        {
          id: 'north-karnataka',
          zone: 'Bagalkot, Hubballi-Dharwad & North Karnataka',
          prepWindow: '1–2 Business Days',
          transitWindow: '1–2 Business Days',
          totalWindow: '2–3 Business Days',
          carrierNote: 'Fastest regional dispatch directly from Bagalkot District',
        },
        {
          id: 'karnataka-metros',
          zone: 'Bengaluru, Mysuru & Coastal Karnataka',
          prepWindow: '1–2 Business Days',
          transitWindow: '2 Business Days',
          totalWindow: '3–4 Business Days',
          carrierNote: 'Overnight hub connectivity via tracked surface & express routes',
        },
        {
          id: 'south-west',
          zone: 'Maharashtra, Telangana, Tamil Nadu & Andhra Pradesh',
          prepWindow: '1–2 Business Days',
          transitWindow: '2–3 Business Days',
          totalWindow: '4–5 Business Days',
          carrierNote: 'Doorstep courier with live AWB tracking and email alerts',
        },
        {
          id: 'rest-of-india',
          zone: 'Delhi NCR, Gujarat, North, East & Rest of India',
          prepWindow: '1–2 Business Days',
          transitWindow: '3–5 Business Days',
          totalWindow: '5–7 Business Days',
          carrierNote: 'Insured national air/surface dispatch in moisture-safe kraft box',
        },
      ],
      drops: [
        {
          cadence: 'Every Friday · 6:00 PM IST',
          title: 'Weekly Heritage Loom Drop',
          detail: 'Small-batch Ilkal Tope Teni & contrasting pallu weaves released in limited runs.',
          filterLink: '/shop?filter=new',
        },
        {
          cadence: '1st & 15th of Every Month',
          title: 'Banahatti Breathable Cotton Restock',
          detail: 'Lightweight 420g–480g workday and daily-wear cotton palettes replenished.',
          filterLink: '/collection/banahatti-cotton-sarees',
        },
        {
          cadence: 'Pre-Festival Calendar',
          title: 'Auspicious Silk & Kasuti Editions',
          detail: 'Curated ahead of Ugadi, Vara Mahalakshmi, Dussehra, and Deepavali.',
          filterLink: '/collection/festive-sarees',
        },
      ],
    },
    catalog: {
      collectionKicker: 'SIRIMAGGA Collection',
      newArrivalsTitle: 'New Arrivals',
      allSareesTitle: 'All Sarees',
      defaultSub: 'Browse traditional Ilkal, Banahatti cotton, and festive silk sarees from Bagalkot District.',
      demoSuffix: ' (Demo items displayed for preview.)',
      filtersBtn: 'Filters',
      sortPopularity: 'Sort: Popularity',
      sortNewest: 'Sort: Newest',
      sortPriceAsc: 'Price: Low to High',
      sortPriceDesc: 'Price: High to Low',
      refineTitle: 'Refine Selection',
      reset: 'Reset',
      searchLabel: 'Search Catalogue',
      searchPlaceholder: 'Name, weave, or code...',
      categoryLabel: 'Category',
      allOption: 'All',
      priceRangeLabel: 'Price Range (INR)',
      allPrices: 'All Prices',
      under2000: 'Under ₹2,000',
      range2000to4000: '₹2,000 – ₹4,000',
      above4000: 'Above ₹4,000',
      sareeTypeLabel: 'Saree Type',
      colourPaletteLabel: 'Colour Palette',
      newArrivalsOnly: 'New Arrivals Only',
      showingPrefix: 'Showing',
      ofLabel: 'of',
      sareesUnit: 'sarees',
      clearFilters: 'Clear filters',
      emptyTitle: 'No sarees match your current filters',
      emptySub: 'Try broadening your price range or clearing a category filter.',
      showAllBtn: 'Show All Sarees',
      loadMoreBtn: 'Load More Sarees',
    },
    product: {
      demoItem: 'Demo Item',
      demoProduct: 'Demo Product',
      addToCart: 'Add to Cart',
      soldOut: 'Sold Out',
      savedWishlist: 'Saved to your wishlist',
      removedWishlist: 'Removed from wishlist',
      addedToBagPrefix: 'Added to your bag:',
      sareeNotFound: 'Saree Not Found',
      returnCatalogue: 'Return to Catalogue',
      homeCrumb: 'Home',
      shopAllCrumb: 'Shop All',
      patronReviewSingular: 'Patron Review',
      patronReviewPlural: 'Patron Reviews',
      beFirstReview: 'Be the first to review this weave',
      inclusiveTaxes: 'Inclusive of all applicable taxes',
      colourLabel: 'Colour:',
      quantityLabel: 'Quantity',
      availabilityLabel: 'Availability',
      buyNow: 'Buy Now',
      fabricLabel: 'Fabric',
      lengthLabel: 'Saree Length',
      blouseLabel: 'Blouse Piece',
      careLabel: 'Care',
      howWhenTitle: 'How & When It Arrives:',
      freeShippingAbove: 'Complimentary shipping above',
      packagingPromise:
        'Individually inspected, wrapped in our archival kraft box with crimson-gold yarn, and paired with our enclosed SIRIMAGGA Company Story & Care Card.',
      previewUnboxing: 'Preview Unboxing →',
      relatedTitle: 'You May Also Admire',
      quickViewFabric: 'Fabric:',
      quickViewLength: 'Length:',
      quickViewSelectColour: 'Select Colour:',
      quickViewAddToBag: 'Add to Bag',
      quickViewFullDetails: 'Full Details',
    },
    reviews: {
      kicker: 'Patron Impressions',
      title: 'Customer Reviews & Ratings',
      moderationNote:
        'Every customer review is thoughtfully verified and moderated by our team before appearing publicly.',
      publishedSingular: 'Published Review',
      publishedPlural: 'Published Reviews',
      shareTitle: 'Share Your Drape Experience',
      reviewingPrefix: 'Reviewing',
      checkingAuth: 'Checking account status...',
      signInPrompt: 'Please sign in with your Google account to rate this saree and submit a verified patron review.',
      signInBtn: 'Sign In with Google to Write a Review',
      submittedBanner:
        'Thank you! Your review has been received and is now awaiting admin moderation before appearing publicly.',
      yourRating: 'Your Rating',
      ratingLabels: {
        1: 'Needs Improvement',
        2: 'Fair',
        3: 'Good Drape',
        4: 'Very Pleased',
        5: 'Exceptional Weave',
      },
      yourName: 'Your Name *',
      cityState: 'City & State *',
      yourReview: 'Your Review *',
      commentPlaceholder: 'Share how the fabric, border craftsmanship, colour, and packaging felt...',
      submitBtn: 'Submit Review for Moderation',
      submittingBtn: 'Submitting Review...',
      errName: 'Please enter your name (at least 2 characters).',
      errCity: 'Please enter your city (e.g., Bengaluru, Karnataka).',
      errComment: 'Please share at least 5 characters about your saree experience.',
      toastSubmitted: 'Review submitted for moderation. It will publish once approved.',
      pendingBadge: 'Your Submission · Pending Admin Moderation',
      rejectedBadge: 'Your Submission · Not Approved for Public Display',
      visibleOnlyYou: 'Visible only to you until approved',
      adminNotePrefix: 'Note from SIRIMAGGA Team:',
      noReviewsTitle: 'No published reviews for this weave yet',
      noReviewsSub:
        'Have you draped this saree? Sign in and share your impression—once approved by our curation team, it will guide fellow patrons here.',
      demoFeaturedLabel: 'Demo Review · Featured Patron',
      verifiedPatronLabel: 'Verified Patron',
    },
    cart: {
      bagTitle: 'Shopping Bag',
      drawerTitle: 'Your Shopping Bag',
      freeShippingUnlocked: 'Complimentary Pan-India delivery unlocked on this order.',
      addMorePrefix: 'Add',
      addMoreSuffix: 'more for complimentary India-wide delivery.',
      emptyTitle: 'Your bag is empty',
      emptySub: 'Explore our Ilkal, Banahatti, and Festive Silk collections.',
      browseSarees: 'Browse Sarees',
      continueShopping: '← Continue Shopping',
      eachLabel: 'each',
      colourLabel: 'Colour:',
      codeLabel: 'Code:',
      subtotal: 'Subtotal',
      shipping: 'Shipping',
      estimatedShipping: 'Estimated Shipping',
      complimentary: 'Complimentary',
      discountLabel: 'Discount',
      total: 'Total',
      viewCart: 'View Cart',
      checkout: 'Checkout',
      orderSummary: 'Order Summary',
      discountCodeLabel: 'Discount Code (Try Demo:',
      tryDemo: 'SIRI10',
      enterCode: 'Enter code',
      apply: 'Apply',
      appliedPrefix: 'Applied:',
      remove: 'Remove',
      proceedCheckout: 'Proceed to Checkout',
      invalidDiscount: 'Invalid or inactive discount code.',
      minOrderRequired: 'Minimum order required:',
      appliedSuccess: 'Discount code applied successfully.',
    },
    checkout: {
      title: 'Secure Checkout',
      emptyTitle: 'Checkout',
      emptySub: 'Your bag is currently empty.',
      browseSarees: 'Browse Sarees',
      signInHeading: 'Sign in to complete your order',
      signInSub: 'Signing in saves your delivery address and enables live order status & courier tracking.',
      continueGoogle: 'Continue with Google',
      savedAddressesTitle: 'Saved Delivery Addresses',
      deliveryDetails: 'Delivery Details',
      fullName: 'Full Name *',
      mobileNumber: 'Mobile Number *',
      emailAddress: 'Email Address *',
      fullAddress: 'Full Delivery Address *',
      addressPlaceholder: 'House / Flat No., Street, Landmark, Locality',
      city: 'City *',
      state: 'State *',
      pincode: 'PIN Code *',
      orderNote: 'Order Note (Optional)',
      orderNotePlaceholder: 'Gift wrap preference or delivery timing note',
      paymentMethod: 'Payment Method',
      razorpayConnected: 'Razorpay Connected',
      testModePlaceholder: 'Test Mode Integration Placeholder',
      testModeNotice:
        'Payment gateway is prepared for Indian UPI, Cards, and Net Banking via Razorpay. Currently operating in clearly labelled Test Mode until live merchant credentials are configured.',
      netBanking: 'Net Banking',
      cod: 'Cash on Delivery',
      yourOrder: 'Your Order',
      itemsLabel: 'items',
      qtyLabel: 'Qty',
      discountPlaceholder: 'Discount code (e.g. SIRI10)',
      apply: 'Apply',
      subtotal: 'Subtotal',
      shipping: 'Shipping',
      complimentary: 'Complimentary',
      discount: 'Discount',
      payableTotal: 'Payable Total',
      submittingOrder: 'Submitting Order...',
      placeCod: 'Place Order (Cash on Delivery)',
      confirmTestModePrefix: 'Confirm Order (',
      confirmTestModeSuffix: ' Test Mode)',
      inspectedTaggedNote: 'Quality-inspected & tagged by SIRIMAGGA before dispatch.',
      orderReceivedKicker: 'Order Received',
      thankYouTitle: 'Thank You for Your Order',
      whatNext: 'What happens next?',
      nextStep1: '1. Our team confirms availability and prepares your saree for quality inspection.',
      nextStep2: '2. After passing inspection, your saree receives the SIRIMAGGA tag and protective boutique packaging.',
      nextStep3: '3. You will see courier and tracking updates directly inside your Account Order History.',
      trackLiveBtn: 'Track Live Order Status',
      viewAccountBtn: 'View in My Account',
      errSignIn: 'Please sign in with Google to place and track your order.',
      errPincode: 'Please enter a valid 6-digit Indian PIN code.',
    },
    trackOrder: {
      kicker: 'Real-Time Order Status',
      title: 'Track Your SIRIMAGGA Order',
      subtitle:
        'Enter your Order ID and the email address used at checkout to view live fulfillment and dispatch updates.',
      orderIdLabel: 'Order ID *',
      emailLabel: 'Checkout Email Address *',
      trackBtn: 'Track',
      loading: 'Fetching live order status...',
      notFoundTitle: 'No Matching Order Found',
      notFoundBody:
        'We could not find an order matching that Order ID and email address. Please check your confirmation email for the exact Order ID.',
      realtimeActive: 'Real-Time Updates Active',
      lastUpdated: 'Last updated:',
      orderTotal: 'Order Total',
      actionNeededTitle: 'Action Needed on Availability',
      actionNeededBody:
        'One of the selected sarees requires confirmation. Our customer care team will contact you shortly with a curated alternative or full refund option.',
      cancelledTitle: 'This order has been cancelled.',
      paymentStatusLabel: 'Payment status:',
      cancelledHelp: 'Reach out via our Contact page if you need further assistance.',
      fulfillmentProgress: 'Fulfillment Progress',
      currentStage: 'Current Stage',
      courierTitle: 'Dispatch & Courier Information',
      courierPartner: 'Courier Partner:',
      trackingNumber: 'Tracking Number:',
      itemsInOrder: 'Items in Order',
      destinationDates: 'Destination & Dates',
      destination: 'Destination:',
      placedOn: 'Placed on:',
      accountPrompt: 'Signed-in customers can also manage addresses and view full receipts inside',
      myAccountLink: 'My Account',
      stepDetails: {
        'Order Placed': 'Your order has been received by SIRIMAGGA.',
        Confirmed: 'Availability verified and order confirmed for preparation.',
        'Quality Inspection': 'Saree weave, border finish, and length checked by our team.',
        'Packaging in Progress': 'Tagged with the SIRIMAGGA mark and folded in protective packaging.',
        'Ready to Dispatch': 'Packed and scheduled for courier pickup from Bagalkot District.',
        Shipped: 'In transit with our courier partner.',
        Delivered: 'Delivered to your destination city.',
      },
    },
    account: {
      welcomeTitle: 'Welcome to SIRIMAGGA',
      welcomeSub:
        'Sign in or create your customer account to manage saved delivery addresses, view order history, and track dispatches across India.',
      signInBtn: 'Sign In / Create Account with Google',
      savedWishlist: 'Saved Wishlist',
      kicker: 'Customer Account',
      yourAccountFallback: 'Your Account',
      openAdmin: 'Open Admin Dashboard',
      signOut: 'Sign Out',
      tabOrders: 'Orders & Tracking',
      tabWishlist: 'Wishlist',
      tabAddresses: 'Addresses',
      tabProfile: 'Profile',
      loadingOrders: 'Loading your order history...',
      noOrdersTitle: 'No orders placed yet',
      exploreSarees: 'Explore Sarees',
      orderPrefix: 'Order',
      statusPrefix: 'Status:',
      unavailableNotice:
        'Our team will reach out shortly regarding availability for an item in this order to offer a curated alternative or process a full refund.',
      courierLabel: 'Courier:',
      trackingLabel: 'Tracking Number:',
      qtyLabel: 'Qty',
      emailUpdatesTitle: 'Order Status Email Updates',
      sentEmail: 'Sent via Email',
      deliveryFailed: 'Delivery Failed',
      loggedEmail: 'Cloud Function / SMTP Logged',
      deliverTo: 'Deliver to:',
      liveTrackingLink: 'Live Tracking View',
      cancelOrderBtn: 'Cancel Order',
      emptyWishlist: 'Your wishlist is empty',
      savedAddressesHeading: 'Saved Delivery Addresses',
      addNewAddress: 'Add New Address',
      labelField: 'Label',
      recipientField: 'Recipient Name',
      mobileField: 'Mobile Number',
      fullAddressField: 'Full Address',
      cityField: 'City',
      stateField: 'State',
      pinField: 'PIN Code',
      saveAddressBtn: 'Save Address',
      cancelBtn: 'Cancel',
      profileTitle: 'Profile Settings',
      fullNameField: 'Full Name',
      emailField: 'Email',
      mobileOptionalField: 'Mobile Number',
      saveProfileBtn: 'Save Profile',
      savingProfileBtn: 'Saving...',
      profileUpdatedToast: 'Profile updated.',
      addressSavedToast: 'Delivery address saved.',
      invalidPincodeToast: 'Please enter a valid 6-digit PIN code.',
    },
    about: {
      kicker: 'Our House · Bagalkot District, Karnataka',
      title: 'Old-World Loom Craft. Modern Boutique Discipline.',
      subtitle:
        'SIRIMAGGA celebrates the enduring textile legacy of North Karnataka—bringing curated Ilkal, Banahatti cotton, and festive silk drapes from our regional inspection studio to wardrobes across India.',
      heritageTitle: 'Rooted in Ilkal, Rabkavi & Banahatti',
      heritageP1:
        'Across Bagalkot District, weaving is more than cloth—it is daily discipline, seasonal rhythm, and auspicious ceremony. From breathable Banahatti cottons woven for Indian summers to contrasting Ilkal pallus, every piece reflects generations of regional taste.',
      heritageP2:
        'Rather than holding impersonal bulk warehouse stock, every order is verified for availability, unrolled on our inspection table, tagged with the SIRIMAGGA mark, and enclosed with our Company Story & Care Card.',
      archiveKicker: 'Visual Archive',
      archiveTitle: 'The SIRIMAGGA Crest, Heritage Seals & Editorial Lookbook',
      archiveTag: 'Multilingual Heritage · ಸಿರಿಮಗ್ಗ',
      cards: [
        {
          title: 'Curated Border & Drape Archive',
          desc: 'Macro border detail, lightweight summer cotton weights, and Friday Loom Drop notes.',
        },
        {
          title: 'Heritage Region Seals',
          desc: 'Kannada and English emblems honouring Ilkal (ಇಳಕಲ್), Banahatti (ಬನಹಟ್ಟಿ), and Care (ಆರೈಕೆ).',
        },
        {
          title: 'Shuttle & Loom Campaign Print',
          desc: 'Traditional Bagalkot border framing inspired by classic Karnataka wedding textiles.',
        },
      ],
      ctaExplore: 'Explore the Collection',
      ctaTrack: 'Track Your Order',
    },
  },
  hi: {
    nav: {
      announcement: 'बागलकोट की पारंपरिक बुनाई | कर्नाटक की विरासत का अनुभव करें',
      languageLabel: 'भाषा',
      home: 'होम',
      shopAll: 'सभी साड़ियाँ',
      ilkalSarees: 'इलकल साड़ियाँ',
      banahattiSarees: 'बनहट्टी साड़ियाँ',
      cottonSarees: 'कॉटन साड़ियाँ',
      silkSarees: 'सिल्क साड़ियाँ',
      newArrivals: 'नए कलेक्शन',
      aboutUs: 'हमारे बारे में',
      trackOrder: 'ऑर्डर ट्रैक करें',
      admin: 'एडमिन',
      adminDashboard: 'एडमिन डैशबोर्ड',
      myAccountOrders: 'मेरा खाता और ऑर्डर',
      searchPlaceholder: 'साड़ी का नाम, बुनाई (इलकल, बनहट्टी), रंग या कोड खोजें...',
      searchButton: 'खोजें',
      mobileFooter: 'बागलकोट जिला, कर्नाटक · संपूर्ण भारत में डिलीवरी',
      languageChangedToast: 'भाषा हिन्दी में बदल दी गई है',
    },
    footer: {
      brandDesc:
        'बागलकोट जिला, कर्नाटक की बुनाई परंपरा से प्रेरित प्रामाणिक पारंपरिक साड़ियाँ। प्रत्येक साड़ी की व्यक्तिगत जांच कर सिरीमग्गा (SIRIMAGGA) की विशेष पैकेजिंग में भेजा जाता है।',
      location: 'बागलकोट जिला, कर्नाटक, भारत',
      shopCategories: 'साड़ी श्रेणियाँ',
      customerCare: 'ग्राहक सेवा एवं नीतियाँ',
      trackOrder: 'अपना ऑर्डर ट्रैक करें',
      aboutUs: 'हमारे बारे में',
      contactUs: 'संपर्क करें',
      shippingPolicy: 'शिपिंग नीति',
      returnPolicy: 'रिटर्न और रिफंड नीति',
      privacyPolicy: 'गोपनीयता नीति',
      termsConditions: 'नियम एवं शर्तें',
      connectTitle: 'हमसे जुड़ें',
      connectDesc: 'साड़ी चयन, स्टाइलिंग सलाह या ऑर्डर सहायता के लिए हमारे माध्यमों से संपर्क करें।',
      whatsappConcierge: 'व्हाट्सएप सहायता',
      copyright: 'सर्वाधिकार सुरक्षित। बागलकोट जिला, कर्नाटक।',
      demoNote: 'लाइव स्टॉक जुड़ने तक डेमो कैटलॉग मूल्य और समीक्षाएँ स्पष्ट रूप से दर्शाई गई हैं।',
      adminPortal: 'एडमिन पोर्टल',
    },
    home: {
      heroKicker: 'बागलकोट जिला · कर्नाटक · पारंपरिक वस्त्र कला',
      heroTitle: 'बागलकोट की बुनी विरासत। आज के लिए सजी।',
      heroSubtitle:
        'कर्नाटक की पारंपरिक साड़ियों की कालजयी सुंदरता का अनुभव करें—प्रत्येक साड़ी की सूक्ष्म जांच, हमारे सिग्नेचर बॉक्स और कंपनी स्टोरी कार्ड के साथ पूरे भारत में डिलीवरी।',
      shopCollection: 'कलेक्शन देखें',
      exploreNewArrivals: 'नए आगमन देखें',
      jumpJourney: 'हमारी यात्रा',
      jumpBoxCard: 'कीपसेक बॉक्स व कंपनी कार्ड',
      jumpDelivery: 'डिलीवरी समय-सारणी',
      shopByCollection: 'कलेक्शन के अनुसार चुनें',
      shopByCollectionSub: 'उत्तर कर्नाटक की परंपरा और क्षेत्रीय वस्त्र कला की छह चुनिंदा प्रस्तुतियाँ।',
      shopNow: 'अभी खरीदें',
      bestsellingSarees: 'सबसे लोकप्रिय साड़ियाँ',
      bestsellingSub: 'हमारे चुनिंदा कर्नाटक कलेक्शन की सबसे अधिक पसंद की जाने वाली साड़ियाँ',
      bestsellingDemoSuffix: ' · पूर्वावलोकन के लिए डेमो उत्पाद प्रदर्शित',
      viewCompleteCatalogue: 'पूरा कैटलॉग देखें',
      ourHeritageKicker: 'हमारी विरासत',
      ourHeritageTitle: 'परंपरा में रची-बसी। पीढ़ियों के लिए बुनी।',
      ourHeritageP1:
        'बागलकोट जिले में—इलकल के प्रसिद्ध करघों से लेकर रबकवी और बनहट्टी के कॉटन बुनाई कस्बों तक—वस्त्र कला ने पीढ़ियों से दैनिक जीवन और उत्सवों को सजाया है।',
      ourHeritageP2:
        'SIRIMAGGA इन क्षेत्रीय शैलियों को पूरे भारत के वॉर्डरोब तक लाता है। प्रत्येक ऑर्डर की गई साड़ी को बॉर्डर की स्पष्टता, कपड़े की कोमलता और फिनिशिंग के लिए जांचा जाता है और सिरीमग्गा सील के साथ पैक किया जाता है।',
      readStory: 'SIRIMAGGA की कहानी पढ़ें',
      whyChooseTitle: 'SIRIMAGGA ही क्यों चुनें?',
      whyChooseFeatures: [
        {
          title: 'सावधानी से चुनी गई साड़ियाँ',
          description:
            'हमारे कलेक्शन में शामिल करने से पहले प्रत्येक साड़ी की बुनाई, बॉर्डर फिनिश और ड्रेप की जांच की जाती है।',
        },
        {
          title: 'कर्नाटक की वस्त्र विरासत',
          description:
            'बागलकोट जिले की ऐतिहासिक बुनाई पट्टी से चुनी गई, जो इलकल, बनहट्टी और पारंपरिक मोटिफ्स का सम्मान करती है।',
        },
        {
          title: 'प्रीमियम ब्रांड पैकेजिंग',
          description:
            'हर ऑर्डर की जांच कर सिरीमग्गा टैग लगाया जाता है और सुरक्षित सिग्नेचर बॉक्स में सहेजा जाता है।',
        },
        {
          title: 'संपूर्ण भारत में विश्वसनीय डिलीवरी',
          description:
            'ऑर्डर कन्फर्मेशन और क्वालिटी जांच से लेकर घर पहुंचने तक लाइव ट्रैकिंग और स्पष्ट स्टेटस अपडेट।',
        },
      ],
      newArrivalsTitle: 'नए कलेक्शन',
      newArrivalsSub: 'हाल ही में जोड़े गए कॉटन, इलकल और उत्सव सिल्क साड़ियाँ।',
      exploreNewArrivalsBtn: 'नए कलेक्शन देखें',
      testimonialsTitle: 'हमारे ग्राहकों के शब्द',
      testimonialsSub: 'SIRIMAGGA के अनुभव को दर्शाने वाली ग्राहक समीक्षाएँ।',
      demoReviewBadge: 'डेमो समीक्षा',
      newsletterTitle: 'SIRIMAGGA से जुड़े रहें',
      newsletterSub:
        'जब नए बागलकोट कलेक्शन, मौसमी कॉटन और उत्सव सिल्क साड़ियाँ आएं, तो सबसे पहले सूचना पाएं।',
      newsletterSuccess: 'SIRIMAGGA परिवार से जुड़ने के लिए धन्यवाद।',
      newsletterPlaceholder: 'अपना ईमेल पता दर्ज करें',
      subscribe: 'सदस्य बनें',
      subscribing: 'जुड़ रहा है...',
    },
    journey: {
      kicker: 'हमारी यात्रा · बागलकोट से आपके वॉर्डरोब तक',
      title: 'साधारण शुरुआत से SIRIMAGGA बनने की कहानी',
      subtitle:
        'बागलकोट जिले की एक छोटी निरीक्षण मेज से कर्नाटक की पारंपरिक बुनाई को समर्पित आधुनिक ऑनलाइन बुटीक तक का हमारा सफर देखें।',
      stagePrefix: 'चरण',
      milestoneLabel: 'उपलब्धि:',
      footerTitle: 'बागलकोट की बुनाई परंपरा से आज आपके द्वार तक',
      footerSub: 'हमारे वर्तमान कलेक्शन देखें या जानें कि हर ऑर्डर कैसे पैक होकर पूरे भारत में पहुंचता है।',
      browseSarees: 'साड़ियाँ देखें',
      trackOrder: 'ऑर्डर ट्रैक करें',
      milestones: [
        {
          id: 'heritage-roots',
          step: '01',
          timeframe: 'पीढ़ियों से',
          location: 'इलकल, रबकवी और बनहट्टी',
          title: 'बागलकोट की बुनाई विरासत में जड़ें',
          subtitle: 'जहाँ क्षेत्रीय कॉटन और टेम्पल बॉर्डर के प्रति प्रेम की शुरुआत हुई',
          description:
            'ऑनलाइन आने से बहुत पहले ही, बागलकोट जिला पूरे कर्नाटक में हवादार दैनिक कॉटन, पारंपरिक इलकल पल्लू और उत्सव की साड़ियों के लिए प्रसिद्ध रहा है।',
          highlight: 'उत्तर कर्नाटक के कस्बों में पीढ़ियों से संजोई जीवंत वस्त्र कला।',
        },
        {
          id: 'humble-desk',
          step: '02',
          timeframe: '2023',
          location: 'बागलकोट जिला · विनम्र शुरुआत',
          title: 'एक निरीक्षण मेज और चुनिंदा साड़ियाँ',
          subtitle: 'सादगी भरी शुरुआत—एक समय में एक साड़ी की परख',
          description:
            'SIRIMAGGA की शुरुआत बागलकोट में एक छोटे कार्यस्थल से हुई। बड़े गोदाम रखने के बजाय हमने बनहट्टी कॉटन और मैरून इलकल साड़ियों की व्यक्तिगत जांच कर पहले ग्राहकों तक पहुंचाया।',
          highlight: 'व्यक्तिगत विश्वास पर पहली 100+ साड़ियों की जांच और डिलीवरी।',
        },
        {
          id: 'quality-seal',
          step: '03',
          timeframe: 'प्रारंभिक 2024',
          location: 'गुणवत्ता और टैगिंग डेस्क',
          title: 'प्रत्येक साड़ी की पूर्ण जांच और ब्रांड टैग',
          subtitle: 'बुटीक-स्तरीय गुणवत्ता मानकों की स्थापना',
          description:
            'जैसे-जैसे मांग बढ़ी, हमने भेजने से पहले ज़री की चमक, रंग की पक्की गुणवत्ता, ब्लाउज पीस की लंबाई और सिलाई-बुनाई की जांच कर सिरीमग्गा सील लगाना अनिवार्य किया।',
          highlight: 'पैकिंग से पहले हर साड़ी पर निरंतर गुणवत्ता भरोसा।',
        },
        {
          id: 'signature-box',
          step: '04',
          timeframe: 'अंत 2024',
          location: 'पैकेजिंग स्टूडियो · बागलकोट',
          title: 'कीपसेक क्राफ्ट बॉक्स और कंपनी स्टोरी कार्ड',
          subtitle: 'हर साड़ी को एक यादगार अनबॉक्सिंग अनुभव बनाना',
          description:
            'हमने लाल और सुनहरे धागे से बंधे अपने सिग्नेचर क्राफ्ट बॉक्स और प्रिंटेड कंपनी स्टोरी व केयर कार्ड की शुरुआत की, ताकि हर ग्राहक बागलकोट की कहानी को महसूस कर सके।',
          highlight: 'उपहार देने और सहेजने के लिए तैयार सुरक्षित बॉक्स प्रस्तुति।',
        },
        {
          id: 'online-boutique',
          step: '05',
          timeframe: '2025 – 2026',
          location: 'बागलकोट से संपूर्ण भारत',
          title: 'विरासत साड़ियों का आधुनिक ऑनलाइन बुटीक',
          subtitle: 'पारंपरिक वस्त्र कला और आधुनिक डिजिटल सुविधा का संगम',
          description:
            'आज SIRIMAGGA बागलकोट की बुनाई को पूरे भारत के घरों से जोड़ता है—साप्ताहिक फ्राइडे लूम ड्रॉप्स, स्पष्ट डिलीवरी समय, स्वचालित ईमेल अपडेट और लाइव ऑर्डर ट्रैकिंग के साथ।',
          highlight: 'पारदर्शी स्टेटस अपडेट के साथ संपूर्ण भारत में ट्रैक की गई डिलीवरी।',
        },
      ],
    },
    packaging: {
      kicker: 'सिग्नेचर प्रस्तुति · हर साड़ी के साथ शामिल',
      title: 'SIRIMAGGA कीपसेक बॉक्स और कंपनी स्टोरी कार्ड',
      subtitle:
        'बागलकोट से निकलने वाला हर पार्सल हमारे मजबूत क्राफ्ट बॉक्स में, लाल-सुनहरे धागे से बंधा और हमारी कहानी व देखभाल कार्ड के साथ भेजा जाता है।',
      boxStep: '01 · बॉक्स',
      boxTitle: 'सिग्नेचर क्राफ्ट बॉक्स',
      boxDesc: 'नमी से बचाने वाला मजबूत बॉक्स जिस पर SIRIMAGGA का प्रतीक चिह्न है।',
      tieStep: '02 · बंधन',
      tieTitle: 'लाल और सुनहरा धागा',
      tieDesc: 'दो-रंगे पारंपरिक धागे और गुणवत्ता-जांच सील के साथ सजाया गया।',
      cardStep: '03 · कार्ड',
      cardTitle: 'कंपनी और केयर कार्ड',
      cardDesc: 'इसमें SIRIMAGGA की कहानी, जांच प्रमाण और धुलाई-देखभाल के निर्देश हैं।',
      previewLabel: 'बॉक्स के अंदर — संलग्न कंपनी कार्ड देखें',
      frontTab: 'आगे · कंपनी की कहानी',
      backTab: 'पीछे · आगमन व देखभाल',
      cardHeader: 'हमारे बारे में · बागलकोट जिला, कर्नाटक',
      cardQuote: '"कर्नाटक के पारंपरिक करघे, आज के अंदाज़ में।"',
      cardP1:
        'इलकल, रबकवी और बनहट्टी की बुनाई परंपरा से जन्मा SIRIMAGGA एक सरल वादे पर टिका है: हर पारंपरिक साड़ी पूरी पारदर्शिता, शांत जांच और स्नेहपूर्ण पैकेजिंग के साथ पहुंचे।',
      cardP2:
        'इस बॉक्स को बांधने से पहले आपकी साड़ी को खोलकर उसके बॉर्डर और पल्लू की जांच की गई, SIRIMAGGA सील लगाई गई और सुरक्षित कागज़ में तह किया गया।',
      cardCurated: 'बागलकोट से चयनित',
      backTitle: 'यह कैसे आती है व देखभाल गाइड',
      backSub: 'निरीक्षण · पैकेजिंग · वस्त्र सुरक्षा',
      inspectionMarkTitle: 'निरीक्षण व प्रेषण चरण',
      inspectionSteps: [
        'दिन 0–1: ऑर्डर और उपलब्धता की पुष्टि',
        'दिन 1–2: बॉर्डर व ड्रेप गुणवत्ता की जांच',
        'दिन 2: टैग, बॉक्स और कंपनी कार्ड पैकिंग',
        'दिन 3–7: संपूर्ण भारत में ट्रैक की गई डिलीवरी',
      ],
      careTitle: 'धुलाई व भंडारण निर्देश',
      careSteps: [
        '• कॉटन साड़ियों को ठंडे पानी में अलग से हल्के हाथ से धोएं',
        '• उत्सव सिल्क साड़ियों के लिए ड्राई क्लीन की सलाह है',
        '• केवल छांव में सुखाएं; तेज धूप से बचाएं',
        '• हर 3 महीने में सूती मलमल में तह बदलकर रखें',
      ],
      liveUpdatesNote: 'ईमेल द्वारा लाइव ऑर्डर अपडेट भेजे जाते हैं',
      trackParcel: 'पार्सल ट्रैक करें',
      turnCard: 'कार्ड पलटें',
      viewBack: 'पीछे देखें',
      viewFront: 'आगे देखें',
      complimentaryNote: 'सभी ऑर्डर के साथ निःशुल्क शामिल',
    },
    arrival: {
      kicker: 'प्रेषण और नया स्टॉक · पारदर्शी समय-सारणी',
      title: 'आपकी साड़ी कैसे तैयार होगी और कब पहुंचेगी',
      trackExisting: 'मौजूदा ऑर्डर ट्रैक करें',
      steps: [
        {
          step: 'दिन 0 – 1',
          title: '01. पुष्टि',
          text: 'आपकी चुनी साड़ी की उपलब्धता जांची जाती है और कन्फर्मेशन ईमेल व लाइव ट्रैकिंग लिंक भेजा जाता है।',
        },
        {
          step: 'दिन 1 – 2',
          title: '02. गुणवत्ता जांच और टैग',
          text: 'सिरीमग्गा टैग लगाने से पहले बॉर्डर, पल्लू बुनाई और कपड़े की फिनिश हाथ से जांची जाती है।',
        },
        {
          step: 'दिन 2',
          title: '03. बॉक्स और कंपनी कार्ड',
          text: 'हमारे क्राफ्ट बॉक्स में तह कर लाल-सुनहरे धागे और स्टोरी व केयर कार्ड के साथ पैक किया जाता है।',
        },
        {
          step: 'दिन 3 – 7',
          title: '04. घर तक डिलीवरी',
          text: 'ट्रैक किए गए कूरियर को सौंपा जाता है और शिपिंग व डिलीवरी के ईमेल अपडेट मिलते हैं।',
        },
      ],
      scheduleTitle: 'आपका ऑर्डर कब पहुंचेगा? (संपूर्ण भारत सारणी)',
      scheduleSub: 'तैयारी और कूरियर समय देखने के लिए अपना क्षेत्र चुनें।',
      prepLabel: 'जांच और पैकिंग',
      transitLabel: 'कूरियर यात्रा समय',
      etaLabel: 'अनुमानित डिलीवरी समय',
      tableRegion: 'क्षेत्र',
      tablePrep: 'तैयारी',
      tableTransit: 'यात्रा',
      tableTotalEta: 'कुल समय',
      calendarKicker: 'नया स्टॉक कब आता है',
      calendarTitle: 'SIRIMAGGA लूम ड्रॉप कैलेंडर',
      browseLink: 'देखें →',
      madeToOrderNote: 'मेड-टू-ऑर्डर साड़ियाँ 5–7 कार्यदिवसों में भेजी जाती हैं।',
      newDropsBtn: 'नए ड्रॉप्स',
      zones: [
        {
          id: 'north-karnataka',
          zone: 'बागलकोट, हुब्बल्ली-धारवाड़ और उत्तर कर्नाटक',
          prepWindow: '1–2 कार्यदिवस',
          transitWindow: '1–2 कार्यदिवस',
          totalWindow: '2–3 कार्यदिवस',
          carrierNote: 'बागलकोट जिले से सबसे तेज क्षेत्रीय प्रेषण',
        },
        {
          id: 'karnataka-metros',
          zone: 'बेंगलुरु, मैसूर और तटीय कर्नाटक',
          prepWindow: '1–2 कार्यदिवस',
          transitWindow: '2 कार्यदिवस',
          totalWindow: '3–4 कार्यदिवस',
          carrierNote: 'ट्रैक किए गए एक्सप्रेस रूट के माध्यम से तेज कनेक्टिविटी',
        },
        {
          id: 'south-west',
          zone: 'महाराष्ट्र, तेलंगाना, तमिलनाडु और आंध्र प्रदेश',
          prepWindow: '1–2 कार्यदिवस',
          transitWindow: '2–3 कार्यदिवस',
          totalWindow: '4–5 कार्यदिवस',
          carrierNote: 'लाइव ट्रैकिंग नंबर और ईमेल अलर्ट के साथ होम डिलीवरी',
        },
        {
          id: 'rest-of-india',
          zone: 'दिल्ली एनसीआर, गुजरात, उत्तर, पूर्व और शेष भारत',
          prepWindow: '1–2 कार्यदिवस',
          transitWindow: '3–5 कार्यदिवस',
          totalWindow: '5–7 कार्यदिवस',
          carrierNote: 'सुरक्षित क्राफ्ट बॉक्स में बीमित राष्ट्रीय हवाई/सड़क डिलीवरी',
        },
      ],
      drops: [
        {
          cadence: 'प्रत्येक शुक्रवार · शाम 6:00 बजे IST',
          title: 'साप्ताहिक हेरिटेज लूम ड्रॉप',
          detail: 'सीमित संख्या में इलकल तोपे तेनी और आकर्षक पल्लू वाली साड़ियों का नया संग्रह।',
          filterLink: '/shop?filter=new',
        },
        {
          cadence: 'हर महीने की 1 और 15 तारीख',
          title: 'बनहट्टी हल्के कॉटन का नया स्टॉक',
          detail: 'ऑफिस और दैनिक पहनने के लिए हल्की 420g–480g कॉटन साड़ियों के नए रंग।',
          filterLink: '/collection/banahatti-cotton-sarees',
        },
        {
          cadence: 'त्यौहारों से पूर्व कैलेंडर',
          title: 'मंगल उत्सव सिल्क व कसूती संस्करण',
          detail: 'उगादी, वरमहालक्ष्मी, दशहरा और दीपावली के लिए विशेष रूप से तैयार।',
          filterLink: '/collection/festive-sarees',
        },
      ],
    },
    catalog: {
      collectionKicker: 'SIRIMAGGA संग्रह',
      newArrivalsTitle: 'नए कलेक्शन',
      allSareesTitle: 'सभी साड़ियाँ',
      defaultSub: 'बागलकोट जिले की पारंपरिक इलकल, बनहट्टी कॉटन और उत्सव सिल्क साड़ियाँ देखें।',
      demoSuffix: ' (पूर्वावलोकन के लिए डेमो उत्पाद प्रदर्शित हैं।)',
      filtersBtn: 'फ़िल्टर',
      sortPopularity: 'क्रम: लोकप्रियता',
      sortNewest: 'क्रम: नवीनतम',
      sortPriceAsc: 'मूल्य: कम से अधिक',
      sortPriceDesc: 'मूल्य: अधिक से कम',
      refineTitle: 'चयन निखारें',
      reset: 'रीसेट करें',
      searchLabel: 'कैटलॉग में खोजें',
      searchPlaceholder: 'नाम, बुनाई या कोड...',
      categoryLabel: 'श्रेणी',
      allOption: 'सभी',
      priceRangeLabel: 'मूल्य सीमा (₹)',
      allPrices: 'सभी मूल्य',
      under2000: '₹2,000 से कम',
      range2000to4000: '₹2,000 – ₹4,000',
      above4000: '₹4,000 से अधिक',
      sareeTypeLabel: 'साड़ी का प्रकार',
      colourPaletteLabel: 'रंग चुनें',
      newArrivalsOnly: 'केवल नए कलेक्शन',
      showingPrefix: 'दिखा रहे हैं',
      ofLabel: 'में से',
      sareesUnit: 'साड़ियाँ',
      clearFilters: 'फ़िल्टर हटाएं',
      emptyTitle: 'वर्तमान फ़िल्टर से कोई साड़ी नहीं मिली',
      emptySub: 'कृपया मूल्य सीमा बढ़ाएं या श्रेणी फ़िल्टर हटाएं।',
      showAllBtn: 'सभी साड़ियाँ दिखाएं',
      loadMoreBtn: 'और साड़ियाँ देखें',
    },
    product: {
      demoItem: 'डेमो उत्पाद',
      demoProduct: 'डेमो उत्पाद',
      addToCart: 'बैग में जोड़ें',
      soldOut: 'स्टॉक समाप्त',
      savedWishlist: 'विशलिस्ट में सहेजा गया',
      removedWishlist: 'विशलिस्ट से हटाया गया',
      addedToBagPrefix: 'बैग में जोड़ा गया:',
      sareeNotFound: 'साड़ी नहीं मिली',
      returnCatalogue: 'कैटलॉग पर लौटें',
      homeCrumb: 'होम',
      shopAllCrumb: 'सभी साड़ियाँ',
      patronReviewSingular: 'ग्राहक समीक्षा',
      patronReviewPlural: 'ग्राहक समीक्षाएँ',
      beFirstReview: 'इस साड़ी की पहली समीक्षा लिखें',
      inclusiveTaxes: 'सभी लागू करों सहित',
      colourLabel: 'रंग:',
      quantityLabel: 'मात्रा',
      availabilityLabel: 'उपलब्धता',
      buyNow: 'अभी खरीदें',
      fabricLabel: 'कपड़ा',
      lengthLabel: 'साड़ी की लंबाई',
      blouseLabel: 'ब्लाउज पीस',
      careLabel: 'देखभाल',
      howWhenTitle: 'कैसे और कब पहुंचेगी:',
      freeShippingAbove: 'निःशुल्क शिपिंग ऑर्डर पर:',
      packagingPromise:
        'व्यक्तिगत रूप से जांची गई, हमारे क्राफ्ट बॉक्स में लाल-सुनहरे धागे और कंपनी स्टोरी व केयर कार्ड के साथ पैक।',
      previewUnboxing: 'अनबॉक्सिंग देखें →',
      relatedTitle: 'आपको यह भी पसंद आ सकती हैं',
      quickViewFabric: 'कपड़ा:',
      quickViewLength: 'लंबाई:',
      quickViewSelectColour: 'रंग चुनें:',
      quickViewAddToBag: 'बैग में जोड़ें',
      quickViewFullDetails: 'पूरा विवरण',
    },
    reviews: {
      kicker: 'ग्राहक अनुभव',
      title: 'ग्राहक समीक्षाएँ एवं रेटिंग',
      moderationNote:
        'सार्वजनिक रूप से प्रकाशित होने से पहले हमारी टीम प्रत्येक समीक्षा की जांच और स्वीकृति करती है।',
      publishedSingular: 'प्रकाशित समीक्षा',
      publishedPlural: 'प्रकाशित समीक्षाएँ',
      shareTitle: 'अपना अनुभव साझा करें',
      reviewingPrefix: 'समीक्षा:',
      checkingAuth: 'खाता स्थिति जांची जा रही है...',
      signInPrompt: 'इस साड़ी को रेट करने और समीक्षा लिखने के लिए कृपया अपने Google खाते से साइन इन करें।',
      signInBtn: 'समीक्षा लिखने के लिए Google से साइन इन करें',
      submittedBanner:
        'धन्यवाद! आपकी समीक्षा प्राप्त हो गई है और एडमिन स्वीकृति के बाद सार्वजनिक रूप से दिखाई देगी।',
      yourRating: 'आपकी रेटिंग',
      ratingLabels: {
        1: 'सुधार की आवश्यकता',
        2: 'सामान्य',
        3: 'अच्छी साड़ी',
        4: 'बहुत बढ़िया',
        5: 'उत्कृष्ट बुनाई',
      },
      yourName: 'आपका नाम *',
      cityState: 'शहर व राज्य *',
      yourReview: 'आपकी समीक्षा *',
      commentPlaceholder: 'साड़ी का कपड़ा, बॉर्डर की कारीगरी, रंग और पैकेजिंग कैसी लगी, बताएं...',
      submitBtn: 'समीक्षा भेजें',
      submittingBtn: 'भेजा जा रहा है...',
      errName: 'कृपया अपना नाम दर्ज करें (कम से कम 2 अक्षर)।',
      errCity: 'कृपया अपना शहर दर्ज करें (उदा. बेंगलुरु, कर्नाटक)।',
      errComment: 'कृपया कम से कम 5 अक्षरों में अपना अनुभव लिखें।',
      toastSubmitted: 'समीक्षा जांच के लिए भेज दी गई है। स्वीकृति के बाद प्रकाशित होगी।',
      pendingBadge: 'आपकी समीक्षा · एडमिन जांच की प्रतीक्षा में',
      rejectedBadge: 'आपकी समीक्षा · सार्वजनिक प्रकाशन के लिए स्वीकृत नहीं',
      visibleOnlyYou: 'स्वीकृति तक केवल आपको दिखाई देगी',
      adminNotePrefix: 'SIRIMAGGA टीम की टिप्पणी:',
      noReviewsTitle: 'इस साड़ी के लिए अभी तक कोई प्रकाशित समीक्षा नहीं है',
      noReviewsSub:
        'क्या आपने यह साड़ी पहनी है? साइन इन करें और अपना अनुभव साझा करें—टीम की स्वीकृति के बाद यह अन्य ग्राहकों की मदद करेगी।',
      demoFeaturedLabel: 'डेमो समीक्षा · प्रमुख ग्राहक',
      verifiedPatronLabel: 'सत्यापित ग्राहक',
    },
    cart: {
      bagTitle: 'शॉपिंग बैग',
      drawerTitle: 'आपका शॉपिंग बैग',
      freeShippingUnlocked: 'इस ऑर्डर पर संपूर्ण भारत में निःशुल्क डिलीवरी अनलॉक हो गई है।',
      addMorePrefix: 'निःशुल्क डिलीवरी के लिए',
      addMoreSuffix: 'की और साड़ियाँ जोड़ें।',
      emptyTitle: 'आपका बैग खाली है',
      emptySub: 'हमारे इलकल, बनहट्टी और उत्सव सिल्क कलेक्शन देखें।',
      browseSarees: 'साड़ियाँ देखें',
      continueShopping: '← खरीदारी जारी रखें',
      eachLabel: 'प्रति साड़ी',
      colourLabel: 'रंग:',
      codeLabel: 'कोड:',
      subtotal: 'उप-योग',
      shipping: 'शिपिंग',
      estimatedShipping: 'अनुमानित शिपिंग',
      complimentary: 'निःशुल्क',
      discountLabel: 'छूट',
      total: 'कुल राशि',
      viewCart: 'बैग देखें',
      checkout: 'चेकआउट',
      orderSummary: 'ऑर्डर सारांश',
      discountCodeLabel: 'कूपन कोड (डेमो आज़माएं:',
      tryDemo: 'SIRI10',
      enterCode: 'कोड दर्ज करें',
      apply: 'लागू करें',
      appliedPrefix: 'लागू:',
      remove: 'हटाएं',
      proceedCheckout: 'चेकआउट के लिए आगे बढ़ें',
      invalidDiscount: 'अमान्य या निष्क्रिय छूट कोड।',
      minOrderRequired: 'न्यूनतम ऑर्डर राशि आवश्यक:',
      appliedSuccess: 'छूट कोड सफलतापूर्वक लागू हुआ।',
    },
    checkout: {
      title: 'सुरक्षित चेकआउट',
      emptyTitle: 'चेकआउट',
      emptySub: 'आपका बैग अभी खाली है।',
      browseSarees: 'साड़ियाँ देखें',
      signInHeading: 'ऑर्डर पूरा करने के लिए साइन इन करें',
      signInSub: 'साइन इन करने से आपका पता सहेजा जाता है और लाइव ऑर्डर ट्रैकिंग मिलती है।',
      continueGoogle: 'Google के साथ जारी रखें',
      savedAddressesTitle: 'सहेजे गए डिलीवरी पते',
      deliveryDetails: 'डिलीवरी विवरण',
      fullName: 'पूरा नाम *',
      mobileNumber: 'मोबाइल नंबर *',
      emailAddress: 'ईमेल पता *',
      fullAddress: 'पूरा डिलीवरी पता *',
      addressPlaceholder: 'मकान / फ्लैट नं., गली, लैंडमार्क, इलाका',
      city: 'शहर *',
      state: 'राज्य *',
      pincode: 'पिन कोड *',
      orderNote: 'ऑर्डर नोट (वैकल्पिक)',
      orderNotePlaceholder: 'गिफ्ट रैप या डिलीवरी समय से जुड़ा नोट',
      paymentMethod: 'भुगतान का तरीका',
      razorpayConnected: 'Razorpay जुड़ा है',
      testModePlaceholder: 'टेस्ट मोड भुगतान पूर्वावलोकन',
      testModeNotice:
        'भारतीय UPI, कार्ड और नेट बैंकिंग के लिए Razorpay तैयार है। लाइव मर्चेंट क्रेडेंशियल जुड़ने तक यह स्पष्ट रूप से टेस्ट मोड में चल रहा है।',
      netBanking: 'नेट बैंकिंग',
      cod: 'कैश ऑन डिलीवरी (COD)',
      yourOrder: 'आपका ऑर्डर',
      itemsLabel: 'आइटम',
      qtyLabel: 'मात्रा',
      discountPlaceholder: 'कूपन कोड (जैसे SIRI10)',
      apply: 'लागू करें',
      subtotal: 'उप-योग',
      shipping: 'शिपिंग',
      complimentary: 'निःशुल्क',
      discount: 'छूट',
      payableTotal: 'देय कुल राशि',
      submittingOrder: 'ऑर्डर भेजा जा रहा है...',
      placeCod: 'ऑर्डर दें (कैश ऑन डिलीवरी)',
      confirmTestModePrefix: 'ऑर्डर कन्फर्म करें (',
      confirmTestModeSuffix: ' टेस्ट मोड)',
      inspectedTaggedNote: 'प्रेषण से पहले SIRIMAGGA द्वारा जांची और टैग की गई।',
      orderReceivedKicker: 'ऑर्डर प्राप्त हुआ',
      thankYouTitle: 'आपके ऑर्डर के लिए धन्यवाद',
      whatNext: 'आगे क्या होगा?',
      nextStep1: '1. हमारी टीम उपलब्धता की पुष्टि कर गुणवत्ता जांच के लिए साड़ी तैयार करती है।',
      nextStep2: '2. जांच पूरी होने पर आपकी साड़ी को SIRIMAGGA टैग और सुरक्षित पैकेजिंग मिलती है।',
      nextStep3: '3. कूरियर और ट्रैकिंग अपडेट सीधे आपके खाता ऑर्डर इतिहास में दिखेंगे।',
      trackLiveBtn: 'लाइव ऑर्डर स्टेटस ट्रैक करें',
      viewAccountBtn: 'मेरे खाते में देखें',
      errSignIn: 'कृपया ऑर्डर देने और ट्रैक करने के लिए Google से साइन इन करें।',
      errPincode: 'कृपया 6 अंकों का वैध भारतीय पिन कोड दर्ज करें।',
    },
    trackOrder: {
      kicker: 'रियल-टाइम ऑर्डर स्टेटस',
      title: 'अपना SIRIMAGGA ऑर्डर ट्रैक करें',
      subtitle:
        'लाइव स्थिति और डिलीवरी अपडेट देखने के लिए अपनी ऑर्डर आईडी और चेकआउट ईमेल पता दर्ज करें।',
      orderIdLabel: 'ऑर्डर आईडी *',
      emailLabel: 'चेकआउट ईमेल पता *',
      trackBtn: 'ट्रैक करें',
      loading: 'लाइव ऑर्डर स्थिति प्राप्त की जा रही है...',
      notFoundTitle: 'कोई मिलता ऑर्डर नहीं मिला',
      notFoundBody:
        'उस ऑर्डर आईडी और ईमेल पते से कोई ऑर्डर नहीं मिला। कृपया अपने कन्फर्मेशन ईमेल में सही ऑर्डर आईडी जांचें।',
      realtimeActive: 'लाइव अपडेट सक्रिय',
      lastUpdated: 'अंतिम अपडेट:',
      orderTotal: 'कुल ऑर्डर राशि',
      actionNeededTitle: 'उपलब्धता पर ध्यान आवश्यक',
      actionNeededBody:
        'चुनी गई साड़ियों में से एक की पुष्टि आवश्यक है। हमारी टीम शीघ्र ही आपको विकल्प या पूर्ण रिफंड के लिए संपर्क करेगी।',
      cancelledTitle: 'यह ऑर्डर रद्द कर दिया गया है।',
      paymentStatusLabel: 'भुगतान स्थिति:',
      cancelledHelp: 'यदि आपको सहायता चाहिए तो हमारे संपर्क पृष्ठ पर संदेश भेजें।',
      fulfillmentProgress: 'ऑर्डर प्रगति',
      currentStage: 'वर्तमान चरण',
      courierTitle: 'प्रेषण व कूरियर जानकारी',
      courierPartner: 'कूरियर पार्टनर:',
      trackingNumber: 'ट्रैकिंग नंबर:',
      itemsInOrder: 'ऑर्डर में साड़ियाँ',
      destinationDates: 'गंतव्य व तिथियाँ',
      destination: 'गंतव्य:',
      placedOn: 'ऑर्डर तिथि:',
      accountPrompt: 'साइन इन किए गए ग्राहक पते और पूरी रसीद देख सकते हैं:',
      myAccountLink: 'मेरा खाता',
      stepDetails: {
        'Order Placed': 'SIRIMAGGA को आपका ऑर्डर प्राप्त हो गया है।',
        Confirmed: 'उपलब्धता सत्यापित और तैयारी की पुष्टि हो गई है।',
        'Quality Inspection': 'हमारी टीम द्वारा साड़ी की बुनाई, बॉर्डर और लंबाई की जांच की गई।',
        'Packaging in Progress': 'SIRIMAGGA चिह्न लगाकर सुरक्षित बॉक्स में पैक किया जा रहा है।',
        'Ready to Dispatch': 'बागलकोट जिले से कूरियर पिकअप के लिए तैयार है।',
        Shipped: 'हमारे कूरियर पार्टनर के साथ रास्ते में है।',
        Delivered: 'आपके गंतव्य शहर में डिलीवर हो गया है।',
      },
    },
    account: {
      welcomeTitle: 'SIRIMAGGA में आपका स्वागत है',
      welcomeSub:
        'सहेजे गए डिलीवरी पते देखने, ऑर्डर इतिहास जांचने और डिलीवरी ट्रैक करने के लिए Google से साइन इन करें।',
      signInBtn: 'Google से साइन इन / खाता बनाएं',
      savedWishlist: 'सहेजी गई विशलिस्ट',
      kicker: 'ग्राहक खाता',
      yourAccountFallback: 'आपका खाता',
      openAdmin: 'एडमिन डैशबोर्ड खोलें',
      signOut: 'साइन आउट',
      tabOrders: 'ऑर्डर व ट्रैकिंग',
      tabWishlist: 'विशलिस्ट',
      tabAddresses: 'पते',
      tabProfile: 'प्रोफ़ाइल',
      loadingOrders: 'आपका ऑर्डर इतिहास लोड हो रहा है...',
      noOrdersTitle: 'अभी तक कोई ऑर्डर नहीं दिया गया है',
      exploreSarees: 'साड़ियाँ देखें',
      orderPrefix: 'ऑर्डर',
      statusPrefix: 'स्थिति:',
      unavailableNotice:
        'हमारी टीम इस ऑर्डर की एक साड़ी की उपलब्धता के लिए आपको विकल्प या पूर्ण रिफंड हेतु संपर्क करेगी।',
      courierLabel: 'कूरियर:',
      trackingLabel: 'ट्रैकिंग नंबर:',
      qtyLabel: 'मात्रा',
      emailUpdatesTitle: 'ऑर्डर स्टेटस ईमेल अपडेट',
      sentEmail: 'ईमेल भेजा गया',
      deliveryFailed: 'डिलीवरी विफल',
      loggedEmail: 'क्लाउड फ़ंक्शन / SMTP लॉग',
      deliverTo: 'डिलीवरी पता:',
      liveTrackingLink: 'लाइव ट्रैकिंग देखें',
      cancelOrderBtn: 'ऑर्डर रद्द करें',
      emptyWishlist: 'आपकी विशलिस्ट खाली है',
      savedAddressesHeading: 'सहेजे गए डिलीवरी पते',
      addNewAddress: 'नया पता जोड़ें',
      labelField: 'लेबल (घर/ऑफिस)',
      recipientField: 'प्राप्तकर्ता का नाम',
      mobileField: 'मोबाइल नंबर',
      fullAddressField: 'पूरा पता',
      cityField: 'शहर',
      stateField: 'राज्य',
      pinField: 'पिन कोड',
      saveAddressBtn: 'पता सहेजें',
      cancelBtn: 'रद्द करें',
      profileTitle: 'प्रोफ़ाइल सेटिंग्स',
      fullNameField: 'पूरा नाम',
      emailField: 'ईमेल',
      mobileOptionalField: 'मोबाइल नंबर',
      saveProfileBtn: 'प्रोफ़ाइल सहेजें',
      savingProfileBtn: 'सहेजा जा रहा है...',
      profileUpdatedToast: 'प्रोफ़ाइल अपडेट हो गई।',
      addressSavedToast: 'डिलीवरी पता सहेजा गया।',
      invalidPincodeToast: 'कृपया 6 अंकों का वैध पिन कोड दर्ज करें।',
    },
    about: {
      kicker: 'हमारा गृह · बागलकोट जिला, कर्नाटक',
      title: 'पारंपरिक करघा कला। आधुनिक बुटीक अनुशासन।',
      subtitle:
        'SIRIMAGGA उत्तर कर्नाटक की समृद्ध वस्त्र परंपरा का सम्मान करता है—हमारे क्षेत्रीय जांच स्टूडियो से इलकल, बनहट्टी कॉटन और उत्सव सिल्क साड़ियाँ पूरे भारत में पहुंचाता है।',
      heritageTitle: 'इलकल, रबकवी और बनहट्टी में जड़ें',
      heritageP1:
        'बागलकोट जिले में बुनाई केवल कपड़ा नहीं है—यह दैनिक साधना, मौसम की लय और मांगलिक परंपरा है। भारतीय गर्मियों के लिए आरामदायक बनहट्टी कॉटन से लेकर सुंदर इलकल पल्लू तक, हर साड़ी क्षेत्रीय कला को दर्शाती है।',
      heritageP2:
        'बड़े गोदाम में बिना जांच स्टॉक रखने के बजाय, हर ऑर्डर की उपलब्धता जांची जाती है, हमारी मेज पर खोलकर परखा जाता है, और हमारे कंपनी स्टोरी व केयर कार्ड के साथ भेजा जाता है।',
      archiveKicker: 'दृश्य संग्रह',
      archiveTitle: 'SIRIMAGGA प्रतीक चिह्न, विरासत मुहरें और लुकबुक',
      archiveTag: 'बहुभाषी विरासत · ಸಿರಿಮಗ್ಗ',
      cards: [
        {
          title: 'बॉर्डर व ड्रेप संग्रह',
          desc: 'बॉर्डर की बारीकी, हल्के गर्मियों के कॉटन और फ्राइडे लूम ड्रॉप की झलक।',
        },
        {
          title: 'क्षेत्रीय विरासत मुहरें',
          desc: 'इलकल (ಇಳಕಲ್), बनहट्टी (ಬನಹಟ್ಟಿ) और देखभाल (ಆರೈಕೆ) का सम्मान करने वाले प्रतीक।',
        },
        {
          title: 'शटल व करघा अभियान',
          desc: 'कर्नाटक के पारंपरिक विवाह वस्त्रों से प्रेरित बागलकोट बॉर्डर डिज़ाइन।',
        },
      ],
      ctaExplore: 'कलेक्शन देखें',
      ctaTrack: 'अपना ऑर्डर ट्रैक करें',
    },
  },
  kn: {
    nav: {
      announcement: 'ಬಾಗಲಕೋಟೆಯ ಸಾಂಪ್ರದಾಯಿಕ ನೇಯ್ಗೆಗಳು | ಕರ್ನಾಟಕದ ಪರಂಪರೆಯನ್ನು ಅನ್ವೇಷಿಸಿ',
      languageLabel: 'ಭಾಷೆ',
      home: 'ಮುಖಪುಟ',
      shopAll: 'ಎಲ್ಲಾ ಸೀರೆಗಳು',
      ilkalSarees: 'ಇಳಕಲ್ ಸೀರೆಗಳು',
      banahattiSarees: 'ಬನಹಟ್ಟಿ ಸೀರೆಗಳು',
      cottonSarees: 'ಕಾಟನ್ ಸೀರೆಗಳು',
      silkSarees: 'ರೇಷ್ಮೆ ಸೀರೆಗಳು',
      newArrivals: 'ಹೊಸ ಸಂಗ್ರಹ',
      aboutUs: 'ನಮ್ಮ ಬಗ್ಗೆ',
      trackOrder: 'ಆರ್ಡರ್ ಟ್ರ್ಯಾಕ್',
      admin: 'ನಿರ್ವಹಣೆ',
      adminDashboard: 'ಆಡಳಿತ ಮಂಡಳಿ',
      myAccountOrders: 'ನನ್ನ ಖಾತೆ ಮತ್ತು ಆರ್ಡರ್‌ಗಳು',
      searchPlaceholder: 'ಸೀರೆ ಹೆಸರು, ನೇಯ್ಗೆ (ಇಳಕಲ್, ಬನಹಟ್ಟಿ), ಬಣ್ಣ ಅಥವಾ ಕೋಡ್ ಹುಡುಕಿ...',
      searchButton: 'ಹುಡುಕಿ',
      mobileFooter: 'ಬಾಗಲಕೋಟೆ ಜಿಲ್ಲೆ, ಕರ್ನಾಟಕ · ಭಾರತದಾದ್ಯಂತ ತಲುಪಿಸುವಿಕೆ',
      languageChangedToast: 'ಭಾಷೆಯನ್ನು ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಲಾಗಿದೆ',
    },
    footer: {
      brandDesc:
        'ಕರ್ನಾಟಕದ ಬಾಗಲಕೋಟೆ ಜಿಲ್ಲೆಯ ನೇಯ್ಗೆ ಪರಂಪರೆಯಿಂದ ಪ್ರೇರಿತವಾದ ಸಾಂಪ್ರದಾಯಿಕ ಸೀರೆಗಳು. ಪ್ರತಿಯೊಂದು ಸೀರೆಯನ್ನು ಪ್ರತ್ಯೇಕವಾಗಿ ಪರಿಶೀಲಿಸಿ ಸಿರಿಮಗ್ಗ (SIRIMAGGA) ವಿಶೇಷ ಪ್ಯಾಕೇಜಿಂಗ್‌ನಲ್ಲಿ ಕಳುಹಿಸಲಾಗುತ್ತದೆ.',
      location: 'ಬಾಗಲಕೋಟೆ ಜಿಲ್ಲೆ, ಕರ್ನಾಟಕ, ಭಾರತ',
      shopCategories: 'ಸೀರೆ ವಿಭಾಗಗಳು',
      customerCare: 'ಗ್ರಾಹಕ ಸೇವೆ ಮತ್ತು ನೀತಿಗಳು',
      trackOrder: 'ನಿಮ್ಮ ಆರ್ಡರ್ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ',
      aboutUs: 'ನಮ್ಮ ಬಗ್ಗೆ',
      contactUs: 'ಸಂಪರ್ಕಿಸಿ',
      shippingPolicy: 'ಶಿಪ್ಪಿಂಗ್ ನೀತಿ',
      returnPolicy: 'ರಿಟರ್ನ್ ಮತ್ತು ರೀಫಂಡ್ ನೀತಿ',
      privacyPolicy: 'ಗೌಪ್ಯತಾ ನೀತಿ',
      termsConditions: 'ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳು',
      connectTitle: 'ನಮ್ಮೊಂದಿಗೆ ಸಂಪರ್ಕಿಸಿ',
      connectDesc: 'ಸೀರೆ ಆಯ್ಕೆ, ಸ್ಟೈಲಿಂಗ್ ಸಲಹೆ ಅಥವಾ ಆರ್ಡರ್ ಸಹಾಯಕ್ಕಾಗಿ ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ.',
      whatsappConcierge: 'ವಾಟ್ಸಾಪ್ ಸಹಾಯವಾಣಿ',
      copyright: 'ಎಲ್ಲಾ ಹಕ್ಕುಗಳು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ. ಬಾಗಲಕೋಟೆ ಜಿಲ್ಲೆ, ಕರ್ನಾಟಕ.',
      demoNote: 'ಲೈವ್ ಸ್ಟಾಕ್ ಸೇರುವವರೆಗೆ ಡೆಮೊ ಬೆಲೆಗಳು ಮತ್ತು ವಿಮರ್ಶೆಗಳನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ತೋರಿಸಲಾಗಿದೆ.',
      adminPortal: 'ಅಡ್ಮಿನ್ ಪೋರ್ಟಲ್',
    },
    home: {
      heroKicker: 'ಬಾಗಲಕೋಟೆ ಜಿಲ್ಲೆ · ಕರ್ನಾಟಕ · ಪರಂಪರೆಯ ನೇಯ್ಗೆ ಕಲೆ',
      heroTitle: 'ಬಾಗಲಕೋಟೆಯಲ್ಲಿ ನೇಯ್ದ ಪರಂಪರೆ. ಇಂದಿನ ಶೈಲಿಗೆ ಸಿದ್ಧ.',
      heroSubtitle:
        'ಕರ್ನಾಟಕದ ಸಾಂಪ್ರದಾಯಿಕ ಸೀರೆಗಳ ನಿತ್ಯನೂತನ ಸೌಂದರ್ಯವನ್ನು ಆಸ್ವಾದಿಸಿ—ಪ್ರತಿ ಸೀರೆಯನ್ನೂ ಗುಣಮಟ್ಟ ಪರೀಕ್ಷಿಸಿ, ನಮ್ಮ ವಿಶೇಷ ಬಾಕ್ಸ್ ಮತ್ತು ಕಂಪನಿ ಸ್ಟೋರಿ ಕಾರ್ಡ್‌ನೊಂದಿಗೆ ಭಾರತದಾದ್ಯಂತ ತಲುಪಿಸಲಾಗುತ್ತದೆ.',
      shopCollection: 'ಸಂಗ್ರಹವನ್ನು ವೀಕ್ಷಿಸಿ',
      exploreNewArrivals: 'ಹೊಸ ಸೀರೆಗಳನ್ನು ನೋಡಿ',
      jumpJourney: 'ನಮ್ಮ ಪಯಣ',
      jumpBoxCard: 'ವಿಶೇಷ ಬಾಕ್ಸ್ ಮತ್ತು ಕಂಪನಿ ಕಾರ್ಡ್',
      jumpDelivery: 'ವಿತರಣಾ ವೇಳಾಪಟ್ಟಿ',
      shopByCollection: 'ಸಂಗ್ರಹದ ಪ್ರಕಾರ ಖರೀದಿಸಿ',
      shopByCollectionSub: 'ಉತ್ತರ ಕರ್ನಾಟಕದ ವಸ್ತ್ರ ಪರಂಪರೆಯ ಆರು ವಿಶಿಷ್ಟ ಸಂಗ್ರಹಗಳು.',
      shopNow: 'ಈಗ ಖರೀದಿಸಿ',
      bestsellingSarees: 'ಹೆಚ್ಚು ಬೇಡಿಕೆಯ ಸೀರೆಗಳು',
      bestsellingSub: 'ನಮ್ಮ ಕರ್ನಾಟಕ ಸಂಗ್ರಹದಲ್ಲಿ ಅತಿ ಹೆಚ್ಚು ಮೆಚ್ಚುಗೆ ಪಡೆದ ಸೀರೆಗಳು',
      bestsellingDemoSuffix: ' · ಮುನ್ನೋಟಕ್ಕಾಗಿ ಡೆಮೊ ಸೀರೆಗಳನ್ನು ತೋರಿಸಲಾಗಿದೆ',
      viewCompleteCatalogue: 'ಸಂಪೂರ್ಣ ಕ್ಯಾಟಲಾಗ್ ನೋಡಿ',
      ourHeritageKicker: 'ನಮ್ಮ ಪರಂಪರೆ',
      ourHeritageTitle: 'ಪರಂಪರೆಯಲ್ಲಿ ಬೇರೂರಿದೆ. ತಲೆಮಾರುಗಳಿಗಾಗಿ ನೇಯ್ದಿದೆ.',
      ourHeritageP1:
        'ಬಾಗಲಕೋಟೆ ಜಿಲ್ಲೆಯಾದ್ಯಂತ—ಇಳಕಲ್‌ನ ಪ್ರಸಿದ್ಧ ಮಗ್ಗಗಳಿಂದ ರಬಕವಿ ಮತ್ತು ಬನಹಟ್ಟಿಯ ಹತ್ತಿ ನೇಯ್ಗೆಯ ಪಟ್ಟಣಗಳವರೆಗೆ—ವಸ್ತ್ರ ಕಲೆಯು ತಲೆಮಾರುಗಳಿಂದ ದೈನಂದಿನ ಜೀವನ ಮತ್ತು ಹಬ್ಬಗಳನ್ನು ಅಲಂಕರಿಸಿದೆ.',
      ourHeritageP2:
        'SIRIMAGGA ಈ ಪ್ರಾದೇಶಿಕ ಸೊಬಗನ್ನು ಭಾರತದಾದ್ಯಂತ ಇರುವ ವಾರ್ಡ್‌ರೋಬ್‌ಗಳಿಗೆ ತರುತ್ತದೆ. ಪ್ರತಿಯೊಂದು ಆರ್ಡರ್‌ನ ಸೀರೆಯ ಬಾರ್ಡರ್, ಬಟ್ಟೆಯ ಗುಣಮಟ್ಟ ಮತ್ತು ಅಂದವನ್ನು ಪರಿಶೀಲಿಸಿ ಸಿರಿಮಗ್ಗ ಮುದ್ರೆಯೊಂದಿಗೆ ಪ್ಯಾಕ್ ಮಾಡಲಾಗುತ್ತದೆ.',
      readStory: 'SIRIMAGGA ಕಥೆಯನ್ನು ಓದಿ',
      whyChooseTitle: 'SIRIMAGGA ಏಕೆ ಆಯ್ಕೆ ಮಾಡಬೇಕು?',
      whyChooseFeatures: [
        {
          title: 'ಎಚ್ಚರಿಕೆಯಿಂದ ಆಯ್ಕೆ ಮಾಡಿದ ಸೀರೆಗಳು',
          description:
            'ನಮ್ಮ ಸಂಗ್ರಹಕ್ಕೆ ಸೇರುವ ಮೊದಲು ಪ್ರತಿ ಸೀರೆಯ ನೇಯ್ಗೆ, ಬಾರ್ಡರ್ ಮತ್ತು ಬಟ್ಟೆಯ ಗುಣಮಟ್ಟವನ್ನು ಪರೀಕ್ಷಿಸಲಾಗುತ್ತದೆ.',
        },
        {
          title: 'ಕರ್ನಾಟಕದ ವಸ್ತ್ರ ಪರಂಪರೆ',
          description:
            'ಬಾಗಲಕೋಟೆ ಜಿಲ್ಲೆಯ ಐತಿಹಾಸಿಕ ನೇಯ್ಗೆ ಪ್ರದೇಶದಿಂದ ಆಯ್ದ ಇಳಕಲ್, ಬನಹಟ್ಟಿ ಮತ್ತು ಸಾಂಪ್ರದಾಯಿಕ ವಿನ್ಯಾಸಗಳು.',
        },
        {
          title: 'ಪ್ರೀಮಿಯಂ ಬ್ರ್ಯಾಂಡ್ ಪ್ಯಾಕೇಜಿಂಗ್',
          description:
            'ಪ್ರತಿ ಆರ್ಡರ್ ಅನ್ನು ಪರಿಶೀಲಿಸಿ, SIRIMAGGA ಟ್ಯಾಗ್ ಅಂಟಿಸಿ, ಸುರಕ್ಷಿತ ವಿಶೇಷ ಬಾಕ್ಸ್‌ನಲ್ಲಿ ಮಡಚಲಾಗುತ್ತದೆ.',
        },
        {
          title: 'ಭಾರತದಾದ್ಯಂತ ನಂಬಿಕಸ್ಥ ವಿತರಣೆ',
          description:
            'ಆರ್ಡರ್ ದೃಢೀಕರಣ ಮತ್ತು ಗುಣಮಟ್ಟ ಪರೀಕ್ಷೆಯಿಂದ ಮನೆ ಬಾಗಿಲಿಗೆ ತಲುಪುವವರೆಗೆ ಸಂಪೂರ್ಣ ಟ್ರ್ಯಾಕಿಂಗ್ ಸೌಲಭ್ಯ.',
        },
      ],
      newArrivalsTitle: 'ಹೊಸ ಸಂಗ್ರಹ',
      newArrivalsSub: 'ಹೊಸದಾಗಿ ಸೇರಿಸಲಾದ ಕಾಟನ್, ಇಳಕಲ್ ಮತ್ತು ಹಬ್ಬದ ರೇಷ್ಮೆ ಸೀರೆಗಳು.',
      exploreNewArrivalsBtn: 'ಹೊಸ ಸಂಗ್ರಹ ನೋಡಿ',
      testimonialsTitle: 'ನಮ್ಮ ಗ್ರಾಹಕರ ಮಾತುಗಳು',
      testimonialsSub: 'SIRIMAGGA ಅನುಭವವನ್ನು ವಿವರಿಸುವ ಗ್ರಾಹಕರ ಅಭಿಪ್ರಾಯಗಳು.',
      demoReviewBadge: 'ಡೆಮೊ ವಿಮರ್ಶೆ',
      newsletterTitle: 'SIRIMAGGA ಜೊತೆ ಸಂಪರ್ಕದಲ್ಲಿರಿ',
      newsletterSub:
        'ಹೊಸ ಬಾಗಲಕೋಟೆ ನೇಯ್ಗೆಗಳು, ಕಾಲೋಚಿತ ಕಾಟನ್ ಮತ್ತು ಹಬ್ಬದ ರೇಷ್ಮೆ ಸೀರೆಗಳು ಬಂದಾಗ ಮೊದಲೇ ಮಾಹಿತಿ ಪಡೆಯಿರಿ.',
      newsletterSuccess: 'SIRIMAGGA ಬಳಗಕ್ಕೆ ಸೇರಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು.',
      newsletterPlaceholder: 'ನಿಮ್ಮ ಇಮೇಲ್ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ',
      subscribe: 'ಸದಸ್ಯರಾಗಿ',
      subscribing: 'ಸೇರಿಸಲಾಗುತ್ತಿದೆ...',
    },
    journey: {
      kicker: 'ನಮ್ಮ ಪಯಣ · ಬಾಗಲಕೋಟೆಯ ಮಗ್ಗಗಳಿಂದ ನಿಮ್ಮ ವಾರ್ಡ್‌ರೋಬ್‌ಗೆ',
      title: 'ಸರಳ ಆರಂಭದಿಂದ SIRIMAGGA ಬೆಳೆದು ಬಂದ ಹಾದಿ',
      subtitle:
        'ಬಾಗಲಕೋಟೆ ಜಿಲ್ಲೆಯ ಒಂದು ಚಿಕ್ಕ ಗುಣಮಟ್ಟ ಪರಿಶೀಲನಾ ಮೇಜಿನಿಂದ ಕರ್ನಾಟಕದ ಪರಂಪರೆಯ ಸೀರೆಗಳ ಆಧುನಿಕ ಆನ್‌ಲೈನ್ ಮಳಿಗೆಯವರೆಗಿನ ನಮ್ಮ ಪಯಣವನ್ನು ನೋಡಿ.',
      stagePrefix: 'ಹಂತ',
      milestoneLabel: 'ಮೈಲಿಗಲ್ಲು:',
      footerTitle: 'ಬಾಗಲಕೋಟೆಯ ಮಗ್ಗದ ಪರಂಪರೆಯಿಂದ ಇಂದು ನಿಮ್ಮ ಮನೆ ಬಾಗಿಲಿಗೆ',
      footerSub: 'ನಮ್ಮ ಪ್ರಸ್ತುತ ಸಂಗ್ರಹಗಳನ್ನು ನೋಡಿ ಅಥವಾ ಪ್ರತಿ ಆರ್ಡರ್ ಹೇಗೆ ಪ್ಯಾಕ್ ಆಗಿ ತಲುಪುತ್ತದೆ ಎಂದು ತಿಳಿಯಿರಿ.',
      browseSarees: 'ಸೀರೆಗಳನ್ನು ನೋಡಿ',
      trackOrder: 'ಆರ್ಡರ್ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ',
      milestones: [
        {
          id: 'heritage-roots',
          step: '01',
          timeframe: 'ತಲೆಮಾರುಗಳಿಂದ',
          location: 'ಇಳಕಲ್, ರಬಕವಿ ಮತ್ತು ಬನಹಟ್ಟಿ',
          title: 'ಬಾಗಲಕೋಟೆ ನೇಯ್ಗೆ ಪರಂಪರೆಯಲ್ಲಿ ಬೇರೂರಿದೆ',
          subtitle: 'ಪ್ರಾದೇಶಿಕ ಕಾಟನ್ ಮತ್ತು ಟೆಂಪಲ್ ಬಾರ್ಡರ್ ಪ್ರೀತಿ ಶುರುವಾದ ನೆಲೆ',
          description:
            'SIRIMAGGA ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಆರಂಭವಾಗುವ ಮೊದಲೇ, ಬಾಗಲಕೋಟೆ ಜಿಲ್ಲೆಯು ಗಾಳಿಯಾಡುವ ದೈನಂದಿನ ಕಾಟನ್ ಸೀರೆಗಳು, ಸಾಂಪ್ರದಾಯಿಕ ಇಳಕಲ್ ಸೆರಗು ಮತ್ತು ಹಬ್ಬದ ಸೀರೆಗಳಿಗೆ ಕರ್ನಾಟಕದಾದ್ಯಂತ ಹೆಸರುವಾಸಿಯಾಗಿದೆ.',
          highlight: 'ಉತ್ತರ ಕರ್ನಾಟಕದ ಪಟ್ಟಣಗಳಲ್ಲಿ ತಲೆಮಾರುಗಳಿಂದ ಹರಿದು ಬಂದ ಜೀವಂತ ವಸ್ತ್ರ ಕಲೆ.',
        },
        {
          id: 'humble-desk',
          step: '02',
          timeframe: '2023',
          location: 'ಬಾಗಲಕೋಟೆ ಜಿಲ್ಲೆ · ಸರಳ ಆರಂಭ',
          title: 'ಒಂದು ಪರಿಶೀಲನಾ ಮೇಜು ಮತ್ತು ಆಯ್ದ ಸೀರೆಗಳು',
          subtitle: 'ಸರಳ ಆರಂಭ—ಒಂದೊಂದೇ ಸೀರೆಯನ್ನು ಪ್ರೀತಿಯಿಂದ ಪರೀಕ್ಷಿಸುತ್ತಾ',
          description:
            'SIRIMAGGA ಬಾಗಲಕೋಟೆಯಲ್ಲಿ ಒಂದು ಚಿಕ್ಕ ಕಾರ್ಯಕ್ಷೇತ್ರದಿಂದ ಶುರುವಾಯಿತು. ದೊಡ್ಡ ಗೋದಾಮುಗಳ ಬದಲು ಬನಹಟ್ಟಿ ಕಾಟನ್ ಮತ್ತು ಕೆಂಪು-ಮೆರೂನ್ ಇಳಕಲ್ ಸೀರೆಗಳನ್ನು ನಾವೇ ಖುದ್ದಾಗಿ ಪರಿಶೀಲಿಸಿ ಮೊದಲ ಗ್ರಾಹಕರಿಗೆ ತಲುಪಿಸಿದೆವು.',
          highlight: 'ನಂಬಿಕೆಯ ಆಧಾರದ ಮೇಲೆ ಮೊದಲ 100+ ಸೀರೆಗಳ ಪರಿಶೀಲನೆ ಮತ್ತು ವಿತರಣೆ.',
        },
        {
          id: 'quality-seal',
          step: '03',
          timeframe: '2024ರ ಆರಂಭ',
          location: 'ಗುಣಮಟ್ಟ ಮತ್ತು ಟ್ಯಾಗಿಂಗ್ ವಿಭಾಗ',
          title: 'ಪ್ರತಿ ಸೀರೆಯ ಸಂಪೂರ್ಣ ಪರಿಶೀಲನೆ ಮತ್ತು ಬ್ರ್ಯಾಂಡ್ ಟ್ಯಾಗ್',
          subtitle: 'ಉತ್ತಮ ಗುಣಮಟ್ಟದ ಪರಿಶೀಲನಾ ಮಾನದಂಡಗಳ ಸ್ಥಾಪನೆ',
          description:
            'ಬೇರೆ ಜಿಲ್ಲೆಗಳಿಂದಲೂ ಬೇಡಿಕೆ ಹೆಚ್ಚಾದಂತೆ, ರವಾನಿಸುವ ಮುನ್ನ ಜರಿ ಸ್ಪಷ್ಟತೆ, ಬಣ್ಣದ ಗಟ್ಟಿತನ, ಬ್ಲೌಸ್ ಪೀಸ್ ಉದ್ದ ಮತ್ತು ಅಂಚುಗಳ ಪರಿಶೀಲನೆ ನಡೆಸಿ SIRIMAGGA ಮುದ್ರೆ ಹಾಕುವುದನ್ನು ಕಡ್ಡಾಯಗೊಳಿಸಿದೆವು.',
          highlight: 'ಪ್ಯಾಕಿಂಗ್‌ಗೆ ಮುನ್ನ ಪ್ರತಿ ಸೀರೆಯಲ್ಲೂ ಖಚಿತ ಗುಣಮಟ್ಟ ಭರವಸೆ.',
        },
        {
          id: 'signature-box',
          step: '04',
          timeframe: '2024ರ ಅಂತ್ಯ',
          location: 'ಪ್ಯಾಕೇಜಿಂಗ್ ಸ್ಟುಡಿಯೋ · ಬಾಗಲಕೋಟೆ',
          title: 'ಕ್ರಾಫ್ಟ್ ಬಾಕ್ಸ್ ಮತ್ತು ಒಳಗಿನ ಕಂಪನಿ ಕಾರ್ಡ್',
          subtitle: 'ಸೀರೆ ತೆರೆಯುವ ಕ್ಷಣವನ್ನು ಸ್ಮರಣೀಯ ಅನುಭವವಾಗಿಸುವುದು',
          description:
            'ಕೆಂಪು ಮತ್ತು ಚಿನ್ನದ ಬಣ್ಣದ ದಾರದಿಂದ ಕಟ್ಟಿದ ನಮ್ಮ ಸುಂದರ ಕ್ರಾಫ್ಟ್ ಬಾಕ್ಸ್ ಹಾಗೂ ಮುದ್ರಿತ ಕಂಪನಿ ಸ್ಟೋರಿ ಮತ್ತು ಆರೈಕೆ ಕಾರ್ಡ್ ಅನ್ನು ಪರಿಚಯಿಸಿದೆವು.',
          highlight: 'ಉಡುಗೊರೆ ನೀಡಲು ಮತ್ತು ಜೋಪಾನವಾಗಿಡಲು ಸಿದ್ಧವಾದ ಸುರಕ್ಷಿತ ಬಾಕ್ಸ್.',
        },
        {
          id: 'online-boutique',
          step: '05',
          timeframe: '2025 – 2026',
          location: 'ಬಾಗಲಕೋಟೆಯಿಂದ ಭಾರತದಾದ್ಯಂತ',
          title: 'ಪರಂಪರೆಯ ಸೀರೆಗಳ ಆಧುನಿಕ ಆನ್‌ಲೈನ್ ಮನೆ',
          subtitle: 'ಹಳೆಯ ಕಾಲದ ಕಲೆ ಮತ್ತು ಆಧುನಿಕ ಡಿಜಿಟಲ್ ಸೇವೆಯ ಸಂಗಮ',
          description:
            'ಇಂದು SIRIMAGGA ಬಾಗಲಕೋಟೆಯ ವಸ್ತ್ರ ಪರಂಪರೆಯನ್ನು ಭಾರತದಾದ್ಯಂತ ತಲುಪಿಸುತ್ತಿದೆ—ವಾರದ ಶುಕ್ರವಾರದ ಲೂಮ್ ಡ್ರಾಪ್ಸ್, ಸ್ಪಷ್ಟ ವಿತರಣಾ ಸಮಯ, ಸ್ವಯಂಚಾಲಿತ ಇಮೇಲ್ ಮಾಹಿತಿ ಮತ್ತು ಲೈವ್ ಆರ್ಡರ್ ಟ್ರ್ಯಾಕಿಂಗ್‌ನೊಂದಿಗೆ.',
          highlight: 'ಸ್ಪಷ್ಟ ಸ್ಟೇಟಸ್ ಅಪ್‌ಡೇಟ್‌ಗಳೊಂದಿಗೆ ಭಾರತದಾದ್ಯಂತ ಟ್ರ್ಯಾಕ್ ಮಾಡಿದ ವಿತರಣೆ.',
        },
      ],
    },
    packaging: {
      kicker: 'ವಿಶೇಷ ಪ್ರಸ್ತುತಿ · ಪ್ರತಿ ಸೀರೆಯೊಂದಿಗೆ ಲಭ್ಯ',
      title: 'SIRIMAGGA ಕೀಪ್‌ಸೇಕ್ ಬಾಕ್ಸ್ ಮತ್ತು ಕಂಪನಿ ಸ್ಟೋರಿ ಕಾರ್ಡ್',
      subtitle:
        'ಬಾಗಲಕೋಟೆಯಿಂದ ಹೊರಡುವ ಪ್ರತಿ ಪಾರ್ಸಲ್ ನಮ್ಮ ಬಾಕ್ಸ್‌ನಲ್ಲಿ ಮಡಚಿ, ಕೆಂಪು-ಚಿನ್ನದ ದಾರದಿಂದ ಕಟ್ಟಿ, ನಮ್ಮ ಕಂಪನಿ ಕಥೆ ಮತ್ತು ಆರೈಕೆ ಕಾರ್ಡ್‌ನೊಂದಿಗೆ ಬರುತ್ತದೆ.',
      boxStep: '01 · ಬಾಕ್ಸ್',
      boxTitle: 'ಸುರಕ್ಷಿತ ಕ್ರಾಫ್ಟ್ ಬಾಕ್ಸ್',
      boxDesc: 'ತೇವಾಂಶದಿಂದ ರಕ್ಷಿಸುವ ಗಟ್ಟಿ ಬಾಕ್ಸ್ ಮತ್ತು SIRIMAGGA ಲೋಗೋ ಮುದ್ರೆ.',
      tieStep: '02 · ದಾರ',
      tieTitle: 'ಕೆಂಪು ಮತ್ತು ಚಿನ್ನದ ದಾರ',
      tieDesc: 'ಸಾಂಪ್ರದಾಯಿಕ ಎರಡು ಬಣ್ಣದ ದಾರ ಮತ್ತು ಗುಣಮಟ್ಟ ಪರೀಕ್ಷೆಯ ಮುದ್ರೆ.',
      cardStep: '03 · ಕಾರ್ಡ್',
      cardTitle: 'ಕಂಪನಿ ಮತ್ತು ಆರೈಕೆ ಕಾರ್ಡ್',
      cardDesc: 'SIRIMAGGA ಕಥೆ, ಪರಿಶೀಲನಾ ಗುರುತು ಮತ್ತು ಸೀರೆ ಆರೈಕೆ ಮಾಹಿತಿ ಒಳಗೊಂಡಿದೆ.',
      previewLabel: 'ಬಾಕ್ಸ್ ಒಳಗೆ — ಕಂಪನಿ ಕಾರ್ಡ್ ಮಾದರಿ ನೋಡಿ',
      frontTab: 'ಮುಂಭಾಗ · ಕಂಪನಿ ಕಥೆ',
      backTab: 'ಹಿಂಭಾಗ · ಆಗಮನ ಮತ್ತು ಆರೈಕೆ',
      cardHeader: 'ನಮ್ಮ ಮಳಿಗೆಯ ಬಗ್ಗೆ · ಬಾಗಲಕೋಟೆ ಜಿಲ್ಲೆ, ಕರ್ನಾಟಕ',
      cardQuote: '"ಹಳೆಯ ಕರ್ನಾಟಕದ ಮಗ್ಗದ ಸೊಬಗು, ಇಂದಿನ ಕಾಲಕ್ಕೆ ತಕ್ಕಂತೆ."',
      cardP1:
        'ಇಳಕಲ್, ರಬಕವಿ ಮತ್ತು ಬನಹಟ್ಟಿಯ ನೇಯ್ಗೆ ಪಟ್ಟಣಗಳಿಂದ ಹುಟ್ಟಿದ SIRIMAGGA ಒಂದು ಸರಳ ಭರವಸೆಯ ಮೇಲೆ ನಿಂತಿದೆ: ಪ್ರತಿ ಸಾಂಪ್ರದಾಯಿಕ ಸೀರೆಯು ಪೂರ್ಣ ಪಾರದರ್ಶಕತೆ ಮತ್ತು ಪ್ರೀತಿಯ ಪರಿಶೀಲನೆಯೊಂದಿಗೆ ಗ್ರಾಹಕರನ್ನು ತಲುಪಬೇಕು.',
      cardP2:
        'ಈ ಬಾಕ್ಸ್ ಕಟ್ಟುವ ಮೊದಲು ನಿಮ್ಮ ಸೀರೆಯನ್ನು ಬಿಡಿಸಿ, ಬಾರ್ಡರ್ ಮತ್ತು ಸೆರಗನ್ನು ಪರಿಶೀಲಿಸಿ, SIRIMAGGA ಟ್ಯಾಗ್ ಹಾಕಿ ಸುರಕ್ಷಿತ ಕಾಗದದಲ್ಲಿ ಮಡಚಲಾಗಿದೆ.',
      cardCurated: 'ಬಾಗಲಕೋಟೆಯಲ್ಲಿ ಆಯ್ಕೆಯಾಗಿದೆ',
      backTitle: 'ತಲುಪುವ ವಿಧಾನ ಮತ್ತು ಆರೈಕೆ ಮಾರ್ಗದರ್ಶಿ',
      backSub: 'ಪರಿಶೀಲನೆ · ಪ್ಯಾಕೇಜಿಂಗ್ · ಸೀರೆ ರಕ್ಷಣೆ',
      inspectionMarkTitle: 'ಪರಿಶೀಲನೆ ಮತ್ತು ರವಾನೆ ಹಂತಗಳು',
      inspectionSteps: [
        'ದಿನ 0–1: ಆರ್ಡರ್ ಮತ್ತು ಲಭ್ಯತೆ ದೃಢೀಕರಣ',
        'ದಿನ 1–2: ಬಾರ್ಡರ್ ಮತ್ತು ಗುಣಮಟ್ಟ ಪರೀಕ್ಷೆ',
        'ದಿನ 2: ಟ್ಯಾಗ್, ಬಾಕ್ಸ್ ಮತ್ತು ಕಾರ್ಡ್ ಪ್ಯಾಕಿಂಗ್',
        'ದಿನ 3–7: ಭಾರತದಾದ್ಯಂತ ಟ್ರ್ಯಾಕ್ ಮಾಡಿದ ತಲುಪಿಸುವಿಕೆ',
      ],
      careTitle: 'ಒಗೆಯುವಿಕೆ ಮತ್ತು ಸಂಗ್ರಹಣೆ ಸಲಹೆ',
      careSteps: [
        '• ಕಾಟನ್ ಸೀರೆಗಳನ್ನು ತಣ್ಣೀರಿನಲ್ಲಿ ಪ್ರತ್ಯೇಕವಾಗಿ ಮೃದುವಾಗಿ ಒಗೆಯಿರಿ',
        '• ಹಬ್ಬದ ರೇಷ್ಮೆ ಸೀರೆಗಳಿಗೆ ಡ್ರೈ ಕ್ಲೀನ್ ಮಾಡಿಸುವುದು ಉತ್ತಮ',
        '• ನೆರಳಿನಲ್ಲಿ ಮಾತ್ರ ಒಣಗಿಸಿ; ನೇರ ಬಿಸಿಲಿನಿಂದ ದೂರವಿಡಿ',
        '• ಪ್ರತಿ 3 ತಿಂಗಳಿಗೊಮ್ಮೆ ಮಡಿಕೆ ಬದಲಿಸಿ ಹತ್ತಿ ಬಟ್ಟೆಯಲ್ಲಿ ಸುತ್ತಿಡಿ',
      ],
      liveUpdatesNote: 'ಆರ್ಡರ್ ಸ್ಟೇಟಸ್ ಇಮೇಲ್ ಮೂಲಕ ನೇರ ಮಾಹಿತಿ ಕಳುಹಿಸಲಾಗುತ್ತದೆ',
      trackParcel: 'ನಿಮ್ಮ ಪಾರ್ಸಲ್ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ',
      turnCard: 'ಕಾರ್ಡ್ ತಿರುಗಿಸಿ',
      viewBack: 'ಹಿಂಭಾಗ ನೋಡಿ',
      viewFront: 'ಮುಂಭಾಗ ನೋಡಿ',
      complimentaryNote: 'ಎಲ್ಲಾ ಆರ್ಡರ್‌ಗಳೊಂದಿಗೆ ಉಚಿತವಾಗಿ ನೀಡಲಾಗುತ್ತದೆ',
    },
    arrival: {
      kicker: 'ರವಾನೆ ಮತ್ತು ಹೊಸ ಸಂಗ್ರಹ ವೇಳಾಪಟ್ಟಿ',
      title: 'ನಿಮ್ಮ ಸೀರೆ ಹೇಗೆ ಸಿದ್ಧವಾಗುತ್ತದೆ ಮತ್ತು ಯಾವಾಗ ತಲುಪುತ್ತದೆ',
      trackExisting: 'ಇರುವ ಆರ್ಡರ್ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ',
      steps: [
        {
          step: 'ದಿನ 0 – 1',
          title: '01. ದೃಢೀಕರಣ',
          text: 'ನಿಮ್ಮ ಸೀರೆಯ ಲಭ್ಯತೆಯನ್ನು ಖಚಿತಪಡಿಸಿ ದೃಢೀಕರಣ ಇಮೇಲ್ ಮತ್ತು ಲೈವ್ ಟ್ರ್ಯಾಕರ್ ಲಿಂಕ್ ಕಳುಹಿಸಲಾಗುತ್ತದೆ.',
        },
        {
          step: 'ದಿನ 1 – 2',
          title: '02. ಗುಣಮಟ್ಟ ಪರೀಕ್ಷೆ ಮತ್ತು ಟ್ಯಾಗ್',
          text: 'SIRIMAGGA ಟ್ಯಾಗ್ ಹಾಕುವ ಮೊದಲು ಬಾರ್ಡರ್, ಸೆರಗು ನೇಯ್ಗೆ ಮತ್ತು ಬಟ್ಟೆಯ ಅಂದವನ್ನು ಕೈಯಿಂದ ಪರಿಶೀಲಿಸಲಾಗುತ್ತದೆ.',
        },
        {
          step: 'ದಿನ 2',
          title: '03. ಬಾಕ್ಸ್ ಮತ್ತು ಕಂಪನಿ ಕಾರ್ಡ್',
          text: 'ನಮ್ಮ ಕ್ರಾಫ್ಟ್ ಬಾಕ್ಸ್‌ನಲ್ಲಿ ಮಡಚಿ ಕೆಂಪು-ಚಿನ್ನದ ದಾರ ಮತ್ತು ಸ್ಟೋರಿ ಹಾಗೂ ಆರೈಕೆ ಕಾರ್ಡ್‌ನೊಂದಿಗೆ ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತದೆ.',
        },
        {
          step: 'ದಿನ 3 – 7',
          title: '04. ಮನೆ ಬಾಗಿಲಿಗೆ ತಲುಪುವಿಕೆ',
          text: 'ಟ್ರ್ಯಾಕ್ ಮಾಡಲಾದ ಕೊರಿಯರ್‌ಗೆ ನೀಡಿ, ಶಿಪ್ಪಿಂಗ್ ಮತ್ತು ವಿತರಣೆಯ ಇಮೇಲ್ ಅಪ್‌ಡೇಟ್ ಕಳುಹಿಸಲಾಗುತ್ತದೆ.',
        },
      ],
      scheduleTitle: 'ನಿಮ್ಮ ಆರ್ಡರ್ ಯಾವಾಗ ಬರುತ್ತದೆ? (ಭಾರತದಾದ್ಯಂತ ವೇಳಾಪಟ್ಟಿ)',
      scheduleSub: 'ತಯಾರಿ ಮತ್ತು ಕೊರಿಯರ್ ಸಮಯವನ್ನು ನೋಡಲು ನಿಮ್ಮ ಪ್ರದೇಶವನ್ನು ಆಯ್ಕೆಮಾಡಿ.',
      prepLabel: 'ಪರಿಶೀಲನೆ ಮತ್ತು ಪ್ಯಾಕಿಂಗ್',
      transitLabel: 'ಕೊರಿಯರ್ ಪ್ರಯಾಣ',
      etaLabel: 'ಅಂದಾಜು ತಲುಪುವ ಸಮಯ',
      tableRegion: 'ಪ್ರದೇಶ',
      tablePrep: 'ತಯಾರಿ',
      tableTransit: 'ಪ್ರಯಾಣ',
      tableTotalEta: 'ಒಟ್ಟು ಸಮಯ',
      calendarKicker: 'ಹೊಸ ಸೀರೆಗಳು ಯಾವಾಗ ಬರುತ್ತವೆ',
      calendarTitle: 'SIRIMAGGA ಲೂಮ್ ಡ್ರಾಪ್ ವೇಳಾಪಟ್ಟಿ',
      browseLink: 'ನೋಡಿ →',
      madeToOrderNote: 'ಆರ್ಡರ್ ಮೇಲೆ ತಯಾರಿಸುವ ಸೀರೆಗಳು 5–7 ಕೆಲಸದ ದಿನಗಳಲ್ಲಿ ರವಾನೆಯಾಗುತ್ತವೆ.',
      newDropsBtn: 'ಹೊಸ ಸಂಗ್ರಹ',
      zones: [
        {
          id: 'north-karnataka',
          zone: 'ಬಾಗಲಕೋಟೆ, ಹುಬ್ಬಳ್ಳಿ-ಧಾರವಾಡ ಮತ್ತು ಉತ್ತರ ಕರ್ನಾಟಕ',
          prepWindow: '1–2 ಕೆಲಸದ ದಿನಗಳು',
          transitWindow: '1–2 ಕೆಲಸದ ದಿನಗಳು',
          totalWindow: '2–3 ಕೆಲಸದ ದಿನಗಳು',
          carrierNote: 'ಬಾಗಲಕೋಟೆ ಜಿಲ್ಲೆಯಿಂದ ಅತ್ಯಂತ ವೇಗದ ಪ್ರಾದೇಶಿಕ ರವಾನೆ',
        },
        {
          id: 'karnataka-metros',
          zone: 'ಬೆಂಗಳೂರು, ಮೈಸೂರು ಮತ್ತು ಕರಾವಳಿ ಕರ್ನಾಟಕ',
          prepWindow: '1–2 ಕೆಲಸದ ದಿನಗಳು',
          transitWindow: '2 ಕೆಲಸದ ದಿನಗಳು',
          totalWindow: '3–4 ಕೆಲಸದ ದಿನಗಳು',
          carrierNote: 'ಟ್ರ್ಯಾಕ್ ಮಾಡಲಾದ ಎಕ್ಸ್‌ಪ್ರೆಸ್ ಮಾರ್ಗಗಳ ಮೂಲಕ ವೇಗದ ತಲುಪಿಸುವಿಕೆ',
        },
        {
          id: 'south-west',
          zone: 'ಮಹಾರಾಷ್ಟ್ರ, ತೆಲಂಗಾಣ, ತಮಿಳುನಾಡು ಮತ್ತು ಆಂಧ್ರ ಪ್ರದೇಶ',
          prepWindow: '1–2 ಕೆಲಸದ ದಿನಗಳು',
          transitWindow: '2–3 ಕೆಲಸದ ದಿನಗಳು',
          totalWindow: '4–5 ಕೆಲಸದ ದಿನಗಳು',
          carrierNote: 'ಲೈವ್ ಟ್ರ್ಯಾಕಿಂಗ್ ಮತ್ತು ಇಮೇಲ್ ಮಾಹಿತಿಯೊಂದಿಗೆ ಮನೆ ಬಾಗಿಲಿಗೆ ಸೇವೆ',
        },
        {
          id: 'rest-of-india',
          zone: 'ದೆಹಲಿ, ಗುಜರಾತ್, ಉತ್ತರ, ಪೂರ್ವ ಮತ್ತು ಇತರೆ ರಾಜ್ಯಗಳು',
          prepWindow: '1–2 ಕೆಲಸದ ದಿನಗಳು',
          transitWindow: '3–5 ಕೆಲಸದ ದಿನಗಳು',
          totalWindow: '5–7 ಕೆಲಸದ ದಿನಗಳು',
          carrierNote: 'ಸುರಕ್ಷಿತ ಬಾಕ್ಸ್‌ನಲ್ಲಿ ವಿಮೆ ಮಾಡಿದ ರಾಷ್ಟ್ರೀಯ ರವಾನೆ',
        },
      ],
      drops: [
        {
          cadence: 'ಪ್ರತಿ ಶುಕ್ರವಾರ · ಸಂಜೆ 6:00 IST',
          title: 'ವಾರದ ಹೆರಿಟೇಜ್ ಲೂಮ್ ಡ್ರಾಪ್',
          detail: 'ಸೀಮಿತ ಸಂಖ್ಯೆಯ ಇಳಕಲ್ ತೋಪು ತೆನೆ ಮತ್ತು ವಿಶಿಷ್ಟ ಸೆರಗಿನ ಸೀರೆಗಳ ಬಿಡುಗಡೆ.',
          filterLink: '/shop?filter=new',
        },
        {
          cadence: 'ಪ್ರತಿ ತಿಂಗಳ 1 ಮತ್ತು 15ರಂದು',
          title: 'ಬನಹಟ್ಟಿ ಹಗುರ ಕಾಟನ್ ಮರುಪೂರಣ',
          detail: 'ಕಚೇರಿ ಮತ್ತು ದೈನಂದಿನ ಉಡುಗೆಗಾಗಿ ಹಗುರ 420g–480g ಕಾಟನ್ ಸೀರೆಗಳ ಹೊಸ ಬಣ್ಣಗಳು.',
          filterLink: '/collection/banahatti-cotton-sarees',
        },
        {
          cadence: 'ಹಬ್ಬದ ಮುಂಚಿನ ವೇಳಾಪಟ್ಟಿ',
          title: 'ಶುಭ ಹಬ್ಬದ ರೇಷ್ಮೆ ಮತ್ತು ಕಸೂತಿ ಸಂಗ್ರಹ',
          detail: 'ಯುಗಾದಿ, ವರಮಹಾಲಕ್ಷ್ಮಿ, ದಸರಾ ಮತ್ತು ದೀಪಾವಳಿಗಾಗಿ ವಿಶೇಷವಾಗಿ ಆಯ್ಕೆ ಮಾಡಲಾಗಿದೆ.',
          filterLink: '/collection/festive-sarees',
        },
      ],
    },
    catalog: {
      collectionKicker: 'SIRIMAGGA ಸಂಗ್ರಹ',
      newArrivalsTitle: 'ಹೊಸ ಸಂಗ್ರಹ',
      allSareesTitle: 'ಎಲ್ಲಾ ಸೀರೆಗಳು',
      defaultSub: 'ಬಾಗಲಕೋಟೆ ಜಿಲ್ಲೆಯ ಸಾಂಪ್ರದಾಯಿಕ ಇಳಕಲ್, ಬನಹಟ್ಟಿ ಕಾಟನ್ ಮತ್ತು ಹಬ್ಬದ ರೇಷ್ಮೆ ಸೀರೆಗಳನ್ನು ನೋಡಿ.',
      demoSuffix: ' (ಮುನ್ನೋಟಕ್ಕಾಗಿ ಡೆಮೊ ಸೀರೆಗಳನ್ನು ತೋರಿಸಲಾಗಿದೆ.)',
      filtersBtn: 'ಫಿಲ್ಟರ್‌ಗಳು',
      sortPopularity: 'ವಿಂಗಡಣೆ: ಜನಪ್ರಿಯತೆ',
      sortNewest: 'ವಿಂಗಡಣೆ: ಹೊಸದು',
      sortPriceAsc: 'ಬೆಲೆ: ಕಡಿಮೆಯಿಂದ ಹೆಚ್ಚು',
      sortPriceDesc: 'ಬೆಲೆ: ಹೆಚ್ಚಿನಿಂದ ಕಡಿಮೆ',
      refineTitle: 'ಆಯ್ಕೆಗಳನ್ನು ನಿಖರಗೊಳಿಸಿ',
      reset: 'ಮರುಹೊಂದಿಸಿ',
      searchLabel: 'ಕ್ಯಾಟಲಾಗ್ ಹುಡುಕಿ',
      searchPlaceholder: 'ಹೆಸರು, ನೇಯ್ಗೆ ಅಥವಾ ಕೋಡ್...',
      categoryLabel: 'ವಿಭಾಗ',
      allOption: 'ಎಲ್ಲಾ',
      priceRangeLabel: 'ಬೆಲೆ ಶ್ರೇಣಿ (₹)',
      allPrices: 'ಎಲ್ಲಾ ಬೆಲೆಗಳು',
      under2000: '₹2,000 ಒಳಗೆ',
      range2000to4000: '₹2,000 – ₹4,000',
      above4000: '₹4,000 ಕ್ಕಿಂತ ಹೆಚ್ಚು',
      sareeTypeLabel: 'ಸೀರೆಯ ಪ್ರಕಾರ',
      colourPaletteLabel: 'ಬಣ್ಣದ ಆಯ್ಕೆ',
      newArrivalsOnly: 'ಹೊಸ ಸೀರೆಗಳು ಮಾತ್ರ',
      showingPrefix: 'ತೋರಿಸಲಾಗುತ್ತಿದೆ',
      ofLabel: 'ರಲ್ಲಿ',
      sareesUnit: 'ಸೀರೆಗಳು',
      clearFilters: 'ಫಿಲ್ಟರ್ ತೆರವುಗೊಳಿಸಿ',
      emptyTitle: 'ನಿಮ್ಮ ಆಯ್ಕೆಗೆ ಹೊಂದಿಕೆಯಾಗುವ ಸೀರೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ',
      emptySub: 'ದಯವಿಟ್ಟು ಬೆಲೆ ಶ್ರೇಣಿಯನ್ನು ಬದಲಾಯಿಸಿ ಅಥವಾ ವಿಭಾಗ ಫಿಲ್ಟರ್ ತೆರವುಗೊಳಿಸಿ.',
      showAllBtn: 'ಎಲ್ಲಾ ಸೀರೆಗಳನ್ನು ತೋರಿಸಿ',
      loadMoreBtn: 'ಇನ್ನಷ್ಟು ಸೀರೆಗಳನ್ನು ನೋಡಿ',
    },
    product: {
      demoItem: 'ಡೆಮೊ ಸೀರೆ',
      demoProduct: 'ಡೆಮೊ ಉತ್ಪನ್ನ',
      addToCart: 'ಬ್ಯಾಗ್‌ಗೆ ಸೇರಿಸಿ',
      soldOut: 'ಸ್ಟಾಕ್ ಮುಗಿದಿದೆ',
      savedWishlist: 'ಇಷ್ಟಪಟ್ಟಿಗೆ ಸೇರಿಸಲಾಗಿದೆ',
      removedWishlist: 'ಇಷ್ಟಪಟ್ಟಿಯಿಂದ ತೆಗೆಯಲಾಗಿದೆ',
      addedToBagPrefix: 'ಬ್ಯಾಗ್‌ಗೆ ಸೇರಿಸಲಾಗಿದೆ:',
      sareeNotFound: 'ಸೀರೆ ಕಂಡುಬಂದಿಲ್ಲ',
      returnCatalogue: 'ಕ್ಯಾಟಲಾಗ್‌ಗೆ ಹಿಂತಿರುಗಿ',
      homeCrumb: 'ಮುಖಪುಟ',
      shopAllCrumb: 'ಎಲ್ಲಾ ಸೀರೆಗಳು',
      patronReviewSingular: 'ಗ್ರಾಹಕರ ವಿಮರ್ಶೆ',
      patronReviewPlural: 'ಗ್ರಾಹಕರ ವಿಮರ್ಶೆಗಳು',
      beFirstReview: 'ಈ ಸೀರೆಗೆ ಮೊದಲ ವಿಮರ್ಶೆ ಬರೆಯಿರಿ',
      inclusiveTaxes: 'ಎಲ್ಲಾ ತೆರಿಗೆಗಳು ಒಳಗೊಂಡಿವೆ',
      colourLabel: 'ಬಣ್ಣ:',
      quantityLabel: 'ಪ್ರಮಾಣ',
      availabilityLabel: 'ಲಭ್ಯತೆ',
      buyNow: 'ಈಗಲೇ ಖರೀದಿಸಿ',
      fabricLabel: 'ಬಟ್ಟೆ',
      lengthLabel: 'ಸೀರೆ ಉದ್ದ',
      blouseLabel: 'ಬ್ಲೌಸ್ ಪೀಸ್',
      careLabel: 'ಆರೈಕೆ',
      howWhenTitle: 'ಹೇಗೆ ಮತ್ತು ಯಾವಾಗ ಬರುತ್ತದೆ:',
      freeShippingAbove: 'ಇದಕ್ಕಿಂತ ಹೆಚ್ಚಿನ ಆರ್ಡರ್‌ಗೆ ಉಚಿತ ಶಿಪ್ಪಿಂಗ್:',
      packagingPromise:
        'ಪ್ರತ್ಯೇಕವಾಗಿ ಪರಿಶೀಲಿಸಿ, ಕೆಂಪು-ಚಿನ್ನದ ದಾರ ಕಟ್ಟಿದ ನಮ್ಮ ಬಾಕ್ಸ್ ಮತ್ತು SIRIMAGGA ಕಂಪನಿ ಸ್ಟೋರಿ ಹಾಗೂ ಆರೈಕೆ ಕಾರ್ಡ್‌ನೊಂದಿಗೆ ಪ್ಯಾಕ್ ಮಾಡಲಾಗಿದೆ.',
      previewUnboxing: 'ಪ್ಯಾಕಿಂಗ್ ನೋಡಿ →',
      relatedTitle: 'ನಿಮಗೆ ಇವು ಕೂಡ ಇಷ್ಟವಾಗಬಹುದು',
      quickViewFabric: 'ಬಟ್ಟೆ:',
      quickViewLength: 'ಉದ್ದ:',
      quickViewSelectColour: 'ಬಣ್ಣ ಆಯ್ಕೆಮಾಡಿ:',
      quickViewAddToBag: 'ಬ್ಯಾಗ್‌ಗೆ ಸೇರಿಸಿ',
      quickViewFullDetails: 'ಸಂಪೂರ್ಣ ವಿವರ',
    },
    reviews: {
      kicker: 'ಗ್ರಾಹಕರ ಅಭಿಪ್ರಾಯಗಳು',
      title: 'ಗ್ರಾಹಕರ ವಿಮರ್ಶೆಗಳು ಮತ್ತು ರೇಟಿಂಗ್‌ಗಳು',
      moderationNote:
        'ಸಾರ್ವಜನಿಕವಾಗಿ ಪ್ರಕಟಿಸುವ ಮೊದಲು ನಮ್ಮ ತಂಡವು ಪ್ರತಿಯೊಂದು ವಿಮರ್ಶೆಯನ್ನು ಪರಿಶೀಲಿಸಿ ಅನುಮೋದಿಸುತ್ತದೆ.',
      publishedSingular: 'ಪ್ರಕಟಿತ ವಿಮರ್ಶೆ',
      publishedPlural: 'ಪ್ರಕಟಿತ ವಿಮರ್ಶೆಗಳು',
      shareTitle: 'ನಿಮ್ಮ ಅನುಭವವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ',
      reviewingPrefix: 'ವಿಮರ್ಶೆ:',
      checkingAuth: 'ಖಾತೆ ಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...',
      signInPrompt: 'ಈ ಸೀರೆಗೆ ರೇಟಿಂಗ್ ನೀಡಲು ಮತ್ತು ವಿಮರ್ಶೆ ಬರೆಯಲು ದಯವಿಟ್ಟು Google ಮೂಲಕ ಸೈನ್ ಇನ್ ಮಾಡಿ.',
      signInBtn: 'ವಿಮರ್ಶೆ ಬರೆಯಲು Google ನಿಂದ ಸೈನ್ ಇನ್ ಮಾಡಿ',
      submittedBanner:
        'ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ವಿಮರ್ಶೆಯನ್ನು ಸ್ವೀಕರಿಸಲಾಗಿದೆ ಮತ್ತು ಅಡ್ಮಿನ್ ಅನುಮೋದನೆಯ ನಂತರ ಸಾರ್ವಜನಿಕವಾಗಿ ಕಾಣಿಸುತ್ತದೆ.',
      yourRating: 'ನಿಮ್ಮ ರೇಟಿಂಗ್',
      ratingLabels: {
        1: 'ಸುಧಾರಣೆ ಅಗತ್ಯವಿದೆ',
        2: 'ಸಾಧಾರಣ',
        3: 'ಉತ್ತಮ ನೇಯ್ಗೆ',
        4: 'ಬಹಳ ಚೆನ್ನಾಗಿದೆ',
        5: 'ಅತ್ಯುತ್ತಮ ನೇಯ್ಗೆ',
      },
      yourName: 'ನಿಮ್ಮ ಹೆಸರು *',
      cityState: 'ನಗರ ಮತ್ತು ರಾಜ್ಯ *',
      yourReview: 'ನಿಮ್ಮ ವಿಮರ್ಶೆ *',
      commentPlaceholder: 'ಬಟ್ಟೆಯ ಗುಣಮಟ್ಟ, ಬಾರ್ಡರ್ ಕೆಲಸ, ಬಣ್ಣ ಮತ್ತು ಪ್ಯಾಕೇಜಿಂಗ್ ಹೇಗಿತ್ತು ಎಂದು ಬರೆಯಿರಿ...',
      submitBtn: 'ವಿಮರ್ಶೆ ಸಲ್ಲಿಸಿ',
      submittingBtn: 'ಸಲ್ಲಿಸಲಾಗುತ್ತಿದೆ...',
      errName: 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ (ಕನಿಷ್ಠ 2 ಅಕ್ಷರಗಳು).',
      errCity: 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ನಗರವನ್ನು ನಮೂದಿಸಿ (ಉದಾ. ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ).',
      errComment: 'ದಯವಿಟ್ಟು ಕನಿಷ್ಠ 5 ಅಕ್ಷರಗಳಲ್ಲಿ ನಿಮ್ಮ ಅನುಭವವನ್ನು ಬರೆಯಿರಿ.',
      toastSubmitted: 'ವಿಮರ್ಶೆಯನ್ನು ಪರಿಶೀಲನೆಗೆ ಕಳುಹಿಸಲಾಗಿದೆ. ಅನುಮೋದನೆಯ ನಂತರ ಪ್ರಕಟವಾಗುತ್ತದೆ.',
      pendingBadge: 'ನಿಮ್ಮ ವಿಮರ್ಶೆ · ಅಡ್ಮಿನ್ ಪರಿಶೀಲನೆ ಬಾಕಿ ಇದೆ',
      rejectedBadge: 'ನಿಮ್ಮ ವಿಮರ್ಶೆ · ಸಾರ್ವಜನಿಕ ಪ್ರದರ್ಶನಕ್ಕೆ ಅನುಮೋದನೆಯಾಗಿಲ್ಲ',
      visibleOnlyYou: 'ಅನುಮೋದನೆಯಾಗುವವರೆಗೆ ನಿಮಗೆ ಮಾತ್ರ ಕಾಣಿಸುತ್ತದೆ',
      adminNotePrefix: 'SIRIMAGGA ತಂಡದ ಟಿಪ್ಪಣಿ:',
      noReviewsTitle: 'ಈ ಸೀರೆಗೆ ಇನ್ನೂ ಯಾವುದೇ ಪ್ರಕಟಿತ ವಿಮರ್ಶೆಗಳಿಲ್ಲ',
      noReviewsSub:
        'ನೀವು ಈ ಸೀರೆಯನ್ನು ಧರಿಸಿದ್ದೀರಾ? ಸೈನ್ ಇನ್ ಮಾಡಿ ನಿಮ್ಮ ಅಭಿಪ್ರಾಯ ತಿಳಿಸಿ—ನಮ್ಮ ತಂಡದ ಅನುಮೋದನೆಯ ನಂತರ ಅದು ಇತರ ಗ್ರಾಹಕರಿಗೆ ನೆರವಾಗುತ್ತದೆ.',
      demoFeaturedLabel: 'ಡೆಮೊ ವಿಮರ್ಶೆ · ಪ್ರಮುಖ ಗ್ರಾಹಕರು',
      verifiedPatronLabel: 'ದೃಢೀಕೃತ ಗ್ರಾಹಕರು',
    },
    cart: {
      bagTitle: 'ಶಾಪಿಂಗ್ ಬ್ಯಾಗ್',
      drawerTitle: 'ನಿಮ್ಮ ಶಾಪಿಂಗ್ ಬ್ಯಾಗ್',
      freeShippingUnlocked: 'ಈ ಆರ್ಡರ್‌ಗೆ ಭಾರತದಾದ್ಯಂತ ಉಚಿತ ವಿತರಣೆ ದೊರೆತಿದೆ.',
      addMorePrefix: 'ಉಚಿತ ವಿತರಣೆಗಾಗಿ ಇನ್ನೂ',
      addMoreSuffix: 'ಮೌಲ್ಯದ ಸೀರೆಗಳನ್ನು ಸೇರಿಸಿ.',
      emptyTitle: 'ನಿಮ್ಮ ಬ್ಯಾಗ್ ಖಾಲಿಯಾಗಿದೆ',
      emptySub: 'ನಮ್ಮ ಇಳಕಲ್, ಬನಹಟ್ಟಿ ಮತ್ತು ಹಬ್ಬದ ರೇಷ್ಮೆ ಸೀರೆಗಳನ್ನು ನೋಡಿ.',
      browseSarees: 'ಸೀರೆಗಳನ್ನು ನೋಡಿ',
      continueShopping: '← ಖರೀದಿ ಮುಂದುವರಿಸಿ',
      eachLabel: 'ಒಂದಕ್ಕೆ',
      colourLabel: 'ಬಣ್ಣ:',
      codeLabel: 'ಕೋಡ್:',
      subtotal: 'ಉಪ-ಮೊತ್ತ',
      shipping: 'ಶಿಪ್ಪಿಂಗ್',
      estimatedShipping: 'ಅಂದಾಜು ಶಿಪ್ಪಿಂಗ್',
      complimentary: 'ಉಚಿತ',
      discountLabel: 'ರಿಯಾಯಿತಿ',
      total: 'ಒಟ್ಟು ಮೊತ್ತ',
      viewCart: 'ಬ್ಯಾಗ್ ನೋಡಿ',
      checkout: 'ಚೆಕ್‌ಔಟ್',
      orderSummary: 'ಆರ್ಡರ್ ಸಾರಾಂಶ',
      discountCodeLabel: 'ರಿಯಾಯಿತಿ ಕೋಡ್ (ಡೆಮೊ ಪ್ರಯತ್ನಿಸಿ:',
      tryDemo: 'SIRI10',
      enterCode: 'ಕೋಡ್ ನಮೂದಿಸಿ',
      apply: 'ಅನ್ವಯಿಸಿ',
      appliedPrefix: 'ಅನ್ವಯಿಸಲಾಗಿದೆ:',
      remove: 'ತೆಗೆದುಹಾಕಿ',
      proceedCheckout: 'ಚೆಕ್‌ಔಟ್‌ಗೆ ಮುಂದುವರಿಯಿರಿ',
      invalidDiscount: 'ಅಮಾನ್ಯ ಅಥವಾ ನಿಷ್ಕ್ರಿಯ ರಿಯಾಯಿತಿ ಕೋಡ್.',
      minOrderRequired: 'ಕನಿಷ್ಠ ಆರ್ಡರ್ ಮೊತ್ತ ಅಗತ್ಯವಿದೆ:',
      appliedSuccess: 'ರಿಯಾಯಿತಿ ಕೋಡ್ ಯಶಸ್ವಿಯಾಗಿ ಅನ್ವಯವಾಗಿದೆ.',
    },
    checkout: {
      title: 'ಸುರಕ್ಷಿತ ಚೆಕ್‌ಔಟ್',
      emptyTitle: 'ಚೆಕ್‌ಔಟ್',
      emptySub: 'ನಿಮ್ಮ ಬ್ಯಾಗ್ ಪ್ರಸ್ತುತ ಖಾಲಿಯಾಗಿದೆ.',
      browseSarees: 'ಸೀರೆಗಳನ್ನು ನೋಡಿ',
      signInHeading: 'ಆರ್ಡರ್ ಪೂರ್ಣಗೊಳಿಸಲು ಸೈನ್ ಇನ್ ಮಾಡಿ',
      signInSub: 'ಸೈನ್ ಇನ್ ಮಾಡುವುದರಿಂದ ನಿಮ್ಮ ವಿಳಾಸ ಉಳಿಸಲ್ಪಡುತ್ತದೆ ಮತ್ತು ಲೈವ್ ಆರ್ಡರ್ ಟ್ರ್ಯಾಕಿಂಗ್ ಸಿಗುತ್ತದೆ.',
      continueGoogle: 'Google ಜೊತೆ ಮುಂದುವರಿಯಿರಿ',
      savedAddressesTitle: 'ಉಳಿಸಿದ ವಿತರಣಾ ವಿಳಾಸಗಳು',
      deliveryDetails: 'ವಿತರಣಾ ವಿವರಗಳು',
      fullName: 'ಪೂರ್ಣ ಹೆಸರು *',
      mobileNumber: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ *',
      emailAddress: 'ಇಮೇಲ್ ವಿಳಾಸ *',
      fullAddress: 'ಸಂಪೂರ್ಣ ವಿಳಾಸ *',
      addressPlaceholder: 'ಮನೆ / ಫ್ಲ್ಯಾಟ್ ಸಂಖ್ಯೆ, ಬೀದಿ, ಗುರುತು, ಪ್ರದೇಶ',
      city: 'ನಗರ *',
      state: 'ರಾಜ್ಯ *',
      pincode: 'ಪಿನ್ ಕೋಡ್ *',
      orderNote: 'ಆರ್ಡರ್ ಟಿಪ್ಪಣಿ (ಐಚ್ಛಿಕ)',
      orderNotePlaceholder: 'ಗಿಫ್ಟ್ ಪ್ಯಾಕಿಂಗ್ ಅಥವಾ ವಿತರಣಾ ಸಮಯದ ಸೂಚನೆ',
      paymentMethod: 'ಪಾವತಿ ವಿಧಾನ',
      razorpayConnected: 'Razorpay ಸಂಪರ್ಕಿತವಾಗಿದೆ',
      testModePlaceholder: 'ಟೆಸ್ಟ್ ಮೋಡ್ ಪಾವತಿ ವಿಧಾನ',
      testModeNotice:
        'ಭಾರತೀಯ UPI, ಕಾರ್ಡ್ ಮತ್ತು ನೆಟ್ ಬ್ಯಾಂಕಿಂಗ್‌ಗಾಗಿ Razorpay ಸಿದ್ಧವಾಗಿದೆ. ಲೈವ್ ವ್ಯಾಪಾರಿ ಖಾತೆ ಜೋಡಿಸುವವರೆಗೆ ಇದು ಸ್ಪಷ್ಟವಾಗಿ ಟೆಸ್ಟ್ ಮೋಡ್‌ನಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ.',
      netBanking: 'ನೆಟ್ ಬ್ಯಾಂಕಿಂಗ್',
      cod: 'ಕ್ಯಾಶ್ ಆನ್ ಡೆಲಿವರಿ (COD)',
      yourOrder: 'ನಿಮ್ಮ ಆರ್ಡರ್',
      itemsLabel: 'ಸೀರೆಗಳು',
      qtyLabel: 'ಪ್ರಮಾಣ',
      discountPlaceholder: 'ರಿಯಾಯಿತಿ ಕೋಡ್ (ಉದಾ. SIRI10)',
      apply: 'ಅನ್ವಯಿಸಿ',
      subtotal: 'ಉಪ-ಮೊತ್ತ',
      shipping: 'ಶಿಪ್ಪಿಂಗ್',
      complimentary: 'ಉಚಿತ',
      discount: 'ರಿಯಾಯಿತಿ',
      payableTotal: 'ಪಾವತಿಸಬೇಕಾದ ಒಟ್ಟು ಮೊತ್ತ',
      submittingOrder: 'ಆರ್ಡರ್ ಸಲ್ಲಿಸಲಾಗುತ್ತಿದೆ...',
      placeCod: 'ಆರ್ಡರ್ ನೀಡಿ (ಕ್ಯಾಶ್ ಆನ್ ಡೆಲಿವರಿ)',
      confirmTestModePrefix: 'ಆರ್ಡರ್ ದೃಢೀಕರಿಸಿ (',
      confirmTestModeSuffix: ' ಟೆಸ್ಟ್ ಮೋಡ್)',
      inspectedTaggedNote: 'ರವಾನಿಸುವ ಮೊದಲು SIRIMAGGA ದಿಂದ ಗುಣಮಟ್ಟ ಪರೀಕ್ಷಿಸಿ ಟ್ಯಾಗ್ ಮಾಡಲಾಗಿದೆ.',
      orderReceivedKicker: 'ಆರ್ಡರ್ ಸ್ವೀಕರಿಸಲಾಗಿದೆ',
      thankYouTitle: 'ನಿಮ್ಮ ಆರ್ಡರ್‌ಗೆ ಧನ್ಯವಾದಗಳು',
      whatNext: 'ಮುಂದೇನಾಗುತ್ತದೆ?',
      nextStep1: '1. ನಮ್ಮ ತಂಡ ಲಭ್ಯತೆಯನ್ನು ಖಚಿತಪಡಿಸಿ ಗುಣಮಟ್ಟ ಪರೀಕ್ಷೆಗೆ ಸೀರೆಯನ್ನು ಸಿದ್ಧಪಡಿಸುತ್ತದೆ.',
      nextStep2: '2. ಪರಿಶೀಲನೆ ಮುಗಿದ ನಂತರ SIRIMAGGA ಟ್ಯಾಗ್ ಮತ್ತು ಸುರಕ್ಷಿತ ಬಾಕ್ಸ್ ಪ್ಯಾಕಿಂಗ್ ಮಾಡಲಾಗುತ್ತದೆ.',
      nextStep3: '3. ಕೊರಿಯರ್ ಮತ್ತು ಟ್ರ್ಯಾಕಿಂಗ್ ಮಾಹಿತಿಯನ್ನು ನಿಮ್ಮ ಖಾತೆಯ ಆರ್ಡರ್ ಇತಿಹಾಸದಲ್ಲಿ ನೋಡಬಹುದು.',
      trackLiveBtn: 'ಲೈವ್ ಆರ್ಡರ್ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ',
      viewAccountBtn: 'ನನ್ನ ಖಾತೆಯಲ್ಲಿ ನೋಡಿ',
      errSignIn: 'ಆರ್ಡರ್ ನೀಡಲು ಮತ್ತು ಟ್ರ್ಯಾಕ್ ಮಾಡಲು ದಯವಿಟ್ಟು Google ಮೂಲಕ ಸೈನ್ ಇನ್ ಮಾಡಿ.',
      errPincode: 'ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ 6 ಅಂಕಿಗಳ ಭಾರತೀಯ ಪಿನ್ ಕೋಡ್ ನಮೂದಿಸಿ.',
    },
    trackOrder: {
      kicker: 'ನೇರ ಆರ್ಡರ್ ಸ್ಥಿತಿ',
      title: 'ನಿಮ್ಮ SIRIMAGGA ಆರ್ಡರ್ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ',
      subtitle:
        'ಲೈವ್ ಆರ್ಡರ್ ಮತ್ತು ವಿತರಣಾ ಮಾಹಿತಿಗಾಗಿ ನಿಮ್ಮ ಆರ್ಡರ್ ಐಡಿ ಮತ್ತು ಚೆಕ್‌ಔಟ್ ಇಮೇಲ್ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ.',
      orderIdLabel: 'ಆರ್ಡರ್ ಐಡಿ *',
      emailLabel: 'ಚೆಕ್‌ಔಟ್ ಇಮೇಲ್ ವಿಳಾಸ *',
      trackBtn: 'ಟ್ರ್ಯಾಕ್ ಮಾಡಿ',
      loading: 'ಲೈವ್ ಆರ್ಡರ್ ಮಾಹಿತಿ ಪಡೆಯಲಾಗುತ್ತಿದೆ...',
      notFoundTitle: 'ಹೊಂದಾಣಿಕೆಯಾಗುವ ಆರ್ಡರ್ ಕಂಡುಬಂದಿಲ್ಲ',
      notFoundBody:
        'ನಮೂದಿಸಿದ ಆರ್ಡರ್ ಐಡಿ ಮತ್ತು ಇಮೇಲ್ ವಿಳಾಸಕ್ಕೆ ಯಾವುದೇ ಆರ್ಡರ್ ಕಂಡುಬಂದಿಲ್ಲ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ದೃಢೀಕರಣ ಇಮೇಲ್‌ನಲ್ಲಿರುವ ಸರಿಯಾದ ಆರ್ಡರ್ ಐಡಿ ಪರಿಶೀಲಿಸಿ.',
      realtimeActive: 'ಲೈವ್ ಅಪ್‌ಡೇಟ್ ಸಕ್ರಿಯವಾಗಿದೆ',
      lastUpdated: 'ಕೊನೆಯ ಬದಲಾವಣೆ:',
      orderTotal: 'ಒಟ್ಟು ಮೊತ್ತ',
      actionNeededTitle: 'ಲಭ್ಯತೆ ಕುರಿತು ಗಮನ ಅಗತ್ಯವಿದೆ',
      actionNeededBody:
        'ಆಯ್ದ ಸೀರೆಗಳಲ್ಲಿ ಒಂದರ ದೃಢೀಕರಣ ಅಗತ್ಯವಿದೆ. ಪರ್ಯಾಯ ಆಯ್ಕೆ ಅಥವಾ ಪೂರ್ಣ ಹಣ ವಾಪಸಾತಿಗಾಗಿ ನಮ್ಮ ತಂಡ ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತದೆ.',
      cancelledTitle: 'ಈ ಆರ್ಡರ್ ರದ್ದುಗೊಳಿಸಲಾಗಿದೆ.',
      paymentStatusLabel: 'ಪಾವತಿ ಸ್ಥಿತಿ:',
      cancelledHelp: 'ಹೆಚ್ಚಿನ ಸಹಾಯಕ್ಕಾಗಿ ದಯವಿಟ್ಟು ನಮ್ಮ ಸಂಪರ್ಕ ಪುಟದ ಮೂಲಕ ತಿಳಿಸಿ.',
      fulfillmentProgress: 'ಆರ್ಡರ್ ಪ್ರಗತಿ',
      currentStage: 'ಪ್ರಸ್ತುತ ಹಂತ',
      courierTitle: 'ರವಾನೆ ಮತ್ತು ಕೊರಿಯರ್ ಮಾಹಿತಿ',
      courierPartner: 'ಕೊರಿಯರ್ ಸಂಸ್ಥೆ:',
      trackingNumber: 'ಟ್ರ್ಯಾಕಿಂಗ್ ಸಂಖ್ಯೆ:',
      itemsInOrder: 'ಆರ್ಡರ್‌ನಲ್ಲಿರುವ ಸೀರೆಗಳು',
      destinationDates: 'ತಲುಪುವ ಸ್ಥಳ ಮತ್ತು ದಿನಾಂಕ',
      destination: 'ತಲುಪುವ ಸ್ಥಳ:',
      placedOn: 'ಆರ್ಡರ್ ದಿನಾಂಕ:',
      accountPrompt: 'ಸೈನ್ ಇನ್ ಆದ ಗ್ರಾಹಕರು ವಿಳಾಸಗಳು ಮತ್ತು ರಸೀದಿಯನ್ನು ಇಲ್ಲಿ ನೋಡಬಹುದು:',
      myAccountLink: 'ನನ್ನ ಖಾತೆ',
      stepDetails: {
        'Order Placed': 'SIRIMAGGA ನಿಮ್ಮ ಆರ್ಡರ್ ಅನ್ನು ಸ್ವೀಕರಿಸಿದೆ.',
        Confirmed: 'ಲಭ್ಯತೆಯನ್ನು ಖಚಿತಪಡಿಸಿ ತಯಾರಿಕೆಗೆ ಅನುಮೋದಿಸಲಾಗಿದೆ.',
        'Quality Inspection': 'ನಮ್ಮ ತಂಡದಿಂದ ಸೀರೆಯ ನೇಯ್ಗೆ, ಬಾರ್ಡರ್ ಮತ್ತು ಉದ್ದವನ್ನು ಪರಿಶೀಲಿಸಲಾಗಿದೆ.',
        'Packaging in Progress': 'SIRIMAGGA ಮುದ್ರೆ ಅಂಟಿಸಿ ಸುರಕ್ಷಿತ ಬಾಕ್ಸ್‌ನಲ್ಲಿ ಪ್ಯಾಕ್ ಮಾಡಲಾಗುತ್ತಿದೆ.',
        'Ready to Dispatch': 'ಬಾಗಲಕೋಟೆ ಜಿಲ್ಲೆಯಿಂದ ಕೊರಿಯರ್ ಪಿಕ್‌ಅಪ್‌ಗೆ ಸಿದ್ಧವಾಗಿದೆ.',
        Shipped: 'ಕೊರಿಯರ್ ಮೂಲಕ ನಿಮ್ಮ ಊರಿಗೆ ಪ್ರಯಾಣಿಸುತ್ತಿದೆ.',
        Delivered: 'ನಿಮ್ಮ ನಗರಕ್ಕೆ ಯಶಸ್ವಿಯಾಗಿ ತಲುಪಿದೆ.',
      },
    },
    account: {
      welcomeTitle: 'SIRIMAGGA ಗೆ ಸ್ವಾಗತ',
      welcomeSub:
        'ನಿಮ್ಮ ವಿತರಣಾ ವಿಳಾಸಗಳನ್ನು ನಿರ್ವಹಿಸಲು, ಆರ್ಡರ್ ಇತಿಹಾಸ ನೋಡಲು ಮತ್ತು ಆರ್ಡರ್ ಟ್ರ್ಯಾಕ್ ಮಾಡಲು Google ಮೂಲಕ ಸೈನ್ ಇನ್ ಮಾಡಿ.',
      signInBtn: 'Google ನಿಂದ ಸೈನ್ ಇನ್ / ಖಾತೆ ತೆರೆಯಿರಿ',
      savedWishlist: 'ಉಳಿಸಿದ ಇಷ್ಟಪಟ್ಟಿ',
      kicker: 'ಗ್ರಾಹಕರ ಖಾತೆ',
      yourAccountFallback: 'ನಿಮ್ಮ ಖಾತೆ',
      openAdmin: 'ಅಡ್ಮಿನ್ ಡैಶ್‌ಬೋರ್ಡ್ ತೆರೆಯಿರಿ',
      signOut: 'ಸೈನ್ ಔಟ್',
      tabOrders: 'ಆರ್ಡರ್ ಮತ್ತು ಟ್ರ್ಯಾಕಿಂಗ್',
      tabWishlist: 'ಇಷ್ಟಪಟ್ಟಿ',
      tabAddresses: 'ವಿಳಾಸಗಳು',
      tabProfile: 'ಪ್ರೊಫೈಲ್',
      loadingOrders: 'ನಿಮ್ಮ ಆರ್ಡರ್ ಇತಿಹಾಸವನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...',
      noOrdersTitle: 'ಇನ್ನೂ ಯಾವುದೇ ಆರ್ಡರ್ ನೀಡಿಲ್ಲ',
      exploreSarees: 'ಸೀರೆಗಳನ್ನು ನೋಡಿ',
      orderPrefix: 'ಆರ್ಡರ್',
      statusPrefix: 'ಸ್ಥಿತಿ:',
      unavailableNotice:
        'ಈ ಆರ್ಡರ್‌ನ ಸೀರೆ ಲಭ್ಯತೆ ಕುರಿತು ಪರ್ಯಾಯ ಆಯ್ಕೆ ಅಥವಾ ಪೂರ್ಣ ರೀಫಂಡ್ ನೀಡಲು ನಮ್ಮ ತಂಡ ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತದೆ.',
      courierLabel: 'ಕೊರಿಯರ್:',
      trackingLabel: 'ಟ್ರ್ಯಾಕಿಂಗ್ ಸಂಖ್ಯೆ:',
      qtyLabel: 'ಪ್ರಮಾಣ',
      emailUpdatesTitle: 'ಆರ್ಡರ್ ಸ್ಥಿತಿ ಇಮೇಲ್ ಮಾಹಿತಿಗಳು',
      sentEmail: 'ಇಮೇಲ್ ಕಳುಹಿಸಲಾಗಿದೆ',
      deliveryFailed: 'ವಿತರಣೆ ವಿಫಲವಾಗಿದೆ',
      loggedEmail: 'ಕ್ಲೌಡ್ ಫಂಕ್ಷನ್ / SMTP ದಾಖಲೆ',
      deliverTo: 'ತಲುಪಿಸುವ ವಿಳಾಸ:',
      liveTrackingLink: 'ಲೈವ್ ಟ್ರ್ಯಾಕಿಂಗ್ ನೋಡಿ',
      cancelOrderBtn: 'ಆರ್ಡರ್ ರದ್ದುಗೊಳಿಸಿ',
      emptyWishlist: 'ನಿಮ್ಮ ಇಷ್ಟಪಟ್ಟಿ ಖಾಲಿಯಾಗಿದೆ',
      savedAddressesHeading: 'ಉಳಿಸಿದ ವಿತರಣಾ ವಿಳಾಸಗಳು',
      addNewAddress: 'ಹೊಸ ವಿಳಾಸ ಸೇರಿಸಿ',
      labelField: 'ಹೆಸರು (ಮನೆ/ಕಚೇರಿ)',
      recipientField: 'ಪಡೆಯುವವರ ಹೆಸರು',
      mobileField: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ',
      fullAddressField: 'ಪೂರ್ಣ ವಿಳಾಸ',
      cityField: 'ನಗರ',
      stateField: 'ರಾಜ್ಯ',
      pinField: 'ಪಿನ್ ಕೋಡ್',
      saveAddressBtn: 'ವಿಳಾಸ ಉಳಿಸಿ',
      cancelBtn: 'ರದ್ದು',
      profileTitle: 'ಪ್ರೊಫೈಲ್ ಸೆಟ್ಟಿಂಗ್ಸ್',
      fullNameField: 'ಪೂರ್ಣ ಹೆಸರು',
      emailField: 'ಇಮೇಲ್',
      mobileOptionalField: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ',
      saveProfileBtn: 'ಪ್ರೊಫೈಲ್ ಉಳಿಸಿ',
      savingProfileBtn: 'ಉಳಿಸಲಾಗುತ್ತಿದೆ...',
      profileUpdatedToast: 'ಪ್ರೊಫೈಲ್ ಅಪ್‌ಡೇಟ್ ಆಗಿದೆ.',
      addressSavedToast: 'ವಿತರಣಾ ವಿಳಾಸವನ್ನು ಉಳಿಸಲಾಗಿದೆ.',
      invalidPincodeToast: 'ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ 6 ಅಂಕಿಗಳ ಪಿನ್ ಕೋಡ್ ನಮೂದಿಸಿ.',
    },
    about: {
      kicker: 'ನಮ್ಮ ಮನೆ · ಬಾಗಲಕೋಟೆ ಜಿಲ್ಲೆ, ಕರ್ನಾಟಕ',
      title: 'ಹಳೆಯ ಕಾಲದ ಮಗ್ಗದ ಕಲೆ. ಆಧುನಿಕ ಗುಣಮಟ್ಟದ ಶಿಸ್ತು.',
      subtitle:
        'SIRIMAGGA ಉತ್ತರ ಕರ್ನಾಟಕದ ಶ್ರೇಷ್ಠ ವಸ್ತ್ರ ಪರಂಪರೆಯನ್ನು ಸಂಭ್ರಮಿಸುತ್ತದೆ—ಬಾಗಲಕೋಟೆಯ ನಮ್ಮ ಪರಿಶೀಲನಾ ಸ್ಟುಡಿಯೋದಿಂದ ಇಳಕಲ್, ಬನಹಟ್ಟಿ ಕಾಟನ್ ಮತ್ತು ಹಬ್ಬದ ರೇಷ್ಮೆ ಸೀರೆಗಳನ್ನು ಭಾರತದಾದ್ಯಂತ ತಲುಪಿಸುತ್ತದೆ.',
      heritageTitle: 'ಇಳಕಲ್, ರಬಕವಿ ಮತ್ತು ಬನಹಟ್ಟಿಯಲ್ಲಿ ಬೇರೂರಿದೆ',
      heritageP1:
        'ಬಾಗಲಕೋಟೆ ಜಿಲ್ಲೆಯಲ್ಲಿ ನೇಯ್ಗೆ ಕೇವಲ ಬಟ್ಟೆಯಲ್ಲ—ಅದು ನಿತ್ಯದ ಕಾಯಕ, ಋತುಮಾನದ ಲಯ ಮತ್ತು ಶುಭ ಸಮಾರಂಭಗಳ ಸಂಪ್ರದಾಯ. ಭಾರತದ ಬೇಸಿಗೆಗೆ ತಂಪಾದ ಬನಹಟ್ಟಿ ಕಾಟನ್‌ನಿಂದ ಇಳಕಲ್ ಸೆರಗಿನವರೆಗೆ ಪ್ರತಿ ಸೀರೆಯು ಪ್ರಾದೇಶಿಕ ಸೊಬಗನ್ನು ತೋರುತ್ತದೆ.',
      heritageP2:
        'ಬೃಹತ್ ಗೋದಾಮುಗಳಲ್ಲಿ ಸಂಗ್ರಹಿಸಿಡುವ ಬದಲು, ಪ್ರತಿ ಆರ್ಡರ್‌ನ ಲಭ್ಯತೆಯನ್ನು ಖಚಿತಪಡಿಸಿ, ನಮ್ಮ ಮೇಜಿನ ಮೇಲೆ ಹರಡಿ ಪರಿಶೀಲಿಸಿ, SIRIMAGGA ಮುದ್ರೆ ಹಾಗೂ ಕಂಪನಿ ಸ್ಟೋರಿ ಮತ್ತು ಆರೈಕೆ ಕಾರ್ಡ್‌ನೊಂದಿಗೆ ಕಳುಹಿಸಲಾಗುತ್ತದೆ.',
      archiveKicker: 'ದೃಶ್ಯ ಸಂಗ್ರಹ',
      archiveTitle: 'SIRIMAGGA ಲಾಂಛನ, ಪರಂಪರೆಯ ಮುದ್ರೆಗಳು ಮತ್ತು ಲುಕ್‌ಬುಕ್',
      archiveTag: 'ಬಹುಭಾಷಾ ಪರಂಪರೆ · ಸಿರಿಮಗ್ಗ',
      cards: [
        {
          title: 'ಬಾರ್ಡರ್ ಮತ್ತು ನೇಯ್ಗೆ ಸಂಗ್ರಹ',
          desc: 'ಸೂಕ್ಷ್ಮ ಬಾರ್ಡರ್ ವಿವರ, ಹಗುರ ಬೇಸಿಗೆ ಕಾಟನ್ ತೂಕ ಮತ್ತು ಶುಕ್ರವಾರದ ಲೂಮ್ ಡ್ರಾಪ್ ಮಾಹಿತಿ.',
        },
        {
          title: 'ಪ್ರಾದೇಶಿಕ ಪರಂಪರೆಯ ಮುದ್ರೆಗಳು',
          desc: 'ಇಳಕಲ್, ಬನಹಟ್ಟಿ ಮತ್ತು ಆರೈಕೆಯನ್ನು ಗೌರವಿಸುವ ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್ ಚಿಹ್ನೆಗಳು.',
        },
        {
          title: 'ಶಟಲ್ ಮತ್ತು ಮಗ್ಗದ ಅಭಿಯಾನ',
          desc: 'ಕರ್ನಾಟಕದ ಸಾಂಪ್ರದಾಯಿಕ ಮದುವೆ ಸೀರೆಗಳಿಂದ ಪ್ರೇರಿತ ಬಾಗಲಕೋಟೆ ಬಾರ್ಡರ್ ವಿನ್ಯಾಸ.',
        },
      ],
      ctaExplore: 'ಸಂಗ್ರಹವನ್ನು ನೋಡಿ',
      ctaTrack: 'ನಿಮ್ಮ ಆರ್ಡರ್ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ',
    },
  },
};
