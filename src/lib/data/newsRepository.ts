export interface NewsTranslation {
  language: "en" | "kn" | "ur";
  title: string;
  excerpt: string;
  content: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  featuredImage: string;
  author: string;
  publishedAt: string;
  status: "published" | "draft" | "archived";
  isFeatured: boolean;
  tags: string[];
  translations: {
    en: NewsTranslation;
    kn?: NewsTranslation;
    ur?: NewsTranslation;
  };
}

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: "news-1",
    slug: "independence-day-celebration",
    categoryId: "cat-5",
    categoryName: "Events",
    featuredImage: "/images/real/15aug.jpeg",
    author: "MWS Media Cell",
    publishedAt: "2026-08-15",
    status: "published",
    isFeatured: true,
    tags: ["IndependenceDay", "Bhatkal", "Patriotism", "Students"],
    translations: {
      en: {
        language: "en",
        title: "80th Independence Day Celebration at Madeena Welfare Society Bhatkal",
        excerpt:
          "Madeena Welfare Society Bhatkal marked the 80th Independence Day with patriotic fervor, flag hoisting, and distribution of student merit kits at Anjuman Institute campus.",
        content:
          "Madeena Welfare Society Bhatkal organized a grand celebration on the occasion of the 80th Independence Day of India at the Anjuman Institute campus in Bhatkal. The event witnessed large participation from local community leaders, patrons, youth, and school students.\n\nThe national tricolor was hoisted amidst patriotic slogans, followed by the singing of the National Anthem. Community elders and executive committee members addressed the gathering, emphasizing the values of unity in diversity, community service, and youth education.\n\nAs part of the welfare initiative, educational kits and merit scholarships were distributed to over 50 deserving students from underprivileged backgrounds across Bhatkal.",
        seoTitle: "80th Independence Day Celebration — Madeena Welfare Society Bhatkal",
        seoDescription:
          "Flag hoisting ceremony and student merit distribution organized by Madeena Welfare Society Bhatkal.",
      },
      kn: {
        language: "kn",
        title: "ಮದೀನಾ ವೆಲ್ಫೇರ್ ಸೊಸೈಟಿ ಭಟ್ಕಳದಲ್ಲಿ 80ನೇ ಸ್ವಾತಂತ್ರ್ಯ ದಿನಾಚರಣೆ",
        excerpt:
          "ಭಟ್ಕಳದ ಮದೀನಾ ವೆಲ್ಫೇರ್ ಸೊಸೈಟಿ ವತಿಯಿಂದ ದೇಶಭಕ್ತಿ, ಧ್ವಜಾರೋಹಣ ಹಾಗೂ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಶೈಕ್ಷಣಿಕ ಕಿಟ್ ವಿತರಣೆಯೊಂದಿಗೆ 80ನೇ ಸ್ವಾತಂತ್ರ್ಯ ದಿನವನ್ನು ಆಚರಿಸಲಾಯಿತು.",
        content:
          "ಭಟ್ಕಳದ ಮದೀನಾ ವೆಲ್ಫೇರ್ ಸೊಸೈಟಿ ವತಿಯಿಂದ ಭಾರತದ 80ನೇ ಸ್ವಾತಂತ್ರ್ಯ ದಿನಾಚರಣೆಯನ್ನು ಅಂಜುಮನ್ ಸಂಸ್ಥೆಯ ಆವರಣದಲ್ಲಿ ಅತ್ಯಂತ ಸಂಭ್ರಮದಿಂದ ಆಚರಿಸಲಾಯಿತು. ಸ್ಥಳೀಯ ಸಮಾಜ ಮುಖಂಡರು, ವಿದ್ಯಾರ್ಥಿಗಳು ಮತ್ತು ನಾಗರಿಕರು ಪಾಲ್ಗೊಂಡಿದ್ದರು.",
      },
      ur: {
        language: "ur",
        title: "مدینہ ویلفیئر سوسائٹی بھٹکل کے زیر اہتمام 80 ویں یوم آزادی کی شاندار تقریب",
        excerpt:
          "مدینہ ویلفیئر سوسائٹی بھٹکل کے زیر اہتمام انجمن انسٹی ٹیوٹ کے احاطے میں پرچم کشائی اور مستحق طلباء میں تعلیمی کٹس کی تقسیم کے ساتھ یوم آزادی منایا گیا۔",
        content:
          "مدینہ ویلفیئر سوسائٹی بھٹکل کے زیر اہتمام ہندوستان کے 80 ویں یوم آزادی کے پرمسرت موقع پر انجمن انسٹی ٹیوٹ کیمپس میں ایک باوقار اور پروقار تقریب کا انعقاد کیا گیا۔ اس تقریب میں بستی کے معززین، علمائے کرام اور کثیر تعداد میں طلباء نے شرکت کی۔\n\nقومی ترانے کے ساتھ ترنگا لہرایا گیا اور مقررین نے قومی یکجہتی اور نوجوانوں کی تعلیمی ترقی پر زور دیا۔",
      },
    },
  },
  {
    id: "news-2",
    slug: "educational-awards-ceremony",
    categoryId: "cat-4",
    categoryName: "Achievements",
    featuredImage: "/images/instagram/insta_post_11.jpg",
    author: "MWS Education Board",
    publishedAt: "2026-08-15",
    status: "published",
    isFeatured: true,
    tags: ["Education", "MadinaTaleemiAward", "Scholarships", "SSLC", "PUC"],
    translations: {
      en: {
        language: "en",
        title: "Madina Ta'leemi Award & Academic Scholarship Ceremony",
        excerpt:
          "Annual felicitation program recognizing 83 top academic achievers in Hifz, Fazilat, SSLC, PUC, and university examinations across Bhatkal.",
        content:
          "The annual Madina Ta'leemi Award Ceremony was held with solemn dignity at the Madeena Welfare Society Hall in Bhatkal. The event recognized 83 top-performing students across 7 diverse academic and religious education streams.\n\nPresident Maulana Irfan Nadwi and General Secretary Maulana Abdul Samee Nadwi graced the stage and commended the students for their academic excellence and ethical commitment.\n\nFinancial grants and higher education scholarships exceeding ₹10 Lakhs were announced for aspiring engineers, doctors, and civil service candidates.",
        seoTitle: "Madina Ta'leemi Award Ceremony — Madeena Welfare Society",
        seoDescription:
          "Academic felicitation for 83 meritorious students in Bhatkal by Madeena Welfare Society.",
      },
      ur: {
        language: "ur",
        title: "مدینہ تعلیمی ایوارڈ اور وظائف کی سالانہ تقریب",
        excerpt:
          "مدینہ ویلفیئر سوسائٹی کے زیر اہتمام 83 ہونہار طلباء کو حفاظ، فضیلت، ایس ایس ایل سی اور پی یو سی میں شاندار کارکردگی پر اعزازات سے نوازا گیا۔",
        content:
          "مدینہ ویلفیئر سوسائٹی ہال میں سالانہ مدینہ تعلیمی ایوارڈ کا شاندار جلسہ منعقد ہوا جس میں صدر مولانا عرفان ندوی اور جنرل سکریٹری مولانا عبد السمیع ندوی نے طلباء میں اسناد اور انعامات تقسیم کیے۔",
      },
    },
  },
  {
    id: "news-3",
    slug: "community-sports-event",
    categoryId: "cat-3",
    categoryName: "Sports",
    featuredImage: "/images/instagram/posts/post_DSh4VECErEA_1.jpg",
    author: "MWS Sports Club",
    publishedAt: "2026-08-10",
    status: "published",
    isFeatured: false,
    tags: ["Sports", "Cricket", "CosmosTrophy", "Champions", "BPL"],
    translations: {
      en: {
        language: "en",
        title: "Madeena Welfare Society Clinches Grand Cricket Championship",
        excerpt:
          "Madeena sports squad took home the prestigious Cosmos Golden Jubilee Trophy and ₹75,000 cash prize after a commanding finals performance in Bhatkal.",
        content:
          "Madeena Welfare Society's cricket team concluded a triumphant season by winning the Cosmos Golden Jubilee Trophy in Bhatkal.\n\nOutstanding contributions from match-winner Ilyas Motia and pace bowler Shamoun Shabandri spearheaded the team to an emphatic victory, greeted by cheering supporters in Madeena Colony.\n\nThe sports committee extended appreciation to coaches, patrons, and the dedicated youth lineup.",
        seoTitle: "Cricket Championship Victory — Madeena Welfare Society",
        seoDescription:
          "Madeena Welfare Society cricket team wins Cosmos Trophy in Bhatkal.",
      },
      kn: {
        language: "kn",
        title: "ಮದೀನಾ ವೆಲ್ಫೇರ್ ಸೊಸೈಟಿ ತಂಡಕ್ಕೆ ಭವ್ಯ ಕ್ರಿಕೆಟ್ ಚಾಂಪಿಯನ್‌ಶಿಪ್ ಪ್ರಶಸ್ತಿ",
        excerpt:
          "ಭಟ್ಕಳದಲ್ಲಿ ನಡೆದ ಕಾಸ್ಮೊಸ್ ಗೋಲ್ಡನ್ ಜುಬಿಲಿ ಟ್ರೋಫಿ ಕ್ರಿಕೆಟ್ ಪಂದ್ಯಾವಳಿಯಲ್ಲಿ ಮದೀನಾ ವೆಲ್ಫೇರ್ ಸೊಸೈಟಿ ತಂಡವು ಚಾಂಪಿಯನ್ ಆಗಿ ಹೊರಹೊಮ್ಮಿದೆ.",
        content:
          "ಭಟ್ಕಳದ ಪ್ರತಿಷ್ಠಿತ ಕಾಸ್ಮೊಸ್ ಗೋಲ್ಡನ್ ಜುಬಿಲಿ ಕ್ರಿಕೆಟ್ ಪಂದ್ಯಾವಳಿಯ ಫೈನಲ್ ಪಂದ್ಯದಲ್ಲಿ ಅದ್ಭುತ ಪ್ರದರ್ಶನ ನೀಡಿದ ಮದೀನಾ ವೆಲ್ಫೇರ್ ಸೊಸೈಟಿ ತಂಡವು ₹75,000 ನಗದು ಬಹುಮಾನದೊಂದಿಗೆ ಪ್ರಶಸ್ತಿಯನ್ನು ತನ್ನದಾಗಿಸಿಕೊಂಡಿದೆ.",
      },
    },
  },
  {
    id: "news-4",
    slug: "ramadan-eid-welfare-drive",
    categoryId: "cat-2",
    categoryName: "Welfare",
    featuredImage: "/images/instagram/insta_post_12.jpg",
    author: "MWS Relief Committee",
    publishedAt: "2026-04-01",
    status: "draft",
    isFeatured: false,
    tags: ["Welfare", "Ramadan", "Eid", "ReliefKits"],
    translations: {
      en: {
        language: "en",
        title: "Annual Ramadan & Eid-ul-Fitr Welfare Distribution Program",
        excerpt:
          "Over 300 essential grocery kits and festive support distributed to underprivileged families in Madeena Colony and coastal settlements.",
        content:
          "Ahead of the auspicious festive period, Madeena Welfare Society organized an extensive community welfare drive to ensure dignified celebrations for all families.\n\nRation packages including rice, wheat, cooking oil, dates, and essential supplies were delivered by volunteer teams directly to households.",
      },
    },
  },
];

