# ARCHITECTURE.md

# Madeena Welfare Society — News & Media Portal

## 1. Architecture Overview

The Madeena Welfare Society website is a multilingual, CMS-driven news and media portal.

The system has two primary sides:

### Public Website

Visitors can:

* View latest news
* Read news articles
* Browse welfare activities
* Browse sports activities
* View achievements
* Browse photo galleries
* Search content
* Switch between English, Kannada, and Urdu
* View About and Contact information
* Share news articles
* Access the organization's social media links

No public account or login is required.

### Admin CMS

Only authorized administrators can:

* Log in
* Create, edit, delete, draft, publish, and unpublish news
* Manage categories
* Create and manage gallery albums
* Upload and manage gallery photos
* Manage achievements
* Manage multilingual content
* Manage website settings
* Manage featured content
* Manage social media links

There is no public registration system.

---

# 2. Technology Stack

## Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS (Custom Brand Tokens: `#047857` Emerald, `#0B2238` Navy, `#ECFDF5` Mint)
* Lucide React
* TipTap Rich Text Editor

## Backend

* Next.js Server Components
* Next.js Server Actions / Route Handlers where appropriate
* Supabase

## Database

* Supabase PostgreSQL

## Authentication

* Supabase Auth

Authentication is only required for administrators.

## File Storage

* Supabase Storage

Storage buckets:

* `news-images`
* `gallery-images`
* `achievement-images`
* `site-assets`

## Deployment

* Vercel for application hosting
* Supabase for database, authentication, and storage
* GitHub for source control

---

# 3. High-Level System Architecture

```text
                        ┌─────────────────────────┐
                        │       Public Users      │
                        │                         │
                        │  Browser / Mobile       │
                        └────────────┬────────────┘
                                     │
                                     ▼
                        ┌─────────────────────────┐
                        │       Next.js App       │
                        │                         │
                        │ Public Website          │
                        │ Admin CMS               │
                        │ UI Components           │
                        │ Server Components       │
                        └────────────┬────────────┘
                                     │
                    ┌────────────────┼────────────────┐
                    │                │                │
                    ▼                ▼                ▼
              ┌──────────┐    ┌───────────┐    ┌────────────┐
              │ Supabase │    │ Supabase  │    │ Supabase   │
              │ Database │    │   Auth    │    │  Storage   │
              │PostgreSQL│    │           │    │            │
              └──────────┘    └───────────┘    └────────────┘
                    │                │                │
                    └────────────────┼────────────────┘
                                     │
                                     ▼
                            ┌──────────────────┐
                            │    Admin CMS     │
                            │                  │
                            │ Content Creation │
                            │ Media Management │
                            │ Settings         │
                            └──────────────────┘
```

---

# 4. Application Architecture

The application follows a layered architecture.

```text
┌─────────────────────────────────────────────┐
│                 Presentation                 │
│                                             │
│  Pages / Layouts / UI Components            │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│              Application Layer              │
│                                             │
│  Server Actions / API / Business Logic      │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│               Data Access Layer              │
│                                             │
│  Database / Auth / Storage / Queries        │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│                 Supabase                    │
│                                             │
│ PostgreSQL │ Auth │ Storage │ RLS           │
└─────────────────────────────────────────────┘
```

---

# 5. Project Folder Structure

