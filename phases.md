# PHASES.md

# Madeena Welfare Society — News & Media Portal

## Project Execution Plan

This document divides the Madeena Welfare Society News & Media Portal into **8 sequential development phases**.

Each phase should be completed, tested, and stabilized before moving to the next phase.

---

# Phase 1 — Project Foundation & UI System

## Objective

Set up the complete project foundation, development environment, application structure, design system, and basic public/admin layouts.

## Tasks

### Project Setup

* Initialize Next.js project
* Configure TypeScript
* Configure Tailwind CSS
* Configure ESLint
* Configure Git
* Create `.env.local`
* Create `.env.example`
* Configure required dependencies
* Configure project aliases
* Create initial README

### Folder Structure

Create the architecture defined in `ARCHITECTURE.md`:

```text
src/
├── app/
├── components/
├── lib/
├── hooks/
└── types/

supabase/
docs/
public/
```

### Design System

Create reusable UI components:

* Button
* Input
* Select
* Textarea
* Modal
* Dropdown
* Badge
* Pagination
* Toast
* Skeleton
* Empty State
* Loading State

### Public Layout

Implement:

* Header
* Logo/name
* Navigation
* Search button
* Language selector
* Social links
* Mobile navigation
* Footer

### Admin Layout

Create:

* Admin login page placeholder
* Admin sidebar
* Admin header
* Dashboard layout
* Responsive admin navigation

## Initial Public Routes

```text
/
 /news
 /welfare
 /sports
 /achievements
 /gallery
 /about
 /contact
 /search
```

## Initial Admin Routes

```text
/admin/login
/admin
/admin/news
/admin/categories
/admin/gallery
/admin/achievements
/admin/settings
```

## Multilingual Foundation

Set up:

```text
English → en
Kannada → kn
Urdu → ur
```

Implement:

* Language configuration
* Language switcher
* UI translation structure
* RTL detection
* `dir="rtl"` for Urdu
* `dir="ltr"` for English/Kannada

## Design Requirements

The initial visual style should be:

* Modern
* Clean
* Professional
* Community-oriented
* News-portal inspired
* Mobile responsive
* Original design

Use the provided Fikrokhabar portal only as an information-architecture/reference source, not as a design copy.

## Deliverable

A running application with:

* Public layout
* Admin layout
* Responsive navigation
* Language switching foundation
* Basic UI component system
* All major routes created

---

# Phase 2 — Supabase Database, Authentication & Security

## Objective

Build the backend foundation using Supabase.

## Tasks

### Supabase Setup

Configure:

* Supabase project
* PostgreSQL
* Supabase Auth
* Supabase Storage

### Database Tables

Create:

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

### Relationships

Implement relationships between:

```text
categories → news

news → news_translations
news → news_images

gallery_albums → gallery_album_translations
gallery_albums → gallery_images

achievements → achievement_translations
```

### Seed Data

Create initial categories.

News:

```text
General
Welfare
Sports
Achievements
Events
Announcements
```

Welfare:

```text
Community Support
Education
Food Distribution
Health Programs
Charity
Youth Welfare
Social Initiatives
Other
```

Sports:

```text
Cricket
Football
Badminton
Volleyball
Athletics
Tournaments
Local Competitions
Other Sports
```

Gallery:

```text
Sports
Welfare
Events
Achievements
Community
Other
```

### Authentication

Implement:

* Admin login
* Logout
* Session handling
* Auth middleware
* Protected `/admin/*` routes
* Redirect unauthenticated users to `/admin/login`

There must be:

* No public registration
* No public login

### Row Level Security

Configure RLS policies.

Public users:

* Can read published public content

Admins:

* Can create
* Read
* Update
* Delete
* Publish
* Unpublish

### Storage

Create:

```text
news-images
gallery-images
achievement-images
site-assets
```

Configure storage policies.

## Security

Implement:

* Server-side authorization
* Input validation
* Storage validation
* Environment variables
* RLS
* Protection of service role key

## Deliverable

A secure Supabase backend with:

* Database schema
* Relationships
* Authentication
* RLS
* Storage buckets
* Seed categories
* Protected admin routes

---

# Phase 3 — Admin CMS: News & Categories

## Objective

Build the complete news management system.

This phase creates the main CMS functionality.

## Admin News Features

Create:

```text
/admin/news
/admin/news/create
/admin/news/[id]/edit
```

### News List

Display:

* Thumbnail
* Title
* Category
* Status
* Language/translation status
* Published date
* Featured status
* Actions

Actions:

* Edit
* Delete
* Publish
* Unpublish
* Archive

### News Creation

Admin can enter:

* Title
* Slug
* Category
* Excerpt
* Full content
* Featured image
* Additional images
* Author
* Published date
* Tags
* Featured flag
* SEO title
* SEO description

### Rich Text Editor

Implement TipTap with:

* Headings
* Paragraphs
* Bold
* Italic
* Underline
* Ordered list
* Bullet list
* Links
* Blockquotes
* Images
* Text alignment

### News Status

Support:

```text
Draft
Published
Archived
```

### Translation Editor

Allow the administrator to manage:

```text
English
Kannada
Urdu
```

for:

* Title
* Excerpt
* Content
* SEO title
* SEO description

### Categories

Admin can:

* Create category
* Edit category
* Delete category
* Change category status
* Manage category slug

### Image Management

Implement:

* Featured image upload
* Additional image upload
* Preview
* Delete
* Validation
* Compression
* Storage integration

## Deliverable

A fully functional news CMS where an admin can:

```text
Create
 ↓
Save Draft
 ↓
Edit
 ↓
Translate
 ↓
Preview
 ↓
Publish
 ↓
Unpublish / Archive
```

---

# Phase 4 — Public News Portal & Homepage

## Objective

Connect the CMS to the public website and build the main news experience.

## Homepage

Implement:

### Header

* Logo
* Navigation
* Search
* Language switcher
* Social links

### Latest News Strip

Display recent headlines.

### Featured News

Create:

* Main featured article
* Supporting articles
* Featured image
* Category
* Date
* Title
* Excerpt

### Latest News

Display:

* News cards
* Pagination/load more
* Category
* Date
* Thumbnail
* Excerpt

### Welfare Section

Display latest welfare-related content.

### Sports Section

Display latest sports-related content.

### Achievements Section

Display featured achievements.

### Gallery Preview

Display recent gallery albums.

### About Section

Display organization introduction.

### Social Media Section

Display configured social links.

### Footer

Implement:

* Navigation
* Organization information
* Social links
* Contact details
* Copyright
* Language options

---

# Public News Pages

Implement:

```text
/news
/news/[slug]
/category/[slug]
```

## News Article Page

Display:

* Breadcrumb
* Category
* Title
* Excerpt
* Date
* Author
* Hero image
* Article content
* Additional images
* Social sharing
* Related news
* Latest news sidebar

Desktop:

```text
Main Article     Sidebar
     70%           30%
```

Mobile:

```text
Main Content
     ↓
Sidebar Content
```

## Search

Implement:

```text
/search
```

Search across:

* News titles
* News content
* Categories
* Tags

Filters:

* Category
* Language
* Date

## Deliverable

A complete public news portal powered by CMS data.

---

# Phase 5 — Gallery & Media Management

## Objective

Build the complete photo gallery system.

## Admin Gallery

Routes:

```text
/admin/gallery
/admin/gallery/create
/admin/gallery/[id]/edit
```

### Album Management

Admin can:

* Create album
* Edit album
* Delete album
* Publish/unpublish album
* Add description
* Select category
* Add translations
* Set date
* Select cover photo

### Photo Upload

Support:

* Multiple file upload
* Drag and drop
* Image preview
* Upload progress
* File validation
* Compression
* WebP optimization
* Delete images
* Reorder images
* Select cover image
* Alt text

## Public Gallery

Routes:

```text
/gallery
/gallery/[slug]
```

### Gallery Listing

Display:

* Album cover
* Album title
* Date
* Category
* Number of photos

### Album Page

Display:

* Album title
* Description
* Date
* Category
* Photo grid

### Lightbox

Implement:

* Fullscreen
* Previous
* Next
* Close
* Image counter
* Keyboard navigation
* Mobile gestures where practical

### Multilingual Gallery

Support:

```text
English
Kannada
Urdu
```

including:

* Album title
* Description
* SEO metadata

## Deliverable

A complete media-management system and public gallery.

---

# Phase 6 — Welfare, Sports, Achievements & Content Expansion

## Objective

Complete the organization's major content sections and connect them to the CMS.

## Welfare

Create the welfare content experience.

Categories include:

* Community Support
* Education
* Food Distribution
* Health Programs
* Charity
* Youth Welfare
* Social Initiatives
* Other

Display:

