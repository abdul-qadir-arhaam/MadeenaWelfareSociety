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
  };
  gallery: {
    sectionTitle: string;
    sectionSubtitle: string;
    viewAllPhotos: string;
    item1: string;
    item2: string;
    item3: string;
    item4: string;
  };
  getInTouch: {
    title: string;
    subtitle: string;
    button: string;
  };
  footer: {
    tagline: string;
    rights: string;
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
      sectionTitle: "Latest News / Updates",
      sectionSubtitle: "Stay informed with our recent activities and announcements.",
      viewAllNews: "View All News →",
      badgeEvent: "Event",
      badgeNotice: "Notice",
      badgeGallery: "Gallery",
      news1Title: "Independence Day Celebration at Madeena Colony",
      news2Title: "Educational Awards Ceremony: 83 Students Honored at Madeena Hall",
      news3Title: "Community Sports Event: Madeena Crowned Tournament Champions",
    },
    gallery: {
      sectionTitle: "Gallery",
      sectionSubtitle: "Moments from our work and community activities.",
      viewAllPhotos: "View All Photos →",
      item1: "Independence Day Celebration",
      item2: "Community Sports Event",
      item3: "Our Logo",
      item4: "Community Support",
    },
    getInTouch: {
      title: "Get In Touch",
      subtitle: "We welcome your queries, suggestions and support. Feel free to reach out to us.",
      button: "Contact Us →",
    },
    footer: {
      tagline: "Serving Our Community.",
      rights: "Madeena Welfare Society Bhatkal | Serving Our Community.",
    },
    admin: {
      login: "Admin Portal",
      dashboard: "CMS Dashboard",
    },
  },
  kn: {
    orgName: "ಮದೀನಾ ವೆಲ್ಫೇರ್ ಸೊಸೈಟಿ ಭಟ್ಕಳ",
    orgSubtitle: "Madeena Welfare Society Bhatkal",
    nav: {
      home: "ಮುಖಪುಟ",
      about: "ನಮ್ಮ ಬಗ್ಗೆ",
      services: "ಕಲ್ಯಾಣ",
      sports: "ಕ್ರೀಡೆ",
      achievements: "ಸಾಧನೆಗಳು",
      gallery: "ಚಿತ್ರಶಾಲೆ",
      news: "ಸುದ್ದಿ",
      contact: "ಸಂಪರ್ಕಿಸಿ",
    },
    hero: {
      eyebrow: "ಸಮುದಾಯ • ಸಹಕಾರ • ಕಲ್ಯಾಣ",
      title: "ಮದೀನಾ ವೆಲ್ಫೇರ್ ಸೊಸೈಟಿ ಭಟ್ಕಳ",
      subtitle: "ಆರೋಗ್ಯಕರ, ಬಲಿಷ್ಠ ಮತ್ತು ಕರುಣಾಮಯಿ ಸಮಾಜದ ನಿರ್ಮಾಣಕ್ಕಾಗಿ ಒಗ್ಗಟ್ಟಾಗಿ ಶ್ರಮಿಸುತ್ತಿದ್ದೇವೆ.",
      exploreBtn: "ನಮ್ಮ ಕಾರ್ಯಗಳನ್ನು ಅನ್ವೇಷಿಸಿ →",
    },
    programs: {
      sectionTitle: "ನಮ್ಮ ಕಲ್ಯಾಣ ಯೋಜನೆಗಳು",
      sectionSubtitle: "ವಿಶೇಷ ಉಪಕ್ರಮಗಳ ಮೂಲಕ ಸಮಾಜದ ಸೇವೆ ಮಾಡುತ್ತಿದ್ದೇವೆ.",
      eduTitle: "ಶಿಕ್ಷಣ ನೆರವು",
      eduDesc: "ಶಿಕ್ಷಣದ ಮೂಲಕ ಉಜ್ವಲ ಭವಿಷ್ಯ ನಿರ್ಮಿಸಲು ಸಹಾಯ.",
      healthTitle: "ಆರೋಗ್ಯ ಸಹಾಯ",
      healthDesc: "ಉತ್ತಮ ಆರೋಗ್ಯ ಮತ್ತು ಕ್ಷೇಮಕ್ಕಾಗಿ ಬೆಂಬಲ.",
      reliefTitle: "ತುರ್ತು ಪರಿಹಾರ",
      reliefDesc: "ಅಗತ್ಯ ಸಮಯದಲ್ಲಿ ಸಕಾಲಿಕ ನೆರವು ಒದಗಿಸುವುದು.",
      communityTitle: "ಸಮುದಾಯ ಬೆಂಬಲ",
      communityDesc: "ನಮ್ಮ ಸಮಾಜವನ್ನು ಒಟ್ಟಾಗಿ ಬಲಪಡಿಸುವುದು.",
    },
    news: {
      sectionTitle: "ಇತ್ತೀಚಿನ ಸುದ್ದಿ / ಅಪ್‌ಡೇಟ್‌ಗಳು",
      sectionSubtitle: "ನಮ್ಮ ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆಗಳು ಮತ್ತು ಪ್ರಕಟಣೆಗಳೊಂದಿಗೆ ಮಾಹಿತಿ ಪಡೆಯಿರಿ.",
      viewAllNews: "ಎಲ್ಲಾ ಸುದ್ದಿಗಳನ್ನು ವೀಕ್ಷಿಸಿ →",
      badgeEvent: "ಕಾರ್ಯಕ್ರಮ",
      badgeNotice: "ಸೂಚನೆ",
      badgeGallery: "ಗ್ಯಾಲರಿ",
      news1Title: "ಮದೀನಾ ಕಾಲೋನಿಯಲ್ಲಿ ಸ್ವಾತಂತ್ರ್ಯ ದಿನಾಚರಣೆ ಸಂಭ್ರಮ",
      news2Title: "ಮದೀನಾ ಶೈಕ್ಷಣಿಕ ಪ್ರಶಸ್ತಿ: 83 ಪ್ರತಿಭಾವಂತ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಸನ್ಮಾನ",
      news3Title: "ಸಮುದಾಯ ಕ್ರೀಡಾಕೂಟ: ಮದೀನಾ ವೆಲ್ಫೇರ್ ಸೊಸೈಟಿ ಚಾಂಪಿಯನ್",
    },
    gallery: {
      sectionTitle: "ಚಿತ್ರಶಾಲೆ",
      sectionSubtitle: "ನಮ್ಮ ಸೇವಾ ಕಾರ್ಯಗಳು ಮತ್ತು ಸಮುದಾಯ ಚಟುವಟಿಕೆಗಳ ಕ್ಷಣಗಳು.",
      viewAllPhotos: "ಎಲ್ಲಾ ಫೋಟೋಗಳನ್ನು ವೀಕ್ಷಿಸಿ →",
      item1: "ಸ್ವಾತಂತ್ರ್ಯ ದಿನಾಚರಣೆ ಸಮಾರಂಭ",
      item2: "ಸಮುದಾಯ ಕ್ರೀಡಾಕೂಟ",
      item3: "ನಮ್ಮ ಲೋಗೋ",
      item4: "ಸಮುದಾಯ ಸೇವೆ",
    },
    getInTouch: {
      title: "ಸಂಪರ್ಕದಲ್ಲಿರಿ",
      subtitle: "ನಿಮ್ಮ ಪ್ರಶ್ನೆಗಳು, ಸಲಹೆಗಳು ಮತ್ತು ಬೆಂಬಲವನ್ನು ನಾವು ಸ್ವಾಗತಿಸುತ್ತೇವೆ.",
      button: "ಸಂಪರ್ಕಿಸಿ →",
    },
    footer: {
      tagline: "ನಮ್ಮ ಸಮುದಾಯದ ಸೇವೆ.",
      rights: "ಮದೀನಾ ವೆಲ್ಫೇರ್ ಸೊಸೈಟಿ ಭಟ್ಕಳ | ಸಮಾಜ ಸೇವೆಗೆ ಸಮರ್ಪಿತ.",
    },
    admin: {
      login: "ನಿರ್ವಾಹಕ ಲಾಗಿನ್",
      dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
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
      eyebrow: "کمیونٹی • مدد • فلاح و بہبود",
      title: "مدینہ ویلفیئر سوسائٹی بھٹکل",
      subtitle: "ایک صحت مند، مضبوط اور ہمدرد معاشرے کے قیام کے لیے مل کر کام کر رہے ہیں۔",
      exploreBtn: "ہماری خدمات دیکھیں ←",
    },
    programs: {
      sectionTitle: "ہمارے فلاحی پروگرامز",
      sectionSubtitle: "مخصوص اور منظم اقدامات کے ذریعے سماج کی خدمت۔",
      eduTitle: "تعلیمی تعاون",
      eduDesc: "تعلیم کے ذریعے روشن مستقبل کی تعمیر میں مدد۔",
      healthTitle: "طبی امداد",
      healthDesc: "بہتر صحت اور تندرستی کے لیے معاونت۔",
      reliefTitle: "ہنگامی ریلیف",
      reliefDesc: "ضرورت کے وقت بروقت اور فوری مدد۔",
      communityTitle: "سماجی خدمات",
      communityDesc: "مل کر اپنے معاشرے کو مضبوط بنانا۔",
    },
    news: {
      sectionTitle: "تازہ ترین خبریں و اعلانات",
      sectionSubtitle: "ہماری سرگرمیوں اور تازہ اعلانات سے باخبر رہیں۔",
      viewAllNews: "تمام خبریں دیکھیں ←",
      badgeEvent: "پروگرام",
      badgeNotice: "اطلاع",
      badgeGallery: "گیلری",
      news1Title: "مدینہ کالونی میں جشنِ یومِ آزادی کی پروقار تقریب",
      news2Title: "مدینہ تعلیمی ایوارڈ 2026: 83 ہونہار طلبہ و طالبات کی حوصلہ افزائی",
      news3Title: "کمیونٹی اسپورٹس ٹورنامنٹ: مدینہ ویلفیئر سوسائٹی چیمپئن قرار",
    },
    gallery: {
      sectionTitle: "فوٹو گیلری",
      sectionSubtitle: "ہماری فلاحی اور سماجی سرگرمیوں کی یادگار جھلکیاں۔",
      viewAllPhotos: "تمام تصاویر دیکھیں ←",
      item1: "جشنِ یومِ آزادی تقریب",
      item2: "کمیونٹی اسپورٹس ایونٹ",
      item3: "ہمارا لوگو",
      item4: "سماجی خدمات و رضاکار",
    },
    getInTouch: {
      title: "ہم سے رابطہ کریں",
      subtitle: "آپ کے سوالات، تجاویز اور تعاون کا ہم خیر مقدم کرتے ہیں۔",
      button: "رابطہ فرمائیں ←",
    },
    footer: {
      tagline: "خدمتِ خلق ہمارا مشن۔",
      rights: "مدینہ ویلفیئر سوسائٹی بھٹکل | خدمتِ خلق ہمارا مشن۔",
    },
    admin: {
      login: "ایڈمن پورٹل",
      dashboard: "ڈیش بورڈ",
    },
  },
};