```text
madeena-welfare/
│
├── public/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── src/
│   │
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   │
│   │   ├── news/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── category/
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── welfare/
│   │   │   └── page.tsx
│   │   │
│   │   ├── sports/
│   │   │   └── page.tsx
│   │   │
│   │   ├── achievements/
│   │   │   └── page.tsx
│   │   │
│   │   ├── gallery/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── about/
│   │   │   └── page.tsx
│   │   │
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   │
│   │   ├── search/
│   │   │   └── page.tsx
│   │   │
│   │   └── admin/
│   │       ├── login/
│   │       │   └── page.tsx
│   │       │
│   │       ├── layout.tsx
│   │       ├── page.tsx
│   │       │
│   │       ├── news/
│   │       │   ├── page.tsx
│   │       │   ├── create/
│   │       │   │   └── page.tsx
│   │       │   └── [id]/
│   │       │       └── edit/
│   │       │           └── page.tsx
│   │       │
│   │       ├── categories/
│   │       │   └── page.tsx
│   │       │
│   │       ├── gallery/
│   │       │   ├── page.tsx
│   │       │   ├── create/
│   │       │   │   └── page.tsx
│   │       │   └── [id]/
│   │       │       └── edit/
│   │       │           └── page.tsx
│   │       │
│   │       ├── achievements/
│   │       │   ├── page.tsx
│   │       │   ├── create/
│   │       │   │   └── page.tsx
│   │       │   └── [id]/
│   │       │       └── edit/
│   │       │           └── page.tsx
│   │       │
│   │       └── settings/
│   │           └── page.tsx
│   │
│   ├── components/
│   │   │
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── LanguageSwitcher.tsx
│   │   │   └── MobileMenu.tsx
│   │   │
│   │   ├── news/
│   │   │   ├── NewsCard.tsx
│   │   │   ├── FeaturedNews.tsx
│   │   │   ├── LatestNews.tsx
│   │   │   ├── NewsList.tsx
│   │   │   ├── NewsArticle.tsx
│   │   │   ├── RelatedNews.tsx
│   │   │   └── NewsShare.tsx
│   │   │
│   │   ├── welfare/
│   │   │   ├── WelfareCard.tsx
│   │   │   └── WelfareSection.tsx
│   │   │
│   │   ├── sports/
│   │   │   ├── SportsCard.tsx
│   │   │   └── SportsSection.tsx
│   │   │
│   │   ├── achievements/
│   │   │   ├── AchievementCard.tsx
│   │   │   └── AchievementSection.tsx
│   │   │
│   │   ├── gallery/
│   │   │   ├── AlbumCard.tsx
│   │   │   ├── GalleryGrid.tsx
│   │   │   ├── PhotoGrid.tsx
│   │   │   ├── Lightbox.tsx
│   │   │   └── PhotoUploader.tsx
│   │   │
│   │   ├── search/
│   │   │   ├── SearchBar.tsx
│   │   │   ├── SearchResults.tsx
│   │   │   └── SearchFilters.tsx
│   │   │
│   │   ├── admin/
│   │   │   ├── AdminSidebar.tsx
│   │   │   ├── AdminHeader.tsx
│   │   │   ├── DashboardStats.tsx
│   │   │   ├── NewsForm.tsx
│   │   │   ├── CategoryForm.tsx
│   │   │   ├── GalleryForm.tsx
│   │   │   ├── AchievementForm.tsx
│   │   │   ├── ImageUploader.tsx
│   │   │   ├── RichTextEditor.tsx
│   │   │   ├── TranslationEditor.tsx
│   │   │   └── ConfirmDialog.tsx
│   │   │
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Select.tsx
│   │       ├── Modal.tsx
│   │       ├── Dropdown.tsx
│   │       ├── Badge.tsx
│   │       ├── Pagination.tsx
│   │       ├── Skeleton.tsx
│   │       ├── EmptyState.tsx
│   │       └── Toast.tsx
│   │
│   ├── lib/
│   │   │
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   ├── server.ts
│   │   │   ├── middleware.ts
│   │   │   └── types.ts
│   │   │
│   │   ├── auth/
│   │   │   ├── auth.ts
│   │   │   └── admin.ts
│   │   │
│   │   ├── database/
│   │   │   ├── news.ts
│   │   │   ├── categories.ts
│   │   │   ├── gallery.ts
│   │   │   ├── achievements.ts
│   │   │   ├── settings.ts
│   │   │   └── search.ts
│   │   │
│   │   ├── storage/
│   │   │   ├── upload.ts
│   │   │   ├── delete.ts
│   │   │   └── image.ts
│   │   │
│   │   ├── i18n/
│   │   │   ├── config.ts
│   │   │   ├── translations.ts
│   │   │   ├── language.ts
│   │   │   └── direction.ts
│   │   │
│   │   ├── seo/
│   │   │   ├── metadata.ts
│   │   │   ├── structured-data.ts
│   │   │   └── sitemap.ts
│   │   │
│   │   ├── validation/
│   │   │   ├── news.ts
│   │   │   ├── gallery.ts
│   │   │   ├── achievement.ts
│   │   │   └── settings.ts
│   │   │
│   │   └── utils/
│   │       ├── slug.ts
│   │       ├── date.ts
│   │       ├── format.ts
│   │       └── helpers.ts
│   │
│   ├── hooks/
│   │   ├── useLanguage.ts
│   │   ├── useDebounce.ts
│   │   └── useUpload.ts
│   │
│   ├── types/
│   │   ├── news.ts
│   │   ├── category.ts
│   │   ├── gallery.ts
│   │   ├── achievement.ts
│   │   ├── settings.ts
│   │   └── database.ts
│   │
│   └── middleware.ts
│
├── supabase/
│   ├── migrations/
│   │   ├── 001_initial_schema.sql
│   │   ├── 002_translations.sql
│   │   ├── 003_gallery.sql
│   │   ├── 004_achievements.sql
│   │   ├── 005_rls_policies.sql
│   │   └── 006_storage_policies.sql
│   │
│   ├── seed.sql
│   └── config.toml
│
├── docs/
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   ├── DATABASE.md
│   └── PHASES.md
│
├── .env.local
├── .env.example
├── .gitignore
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── package.json
└── README.md
```

