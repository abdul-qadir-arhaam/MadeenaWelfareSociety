import { Language } from "./config";

export interface TranslationDictionary {
  orgName: string;
  orgSubtitle: string;
  nav: {
    home: string;
    about: string;
    services: string;
    sports: string;
    achievements: string;
    gallery: string;
    news: string;
    contact: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    exploreBtn: string;
    honorsBtn: string;
    statsLegacy: string;
    statsLegacyLabel: string;
    statsChampions: string;
    statsChampionsLabel: string;
    statsScholars: string;
    statsScholarsLabel: string;
    championshipTitle: string;
    championshipSubtitle: string;
    championshipFelicitation: string;
    regdBadge: string;
  };
  programs: {
    sectionTitle: string;
    sectionSubtitle: string;
    eduTitle: string;
    eduDesc: string;
    healthTitle: string;
    healthDesc: string;
    reliefTitle: string;
    reliefDesc: string;
    communityTitle: string;
    communityDesc: string;
  };
  news: {
    sectionTitle: string;
    sectionSubtitle: string;
    viewAllNews: string;
    badgeEvent: string;
    badgeNotice: string;
    badgeGallery: string;
    news1Title: string;
    news2Title: string;
    news3Title: string;
    readMore: string;
    publishedOn: string;
    byAuthor: string;
    shareArticle: string;
    relatedNews: string;
    backToNews: string;
    noArticles: string;
    searchPlaceholder: string;
  };
  gallery: {
    sectionTitle: string;
    sectionSubtitle: string;
    viewAllPhotos: string;
    item1: string;
    item2: string;
    item3: string;
    item4: string;
    pageTitle: string;
    pageSubtitle: string;
    allPostsTab: string;
    albumsTab: string;
    allCategories: string;
    searchPostsPlaceholder: string;
    searchAlbumsPlaceholder: string;
    viewSlideshow: string;
    viewFullPhoto: string;
    photosCount: string;
    like: string;
    share: string;
    noPosts: string;
    noAlbums: string;
    resetFilters: string;
    albumDetail: string;
    backToPosts: string;
    photosInAlbum: string;
    noPhotosAlbum: string;
    filterNotice: string;
  };
  about: {
    pageTitle: string;
    pageSubtitle: string;
    visionTitle: string;
    visionP1: string;
    visionP2: string;
    card1Title: string;
    card1Desc: string;
    card2Title: string;
    card2Desc: string;
    card3Title: string;
    card3Desc: string;
  };
  sports: {
    pageTitle: string;
    pageSubtitle: string;
    allTab: string;
    cricketTab: string;
    footballTab: string;
    nightLeagueTab: string;
    spotlightsTab: string;
    tournamentsTab: string;
    viewMatchPhotos: string;
    championBadge: string;
    firstPrizeLabel: string;
  };
  welfare: {
    pageTitle: string;
    pageSubtitle: string;
    statEdu: string;
    statEduVal: string;
    statFood: string;
    statFoodVal: string;
    statHealth: string;
    statHealthVal: string;
    statLegacy: string;
    statLegacyVal: string;
    allCategory: string;
    supportDesc: string;
    volunteerBtn: string;
  };
  achievements: {
    pageTitle: string;
    pageSubtitle: string;
    allFilter: string;
    sportsFilter: string;
    socialFilter: string;
    eduFilter: string;
    honorsBadge: string;
  };
  contact: {
    pageTitle: string;
    pageSubtitle: string;
    officeAddress: string;
    officeAddressVal: string;
    emailInquiries: string;
    emailDesc: string;
    phoneSupport: string;
    phoneDesc: string;
    formTitle: string;
    formName: string;
    formEmail: string;
    formSubject: string;
    formMessage: string;
    formSendBtn: string;
    formSuccess: string;
  };
  common: {
    shareSuccess: string;
    clearFilter: string;
    back: string;
    close: string;
    search: string;
    filter: string;
    photo: string;
    photos: string;
  };
  getInTouch: {
    title: string;
    subtitle: string;
    button: string;
  };
  footer: {
    tagline: string;
    rights: string;
    quickLinks: string;
    contactInfo: string;
    campusAddress: string;
  };
  admin: {
    login: string;
    dashboard: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    orgName: "Madeena Welfare Society Bhatkal",
    orgSubtitle: "مدینہ ویلفیئر سوسائٹی ، بھٹکل",
    nav: {
      home: "Home",
      about: "About",
      services: "Welfare",
      sports: "Sports",
      achievements: "Honors",
      gallery: "Gallery",
      news: "News",
      contact: "Contact",
    },
    hero: {
      eyebrow: "COMMUNITY • SUPPORT • WELFARE",
      title: "Madeena Welfare Society Bhatkal",
      subtitle: "Working together for a healthier, stronger and more compassionate community.",
      exploreBtn: "Explore Our Work →",
      honorsBtn: "Championship Honors",
      statsLegacy: "60+",
      statsLegacyLabel: "Years of Legacy",
      statsChampions: "₹75K",
      statsChampionsLabel: "Cosmos Champions",
      statsScholars: "83+",
      statsScholarsLabel: "Merit Scholars",
      championshipTitle: "Championship Victory & Medals Felicitation",
      championshipSubtitle: "₹75,000 Grand Title",
      championshipFelicitation: "Victorious squad decorated with gold medals and the Cosmos Trophy in Bhatkal.",
      regdBadge: "Regd. USA 1960",
    },
    programs: {
      sectionTitle: "Our Welfare Programs",
      sectionSubtitle: "Serving the community through dedicated initiatives.",
      eduTitle: "Education Support",
      eduDesc: "Helping build brighter futures through education.",
      healthTitle: "Healthcare Assistance",
      healthDesc: "Supporting better health and well-being.",
      reliefTitle: "Emergency Relief",
      reliefDesc: "Providing timely help in times of need.",
      communityTitle: "Community Support",
      communityDesc: "Strengthening our community together.",
    },
    news: {
      sectionTitle: "Latest News & Bulletins",
      sectionSubtitle: "Stay updated with our ongoing activities and announcements.",
      viewAllNews: "View All News →",
      badgeEvent: "Event",
      badgeNotice: "Notice",
      badgeGallery: "Gallery",
      news1Title: "Independence Day Celebrations Held with Great Patriotic Spirit",
      news2Title: "Madina Ta'leemi Award 2026: 83 Students Felicitated",
      news3Title: "Community Cricket Tournament: Madeena Team Emerges Champion",
      readMore: "Read Full Article →",
      publishedOn: "Published on",
      byAuthor: "By",
      shareArticle: "Share Article",
      relatedNews: "Related Articles",
      backToNews: "Back to All News",
      noArticles: "No articles found.",
      searchPlaceholder: "Search news articles...",
    },
    gallery: {
      sectionTitle: "Photo Gallery & Archives",
      sectionSubtitle: "Memorable moments from our community events and welfare drives.",
      viewAllPhotos: "View All Photos →",
      item1: "Independence Day Gathering",
      item2: "Community Sports Event",
      item3: "Our Logo Heritage",
      item4: "Community Welfare Drive",
      pageTitle: "Moments, Memories & Photo Stories",
      pageSubtitle: "Browse authentic photo stories, youth sports championships, community welfare drives, and historic moments from Madeena Welfare Society Bhatkal.",
      allPostsTab: "All Posts",
      albumsTab: "Curated Albums",
      allCategories: "All Categories",
      searchPostsPlaceholder: "Search photo posts...",
      searchAlbumsPlaceholder: "Search albums...",
      viewSlideshow: "View Slideshow",
      viewFullPhoto: "View Full Photo",
      photosCount: "Photos",
      like: "Like",
      share: "Share",
      noPosts: "No gallery posts found",
      noAlbums: "No albums found",
      resetFilters: "Reset Filters",
      albumDetail: "Album Detail",
      backToPosts: "Back to All Gallery Posts",
      photosInAlbum: "Photos in Album",
      noPhotosAlbum: "No photos found in this album yet.",
      filterNotice: "Filtering posts from album:",
    },
    about: {
      pageTitle: "About Madeena Welfare Society",
      pageSubtitle: "Serving the community of Bhatkal with compassion, commitment, and dedication since 1960.",
      visionTitle: "Our Vision & Mission",
      visionP1: "Madeena Welfare Society Bhatkal was founded with the core mission of uplifting the community through accessible education, medical aid, disaster relief, youth empowerment, and cultural sports activities.",
      visionP2: "We strive to foster unity, provide dependable assistance to underprivileged families, celebrate community achievements, and create a healthier, stronger, and more resilient society.",
      card1Title: "Compassionate Service",
      card1Desc: "Directly addressing grassroots needs through food drives, emergency medical relief, and family support in Madeena Colony and Bhatkal taluk.",
      card2Title: "Youth & Education",
      card2Desc: "Hosting the annual Madina Ta'leemi Award, honoring 80+ meritorious students annually across Hifz, Fazilat, SSLC, PUC, and professional degrees.",
      card3Title: "Sports & Brotherhood",
      card3Desc: "Organizing athletic cups, floodlit cricket leagues, and youth sports events to build healthy habits and sportsmanship.",
    },
    sports: {
      pageTitle: "Sports & Athletic Championships",
      pageSubtitle: "Celebrating athletic spirit, cricket tournaments, night leagues, and sports victories of Madeena Welfare Society.",
      allTab: "All Disciplines",
      cricketTab: "Cricket",
      footballTab: "Football",
      nightLeagueTab: "Night League",
      spotlightsTab: "Player Spotlight",
      tournamentsTab: "Tournaments",
      viewMatchPhotos: "View Match Photos",
      championBadge: "CHAMPIONS 🏆",
      firstPrizeLabel: "First Prize: ₹75,000",
    },
    welfare: {
      pageTitle: "Community Welfare & Humanitarian Relief",
      pageSubtitle: "Dedicated grassroots programs providing healthcare assistance, educational scholarships, and emergency ration relief in Bhatkal.",
      statEdu: "Educational Aid Distributed",
      statEduVal: "₹10+ Lakhs",
      statFood: "Food & Ration Kits Provided",
      statFoodVal: "1,200+",
      statHealth: "Medical Aid & Surgeries",
      statHealthVal: "350+ Cases",
      statLegacy: "Active Service in Bhatkal",
      statLegacyVal: "33+ Years",
      allCategory: "All Programs",
      supportDesc: "Directly assisting underprivileged families with compassion and transparency.",
      volunteerBtn: "Join as Volunteer →",
    },
    achievements: {
      pageTitle: "Our Achievements & Honors",
      pageSubtitle: "Honoring three decades of dedication, sporting triumphs, academic milestones, and humanitarian service in Bhatkal.",
      allFilter: "All Honors",
      sportsFilter: "Sports",
      socialFilter: "Social Work",
      eduFilter: "Education",
      honorsBadge: "Championships & Milestones",
    },
    contact: {
      pageTitle: "Contact Madeena Welfare Society",
      pageSubtitle: "We welcome your inquiries, suggestions, and collaborative efforts.",
      officeAddress: "Office Address",
      officeAddressVal: "Madeena Welfare Society Campus, Main Road, Bhatkal, Karnataka — 581320",
      emailInquiries: "Email Inquiries",
      emailDesc: "contact@madeenaws.bhatkal.org (Replies within 24–48 hours)",
      phoneSupport: "Telephone Helpline",
      phoneDesc: "+91 8386 226xxx (10:00 AM – 6:00 PM IST)",
      formTitle: "Send Us a Message",
      formName: "Full Name",
      formEmail: "Email Address",
      formSubject: "Subject",
      formMessage: "Your Message",
      formSendBtn: "Send Message →",
      formSuccess: "Thank you! Your message has been sent successfully. Our team will get back to you shortly.",
    },
    common: {
      shareSuccess: "Link copied to clipboard!",
      clearFilter: "Clear Filter",
      back: "Back",
      close: "Close",
      search: "Search",
      filter: "Filter",
      photo: "Photo",
      photos: "Photos",
    },
    getInTouch: {
      title: "Get in Touch With Us",
      subtitle: "We welcome your inquiries, suggestions, and collaborative efforts.",
      button: "Contact Us →",
    },
    footer: {
      tagline: "Dedicated to the welfare, education, and development of our community.",
      rights: "Madeena Welfare Society Bhatkal. All rights reserved.",
      quickLinks: "Quick Links",
      contactInfo: "Contact Information",
      campusAddress: "Madeena Welfare Society Campus, Main Road, Bhatkal, Karnataka 581320",
    },
    admin: {
      login: "Admin Portal",
      dashboard: "Dashboard",
    },
  },

