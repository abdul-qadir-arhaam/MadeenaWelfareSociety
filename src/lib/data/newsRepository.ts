import fs from "fs";
import path from "path";

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

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const DATA_DIR = path.join(process.cwd(), "data");
const NEWS_FILE = path.join(DATA_DIR, "news.json");
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (
    !url ||
    !url.startsWith("https://") ||
    url.includes("placeholder")
  ) {
    return null;
  }

  if (serviceKey && !serviceKey.includes("placeholder")) {
    try {
      return createAdminClient();
    } catch {
      // Fall through to anon key
    }
  }

  if (anonKey && !anonKey.includes("placeholder")) {
    try {
      return createSupabaseClient(url, anonKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      });
    } catch {
      return null;
    }
  }

  return null;
}

async function resolveCategoryUuid(supabase: any, categoryId?: string, categoryName?: string): Promise<string | null> {
  if (categoryId && UUID_REGEX.test(categoryId)) {
    return categoryId;
  }
  try {
    const nameToMatch = categoryName || "General";
    const { data: catRow } = await supabase
      .from("categories")
      .select("id")
      .ilike("name", nameToMatch)
      .maybeSingle();

    if (catRow?.id) return catRow.id;

    const { data: generalRow } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", "general")
      .maybeSingle();

    return generalRow?.id || null;
  } catch {
    return null;
  }
}

function loadStoredNews(): NewsArticle[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(NEWS_FILE)) {
      fs.writeFileSync(NEWS_FILE, JSON.stringify(INITIAL_NEWS, null, 2), "utf-8");
      return [...INITIAL_NEWS];
    }
    const raw = fs.readFileSync(NEWS_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed as NewsArticle[];
    }
    return [...INITIAL_NEWS];
  } catch {
    return [...INITIAL_NEWS];
  }
}

function persistNews(news: NewsArticle[]): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(NEWS_FILE, JSON.stringify(news, null, 2), "utf-8");
  } catch {
    // Read-only filesystem on Vercel/serverless environments is safely caught
  }
}

async function fetchNewsFromSupabase(filters?: {
  status?: string;
  category?: string;
  search?: string;
}): Promise<NewsArticle[] | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  try {
    let query = supabase
      .from("news")
      .select(`
        id,
        slug,
        category_id,
        featured_image,
        author,
        published_at,
        status,
        is_featured,
        tags,
        categories (
          id,
          name,
          slug
        ),
        news_translations (
          language,
          title,
          excerpt,
          content,
          seo_title,
          seo_description
        )
      `)
      .order("published_at", { ascending: false });

    if (filters?.status && filters.status !== "all") {
      query = query.eq("status", filters.status);
    }

    const { data, error } = await query;
    if (error) {
      console.warn("[newsRepository] Supabase fetch warning:", error.message);
      return null;
    }

    if (!data || !Array.isArray(data)) return null;

    let articles: NewsArticle[] = data.map((row: any) => {
      const translations: NewsArticle["translations"] = {
        en: { language: "en", title: "", excerpt: "", content: "" },
      };

      (row.news_translations || []).forEach((t: any) => {
        if (t.language === "en" || t.language === "kn" || t.language === "ur") {
          translations[t.language as "en" | "kn" | "ur"] = {
            language: t.language,
            title: t.title || "",
            excerpt: t.excerpt || "",
            content: t.content || "",
            seoTitle: t.seo_title || undefined,
            seoDescription: t.seo_description || undefined,
          };
        }
      });

      const catObj = Array.isArray(row.categories) ? row.categories[0] : row.categories;
      const categoryName = catObj?.name || "General";

      return {
        id: String(row.id),
        slug: row.slug,
        categoryId: row.category_id || "",
        categoryName,
        featuredImage: row.featured_image || "/images/real/15aug.jpeg",
        author: row.author || "MWS Media Cell",
        publishedAt: row.published_at
          ? String(row.published_at).split("T")[0]
          : new Date().toISOString().split("T")[0],
        status: (row.status as "published" | "draft" | "archived") || "published",
        isFeatured: Boolean(row.is_featured),
        tags: Array.isArray(row.tags) ? row.tags : [],
        translations,
      };
    });

    if (filters?.category && filters.category !== "all") {
      const catFilter = filters.category.toLowerCase().trim();
      articles = articles.filter(
        (n) =>
          n.categoryId === filters.category ||
          n.categoryName?.toLowerCase() === catFilter
      );
    }

    if (filters?.search && filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      articles = articles.filter((n) => {
        const enTitle = n.translations?.en?.title?.toLowerCase() || "";
        const enExcerpt = n.translations?.en?.excerpt?.toLowerCase() || "";
        const urTitle = n.translations?.ur?.title?.toLowerCase() || "";
        const knTitle = n.translations?.kn?.title?.toLowerCase() || "";
        const slug = n.slug?.toLowerCase() || "";
        return (
          enTitle.includes(q) ||
          enExcerpt.includes(q) ||
          urTitle.includes(q) ||
          knTitle.includes(q) ||
          slug.includes(q)
        );
      });
    }

    return articles;
  } catch (err) {
    console.warn("[newsRepository] Supabase fetch exception:", err);
    return null;
  }
}