---

# 6. Routing Architecture

## Public Routes

```text
/
├── /news
├── /news/[slug]
├── /category/[slug]
├── /welfare
├── /sports
├── /achievements
├── /gallery
├── /gallery/[slug]
├── /about
├── /contact
└── /search
```

## Admin Routes

```text
/admin
/admin/login

/admin/news
/admin/news/create
/admin/news/[id]/edit

/admin/categories

/admin/gallery
/admin/gallery/create
/admin/gallery/[id]/edit

/admin/achievements
/admin/achievements/create
/admin/achievements/[id]/edit

/admin/settings
```

All routes beginning with `/admin` except `/admin/login` must require authentication.

---

# 7. Homepage Architecture

The homepage should be composed from reusable sections.

```text
Home Page
│
├── Header
│   ├── Logo
│   ├── Navigation
│   ├── Search
│   ├── Language Switcher
│   └── Social Links
│
├── Latest News Strip
│
├── Featured News
│   ├── Main Featured Article
│   └── Supporting Articles
│
├── Latest News
│
├── Welfare Activities
│
├── Sports Activities
│
├── Achievements
│
├── Photo Gallery
│
├── About Organization
│
├── Social Media
│
└── Footer
```

All content must come from the CMS/database.

No important website content should be permanently hardcoded into the homepage.

---

# 8. News Architecture

News is separated into two levels:

### News Metadata

Stored in the main `news` table.

```text
news
├── id
├── slug
├── category_id
├── featured_image
├── author_id
├── status
├── is_featured
├── published_at
├── created_at
└── updated_at
```

### News Content

Stored in `news_translations`.

```text
news_translations
├── id
├── news_id
├── language
├── title
├── excerpt
├── content
├── seo_title
└── seo_description
```

This allows the same article to have English, Kannada, and Urdu versions without duplicating the main news record.

---

# 9. Gallery Architecture

Gallery content is separated into:

```text
gallery_albums
│
├── Album metadata
│
└── gallery_album_translations
        │
        ├── English
        ├── Kannada
        └── Urdu
```

Photos are stored separately:

```text
gallery_images
├── id
├── album_id
├── image_url
├── thumbnail_url
├── alt_text
├── display_order
└── created_at
```

Relationship:

```text
Gallery Album
      │
      ├── Photo 1
      ├── Photo 2
      ├── Photo 3
      ├── Photo 4
      └── Photo N
```

