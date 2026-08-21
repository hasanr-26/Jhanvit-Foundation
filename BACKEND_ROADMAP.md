# Jhanvit Foundation — Backend & Cloud Architecture Roadmap

This document outlines the roadmap and technical specifications for transitioning from the current client-side / static prototype to a production-grade centralized backend.

---

## 1. 🖼️ Media & Image Upload Pipeline

### Current State (Client-Side Compression):
- Images uploaded in the Admin Blog Editor are compressed client-side via **HTML5 Canvas** (max dimensions `1400x850`, JPEG quality `0.82`) to keep payloads below ~200KB.
- Data is stored as Base64 strings in browser `localStorage` or served via external image URLs (e.g., Unsplash).

### Future Implementation (Centralized Cloud Storage):
- **Recommended Providers**: Cloudinary, Supabase Storage, AWS S3 + CloudFront, or UploadThing.
- **Upload Flow**:
  1. Admin selects an image (any size / format).
  2. Optional client-side pre-resize to save mobile uplink bandwidth.
  3. Image uploads directly via Next.js Server Action or signed S3/Cloudinary URL.
  4. Server/CDN generates automatic responsive formats (`.webp`, `.avif`, thumbnail `300px`, banner `1400px`).
  5. Permanent CDN URL is saved to the database (e.g. `https://res.cloudinary.com/jhanvit/image/upload/...`).

---

## 2. 🗄️ Database & Content Migration

### Current State:
- Content (Blog posts, site configurations, donation presets) is managed via `src/lib/blogData.ts` and `src/lib/siteConfig.ts` with browser `localStorage` fallback and JSON export/import backup tools.

### Future Implementation:
- **Recommended Stack**: PostgreSQL with **Prisma ORM** / **Drizzle ORM** (hosted on Supabase, Neon, or Railway).
- **Schema Overview**:
  - `posts` table: `id`, `slug`, `title`, `excerpt`, `content`, `category`, `tags[]`, `author_name`, `author_role`, `author_avatar`, `banner_url`, `status` (`'draft' | 'published' | 'scheduled'`), `scheduled_at`, `read_time`, `featured`, `created_at`, `updated_at`.
  - `post_faqs` table: `id`, `post_id`, `question`, `answer`, `order`.
  - `registrations` table: consultation bookings, sponsorship seat applications, and donor records.
  - `site_config` table: key-value or JSON config for contact info, NGO credentials, and donation presets.
- **Data Migration**:
  - Use the built-in **"Export Backup (JSON)"** feature in the Blog Editor to generate `jhanvit-blog-backup.json`, and run a seed script (`prisma/seed.ts`) to populate the production database without data loss.

---

## 3. ⏰ Scheduled Publishing Execution

### Current State:
- Filtered client-side: `getPublicBlogPosts()` checks if `status === 'published'` or `(status === 'scheduled' && new Date(scheduledAt) <= new Date())`.

### Future Implementation:
- Database query:
  ```sql
  SELECT * FROM posts 
  WHERE status = 'published' 
     OR (status = 'scheduled' AND scheduled_at <= NOW())
  ORDER BY published_at DESC;
  ```
- Optional: Set up a Vercel Cron or automated background worker (`cron: */10 * * * *`) to automatically flip post statuses from `scheduled` to `published` and trigger cache revalidation (`revalidatePath('/blog')`).

---

## 4. 🔐 Authentication & Multi-Admin Access

### Current State:
- Admin password verification against local configuration (`adminpass.txt`).

### Future Implementation:
- Implement **NextAuth.js (Auth.js)** or **Clerk** / **Supabase Auth**.
- Enable Role-Based Access Control (RBAC):
  - `SUPER_ADMIN`: Full access (site settings, delete posts, user management).
  - `EDITOR`: Write, edit, schedule, and publish blog articles.
  - `VIEWER`: View dashboard registrations & statistics.
