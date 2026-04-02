# Sitemap
## Coffee Shop Website — Public + CMS Admin

**Version:** 1.0
**Date:** 2026-04-02

---

## Public Website

```
/ (Home — Landing Page)
│
├── #hero              ← Hero section with CTA
├── #about             ← Brand story + highlights
├── #menu              ← Menu tabs (Drinks / Food / Seasonal)
├── #gallery           ← Photo gallery
├── #promotions        ← Current offers (banner / section)
├── #testimonials      ← Customer reviews carousel
├── #contact           ← Map, hours, contact form
└── #footer            ← Links, social, copyright
│
├── /menu              ← Full menu standalone page (optional)
│   ├── /menu/drinks
│   ├── /menu/food
│   └── /menu/seasonal
│
├── /about             ← Full about / our story page (optional)
│
├── /blog              ← News & stories (optional, Phase 2)
│   └── /blog/[slug]   ← Individual blog post
│
├── /contact           ← Standalone contact page (optional)
│
├── /privacy-policy
└── /terms-of-service
```

---

## CMS Admin Panel (`/admin` or separate subdomain)

```
/admin
│
├── /admin/login           ← Authentication
│
├── /admin/dashboard       ← Overview & quick stats
│
├── /admin/content
│   ├── /admin/content/hero          ← Edit hero text, image, CTA
│   ├── /admin/content/about         ← Edit brand story, image, badges
│   ├── /admin/content/promotions    ← Add/edit/remove banners
│   ├── /admin/content/testimonials  ← Manage customer quotes
│   └── /admin/content/footer        ← Edit footer links, social URLs
│
├── /admin/menu
│   ├── /admin/menu/categories       ← Manage category tabs
│   └── /admin/menu/items            ← Add / Edit / Delete menu items
│       └── /admin/menu/items/[id]   ← Single item editor
│
├── /admin/gallery
│   └── /admin/gallery/upload        ← Upload & sort photos
│
├── /admin/hours
│   └── /admin/hours/edit            ← Set open/close per day
│
├── /admin/blog              ← (optional Phase 2)
│   ├── /admin/blog/posts
│   └── /admin/blog/posts/[id]
│
├── /admin/messages          ← View contact form submissions
│
└── /admin/settings
    ├── /admin/settings/general      ← Shop name, address, phone, email
    ├── /admin/settings/seo          ← Meta title, description, OG image
    └── /admin/settings/users        ← Manage admin/editor accounts
```

---

## Content Ownership Map

| Section | CMS Editable | Fields |
|---|---|---|
| Hero | Yes | Tagline, subtext, background image, CTA labels |
| About | Yes | Story text, image, badge labels |
| Menu | Yes | Item name, description, price, category, image, availability, dietary flags |
| Gallery | Yes | Photos (upload, reorder, caption) |
| Promotions | Yes | Title, description, expiry date, active toggle |
| Testimonials | Yes | Quote, author name, star rating |
| Opening Hours | Yes | Open/close time per day, closed toggle |
| Contact Info | Yes | Phone, email, address, Google Maps embed URL |
| Social Links | Yes | Instagram, Facebook, TikTok, Line URLs |
| SEO | Yes | Page title, meta description, OG image |
| Blog Posts | Yes (Phase 2) | Title, body (rich text), cover image, slug, publish date |

---

## URL Structure

| URL | Page | Public |
|---|---|---|
| `/` | Home landing page | Yes |
| `/menu` | Full menu page | Yes |
| `/about` | About / Our Story | Yes |
| `/blog` | Blog listing | Yes (Phase 2) |
| `/blog/[slug]` | Blog post | Yes (Phase 2) |
| `/contact` | Contact page | Yes |
| `/privacy-policy` | Privacy Policy | Yes |
| `/terms-of-service` | Terms of Service | Yes |
| `/admin` | CMS Dashboard | No (auth required) |
| `/admin/*` | All admin routes | No (auth required) |

---

## Navigation Structure

### Primary Nav (Desktop)
```
Logo | Menu | About | Gallery | Contact | [Find Us — CTA Button]
```

### Primary Nav (Mobile)
```
Logo + Hamburger →
  - Menu
  - About
  - Gallery
  - Contact
  - Find Us (highlighted)
```

### Footer Nav
```
Column 1: Logo + tagline + social icons
Column 2: Quick Links (Menu, About, Gallery, Contact)
Column 3: Info (Hours, Address, Phone, Email)
Column 4: Legal (Privacy Policy, Terms)
```

---

## SEO & Technical Pages

| File | Purpose |
|---|---|
| `/sitemap.xml` | Auto-generated XML sitemap for Google |
| `/robots.txt` | Crawl rules (block `/admin`) |
| `/favicon.ico` | Browser tab icon |
| `/manifest.json` | PWA manifest (optional) |
| `/_next/*` | Next.js static assets |