export async function getNewsList(filters?: {
  status?: string;
  category?: string;
  search?: string;
}): Promise<NewsArticle[]> {
  const remoteNews = await fetchNewsFromSupabase(filters);
  if (remoteNews !== null && remoteNews.length > 0) {
    return remoteNews;
  }

  let list = loadStoredNews();

  if (filters?.status && filters.status !== "all") {
    list = list.filter((n) => n.status === filters.status);
  }

  if (filters?.category && filters.category !== "all") {
    list = list.filter(
      (n) =>
        n.categoryId === filters.category ||
        n.categoryName === filters.category ||
        n.categoryName?.toLowerCase() === filters.category?.toLowerCase()
    );
  }

  if (filters?.search && filters.search.trim()) {
    const q = filters.search.toLowerCase().trim();
    list = list.filter((n) => {
      const enTitle = n.translations?.en?.title?.toLowerCase() || "";
      const enExcerpt = n.translations?.en?.excerpt?.toLowerCase() || "";
      const urTitle = n.translations?.ur?.title?.toLowerCase() || "";
      const knTitle = n.translations?.kn?.title?.toLowerCase() || "";
      const slug = n.slug?.toLowerCase() || "";
      return (
        enTitle.includes(q) ||
        enExcerpt.includes(q) ||
        urTitle.includes(q) ||
        knTitle.includes(q) ||
        slug.includes(q)
      );
    });
  }

  return list.sort((a, b) => {
    const timeA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const timeB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    if (isNaN(timeA) || isNaN(timeB)) {
      return (b.publishedAt || "").localeCompare(a.publishedAt || "");
    }
    return timeB - timeA;
  });
}