This allows one album to contain an unlimited number of photos.

---

# 10. Achievement Architecture

Achievements follow the same multilingual content model.

```text
achievements
├── id
├── category
├── image_url
├── achievement_date
├── is_featured
├── created_at
└── updated_at
```

Translations:

```text
achievement_translations
├── id
├── achievement_id
├── language
├── title
├── description
└── seo_description
```

---

# 11. Multilingual Architecture

The application supports:

```text
English  → en
Kannada  → kn
Urdu     → ur
```

There are two separate translation systems.

## UI Translation

Used for interface elements:

```text
Home
News
Sports
Welfare
Gallery
Achievements
Search
Read More
Latest News
```

These translations are stored in application translation files.

Example:

```text
src/lib/i18n/
├── translations.ts
├── config.ts
└── language.ts
```

## Dynamic Content Translation

Used for CMS content.

Example:

```text
news
    │
    ├── English translation
    ├── Kannada translation
    └── Urdu translation
```

This content is stored in Supabase.

---

# 12. RTL Architecture

Urdu requires right-to-left layout.

When Urdu is selected:

```html
dir="rtl"
```

When English or Kannada is selected:

```html
dir="ltr"
```

The application should dynamically change:

```text
Language
   ↓
Language Configuration
   ↓
Direction
   ↓
HTML dir attribute
   ↓
RTL/LTR styling
```

The UI must not rely on manually reversing individual components.

Use logical CSS properties such as:

```text
margin-inline
padding-inline
inset-inline
text-align: start
```

instead of hardcoded left/right positioning wherever possible.

---

# 13. Database Architecture

Primary entities:

```text
users
categories
news
news_translations
news_images

gallery_albums
gallery_album_translations
gallery_images

achievements
achievement_translations

site_settings
social_links
```

Relationship overview:

```text
                    ┌──────────────┐
                    │   users      │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │     news     │
                    └──────┬───────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
       translations    images       category
       
       
       ┌───────────────────┐
       │  gallery_albums   │
       └─────────┬─────────┘
                 │
       ┌─────────┴─────────┐
       ▼                   ▼
translations          gallery_images


       ┌───────────────────┐
       │   achievements    │
       └─────────┬─────────┘
                 │
                 ▼
          translations
```

---

# 14. Authentication Architecture

Only administrators require authentication.

```text
Admin
  │
  ▼
/admin/login
  │
  ▼
Supabase Auth
  │
  ├── Invalid → Login Error
  │
  └── Valid
        │
        ▼
   Admin Dashboard
```

There must be:

* No public registration
* No public login
* No public user profiles
* No public account management

---

# 15. Admin Route Protection

Admin routes must be protected at multiple levels.

```text
Browser
   │
   ▼
Next.js Middleware
   │
   ├── Not authenticated → /admin/login
   │
   └── Authenticated
          │
          ▼
      Admin Page
          │
          ▼
   Server-side authorization
          │
          ▼
      Supabase RLS
```

Client-side protection alone must not be considered sufficient.

---

# 16. Supabase Storage Architecture

Storage buckets:

```text
Supabase Storage
│
├── news-images/
│   └── YYYY/
│       └── news-slug/
│
├── gallery-images/
│   └── YYYY/
│       └── album-slug/
│
├── achievement-images/
│   └── YYYY/
│
└── site-assets/
    ├── logo/
    ├── favicon/
    └── branding/
```

Example:

```text
gallery-images/
2026/
nova-sports-event/
photo-001.webp
photo-002.webp
photo-003.webp
```

The database stores the relevant storage paths/URLs rather than storing image binary data.

---

# 17. Image Upload Architecture

Admin upload flow:

```text
Select Images
      ↓
Client-side Validation
      ↓
Preview
      ↓
Compression / Optimization
      ↓
Upload to Supabase Storage
      ↓
Receive Storage Path
      ↓
Save Metadata in Database
      ↓
Refresh Gallery
```