  ur: {
    orgName: "مدینہ ویلفیئر سوسائٹی بھٹکل",
    orgSubtitle: "Madeena Welfare Society Bhatkal",
    nav: {
      home: "صفحۂ اول",
      about: "ہمارے بارے میں",
      services: "فلاح و بہبود",
      sports: "کھیل کود",
      achievements: "اعزازات",
      gallery: "گیلری",
      news: "خبریں",
      contact: "رابطہ",
    },
    hero: {
      eyebrow: "سماج • امداد • فلاح و بہبود",
      title: "مدینہ ویلفیئر سوسائٹی بھٹکل",
      subtitle: "ایک صحت مند، مضبوط اور ہمدرد معاشرے کے قیام کے لیے پرعزم۔",
      exploreBtn: "ہماری خدمات دیکھیں ←",
      honorsBtn: "چیمپئن شپ اعزازات",
      statsLegacy: "60+",
      statsLegacyLabel: "سالہ شاندار تاریخ",
      statsChampions: "₹75K",
      statsChampionsLabel: "کاسماس چیمپئنز",
      statsScholars: "83+",
      statsScholarsLabel: "تعلیمی اسکالرز",
      championshipTitle: "شاندار چیمپئن شپ فتح و طلائی تمغہ جات تقریب",
      championshipSubtitle: "75,000 روپے کا گرینڈ ٹائٹل",
      championshipFelicitation: "فاتح مدینہ ٹیم کو بھٹکل میں طلائی تمغوں اور باوقار کاسماس ٹرافی سے نوازا گیا۔",
      regdBadge: "رجسٹرڈ 1960",
    },
    programs: {
      sectionTitle: "ہمارے فلاحی پروگرامز",
      sectionSubtitle: "منظم اقدامات کے ذریعے انسانیت اور سماج کی مخلصانہ خدمت۔",
      eduTitle: "تعلیمی تعاون",
      eduDesc: "نوجوانوں کے روشن مستقبل کی تعمیر کے لیے تعلیمی گرانٹس اور کٹس۔",
      healthTitle: "طبی امداد",
      healthDesc: "مستحقین کے لیے مفت علاج اور ادویات کی فراہمی۔",
      reliefTitle: "ہنگامی ریلیف",
      reliefDesc: "آفت اور ضرورت کے لمحات میں فوری راشن اور امداد۔",
      communityTitle: "سماجی یکجہتی",
      communityDesc: "باہمی اخوت اور بھائی چارے کے فروغ کے اقدامات۔",
    },
    news: {
      sectionTitle: "تازہ ترین خبریں و اعلانات",
      sectionSubtitle: "ہماری سرگرمیوں، کارناموں اور پریس اعلانات سے باخبر رہیں۔",
      viewAllNews: "تمام خبریں دیکھیں ←",
      badgeEvent: "پروگرام",
      badgeNotice: "اطلاع",
      badgeGallery: "گیلری",
      news1Title: "مدینہ کالونی میں جشنِ یومِ آزادی کی پروقار تقریب",
      news2Title: "مدینہ تعلیمی ایوارڈ 2026: 83 ہونہار طلبہ و طالبات کی حوصلہ افزائی",
      news3Title: "کمیونٹی کرکٹ چیمپئن شپ: مدینہ ویلفیئر سوسائٹی فتح یاب",
      readMore: "مکمل خبر پڑھیں ←",
      publishedOn: "اشاعت بتاریخ",
      byAuthor: "از قلم",
      shareArticle: "خبر شیئر کریں",
      relatedNews: "متعلقہ خبریں",
      backToNews: "تمام خبروں پر واپس جائیں",
      noArticles: "کوئی مضمون دستیاب نہیں ہے۔",
      searchPlaceholder: "خبریں تلاش کریں...",
    },
    gallery: {
      sectionTitle: "فوٹو گیلری و تصویری پوسٹس",
      sectionSubtitle: "ہماری فلاحی مہمات، کھیلوں کی فتوحات اور پرمسرت لمحات کی یادگار جھلکیاں۔",
      viewAllPhotos: "تمام تصاویر دیکھیں ←",
      item1: "جشنِ یومِ آزادی تقریب",
      item2: "کمیونٹی اسپورٹس ایونٹ",
      item3: "ہمارا سرکاری نشان",
      item4: "سماجی خدمات و راشن تقسیم",
      pageTitle: "تصویری یادیں، کہانیاں اور لمحے",
      pageSubtitle: "مدینہ ویلفیئر سوسائٹی بھٹکل کی فلاحی خدمات، اسپورٹس چیمپئن شپ اور جشن کی مستند تصویری جھلکیاں ملاحظہ فرمائیں۔",
      allPostsTab: "تمام پوسٹس",
      albumsTab: "منتخب البمز",
      allCategories: "تمام زمرے",
      searchPostsPlaceholder: "تصویری پوسٹس تلاش کریں...",
      searchAlbumsPlaceholder: "البم تلاش کریں...",
      viewSlideshow: "سلائیڈ شو دیکھیں",
      viewFullPhoto: "مکمل تصویر دیکھیں",
      photosCount: "تصاویر",
      like: "پسند",
      share: "شیئر",
      noPosts: "کوئی پوسٹ نہیں ملی",
      noAlbums: "کوئی البم نہیں ملا",
      resetFilters: "فلٹر صاف کریں",
      albumDetail: "البم کی تفصیل",
      backToPosts: "تمام گیلری پوسٹس پر واپس جائیں",
      photosInAlbum: "اس البم کی تصاویر",
      noPhotosAlbum: "اس البم میں ابھی تک کوئی تصویر شامل نہیں کی گئی۔",
      filterNotice: "اس البم کی پوسٹس دیکھی جا رہی ہیں:",
    },
    about: {
      pageTitle: "مدینہ ویلفیئر سوسائٹی بھٹکل کا تعارف",
      pageSubtitle: "1960ء سے خلوص، ہمدردی اور عزم کے ساتھ بھٹکل کے عوام کی خدمت میں پیش پیش۔",
      visionTitle: "ہمارا نصب العین اور مشن",
      visionP1: "مدینہ ویلفیئر سوسائٹی بھٹکل کا قیام تعلیم، طبی امداد، ہنگامی ریلیف اور نوجوانوں کے کردار سازی کے ذریعے سماج کی ترقی کے لیے عمل میں آیا۔",
      visionP2: "ہم اتحاد و اتفاق کو فروغ دینے، پسماندہ خاندانوں کی دستگیری کرنے اور ایک مضبوط اور فلاحی معاشرہ تشکیل دینے کے لیے مسلسل کوشاں ہیں۔",
      card1Title: "مخلصانہ خدمتِ خلق",
      card1Desc: "مدینہ کالونی اور گرد و نواح میں راشن کٹس، طبی امداد اور ضرورت مند خاندانوں کی براہِ راست کفالت۔",
      card2Title: "تعلیم و نوجوانوں کی سرپرستی",
      card2Desc: "سالانہ مدینہ تعلیمی ایوارڈ کا انعقاد جس میں حفظ، فضیلت، ایس ایس ایل سی اور ڈگریوں کے 80 سے زائد ہونہار طلبہ کو اعزازات دیے جاتے ہیں۔",
      card3Title: "کھیل کود اور اخوت",
      card3Desc: "کرکٹ لیگز اور اسپورٹس ٹورنامنٹس کا انعقاد تاکہ نوجوانوں میں صحتمند مسابقت اور بھائی چارہ پروان چڑھے۔",
    },
    sports: {
      pageTitle: "کھیل کود اور چیمپئن شپ ٹورنامنٹس",
      pageSubtitle: "مدینہ ویلفیئر سوسائٹی کی شاندار کھیلوں کی فتوحات، کرکٹ ٹورنامنٹس اور نائٹ ٹرف لیگز کی جھلکیاں۔",
      allTab: "تمام کھیل",
      cricketTab: "کرکٹ",
      footballTab: "فٹ بال",
      nightLeagueTab: "نائٹ لیگ",
      spotlightsTab: "کھلاڑی کی جھلک",
      tournamentsTab: "ٹورنامنٹس",
      viewMatchPhotos: "میچ کی تصاویر دیکھیں",
      championBadge: "گرینڈ چیمپئنز 🏆",
      firstPrizeLabel: "پہلا انعام: 75,000 روپے",
    },
    welfare: {
      pageTitle: "سماجی فلاح و بہبود اور انسانی امداد",
      pageSubtitle: "بھٹکل میں تعلیمی اسکالرشپس، مفت طبی سہولیات اور راشن تقسیم کے موثر اور شفاف پروگرامز۔",
      statEdu: "تعلیمی امداد کی فراہمی",
      statEduVal: "10+ لاکھ روپے",
      statFood: "راشن کٹس کی تقسیم",
      statFoodVal: "1,200+ خاندان",
      statHealth: "طبی علاج اور سرجری",
      statHealthVal: "350+ مریض",
      statLegacy: "بھٹکل میں مسلسل خدمت",
      statLegacyVal: "33+ سال",
      allCategory: "تمام پروگرامز",
      supportDesc: "شفافیت اور ہمدردی کے ساتھ ضرورت مند خاندانوں کی براہ راست امداد۔",
      volunteerBtn: "بطور رضاکار شامل ہوں ←",
    },
    achievements: {
      pageTitle: "ہمارے اعزازات اور تاریخی کامیابیاں",
      pageSubtitle: "بھٹکل میں تین دہائیوں پر محیط انسانی خدمت، کھیلوں کی عظیم فتوحات اور تعلیمی سنگِ میل۔",
      allFilter: "تمام اعزازات",
      sportsFilter: "کھیل کود",
      socialFilter: "سماجی خدمات",
      eduFilter: "تعلیم",
      honorsBadge: "چیمپئن شپ و اعزازات",
    },
    contact: {
      pageTitle: "مدینہ ویلفیئر سوسائٹی سے رابطہ کریں",
      pageSubtitle: "آپ کے سوالات، نیک تجاویز اور خیراتی تعاون کا تہہِ دل سے خیر مقدم ہے۔",
      officeAddress: "دفتر کا پتہ",
      officeAddressVal: "مدینہ ویلفیئر سوسائٹی کیمپس، مین روڈ، بھٹکل، کرناٹک — 581320",
      emailInquiries: "ای میل رابطہ",
      emailDesc: "contact@madeenaws.bhatkal.org (جواب 24 تا 48 گھنٹوں میں)",
      phoneSupport: "ٹیلی فون ہیلپ لائن",
      phoneDesc: "+91 8386 226xxx (صبح 10:00 تا شام 6:00 بجے)",
      formTitle: "ہمیں اپنا پیغام بھیجیں",
      formName: "آپ کا پورا نام",
      formEmail: "ای میل ایڈریس",
      formSubject: "موضوع",
      formMessage: "آپ کا پیغام",
      formSendBtn: "پیغام ارسال کریں ←",
      formSuccess: "شکریہ! آپ کا پیغام کامیابی کے ساتھ موصول ہو گیا ہے۔ ہماری ٹیم جلد آپ سے رابطہ کرے گی۔",
    },
    common: {
      shareSuccess: "لنک کاپی ہو گیا!",
      clearFilter: "فلٹر ختم کریں",
      back: "واپس",
      close: "بند کریں",
      search: "تلاش کریں",
      filter: "فلٹر",
      photo: "تصویر",
      photos: "تصاویر",
    },
    getInTouch: {
      title: "ہم سے رابطہ فرمائیں",
      subtitle: "آپ کے سوالات، مشوروں اور تعاون کا ہم خیر مقدم کرتے ہیں۔",
      button: "رابطہ فرمائیں ←",
    },
    footer: {
      tagline: "معاشرے کی فلاح، تعلیم اور ترقی کے لیے وقف ایک باوقار سوسائٹی۔",
      rights: "مدینہ ویلفیئر سوسائٹی بھٹکل۔ تمام جملہ حقوق محفوظ ہیں۔",
      quickLinks: "فوری لنکس",
      contactInfo: "رابطے کی معلومات",
      campusAddress: "مدینہ ویلفیئر سوسائٹی کیمپس، مین روڈ، بھٹکل، کرناٹک 581320",
    },
    admin: {
      login: "ایڈمن پورٹل",
      dashboard: "ڈیش بورڈ",
    },
  },