export async function getNewsById(id: string): Promise<NewsArticle | undefined> {
  const list = await getNewsList({ status: "all" });
  return list.find((n) => n.id === id);
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle | undefined> {
  const normalized = (slug || "").toLowerCase().trim();
  const list = await getNewsList({ status: "all" });
  return list.find((n) => (n.slug || "").toLowerCase().trim() === normalized);
}

export async function createNews(article: Omit<NewsArticle, "id">): Promise<NewsArticle> {
  const supabase = getSupabaseClient();
  let createdArticle: NewsArticle | null = null;

  if (supabase) {
    try {
      const validCategoryId = await resolveCategoryUuid(supabase, article.categoryId, article.categoryName);

      const { data: newsRow, error: newsErr } = await supabase
        .from("news")
        .insert({
          slug: article.slug,
          category_id: validCategoryId,
          featured_image: article.featuredImage || "/images/real/15aug.jpeg",
          author: article.author || "MWS Media Cell",
          published_at: article.publishedAt
            ? new Date(article.publishedAt).toISOString()
            : new Date().toISOString(),
          status: article.status || "published",
          is_featured: Boolean(article.isFeatured),
          tags: Array.isArray(article.tags) ? article.tags : [],
        })
        .select()
        .single();

      if (newsErr) {
        console.error("[newsRepository] Supabase news insert error:", newsErr);
      } else if (newsRow) {
        const transRows: any[] = [];
        if (article.translations.en?.title) {
          transRows.push({
            news_id: newsRow.id,
            language: "en",
            title: article.translations.en.title,
            excerpt: article.translations.en.excerpt || "",
            content: article.translations.en.content || "",
            seo_title: article.translations.en.seoTitle || article.translations.en.title,
            seo_description: article.translations.en.seoDescription || article.translations.en.excerpt || "",
          });
        }
        if (article.translations.kn?.title) {
          transRows.push({
            news_id: newsRow.id,
            language: "kn",
            title: article.translations.kn.title,
            excerpt: article.translations.kn.excerpt || "",
            content: article.translations.kn.content || "",
            seo_title: article.translations.kn.seoTitle || article.translations.kn.title,
            seo_description: article.translations.kn.seoDescription || article.translations.kn.excerpt || "",
          });
        }
        if (article.translations.ur?.title) {
          transRows.push({
            news_id: newsRow.id,
            language: "ur",
            title: article.translations.ur.title,
            excerpt: article.translations.ur.excerpt || "",
            content: article.translations.ur.content || "",
            seo_title: article.translations.ur.seoTitle || article.translations.ur.title,
            seo_description: article.translations.ur.seoDescription || article.translations.ur.excerpt || "",
          });
        }

        if (transRows.length > 0) {
          const { error: transErr } = await supabase.from("news_translations").insert(transRows);
          if (transErr) {
            console.error("[newsRepository] Supabase translations insert error:", transErr);
          }
        }

        createdArticle = {
          ...article,
          id: String(newsRow.id),
          categoryId: validCategoryId || article.categoryId || "cat-1",
        };
      }
    } catch (err) {
      console.error("[newsRepository] Supabase createNews exception:", err);
    }
  }

  const list = loadStoredNews();
  const fallbackArticle: NewsArticle = createdArticle || {
    ...article,
    id: `news-${Date.now()}`,
    status: article.status || "published",
    publishedAt: article.publishedAt || new Date().toISOString().split("T")[0],
  };

  list.unshift(fallbackArticle);
  persistNews(list);

  return fallbackArticle;
}

export async function updateNews(id: string, updates: Partial<NewsArticle>): Promise<NewsArticle | null> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const updatePayload: any = {
        updated_at: new Date().toISOString(),
      };
      if (updates.slug) updatePayload.slug = updates.slug;
      if (updates.featuredImage) updatePayload.featured_image = updates.featuredImage;
      if (updates.author) updatePayload.author = updates.author;
      if (updates.publishedAt) updatePayload.published_at = new Date(updates.publishedAt).toISOString();
      if (updates.status) updatePayload.status = updates.status;
      if (updates.isFeatured !== undefined) updatePayload.is_featured = updates.isFeatured;
      if (updates.tags) updatePayload.tags = updates.tags;

      if (updates.categoryId || updates.categoryName) {
        const catId = await resolveCategoryUuid(supabase, updates.categoryId, updates.categoryName);
        if (catId) updatePayload.category_id = catId;
      }

      await supabase.from("news").update(updatePayload).eq("id", id);

      if (updates.translations) {
        for (const lang of ["en", "kn", "ur"] as const) {
          const trans = updates.translations[lang];
          if (trans && trans.title) {
            await supabase.from("news_translations").upsert(
              {
                news_id: id,
                language: lang,
                title: trans.title,
                excerpt: trans.excerpt || "",
                content: trans.content || "",
                seo_title: trans.seoTitle || trans.title,
                seo_description: trans.seoDescription || trans.excerpt || "",
                updated_at: new Date().toISOString(),
              },
              { onConflict: "news_id, language" }
            );
          }
        }
      }
    } catch (err) {
      console.error("[newsRepository] Supabase updateNews exception:", err);
    }
  }

  const list = loadStoredNews();
  const index = list.findIndex((n) => n.id === id);
  if (index === -1) {
    if (supabase) {
      const remote = await getNewsById(id);
      return remote || null;
    }
    return null;
  }

  list[index] = {
    ...list[index],
    ...updates,
    translations: {
      ...list[index].translations,
      ...(updates.translations || {}),
    },
  };
  persistNews(list);
  return list[index];
}

export async function deleteNews(id: string): Promise<boolean> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      await supabase.from("news").delete().eq("id", id);
    } catch (err) {
      console.error("[newsRepository] Supabase deleteNews exception:", err);
    }
  }

  const list = loadStoredNews();
  const index = list.findIndex((n) => n.id === id);
  if (index === -1) return Boolean(supabase);
  list.splice(index, 1);
  persistNews(list);
  return true;
}

export async function togglePublishStatus(id: string): Promise<NewsArticle | null> {
  const article = await getNewsById(id);
  if (!article) return null;
  const newStatus = article.status === "published" ? "draft" : "published";
  return updateNews(id, { status: newStatus });
}