const inMemoryNews: NewsArticle[] = [...INITIAL_NEWS];

export function getNewsList(filters?: {
  status?: string;
  category?: string;
  search?: string;
}): NewsArticle[] {
  let list = [...inMemoryNews];

  if (filters?.status && filters.status !== "all") {
    list = list.filter((n) => n.status === filters.status);
  }

  if (filters?.category && filters.category !== "all") {
    list = list.filter((n) => n.categoryId === filters.category || n.categoryName === filters.category);
  }

  if (filters?.search && filters.search.trim()) {
    const q = filters.search.toLowerCase().trim();
    list = list.filter((n) => {
      const enTitle = n.translations.en?.title?.toLowerCase() || "";
      const enExcerpt = n.translations.en?.excerpt?.toLowerCase() || "";
      const urTitle = n.translations.ur?.title || "";
      const knTitle = n.translations.kn?.title || "";
      return (
        enTitle.includes(q) ||
        enExcerpt.includes(q) ||
        urTitle.includes(q) ||
        knTitle.includes(q) ||
        n.slug.includes(q)
      );
    });
  }

  // Sort by date descending
  return list.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getNewsById(id: string): NewsArticle | undefined {
  return inMemoryNews.find((n) => n.id === id);
}

export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return inMemoryNews.find((n) => n.slug === slug);
}

export function createNews(article: Omit<NewsArticle, "id">): NewsArticle {
  const newArticle: NewsArticle = {
    ...article,
    id: `news-${Date.now()}`,
  };
  inMemoryNews.unshift(newArticle);
  return newArticle;
}

export function updateNews(id: string, updates: Partial<NewsArticle>): NewsArticle | null {
  const index = inMemoryNews.findIndex((n) => n.id === id);
  if (index === -1) return null;
  inMemoryNews[index] = { ...inMemoryNews[index], ...updates };
  return inMemoryNews[index];
}

export function deleteNews(id: string): boolean {
  const index = inMemoryNews.findIndex((n) => n.id === id);
  if (index === -1) return false;
  inMemoryNews.splice(index, 1);
  return true;
}

export function togglePublishStatus(id: string): NewsArticle | null {
  const article = inMemoryNews.find((n) => n.id === id);
  if (!article) return null;
  article.status = article.status === "published" ? "draft" : "published";
  return article;
}
