-- ====================================================================
-- Madeena Welfare Society Bhatkal (MWS)
-- Phase 2 & Phase 3 Supabase Database Schema Migration
-- ====================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- --------------------------------------------------------------------
-- 1. CATEGORIES TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL CHECK (type IN ('news', 'welfare', 'sports', 'gallery')),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- --------------------------------------------------------------------
-- 2. NEWS & TRANSLATIONS TABLES
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.news (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    featured_image TEXT NOT NULL,
    author TEXT NOT NULL DEFAULT 'MWS Media Cell',
    published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    is_featured BOOLEAN NOT NULL DEFAULT false,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.news_translations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    news_id UUID NOT NULL REFERENCES public.news(id) ON DELETE CASCADE,
    language TEXT NOT NULL CHECK (language IN ('en', 'kn', 'ur')),
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (news_id, language)
);

CREATE TABLE IF NOT EXISTS public.news_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    news_id UUID NOT NULL REFERENCES public.news(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    caption TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- --------------------------------------------------------------------
-- 3. GALLERY ALBUMS & IMAGES TABLES
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.gallery_albums (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    date TEXT NOT NULL,
    cover_image TEXT NOT NULL,
    contain_cover BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.gallery_album_translations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    album_id UUID NOT NULL REFERENCES public.gallery_albums(id) ON DELETE CASCADE,
    language TEXT NOT NULL CHECK (language IN ('en', 'kn', 'ur')),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    UNIQUE (album_id, language)
);

CREATE TABLE IF NOT EXISTS public.gallery_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    album_id UUID NOT NULL REFERENCES public.gallery_albums(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    title TEXT NOT NULL,
    caption TEXT,
    date TEXT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- --------------------------------------------------------------------
-- 4. SPORTS EVENTS & ACHIEVEMENTS TABLES
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.sports_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    date TEXT NOT NULL,
    image_url TEXT NOT NULL,
    description TEXT NOT NULL,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    year TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- --------------------------------------------------------------------
-- 5. SITE SETTINGS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT NOT NULL UNIQUE,
    value JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- --------------------------------------------------------------------
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- --------------------------------------------------------------------
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_album_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sports_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public READ policies
CREATE POLICY "Public categories are viewable by everyone" ON public.categories
    FOR SELECT USING (is_active = true);

CREATE POLICY "Published news are viewable by everyone" ON public.news
    FOR SELECT USING (status = 'published');

CREATE POLICY "News translations for published news viewable" ON public.news_translations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.news 
            WHERE news.id = news_translations.news_id AND news.status = 'published'
        )
    );

CREATE POLICY "News images for published news viewable" ON public.news_images
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.news 
            WHERE news.id = news_images.news_id AND news.status = 'published'
        )
    );

CREATE POLICY "Gallery albums are viewable by everyone" ON public.gallery_albums
    FOR SELECT USING (true);

CREATE POLICY "Gallery album translations are viewable by everyone" ON public.gallery_album_translations
    FOR SELECT USING (true);

CREATE POLICY "Gallery images are viewable by everyone" ON public.gallery_images
    FOR SELECT USING (true);

CREATE POLICY "Sports events are viewable by everyone" ON public.sports_events
    FOR SELECT USING (true);

CREATE POLICY "Achievements are viewable by everyone" ON public.achievements
    FOR SELECT USING (true);

CREATE POLICY "Site settings are viewable by everyone" ON public.site_settings
    FOR SELECT USING (true);

-- Admin CRUD policies (Authenticated Users)
CREATE POLICY "Admins have full access to categories" ON public.categories
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins have full access to news" ON public.news
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins have full access to news translations" ON public.news_translations
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins have full access to news images" ON public.news_images
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins have full access to gallery albums" ON public.gallery_albums
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins have full access to gallery album translations" ON public.gallery_album_translations
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins have full access to gallery images" ON public.gallery_images
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins have full access to sports events" ON public.sports_events
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins have full access to achievements" ON public.achievements
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins have full access to site settings" ON public.site_settings
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- --------------------------------------------------------------------
-- 7. STORAGE BUCKETS CONFIGURATION
-- --------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES 
    ('news-images', 'news-images', true),
    ('gallery-images', 'gallery-images', true),
    ('achievement-images', 'achievement-images', true),
    ('site-assets', 'site-assets', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Access Storage" ON storage.objects
    FOR SELECT USING (bucket_id IN ('news-images', 'gallery-images', 'achievement-images', 'site-assets'));

CREATE POLICY "Admin Upload Storage" ON storage.objects
    FOR INSERT TO authenticated WITH CHECK (bucket_id IN ('news-images', 'gallery-images', 'achievement-images', 'site-assets'));

CREATE POLICY "Admin Modify Storage" ON storage.objects
    FOR UPDATE TO authenticated USING (bucket_id IN ('news-images', 'gallery-images', 'achievement-images', 'site-assets'));

CREATE POLICY "Admin Delete Storage" ON storage.objects
    FOR DELETE TO authenticated USING (bucket_id IN ('news-images', 'gallery-images', 'achievement-images', 'site-assets'));

-- --------------------------------------------------------------------
-- 8. INITIAL SEED DATA
-- --------------------------------------------------------------------

-- Categories
INSERT INTO public.categories (name, slug, type) VALUES
    ('General', 'general', 'news'),
    ('Welfare', 'welfare', 'news'),
    ('Sports', 'sports', 'news'),
    ('Achievements', 'achievements', 'news'),
    ('Events', 'events', 'news'),
    ('Announcements', 'announcements', 'news'),
    ('Community Support', 'community-support', 'welfare'),
    ('Education', 'education', 'welfare'),
    ('Food Distribution', 'food-distribution', 'welfare'),
    ('Health Programs', 'health-programs', 'welfare'),
    ('Cricket', 'cricket', 'sports'),
    ('Football', 'football', 'sports'),
    ('Tournaments', 'tournaments', 'sports'),
    ('Celebration', 'celebration', 'gallery'),
    ('Sports Gallery', 'sports-gallery', 'gallery'),
    ('Social Media', 'social-media', 'gallery'),
    ('Identity', 'identity', 'gallery')
ON CONFLICT (slug) DO NOTHING;

-- Initial Sports Events (Cosmos Trophy & BPL)
INSERT INTO public.sports_events (title, category, date, image_url, description, is_featured) VALUES
    ('Cosmos Golden Jubilee Trophy Championship (₹75,000 Winners)', 'Cricket', 'December 2025', '/images/instagram/insta_post_10.jpg', 'Madeena Welfare Society cricket team clinched the grand Cosmos Golden Jubilee Trophy in Bhatkal with a ₹75,000 cash prize after a historic tournament run.', true),
    ('Championship Victory & Medals Felicitation', 'Celebration', 'December 21, 2025', '/images/instagram/posts/post_DSh4VECErEA_1.jpg', 'The victorious squad decorated with gold medals and championship trophies, celebrating outstanding teamwork and brotherhood.', true),
    ('Bhatkal Night Turf Championship & Floodlight Cup', 'Night League', 'January 2026', '/images/instagram/posts/post_DUcvUHVkYX-_1.jpg', 'High-octane night cricket on synthetic turf under stadium floodlights, featuring top youth talent from Madeena Colony and across Bhatkal.', false),
    ('Bhatkal Premier League (BPL) & Youth Athletics', 'BPL League', 'Season 2026', '/images/instagram/insta_post_14.jpg', 'Recognizing top performers including Shamoun Shabandri (3-0-18-3) and Ilyas Motia (match-winning 43 off 15 balls).', false)
ON CONFLICT DO NOTHING;