* Title
* Image
* Category
* Date
* Description
* Related news where applicable

## Sports

Support:

* Cricket
* Football
* Badminton
* Volleyball
* Athletics
* Tournaments
* Local Competitions
* Other Sports

Display:

* Sports news
* Tournament announcements
* Match reports
* Results
* Team achievements
* Player achievements
* Sports events

## Achievements

Admin features:

```text
Create
Edit
Delete
Publish
Unpublish
Feature
Translate
```

Achievement fields:

* Title
* Description
* Image
* Date
* Category
* Featured flag
* Translations

Categories:

```text
Sports
Team
Player
Organization
Community
Educational
Volunteer
Other
```

## Public Achievement Page

Implement:

```text
/achievements
```

Display:

* Featured achievements
* Latest achievements
* Achievement cards
* Categories
* Dates
* Images

## Deliverable

The website now represents the organization's:

* Welfare activities
* Sports activities
* Achievements
* Community work

---

# Phase 7 — Multilingual Completion, SEO, Settings & Polish

## Objective

Complete all production-level features that make the website ready for public launch.

## Multilingual System

Complete English, Kannada, and Urdu support throughout the application.

Verify:

* Navigation
* Buttons
* Forms
* Empty states
* Error messages
* News
* Gallery
* Achievements
* Categories
* SEO metadata

### Language Switching

Switching language should:

* Be one-click
* Persist the selected language
* Keep the user on the equivalent page where possible
* Load translated content
* Change page direction automatically

Urdu:

```text
dir="rtl"
```

English/Kannada:

```text
dir="ltr"
```

## Site Settings

Admin should be able to manage:

* Organization name
* Logo
* Favicon
* Description
* Contact information
* Address
* Email
* Phone
* Social media links
* Footer information
* Homepage featured content
* SEO defaults

## SEO

Implement:

* Dynamic page titles
* Meta descriptions
* Canonical URLs
* Open Graph metadata
* Twitter/social metadata
* Article structured data
* Organization structured data
* Breadcrumb structured data
* Sitemap
* Robots.txt

## Social Sharing

News articles should support sharing through common platforms.

Include:

* Share button
* Copy link
* WhatsApp sharing
* Facebook sharing
* X sharing

## Error Pages

Implement:

```text
404
500
Not Found
Unauthorized
Upload Error
Search Empty State
No Content State
```

## Loading States

Implement:

* Skeleton loaders
* Button loading states
* Upload progress
* Page loading states

## Deliverable

A polished multilingual website with complete settings, SEO, sharing, and production-level UI states.

---

# Phase 8 — Testing, Optimization & Production Deployment

## Objective

Test the complete system and prepare it for production deployment.

---

## Functional Testing

Test:

### Authentication

* Admin login
* Invalid login
* Logout
* Session expiration
* Protected routes
* Unauthorized access

### News

* Create
* Edit
* Delete
* Draft
* Publish
* Unpublish
* Archive
* Featured news
* Categories
* Images
* Translations

### Gallery

* Create album
* Edit album
* Delete album
* Upload multiple photos
* Delete photo
* Reorder photos
* Select cover
* Publish/unpublish
* Translations
* Lightbox

### Achievements

* Create
* Edit
* Delete
* Publish
* Feature
* Translation

### Search

Test:

* Keyword search
* Category filtering
* Date filtering
* Language filtering
* Empty results

### Language

Test:

```text
English → Kannada
Kannada → Urdu
Urdu → English
```

Verify:

* Content translation
* UI translation
* RTL
* Page persistence

---

# Responsive Testing

Test on:

```text
Mobile
Tablet
Laptop
Desktop
Large Desktop
```

Check:

* Navigation
* Cards
* Images
* Tables
* Forms
* Admin dashboard
* Gallery
* Lightbox
* Article pages

---

# Accessibility Testing

Check:

* Keyboard navigation
* Focus states
* Screen-reader labels
* Image alt text
* Heading hierarchy
* Color contrast
* Form labels
* Modal accessibility
* RTL accessibility

---

# Security Testing

Verify:

* RLS policies
* Admin authorization
* Storage policies
* Input validation
* Rich text sanitization
* File validation
* Authentication
* Environment variables
* Service role key protection

Never expose:

```text
SUPABASE_SERVICE_ROLE_KEY
```

to the client.

---

# Performance Optimization

Optimize:

* Database queries
* Images
* Gallery thumbnails
* Next.js caching
* Server Components
* Lazy loading
* Bundle size
* Fonts
* CSS
* API/database requests

Use:

```text
Next/Image
```

for website images wherever appropriate.

---

# SEO Testing

Verify:

* Page titles
* Meta descriptions
* Canonical URLs
* Open Graph
* Structured data
* Sitemap
* Robots.txt
* Clean URLs

Test individual news articles for correct metadata.

---

# Production Preparation

### Environment

Configure production:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

### GitHub

Ensure:

* Clean repository
* No secrets committed
* `.env.local` ignored
* README completed
* Production branch configured

### Vercel

Configure:

* GitHub repository
* Environment variables
* Build settings
* Production deployment

### Supabase

Verify:

* Database
* RLS
* Storage
* Auth
* Policies
* Production data

---

# Final Production Checklist

```text
[ ] Public website working
[ ] Admin login working
[ ] Admin dashboard working
[ ] News CMS working
[ ] Categories working
[ ] Gallery CMS working
[ ] Gallery lightbox working
[ ] Achievements working
[ ] Search working
[ ] English working
[ ] Kannada working
[ ] Urdu working
[ ] Urdu RTL working
[ ] Image uploads working
[ ] Storage policies working
[ ] Database RLS working
[ ] SEO working
[ ] Sitemap working
[ ] Robots.txt working
[ ] Social sharing working
[ ] Responsive design verified
[ ] Accessibility verified
[ ] Security verified
[ ] Performance optimized
[ ] Production environment configured
[ ] GitHub repository clean
[ ] Vercel deployment successful
[ ] Custom domain configured if required
```

---

# Phase Completion Criteria

Each phase should only be considered complete when:

1. All listed features are implemented.
2. Features are connected to the actual database where applicable.
3. No placeholder functionality remains for that phase.
4. Desktop and mobile layouts work.
5. Existing functionality has not been broken.
6. Errors and loading states are handled.
7. Code follows the architecture defined in `ARCHITECTURE.md`.
8. The application runs successfully.
9. The phase has been manually tested.
10. The code is committed to Git.

---

# Recommended Development Order

```text
PHASE 1
Project Foundation
        ↓
PHASE 2
Database + Auth + Security
        ↓
PHASE 3
Admin News CMS
        ↓
PHASE 4
Public News Portal + Homepage
        ↓
PHASE 5
Gallery + Media
        ↓
PHASE 6
Welfare + Sports + Achievements
        ↓
PHASE 7
Multilingual + SEO + Settings + Polish
        ↓
PHASE 8
Testing + Optimization + Deployment
```

---

# Important AI Development Rule

When implementing this project with Google Antigravity or another AI coding agent:

* Implement only the current phase.
* Do not prematurely implement future phases.
* Read `PRD.md` and `ARCHITECTURE.md` before making changes.
* Preserve existing functionality.
* Do not restructure the project unnecessarily.
* Do not replace the selected technology stack without a strong technical reason.
* Do not hardcode CMS content.
* Do not create fake backend functionality.
* Use the real Supabase database once Phase 2 is complete.
* Test every feature after implementation.
* Fix errors before proceeding to the next phase.
* Keep the application runnable after every phase.
* Maintain responsive design throughout development.
* Maintain English, Kannada, and Urdu compatibility throughout development.
* Never remove RTL support when modifying shared components.
* Do not expose secrets or service-role credentials.
* Do not implement features listed under Future Scope unless explicitly requested.

---

# Definition of Done

The Madeena Welfare Society portal is considered complete when:

```text
Public User
     │
     ▼
Website
     │
     ├── News
     ├── Welfare
     ├── Sports
     ├── Achievements
     ├── Gallery
     ├── Search
     ├── About
     └── Contact
     
Admin
     │
     ▼
Secure CMS
     │
     ├── News Management
     ├── Category Management
     ├── Gallery Management
     ├── Achievement Management
     ├── Translation Management
     ├── Media Management
     └── Site Settings
     
Languages
     │
     ├── English
     ├── Kannada
     └── Urdu + RTL
     
Infrastructure
     │
     ├── Next.js
     ├── Supabase
     ├── PostgreSQL
     ├── Supabase Auth
     ├── Supabase Storage
     └── Vercel
```

The final product must be a **production-ready multilingual news, welfare, sports, achievement, and photo-gallery CMS website for Madeena Welfare Society**, with public content consumption and secure administrator-controlled content management.