Validation should check:

* File type
* File size
* Image dimensions where required
* Upload count
* Valid filename/path

Supported formats:

```text
JPG
JPEG
PNG
WEBP
```

---

# 18. News Publishing Architecture

```text
Admin creates article
        │
        ▼
      Draft
        │
        ├── Edit
        │
        ├── Save
        │
        ▼
    Publish
        │
        ▼
   Published
        │
        ├── Edit
        ├── Unpublish
        └── Archive
```

Only published articles should appear on public pages.

---

# 19. Content Retrieval Architecture

Public pages should retrieve only the required content.

Example:

```text
Homepage
   │
   ├── Featured News Query
   ├── Latest News Query
   ├── Welfare Query
   ├── Sports Query
   ├── Achievement Query
   └── Gallery Query
```

Queries should be centralized inside:

```text
src/lib/database/
```

Example:

```text
src/lib/database/news.ts
```

Possible functions:

```text
getFeaturedNews()
getLatestNews()
getNewsBySlug()
getNewsByCategory()
getRelatedNews()
```

This prevents database queries from being duplicated throughout UI components.

---

# 20. Component Architecture

Components should be reusable and separated by responsibility.

Example:

```text
NewsCard
```

should only be responsible for displaying a news preview.

It should not directly contain complex database queries.

Preferred structure:

```text
Page
 │
 ├── Fetch Data
 │
 └── NewsCard
       │
       ├── Image
       ├── Category
       ├── Title
       ├── Date
       └── Excerpt
```

---

# 21. Server vs Client Components

Use Next.js Server Components by default.

### Server Components

Use for:

* News pages
* Article pages
* Gallery pages
* Achievement pages
* Database fetching
* SEO metadata
* Static content
* Public page rendering

### Client Components

Use only where interactivity is required:

* Language switcher
* Mobile navigation
* Search interaction
* Gallery lightbox
* Image uploader
* Rich text editor
* Admin forms
* Modals
* Drag-and-drop interfaces

Avoid unnecessarily converting entire pages into client components.

---

# 22. Search Architecture

Search should search across:

```text
News
Categories
Tags
Gallery Albums
Achievements
```

Search flow:

```text
User enters query
       ↓
Search API / Server Query
       ↓
Database
       ↓
Filter by language
       ↓
Filter by category/date if selected
       ↓
Return results
       ↓
Display result cards
```

Search results should contain:

* Thumbnail
* Content type
* Category
* Title
* Date
* Excerpt

---

# 23. SEO Architecture

SEO should be generated dynamically.

Each news article should have:

```text
Title
Description
Canonical URL
Open Graph Image
Open Graph Title
Open Graph Description
```

Structured data should be generated where applicable:

```text
Organization
Article
BreadcrumbList
```

The application should also provide:

```text
/sitemap.xml
/robots.txt
```

---

# 24. Caching and Performance

Public content should be optimized for fast loading.

Use:

* Next.js caching/revalidation
* Server Components
* Next/Image
* Responsive image sizes
* Lazy loading
* Optimized thumbnails
* Database indexes
* Pagination
* Efficient Supabase queries

Gallery pages should not load every full-resolution image immediately.

Recommended:

```text
Gallery Page
     ↓
Thumbnail Images
     ↓
User opens image
     ↓
Full-size image
```

---

# 25. Security Architecture

Security responsibilities are divided between the application and Supabase.

```text
Application
├── Input validation
├── Authentication
├── Authorization
├── XSS protection
├── File validation
└── Server-side checks

Supabase
├── PostgreSQL
├── Row Level Security
├── Auth
└── Storage Policies
```

Important rules:

* Never expose the Supabase Service Role Key to the browser.
* Use environment variables.
* Validate all admin input.
* Sanitize rich text content.
* Restrict storage operations.
* Protect admin routes.
* Enable Row Level Security.
* Do not trust client-side authorization.

---

# 26. Environment Variables

`.env.local` should contain private configuration.

