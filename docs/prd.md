# Product Requirements Document (PRD)

## 1. Project Overview

### Project Name

**Madeena Welfare Society — News & Media Portal**

### Project Type

Multilingual local community news, welfare, sports, achievements and gallery CMS website.

### Project Objective

Build an official website for **Madeena Welfare Society** that allows the public to easily view the organization's latest news, welfare activities, sports activities, achievements and photo galleries.

The website will also contain a private **Admin CMS** where authorized administrators can create and manage all website content.

The website is primarily a **content publishing platform**, not a social networking platform.

---

# 2. Problem Statement

Madeena Welfare Society conducts various welfare programs, sports activities, community events and other initiatives.

Currently, information about these activities may be distributed through social media or other informal channels. The organization needs a centralized website where:

* News can be published officially.
* Sports and welfare activities can be documented.
* Achievements can be showcased.
* Photos can be organized into albums.
* Visitors can access information in their preferred language.
* Administrators can manage the website without needing technical knowledge.

---

# 3. Product Vision

Create a professional local news and media portal that becomes the official digital presence of Madeena Welfare Society.

The website should combine:

**Local News Portal + Welfare Platform + Sports Portal + Achievement Showcase + Photo Gallery**

The website should look professional enough to be used as the organization's official website for many years.

It should not look like a basic college CRUD project or a generic news template.

---

# 4. Design References

## Primary Reference

* Visual Mockup (Approved Design): High-contrast editorial community portal featuring Madeena Welfare Society Bhatkal branding, Emerald Green (`#047857`), Deep Navy (`#0B2238`), Mint Light (`#ECFDF5`), and clean pill-style controls.
* Fikrokhabar English News Portal:
https://english.fikrokhabar.com/

Use it as inspiration for:

* News portal layout
* News hierarchy
* Navigation
* Latest news sections
* Category-based news
* Article pages
* Photo gallery
* Search
* Language selection
* Footer structure

Do **not** copy its design, branding, content or assets.

Create a unique visual identity for Madeena Welfare Society.

## Organization Reference

Instagram:

https://www.instagram.com/madeenawelfaresociety/

Use this only as a reference for understanding:

* Organization identity
* Activities
* Sports involvement
* Welfare activities
* General visual direction

Do not scrape or automatically copy Instagram content.

---

# 5. Target Users

## 5.1 Public Visitors

Public visitors do not need to create an account.

They should be able to:

* Visit the homepage
* Read news
* Search news
* Filter content
* View welfare activities
* View sports activities
* View achievements
* Browse photo galleries
* Open individual gallery albums
* View individual photos
* Change website language
* Read About information
* View Contact information
* Share news articles

## 5.2 Administrator

Only authorized administrators can access the CMS.

Administrators should be able to:

* Login
* Logout
* View dashboard
* Create news
* Edit news
* Delete news
* Save news as draft
* Publish news
* Unpublish/archive news
* Mark news as featured
* Manage categories
* Upload article images
* Create gallery albums
* Upload multiple gallery photos
* Delete photos
* Reorder photos
* Manage achievements
* Manage translations
* Manage selected homepage content
* Manage basic website settings

There must be **no public registration system**.

---

# 6. Core Requirements

The MVP must provide the following:

### Public Website

* Homepage
* News
* Individual news articles
* Welfare section
* Sports section
* Achievements section
* Gallery
* Individual gallery albums
* Search
* About
* Contact
* Language switching

### Admin CMS

* Admin login
* Dashboard
* News management
* Category management
* Gallery management
* Photo upload
* Achievement management
* Translation management
* Content publishing

---

# 7. Multilingual Requirement

## Priority: HIGH

The website must support multiple languages from the beginning.

Initial languages:

1. English
2. Kannada
3. Urdu

Language selector should be clearly visible.

Example:

**English | ಕನ್ನಡ | اردو**

Users should be able to switch languages with one click.

---

## 7.1 Language Behavior

When the user changes language:

* Navigation changes
* Buttons change
* Categories change
* Static content changes
* News title changes
* News excerpt changes
* News content changes
* Gallery title changes
* Gallery description changes
* Achievement content changes

The user should remain on the corresponding page/content after switching languages.

Do not send the user back to the homepage unnecessarily.

---

## 7.2 Urdu RTL

Urdu must use a proper RTL layout.

When Urdu is selected:

* Text direction becomes RTL
* Article content becomes RTL
* Appropriate alignment is applied
* Urdu typography is used
* Navigation/content layouts should accommodate RTL where appropriate

English and Kannada should remain LTR.

---

## 7.3 Translation Management

Administrators should be able to enter translations for each article.

Example:

### English

Title
Excerpt
Article content

### Kannada

Title
Excerpt
Article content

### Urdu

Title
Excerpt
Article content

The same principle should apply to:

* Gallery albums
* Achievements
* Other CMS-managed multilingual content

Do not use browser translation as the primary language system.

---

# 8. Homepage Requirements

The homepage should have a professional local-news-portal layout.

## 8.1 Header

Include:

* Madeena Welfare Society logo
* Organization name
* Navigation
* Search
* Language switcher
* Social media links

Desktop navigation:

```text
Home
News
Welfare
Sports
Achievements
Gallery
About
Contact
```

Mobile navigation should use a hamburger menu.

---

# 9. Latest News

Display a latest-news section near the top of the homepage.

Each news item should display:

* Category
* Title
* Date
* Optional thumbnail

The latest-news area should automatically update when administrators publish new articles.

---

# 10. Featured News

Create a prominent featured-news section.

Layout example:

```text
------------------------------------------------
|                                              |
|          LARGE FEATURED ARTICLE              |
|                                              |
------------------------------------------------
| News 2 | News 3 | News 4                     |
------------------------------------------------
```

Administrators should be able to mark an article as **Featured**.

The homepage should automatically use the featured article.

---

# 11. Latest News Section

Display recent published articles.

Each card should include:

* Featured image
* Category
* Title
* Date
* Short excerpt
* Read More

The design should use a combination of:

* Large cards
* Horizontal cards
* Compact lists

Avoid making every card look identical.

---

# 12. Welfare Section

Create a dedicated Welfare section.

Purpose:

Showcase the organization's community and welfare activities.

Possible content:

* Community support
* Charity programs
* Food distribution
* Education support
* Health programs
* Youth welfare
* Social initiatives
* Other welfare activities

The section should display recent welfare-related news.

Provide:

**View All Welfare News**

button/link.

---

# 13. Sports Section

Create a dedicated Sports section.

Possible sports:

* Cricket
* Football
* Badminton
* Volleyball
* Athletics
* Tournaments
* Local competitions
* Other sports

Sports content can include:

* Match reports
* Tournament announcements
* Tournament results
* Team achievements
* Player achievements
* Sports events

Provide:

**View All Sports News**

button/link.

---

# 14. Achievements Section

Create a dedicated Achievements section.

Achievements may include:

* Sports achievements
* Team achievements
* Player achievements
* Organization achievements
* Community recognition
* Educational achievements
* Volunteer achievements

Achievement cards should include:

* Image
* Achievement title
* Date
* Description
* Category

Administrators should be able to mark achievements as featured.

---

# 15. Photo Gallery

The photo gallery is one of the main features of the website.

The public gallery should display albums rather than showing every photo directly on the homepage.

Each album should show:

* Cover photo
* Album title
* Date
* Category
* Number of photos

Example:

```text
[ PHOTO ]

Annual Sports Meet
12 Photos
Sports
```

---

# 16. Gallery Album

When a visitor opens an album, display:

* Album title
* Description
* Date
* Category
* Photo grid

Clicking a photo should open a lightbox.

Lightbox must support:

* Next
* Previous
* Close
* Fullscreen
* Image counter

---

# 17. Gallery Admin CMS

Administrators should be able to:

* Create album
* Edit album
* Delete album
* Add title
* Add description
* Select category
* Upload cover image
* Upload multiple photos
* Delete photos
* Reorder photos
* Select/change cover photo
* Publish/unpublish album
* Add translations

Gallery categories:

* Sports
* Welfare
* Events
* Achievements
* Community
* Other

---

# 18. News CMS

The admin must have a complete news management system.

## Create News

Admin should be able to enter:

* Title
* Short description/excerpt
* Full article content
* Category
* Featured image
* Additional images
* Author
* Published date
* Tags
* Language translations
* SEO title
* SEO description
* Featured status

---

# 19. News Status

News should support:

```text
Draft
Published
Archived
```

### Draft

Only administrators can see it.

### Published

Visible on the public website.

### Archived

Removed from normal public listings but retained in the CMS.

---

# 20. News Categories

Initial categories:

```text
General
Welfare
Sports
Achievements
Events
Announcements
```

Administrators should be able to create additional categories later.

---

# 21. News Article Page

Each article page should contain:

* Breadcrumb
* Category
* Title
* Short description
* Published date
* Author
* Featured image
* Full article content
* Additional images
* Social sharing
* Related news
* Latest news

Desktop layout should use:

```text
Main Article: 65–70%

Sidebar:
- Latest News
- Related News
- Gallery
```

Mobile should use a single-column layout.

---

# 22. Rich Text Editor

The administrator should have a rich text editor.

Support:

* Headings
* Paragraphs
* Bold
* Italic
* Ordered lists
* Unordered lists
* Links
* Quotes
* Images
* Text alignment

A suitable editor such as TipTap may be used.

---

# 23. Admin Dashboard

Admin dashboard route:

```text
/admin
```

Dashboard should display:

* Total news
* Published news
* Draft news
* Archived news
* Total gallery albums
* Total gallery photos
* Total achievements

Also display:

* Recent news
* Recent gallery albums
* Recent achievements

Quick actions:

```text
Add News
Create Gallery
Upload Photos
Add Achievement
```

---

# 24. Admin Navigation

Use a simple sidebar:

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

Settings