  kn: {
    orgName: "ಮದೀನಾ ವೆಲ್ಫೇರ್ ಸೊಸೈಟಿ ಭಟ್ಕಳ",
    orgSubtitle: "Madeena Welfare Society Bhatkal",
    nav: {
      home: "ಮುಖಪುಟ",
      about: "ನಮ್ಮ ಬಗ್ಗೆ",
      services: "ಸಮಾಜ ಕಲ್ಯಾಣ",
      sports: "ಕ್ರೀಡೆ",
      achievements: "ಸಾಧನೆಗಳು",
      gallery: "ಚಿತ್ರಶಾಲೆ",
      news: "ಸುದ್ದಿಗಳು",
      contact: "ಸಂಪರ್ಕ",
    },
    hero: {
      eyebrow: "ಸಮುದಾಯ • ಬೆಂಬಲ • ಕಲ್ಯಾಣ",
      title: "ಮದೀನಾ ವೆಲ್ಫೇರ್ ಸೊಸೈಟಿ ಭಟ್ಕಳ",
      subtitle: "ಆರೋಗ್ಯಕರ, ಬಲಿಷ್ಠ ಮತ್ತು ಕರುಣಾಮಯಿ ಸಮಾಜದ ನಿರ್ಮಾಣಕ್ಕಾಗಿ ಒಟ್ಟಾಗಿ ಶ್ರಮಿಸುತ್ತಿದ್ದೇವೆ.",
      exploreBtn: "ನಮ್ಮ ಕಾರ್ಯಗಳನ್ನು ವೀಕ್ಷಿಸಿ →",
      honorsBtn: "ಚಾಂಪಿಯನ್‌ಶಿಪ್ ಸಾಧನೆಗಳು",
      statsLegacy: "60+",
      statsLegacyLabel: "ವರ್ಷಗಳ ಇತಿಹಾಸ",
      statsChampions: "₹75K",
      statsChampionsLabel: "ಕಾಸ್ಮೊಸ್ ಚಾಂಪಿಯನ್ಸ್",
      statsScholars: "83+",
      statsScholarsLabel: "ಪ್ರತಿಭಾವಂತ ವಿದ್ಯಾರ್ಥಿಗಳು",
      championshipTitle: "ಭವ್ಯ ಚಾಂಪಿಯನ್‌ಶಿಪ್ ಜಯ ಮತ್ತು ಚಿನ್ನದ ಪದಕ ಪ್ರದಾನ",
      championshipSubtitle: "₹75,000 ಬಹುಮಾನದ ಪ್ರಶಸ್ತಿ",
      championshipFelicitation: "ಭಟ್ಕಳದಲ್ಲಿ ಚಿನ್ನದ ಪದಕ ಹಾಗೂ ಕಾಸ್ಮೊಸ್ ಟ್ರೋಫಿ ಮುಡಿಗೇರಿಸಿಕೊಂಡ ಮದೀನಾ ಕ್ರೀಡಾ ತಂಡ.",
      regdBadge: "ನೋಂದಾಯಿತ 1960",
    },
    programs: {
      sectionTitle: "ನಮ್ಮ ಕಲ್ಯಾಣ ಕಾರ್ಯಕ್ರಮಗಳು",
      sectionSubtitle: "ಸಮರ್ಪಕ ಯೋಜನೆಗಳ ಮೂಲಕ ಸಮಾಜದ ಸೇವೆ.",
      eduTitle: "ಶೈಕ್ಷಣಿಕ ಬೆಂಬಲ",
      eduDesc: "ವಿದ್ಯಾರ್ಥಿಗಳ ಉಜ್ವಲ ಭವಿಷ್ಯಕ್ಕಾಗಿ ವಿದ್ಯಾರ್ಥಿವೇತನ ಮತ್ತು ಶೈಕ್ಷಣಿಕ ಕಿಟ್ ವಿತರಣೆ.",
      healthTitle: "ಆರೋಗ್ಯ ನೆರವು",
      healthDesc: "ಅಗತ್ಯವಿರುವ ರೋಗಿಗಳಿಗೆ ಉಚಿತ ಚಿಕಿತ್ಸೆ ಮತ್ತು ಔಷಧಿ ನೆರವು.",
      reliefTitle: "ತುರ್ತು ಪರಿಹಾರ",
      reliefDesc: "ಕಷ್ಟದ ಸಂದರ್ಭಗಳಲ್ಲಿ ದಿನಸಿ ಮತ್ತು ತುರ್ತು ಆರ್ಥಿಕ ನೆರವು.",
      communityTitle: "ಸಾಮಾಜಿಕ ಸಹಬಾಳ್ವೆ",
      communityDesc: "ಪರಸ್ಪರ ಸೌಹಾರ್ದತೆ ಮತ್ತು ಭ್ರಾತೃತ್ವ ಬಲಪಡಿಸುವ ಉಪಕ್ರಮಗಳು.",
    },
    news: {
      sectionTitle: "ತಾಜಾ ಸುದ್ದಿಗಳು ಮತ್ತು ಪ್ರಕಟಣೆಗಳು",
      sectionSubtitle: "ನಮ್ಮ ಸಮಾಜಮುಖಿ ಚಟುವಟಿಕೆಗಳು ಮತ್ತು ಪತ್ರಿಕಾ ಪ್ರಕಟಣೆಗಳ ವಿವರ.",
      viewAllNews: "ಎಲ್ಲಾ ಸುದ್ದಿಗಳನ್ನು ವೀಕ್ಷಿಸಿ →",
      badgeEvent: "ಕಾರ್ಯಕ್ರಮ",
      badgeNotice: "ಪ್ರಕಟಣೆ",
      badgeGallery: "ಗ್ಯಾಲರಿ",
      news1Title: "ಮದೀನಾ ಕಾಲೋನಿಯಲ್ಲಿ 80ನೇ ಸ್ವಾತಂತ್ರ್ಯ ದಿನಾಚರಣೆ",
      news2Title: "ಮದೀನಾ ತಾಲೀಮಿ ಅವಾರ್ಡ್: 83 ಪ್ರತಿಭಾವಂತ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಸನ್ಮಾನ",
      news3Title: "ಕ್ರಿಕೆಟ್ ಪಂದ್ಯಾವಳಿ: ಮದೀನಾ ವೆಲ್ಫೇರ್ ಸೊಸೈಟಿ ತಂಡಕ್ಕೆ ಭವ್ಯ ಗೆಲುವು",
      readMore: "ಸಂಪೂರ್ಣ ವರದಿ ಓದಿ →",
      publishedOn: "ಪ್ರಕಟಣೆ ದಿನಾಂಕ",
      byAuthor: "ವರದಿ",
      shareArticle: "ಸುದ್ದಿ ಹಂಚಿಕೊಳ್ಳಿ",
      relatedNews: "ಸಂಬಂಧಿತ ಸುದ್ದಿಗಳು",
      backToNews: "ಎಲ್ಲಾ ಸುದ್ದಿಗಳಿಗೆ ಹಿಂತಿರುಗಿ",
      noArticles: "ಯಾವುದೇ ಲೇಖನಗಳು ಲಭ್ಯವಿಲ್ಲ.",
      searchPlaceholder: "ಸುದ್ದಿಗಳನ್ನು ಹುಡುಕಿ...",
    },
    gallery: {
      sectionTitle: "ಚಿತ್ರಶಾಲೆ ಮತ್ತು ಫೋಟೋ ಆಲ್ಬಮ್",
      sectionSubtitle: "ನಮ್ಮ ಸಮಾಜ ಕಲ್ಯಾಣ ಮತ್ತು ಕ್ರೀಡಾ ಕ್ಷಣಗಳ ಸುಂದರ ಚಿತ್ರಾವಳಿ.",
      viewAllPhotos: "ಎಲ್ಲಾ ಚಿತ್ರಗಳನ್ನು ವೀಕ್ಷಿಸಿ →",
      item1: "ಸ್ವಾತಂತ್ರ್ಯ ದಿನಾಚರಣೆ",
      item2: "ಕ್ರೀಡಾ ಪಂದ್ಯಾವಳಿ",
      item3: "ನಮ್ಮ ಅಧಿಕೃತ ಲೋಗೋ",
      item4: "ಸಮಾಜ ಸೇವಾ ಕ್ಷಣಗಳು",
      pageTitle: "ಸುಂದರ ನೆನಪುಗಳು ಮತ್ತು ಚಿತ್ರ ಕಥೆಗಳು",
      pageSubtitle: "ಭಟ್ಕಳದ ಮದೀನಾ ವೆಲ್ಫೇರ್ ಸೊಸೈಟಿಯ ಕಲ್ಯಾಣ ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಕ್ರೀಡಾ ವಿಜಯದ ನೈಜ ಛಾಯಾಚಿತ್ರಗಳು.",
      allPostsTab: "ಎಲ್ಲಾ ಪೋಸ್ಟ್‌ಗಳು",
      albumsTab: "ಆಲ್ಬಮ್‌ಗಳು",
      allCategories: "ಎಲ್ಲಾ ವಿಭಾಗಗಳು",
      searchPostsPlaceholder: "ಚಿತ್ರಗಳನ್ನು ಹುಡುಕಿ...",
      searchAlbumsPlaceholder: "ಆಲ್ಬಮ್ ಹುಡುಕಿ...",
      viewSlideshow: "ಸ್ಲೈಡ್ ಶೋ ವೀಕ್ಷಿಸಿ",
      viewFullPhoto: "ಸಂಪೂರ್ಣ ಚಿತ್ರ ನೋಡಿ",
      photosCount: "ಚಿತ್ರಗಳು",
      like: "ಇಷ್ಟ",
      share: "ಹಂಚಿಕೊಳ್ಳಿ",
      noPosts: "ಯಾವುದೇ ಪೋಸ್ಟ್ ಲಭ್ಯವಿಲ್ಲ",
      noAlbums: "ಯಾವುದೇ ಆಲ್ಬಮ್ ಲಭ್ಯವಿಲ್ಲ",
      resetFilters: "ಫಿಲ್ಟರ್ ತೆರವುಗೊಳಿಸಿ",
      albumDetail: "ಆಲ್ಬಮ್ ವಿವರ",
      backToPosts: "ಎಲ್ಲಾ ಚಿತ್ರಗಳಿಗೆ ಹಿಂತಿರುಗಿ",
      photosInAlbum: "ಈ ಆಲ್ಬಮ್‌ನಲ್ಲಿರುವ ಚಿತ್ರಗಳು",
      noPhotosAlbum: "ಈ ಆಲ್ಬಮ್‌ನಲ್ಲಿ ಇನ್ನೂ ಯಾವುದೇ ಚಿತ್ರಗಳಿಲ್ಲ.",
      filterNotice: "ಆಲ್ಬಮ್‌ನಿಂದ ಫಿಲ್ಟರ್ ಮಾಡಲಾದ ಪೋಸ್ಟ್‌ಗಳು:",
    },
    about: {
      pageTitle: "ಮದೀನಾ ವೆಲ್ಫೇರ್ ಸೊಸೈಟಿ ಭಟ್ಕಳ ಪರಿಚಯ",
      pageSubtitle: "1960 ರಿಂದ ಕರುಣೆ, ಬದ್ಧತೆ ಮತ್ತು ನಿಸ್ವಾರ್ಥ ಸೇವೆಯೊಂದಿಗೆ ಭಟ್ಕಳದ ಜನರ ಸೇವೆಯಲ್ಲಿ.",
      visionTitle: "ನಮ್ಮ ಧ್ಯೇಯೋದ್ದೇಶಗಳು",
      visionP1: "ಶಿಕ್ಷಣ, ವೈದ್ಯಕೀಯ ನೆರವು, ಯುವ ಸಬಲೀಕರಣ ಮತ್ತು ಕ್ರೀಡಾ ಚಟುವಟಿಕೆಗಳ ಮೂಲಕ ಸಮಾಜದ ಉನ್ನತಿಗಾಗಿ ಮದೀನಾ ವೆಲ್ಫೇರ್ ಸೊಸೈಟಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿದೆ.",
      visionP2: "ಏಕತೆ ಮತ್ತು ಸಹೋದರತ್ವವನ್ನು ಪ್ರೋತ್ಸಾಹಿಸಿ, ಬಡ ಕುಟುಂಬಗಳಿಗೆ ಭರವಸೆಯ ನೆರವು ನೀಡುವುದು ನಮ್ಮ ಮುಖ್ಯ ಉದ್ದೇಶವಾಗಿದೆ.",
      card1Title: "ನಿಸ್ವಾರ್ಥ ಸಮಾಜ ಸೇವೆ",
      card1Desc: "ಮದೀನಾ ಕಾಲೋನಿ ಮತ್ತು ಭಟ್ಕಳದಾದ್ಯಂತ ದಿನಸಿ ಕಿಟ್‌ಗಳು, ಉಚಿತ ವೈದ್ಯಕೀಯ ಚಿಕಿತ್ಸೆ ಮತ್ತು ಕುಟುಂಬ ನೆರವು.",
      card2Title: "ಯುವಜನತೆ ಮತ್ತು ಶಿಕ್ಷಣ",
      card2Desc: "ವಾರ್ಷಿಕ ಮದೀನಾ ತಾಲೀಮಿ ಪ್ರಶಸ್ತಿ ಮೂಲಕ 80 ಕ್ಕೂ ಹೆಚ್ಚು ಪ್ರತಿಭಾವಂತ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಸನ್ಮಾನ ಮತ್ತು ಪ್ರೋತ್ಸಾಹ.",
      card3Title: "ಕ್ರೀಡೆ ಮತ್ತು ಸೌಹಾರ್ದತೆ",
      card3Desc: "ಯುವಜನರಲ್ಲಿ ಸದ್ಭಾವನೆ ಮತ್ತು ದೈಹಿಕ ಕ್ಷಮತೆ ಬೆಳೆಸಲು ಕ್ರಿಕೆಟ್ ಹಾಗೂ ಕ್ರೀಡಾಕೂಟಗಳ ನಿರಂತರ ಆಯೋಜನೆ.",
    },
    sports: {
      pageTitle: "ಕ್ರೀಡಾ ಚಾಂಪಿಯನ್‌ಶಿಪ್ ವಿವರ",
      pageSubtitle: "ಮದೀನಾ ವೆಲ್ಫೇರ್ ಸೊಸೈಟಿಯ ಕ್ರೀಡಾಪಟುಗಳ ಸಾಹಸ, ಕ್ರಿಕೆಟ್ ವಿಜಯಗಳು ಮತ್ತು ಟ್ರೋಫಿಗಳ ವಿವರ.",
      allTab: "ಎಲ್ಲಾ ಕ್ರೀಡೆಗಳು",
      cricketTab: "ಕ್ರಿಕೆಟ್",
      footballTab: "ಫುಟ್ಬಾಲ್",
      nightLeagueTab: "ನೈಟ್ ಲೀಗ್",
      spotlightsTab: "ಕ್ರೀಡಾಪಟು ಪರಿಚಯ",
      tournamentsTab: "ಪಂದ್ಯಾವಳಿಗಳು",
      viewMatchPhotos: "ಪಂದ್ಯದ ಚಿತ್ರಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
      championBadge: "ಚಾಂಪಿಯನ್ಸ್ 🏆",
      firstPrizeLabel: "ಪ್ರಥಮ ಬಹುಮಾನ: ₹75,000",
    },
    welfare: {
      pageTitle: "ಸಮಾಜ ಕಲ್ಯಾಣ ಮತ್ತು ಮಾನವೀಯ ಸೇವೆಗಳು",
      pageSubtitle: "ಭಟ್ಕಳದಲ್ಲಿ ಶೈಕ್ಷಣಿಕ ನೆರವು, ಆರೋಗ್ಯ ಸೇವೆ ಮತ್ತು ತುರ್ತು ಪರಿಹಾರ ನೀಡುವ ಪಾರದರ್ಶಕ ವ್ಯವಸ್ಥೆ.",
      statEdu: "ವಿತರಿಸಲಾದ ಶೈಕ್ಷಣಿಕ ನೆರವು",
      statEduVal: "₹10+ ಲಕ್ಷಗಳು",
      statFood: "ವಿತರಿಸಿದ ದಿನಸಿ ಕಿಟ್‌ಗಳು",
      statFoodVal: "1,200+ ಕುಟುಂಬಗಳು",
      statHealth: "ವೈದ್ಯಕೀಯ ನೆರವು ಮತ್ತು ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ",
      statHealthVal: "350+ ರೋಗಿಗಳು",
      statLegacy: "ಭಟ್ಕಳದಲ್ಲಿ ನಿರಂತರ ಸೇವೆ",
      statLegacyVal: "33+ ವರ್ಷಗಳು",
      allCategory: "ಎಲ್ಲಾ ಯೋಜನೆಗಳು",
      supportDesc: "ಪಾರದರ್ಶಕತೆ ಮತ್ತು ಕರುಣೆಯೊಂದಿಗೆ ಬಡ ಕುಟುಂಬಗಳಿಗೆ ನೆರವು.",
      volunteerBtn: "ಸ್ವಯಂಸೇವಕರಾಗಿ ಸೇರಿ →",
    },
    achievements: {
      pageTitle: "ನಮ್ಮ ಹೆಮ್ಮೆಯ ಸಾಧನೆಗಳು",
      pageSubtitle: "ಭಟ್ಕಳದಲ್ಲಿ ಕಳೆದ ಮೂರು ದಶಕಗಳ ಸಮಾಜ ಸೇವೆ, ಕ್ರೀಡಾ ವಿಜಯಗಳು ಮತ್ತು ಶೈಕ್ಷಣಿಕ ಮೈಲಿಗಲ್ಲುಗಳು.",
      allFilter: "ಎಲ್ಲಾ ಸಾಧನೆಗಳು",
      sportsFilter: "ಕ್ರೀಡೆ",
      socialFilter: "ಸಮಾಜ ಸೇವೆ",
      eduFilter: "ಶಿಕ್ಷಣ",
      honorsBadge: "ಚಾಂಪಿಯನ್‌ಶಿಪ್ ಗೌರವಗಳು",
    },
    contact: {
      pageTitle: "ಮದೀನಾ ವೆಲ್ಫೇರ್ ಸೊಸೈಟಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ",
      pageSubtitle: "ನಿಮ್ಮ ಪ್ರಶ್ನೆಗಳು, ಸಲಹೆಗಳು ಮತ್ತು ಸಹಕಾರವನ್ನು ನಾವು ಮುಕ್ತವಾಗಿ ಸ್ವಾಗತಿಸುತ್ತೇವೆ.",
      officeAddress: "ಕಚೇರಿಯ ವಿಳಾಸ",
      officeAddressVal: "ಮದೀನಾ ವೆಲ್ಫೇರ್ ಸೊಸೈಟಿ ಕ್ಯಾಂಪಸ್, ಮುಖ್ಯ ರಸ್ತೆ, ಭಟ್ಕಳ, ಕರ್ನಾಟಕ — 581320",
      emailInquiries: "ಇಮೇಲ್ ಸಂಪರ್ಕ",
      emailDesc: "contact@madeenaws.bhatkal.org (24-48 ಗಂಟೆಗಳಲ್ಲಿ ಪ್ರತಿಕ್ರಿಯೆ)",
      phoneSupport: "ದೂರವಾಣಿ ಸಹಾಯವಾಣಿ",
      phoneDesc: "+91 8386 226xxx (ಬೆಳಿಗ್ಗೆ 10:00 ರಿಂದ ಸಂಜೆ 6:00)",
      formTitle: "ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಕಳುಹಿಸಿ",
      formName: "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು",
      formEmail: "ಇಮೇಲ್ ವಿಳಾಸ",
      formSubject: "ವಿಷಯ",
      formMessage: "ನಿಮ್ಮ ಸಂದೇಶ",
      formSendBtn: "ಸಂದೇಶ ಕಳುಹಿಸಿ →",
      formSuccess: "ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ಸಂದೇಶ ಯಶಸ್ವಿಯಾಗಿ ತಲುಪಿದೆ. ನಮ್ಮ ತಂಡ ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಲಿದೆ.",
    },
    common: {
      shareSuccess: "ಲಿಂಕ್ ಕಾಪಿ ಮಾಡಲಾಗಿದೆ!",
      clearFilter: "ಫಿಲ್ಟರ್ ತೆರವುಗೊಳಿಸಿ",
      back: "ಹಿಂದಕ್ಕೆ",
      close: "ಮುಚ್ಚಿ",
      search: "ಹುಡುಕಿ",
      filter: "ಫಿಲ್ಟರ್",
      photo: "ಚಿತ್ರ",
      photos: "ಚಿತ್ರಗಳು",
    },
    getInTouch: {
      title: "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",
      subtitle: "ನಿಮ್ಮ ಪ್ರಶ್ನೆಗಳು, ಸಲಹೆಗಳು ಮತ್ತು ಸಹಕಾರವನ್ನು ನಾವು ಸ್ವಾಗತಿಸುತ್ತೇವೆ.",
      button: "ಸಂಪರ್ಕಿಸಿ →",
    },
    footer: {
      tagline: "ಸಮಾಜದ ಕಲ್ಯಾಣ, ಶಿಕ್ಷಣ ಮತ್ತು ಸಬಲೀಕರಣಕ್ಕಾಗಿ ಸಮರ್ಪಿತ ಸಂಸ್ಥೆ.",
      rights: "ಮದೀನಾ ವೆಲ್ಫೇರ್ ಸೊಸೈಟಿ ಭಟ್ಕಳ. ಸರ್ವ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
      quickLinks: "ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು",
      contactInfo: "ಸಂಪರ್ಕ ವಿವರ",
      campusAddress: "ಮದೀನಾ ವೆಲ್ಫೇರ್ ಸೊಸೈಟಿ ಕ್ಯಾಂಪಸ್, ಮುಖ್ಯ ರಸ್ತೆ, ಭಟ್ಕಳ, ಕರ್ನಾಟಕ 581320",
    },
    admin: {
      login: "ಅಡ್ಮಿನ್ ಲಾಗಿನ್",
      dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    },
  },
};