Example:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Only variables beginning with `NEXT_PUBLIC_` should be exposed to the browser.

The service role key must remain server-side.

`.env.example` should contain variable names without real credentials.

---

# 27. Admin Dashboard Architecture

Dashboard:

```text
Admin Dashboard
│
├── Statistics
│   ├── Total News
│   ├── Published News
│   ├── Drafts
│   ├── Gallery Albums
│   ├── Gallery Photos
│   └── Achievements
│
├── Quick Actions
│   ├── Add News
│   ├── Create Album
│   ├── Upload Photos
│   └── Add Achievement
│
└── Recent Content
```

Admin sidebar:

```text
Dashboard

Content
├── All News
├── Add News
└── Categories

Gallery
├── Albums
├── Add Album
└── Upload Photos

Achievements
├── All Achievements
└── Add Achievement

Settings

Logout
```

---

# 28. Admin Content Flow

## News

```text
Admin Dashboard
      ↓
Add News
      ↓
Enter Content
      ↓
Upload Featured Image
      ↓
Add Translations
      ↓
Save Draft
      ↓
Preview
      ↓
Publish
```

## Gallery

```text
Admin Dashboard
      ↓
Create Album
      ↓
Enter Album Information
      ↓
Add Translations
      ↓
Upload Multiple Photos
      ↓
Arrange Photos
      ↓
Select Cover
      ↓
Publish
```

## Achievement

```text
Admin Dashboard
      ↓
Add Achievement
      ↓
Enter Details
      ↓
Upload Image
      ↓
Add Translations
      ↓
Save
      ↓
Publish
```

---

# 29. Error Handling Architecture

The application should provide clear states for:

```text
Loading
Empty
Error
Success
Unauthorized
Not Found
```

Examples:

```text
No News Available
No Gallery Albums Available
No Search Results
Article Not Found
Album Not Found
Unauthorized Access
Upload Failed
Network Error
```

Admin operations should provide success/error notifications.

---

# 30. Responsive Architecture

The application must support:

```text
Mobile
Tablet
Desktop
Large Desktop
```

Design should follow a mobile-first approach.

Example:

```text
Desktop
┌───────────────────────────────────────┐
│ Header                                │
├───────────────────────────────────────┤
│ Main Content             │ Sidebar    │
│                         │            │
└───────────────────────────────────────┘

Mobile
┌───────────────────────┐
│ Header                │
├───────────────────────┤
│ Main Content          │
│                       │
│ Sidebar content below │
└───────────────────────┘
```

---

# 31. Accessibility Architecture

The application should support:

* Semantic HTML
* Keyboard navigation
* Visible focus states
* Proper heading hierarchy
* Accessible forms
* ARIA labels where required
* Accessible modals
* Accessible image galleries
* Meaningful alt text
* Sufficient color contrast
* Screen-reader-friendly navigation
* RTL accessibility for Urdu

---

# 32. Data Flow Example — Public News

```text
User
 │
 ▼
/news/article-slug
 │
 ▼
Next.js Server Component
 │
 ▼
news.ts
 │
 ▼
Supabase PostgreSQL
 │
 ├── news
 ├── news_translations
 ├── news_images
 └── categories
 │
 ▼
Formatted Article Data
 │
 ▼
NewsArticle Component
 │
 ▼
User
```

---

# 33. Data Flow Example — Admin News Creation

```text
Admin
 │
 ▼
/admin/news/create
 │
 ▼
NewsForm
 │
 ├── Basic Information
 ├── Category
 ├── Featured Image
 ├── Rich Text Content
 ├── SEO
 └── Translations
 │
 ▼
Validation
 │
 ▼
Server Action / API
 │
 ├── Supabase Database
 │
 └── Supabase Storage
 │
 ▼
News Created
 │
 ▼
Admin Dashboard
```

---

# 34. Data Flow Example — Language Switching