Logout
```

The CMS should be easy for a non-technical administrator.

---

# 25. Image Upload Requirements

Admin should be able to upload:

* News images
* Gallery images
* Achievement images

Supported formats:

```text
JPG
JPEG
PNG
WEBP
```

Requirements:

* Drag and drop
* Multiple upload
* Image preview
* Upload progress
* File validation
* File size validation
* Image compression
* Image optimization
* Alt text
* Delete functionality

Gallery images should use optimized thumbnails for listing pages.

---

# 26. Search

Create a website-wide search.

Search should cover:

* News titles
* News content
* Categories
* Tags
* Gallery titles
* Achievement titles

Search result should contain:

* Image
* Category
* Title
* Date
* Excerpt

Filters:

* Category
* Language
* Date

---

# 27. About Page

Create an About page explaining:

* Who Madeena Welfare Society is
* Organization purpose
* Welfare activities
* Sports activities
* Community involvement
* Vision
* Mission

The content should be manageable from the CMS where practical.

---

# 28. Contact Page

Create a Contact page containing:

* Organization name
* Address
* Phone number
* Email
* Social media links
* Other official contact information

Do not expose unnecessary personal information.

Contact information should preferably be configurable through site settings.

---

# 29. Social Media

Provide official social media links.

Initially support:

* Instagram
* Facebook
* YouTube
* WhatsApp

Only show links that have been configured by the administrator.

Do not automatically scrape social media feeds.

---

# 30. SEO Requirements

Every public page must be SEO-friendly.

News articles must support:

* Dynamic page title
* Meta description
* Canonical URL
* Open Graph title
* Open Graph description
* Open Graph image

Implement structured data where appropriate:

* Organization
* Article
* Breadcrumb

Generate:

```text
sitemap.xml
robots.txt
```

Use SEO-friendly URLs.

Example:

```text
/news/madeena-welfare-society-organises-sports-event
```

---

# 31. Social Sharing

Each news article should provide:

* WhatsApp share
* Facebook share
* X share
* Copy link

Sharing should work properly on mobile and desktop.

---

# 32. Responsive Design

The website must work properly on:

* Desktop
* Laptop
* Tablet
* Mobile

Gallery layout:

```text
Desktop → 4 columns
Tablet → 3 columns
Mobile → 2 columns
```

Mobile experience is a high priority.

---

# 33. Design Requirements

The design should be:

* Modern
* Professional
* Clean
* Editorial
* Community-oriented
* Image-focused
* Easy to navigate
* Mobile-first

Use:

* Strong typography
* Clear hierarchy
* Good whitespace
* High-quality photography
* Subtle borders
* Moderate border radius
* Minimal animations

Avoid:

* Excessive gradients
* Excessive animations
* Excessive shadows
* Too many rounded cards
* Huge hero sections
* Cluttered navigation
* Generic AI-generated landing page appearance

---

# 34. Technology Requirements

Recommended stack:

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend / Database

* Supabase
* PostgreSQL

### Authentication

* Supabase Auth

### File Storage

* Supabase Storage

### Rich Text Editor

* TipTap or equivalent

### Icons

* Lucide React

### Deployment

* Vercel

---

# 35. Authentication Requirements

Only administrators can log in.

Admin route:

```text
/admin/login
```

After successful login:

```text
/admin
```

Protect all admin routes.

Public users must not be able to:

* Register
* Login
* Create news
* Edit news
* Delete news
* Upload photos
* Access admin pages

---

# 36. Database Requirements

Use a relational PostgreSQL database.

Main entities:

```text
Users
Categories
News
News Translations
News Images
Gallery Albums
Gallery Album Translations
Gallery Images
Achievements
Achievement Translations
Site Settings
Social Links
```

The database must support multilingual content without creating separate databases for each language.

---

# 37. Content Translation Model

A news article should have one main record and multiple translations.

Example:

```text
News
 └── News Translations
       ├── English
       ├── Kannada
       └── Urdu
```

This same pattern should be used for:

* News
* Gallery albums
* Achievements

---

# 38. Performance Requirements

The website should be optimized for fast loading.

Implement:

* Lazy loading
* Responsive images
* Image compression
* WebP where appropriate
* Efficient database queries
* Caching where appropriate
* Minimal unnecessary client-side JavaScript

Do not load the entire gallery on the homepage.

---

# 39. Accessibility Requirements

Implement:

* Semantic HTML
* Keyboard navigation
* Visible focus states
* ARIA labels where required
* Good color contrast
* Alt text
* Accessible forms
* Accessible dialogs
* Accessible language switcher

---

# 40. Security Requirements

Implement:

* Secure admin authentication
* Protected admin routes
* Authorization
* Row Level Security
* Secure storage policies
* Input validation
* Input sanitization
* XSS protection
* File type validation
* File size limits
* Secure environment variables

Never expose server-side Supabase service keys to the browser.

---

# 41. Error States

Create professional error and empty states.

### 404

```text
Page Not Found
```

### Server Error

```text
Something went wrong.
Please try again.
```

### No News

```text
No news has been published yet.
```

### No Gallery

```text
No photo albums available yet.
```

### No Search Results

```text
No results found.
Try another search term.
```

---

# 42. Homepage Content Management

Homepage content must be dynamic.

Do not hardcode news, achievements or gallery content.

Homepage should dynamically retrieve:

* Featured news
* Latest news
* Welfare news
* Sports news
* Featured achievements
* Recent gallery albums

Administrators should be able to control featured content.

---

# 43. Admin Content Workflow

## News Workflow

```text
Admin Login
      ↓
Dashboard
      ↓
Add News
      ↓
Enter English Content
      ↓
Enter Kannada Content
      ↓
Enter Urdu Content
      ↓
Upload Image
      ↓
