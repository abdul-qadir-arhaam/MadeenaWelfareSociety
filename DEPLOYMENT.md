# Vercel Deployment Guide

## Madeena Welfare Society — News & Media Portal

This repository is optimized for one-click deployment on **Vercel** with full Next.js 16, React 19, and Supabase SSR integration.

---

## 1. Prerequisites

1. A **GitHub** account containing this repository.
2. A **Vercel** account ([vercel.com](https://vercel.com)).
3. A **Supabase** project ([supabase.com](https://supabase.com)).

---

## 2. Supabase Setup (Database & Storage)

1. Open your Supabase project dashboard.
2. Navigate to the **SQL Editor**.
3. Run the schema migration script located at [`supabase/migrations/20260923000000_phase2_schema.sql`](file:///c:/Users/Myzz/MadeenaWelfareSociety/supabase/migrations/20260923000000_phase2_schema.sql).
   - This creates all necessary tables (`news`, `categories`, `gallery_albums`, `sports_events`, `achievements`, etc.).
   - This automatically creates the storage buckets: `site-assets`, `news-images`, `gallery-images`, and `achievement-images`.
4. Go to **Project Settings** > **API**:
   - Copy **Project URL**
   - Copy **anon / public** API Key
   - Copy **service_role** API Key (secret)

---

## 3. Deployment Method A: Vercel Web Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..."** > **"Project"**.
2. Select your `MadeenaWelfareSociety` GitHub repository and click **Import**.
3. In the **Configure Project** screen:
   - **Framework Preset**: `Next.js` (automatically detected)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
4. Expand the **Environment Variables** section and add the following keys:

| Environment Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Your production URL | `https://your-project.vercel.app` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project URL | `https://abcdefghijkl.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Anon Key | `eyJhbGciOi...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Service Role Key | `eyJhbGciOi...` |
| `ADMIN_EMAIL` | Admin CMS Login Email | `admin@madeenaws.bhatkal.org` |
| `ADMIN_PASSWORD` | Admin CMS Login Password | `YourSecurePassword2026` |

5. Click **Deploy**. Vercel will build and launch your production site.

---

## 4. Deployment Method B: Vercel CLI

If you prefer deploying directly from your terminal:

```bash
# 1. Install or run Vercel CLI
npx vercel

# 2. Follow prompts to link your project and organization
# 3. Add environment variables:
npx vercel env add NEXT_PUBLIC_SITE_URL
npx vercel env add NEXT_PUBLIC_SUPABASE_URL
npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
npx vercel env add SUPABASE_SERVICE_ROLE_KEY
npx vercel env add ADMIN_EMAIL
npx vercel env add ADMIN_PASSWORD

# 4. Deploy to production
npx vercel --prod
```

---

## 5. Post-Deployment Verification Checklist

- [ ] **Homepage**: Visit `https://your-project.vercel.app` to verify hero banner, news ticker, and sections.
- [ ] **Multilingual Switcher**: Test switching between **English**, **Kannada (ಕನ್ನಡ)**, and **Urdu (اردو)**. Confirm Urdu renders RTL (`dir="rtl"`).
- [ ] **Admin CMS Login**: Go to `https://your-project.vercel.app/admin/login` and log in with your configured `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
- [ ] **Image Upload**: Upload a news or gallery cover image to verify Supabase Storage bucket connectivity.
- [ ] **Sitemap & Robots**: Confirm `https://your-project.vercel.app/sitemap.xml` and `https://your-project.vercel.app/robots.txt` load cleanly.