```text
User
 │
 ▼
Language Switcher
 │
 ├── English
 ├── Kannada
 └── Urdu
 │
 ▼
Selected Language
 │
 ▼
Language State / URL
 │
 ▼
UI Translation
 │
 +
 │
Dynamic Content Translation
 │
 ▼
Rendered Page
```

For Urdu:

```text
Language = ur
      ↓
Direction = rtl
      ↓
RTL Layout
```

---

# 35. Deployment Architecture

```text
                     GitHub
                        │
                        ▼
                    Vercel
                        │
                ┌───────┴───────┐
                │   Next.js     │
                │   Application │
                └───────┬───────┘
                        │
          ┌─────────────┼─────────────┐
          ▼             ▼             ▼
      Supabase       Supabase      Supabase
      Database         Auth         Storage
```

Deployment flow:

```text
Developer
    ↓
Git
    ↓
GitHub
    ↓
Vercel
    ↓
Production
```

---

# 36. Development Principles

The project should follow these principles:

### 1. Modular

Features should be divided into reusable modules.

### 2. Maintainable

Database queries, authentication, storage, validation, and UI should not be mixed together unnecessarily.

### 3. Scalable

The architecture should support additional languages and content types later.

### 4. Secure

Authentication and authorization must be enforced server-side.

### 5. CMS Driven

Public content should come from the database.

### 6. Responsive

All pages should work on mobile, tablet, and desktop.

### 7. Accessible

The website should be usable by keyboard and assistive technologies.

### 8. SEO Friendly

Public articles and pages should be discoverable by search engines.

---

# 37. Future Extension Architecture

The architecture should allow future modules without major restructuring.

Possible future modules:

```text
events/
teams/
players/
matches/
volunteers/
notifications/
newsletter/
analytics/
youtube/
instagram/
```

Potential future integrations:

* Instagram feed
* YouTube videos
* WhatsApp channel
* Event calendar
* Push notifications
* Newsletter
* PWA
* AI-assisted translation
* AI-assisted article drafting

These should not be implemented in the initial MVP unless explicitly required.

---

# 38. Architecture Rules for AI Development

When implementing this project using an AI coding tool such as Google Antigravity:

1. Follow this folder structure unless a technical reason requires a change.
2. Do not place database queries directly inside reusable UI components.
3. Do not hardcode CMS content into public pages.
4. Do not create separate databases for each language.
5. Use translation tables for dynamic multilingual content.
6. Keep Urdu RTL support throughout the application.
7. Keep authentication restricted to administrators.
8. Never add public registration unless explicitly requested.
9. Never expose private Supabase credentials.
10. Use reusable components instead of duplicating UI.
11. Validate all admin inputs.
12. Protect all `/admin/*` routes.
13. Use Supabase RLS for database security.
14. Use Supabase Storage for uploaded media.
15. Optimize images before displaying them publicly.
16. Keep public pages SEO-friendly.
17. Keep mobile responsiveness as a requirement for every feature.
18. Use TypeScript types for database and application data.
19. Do not introduce unnecessary dependencies.
20. Do not implement future features during MVP development.

---

# 39. Final Architecture

The final system can be summarized as:

```text
                         MADEENA WELFARE SOCIETY
                              WEB PORTAL
                                   │
                  ┌────────────────┴────────────────┐
                  │                                 │
             PUBLIC WEBSITE                     ADMIN CMS
                  │                                 │
        ┌─────────┼─────────┐              ┌───────┼────────┐
        │         │         │              │       │        │
       News     Gallery   Activities      News   Gallery  Achievements
        │         │         │              │       │        │
        └─────────┼─────────┘              └───────┼────────┘
                  │                                 │
                  └──────────────┬──────────────────┘
                                 │
                              Next.js
                                 │
                    ┌────────────┼────────────┐
                    │            │            │
                 Database       Auth        Storage
                    │            │            │
                    └────────────┼────────────┘
                                 │
                              Supabase
```

The architecture is designed to provide a **fast, multilingual, secure, CMS-driven community news and media platform** while keeping the codebase modular enough for future expansion.