Select Category
      ↓
Preview
      ↓
Save Draft / Publish
      ↓
Public Website
```

## Gallery Workflow

```text
Admin Login
      ↓
Gallery
      ↓
Create Album
      ↓
Enter Album Information
      ↓
Upload Multiple Photos
      ↓
Select Cover Photo
      ↓
Reorder Photos
      ↓
Publish
      ↓
Public Gallery
```

---

# 44. Admin Usability

The CMS must be simple.

The administrator should not need programming knowledge.

Primary actions should be clearly visible:

```text
+ Add News
+ Create Album
+ Upload Photos
+ Add Achievement
```

Destructive actions must require confirmation.

Example:

> Are you sure you want to delete this article?

---

# 45. Empty States

Every major CMS section should have a useful empty state.

Examples:

```text
No news articles yet.

Create your first news article.
[+ Add News]
```

```text
No gallery albums yet.

Create your first album.
[+ Create Album]
```

---

# 46. Future Scalability

The architecture should allow future features such as:

* Events calendar
* Team profiles
* Player profiles
* Match results
* Live scores
* YouTube integration
* Instagram integration
* WhatsApp channel integration
* Push notifications
* Newsletter
* Multiple admin roles
* Analytics
* Progressive Web App
* AI-assisted translations
* AI-assisted article drafting

These should not be implemented in the initial MVP unless specifically required.

---

# 47. Non-Goals

The initial version should NOT include:

* Public user accounts
* Public registration
* User profiles
* Comments
* Likes
* Private messaging
* Social networking
* E-commerce
* Payments
* Streaming
* Complex AI features

---

# 48. MVP Scope

The MVP is considered complete when the following work:

### Public

* Homepage
* News listing
* News article page
* Welfare section
* Sports section
* Achievements section
* Gallery
* Gallery album
* Search
* About
* Contact
* Language switching

### Admin

* Admin login
* Dashboard
* News CRUD
* Category management
* Draft/publish system
* Featured news
* Gallery CRUD
* Multiple photo upload
* Photo management
* Achievement CRUD
* Translation management

### Technical

* English/Kannada/Urdu
* Urdu RTL
* Responsive design
* Image optimization
* SEO metadata
* Sitemap
* Security
* Accessibility
* Production deployment support

---

# 49. Success Criteria

The final product should:

1. Look like a professional local news portal.
2. Be easy for visitors to navigate.
3. Allow administrators to publish news without coding.
4. Allow administrators to upload and manage gallery photos.
5. Provide seamless English/Kannada/Urdu switching.
6. Properly support Urdu RTL.
7. Work well on mobile devices.
8. Load quickly.
9. Be SEO-friendly.
10. Keep public and admin functionality securely separated.
11. Be scalable for future features.
12. Be deployable as a real production website.

---

# 50. Final Product Definition

The completed product should be understood as:

> **The official multilingual digital news, welfare, sports and media portal of Madeena Welfare Society.**

The core experience should be:

```text
              MADEENA WELFARE SOCIETY
                       │
          ┌────────────┼────────────┐
          │            │            │
        NEWS        WELFARE       SPORTS
          │            │            │
          └────────────┼────────────┘
                       │
                  ACHIEVEMENTS
                       │
                    GALLERY
                       │
              MULTILINGUAL ACCESS
             ENGLISH | KANNADA | URDU
                       │
                       ▼
                  PUBLIC USERS


                 ADMIN CMS
                     │
          ┌──────────┼──────────┐
          │          │          │
        NEWS       GALLERY   ACHIEVEMENTS
          │          │          │
          └──────────┼──────────┘
                     │
                PUBLISH CONTENT
```

The primary priorities are:

1. **Simple and powerful CMS**
2. **Multilingual content**
3. **News publishing**
4. **Photo gallery**
5. **Sports and welfare presentation**
6. **Mobile responsiveness**
7. **Performance**
8. **Security**
9. **SEO**
10. **Long-term maintainability**
