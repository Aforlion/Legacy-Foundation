# Technical Architecture Review: Sir John Ndukwe Legacy Foundation (SJN-LF) Website (Revised)

**Author:** Startup CTO  
**Project:** NGO Website  
**Date:** June 13, 2026  

---

## 1. Technical Architecture Review
The updated requirement states that the website cannot be static or zero-maintenance. The client needs dynamic content management (Gallery, News, Events, Activities) and transactional data processing (Volunteer storage and status management).

This shifts the architecture from a static-first Jamstack site to a **dynamic Full-Stack Serverless Web Application**. To deliver this within the **1-week timeline** with high security and minimal operational overhead, we need a platform that provides Auth, Database, and Storage out-of-the-box.

---

## 2. Recommended Stack
We recommend the **Next.js + Supabase** serverless stack:

* **Frontend Framework:** **Next.js (App Router, React)**
  * *Why:* Offers fast pre-rendering for SEO-sensitive public pages (Home, Programs, About) while supporting dynamic, client-side rendering for the Admin Dashboard and form interactions.
* **Backend-as-a-Service (BaaS):** **Supabase (PostgreSQL)**
  * *Why:* Provides a relational SQL database for volunteer records and blog articles, built-in User Authentication (for Admin login), and Blob Storage (for gallery photos) with a ready-to-use API. It also includes an interface (Supabase Studio) that can act as a raw admin panel.
* **Storage Provider:** **Supabase Storage (S3-compatible CDN)**
  * *Why:* Handles dynamic upload of news cover images and gallery photos with built-in compression.
* **Styling:** **Vanilla CSS (CSS Modules)**
  * *Why:* Flexibility, compliance with standards, and zero build overhead.
* **Transactional Email:** **Resend**
  * *Why:* Sends status notifications to volunteers and informs admins when a new application is submitted.

---

## 3. Hosting & Infrastructure Strategy
* **Frontend Hosting:** **Vercel** (Hobby/Pro tier). Host the Next.js app with serverless API route execution.
* **Backend & Database Hosting:** **Supabase Cloud** (Free Tier is sufficient for <= 500MB database and 1GB storage).
* **Domain & DNS:** Point the `.org` domain to Vercel. Vercel routes traffic, handles SSL renewals, and hooks up rewrite rules.

---

## 4. SEO Strategy
For a dynamic database-backed site, we maintain high SEO performance using Next.js hybrid structures:
* **Dynamic SSG / ISR:** Use Next.js Incremental Static Regeneration (ISR) to pre-render the News and Events pages. When an admin adds a new event, Supabase triggers a webhook to rebuild the page, keeping the site static and fast while displaying live data.
* **SEO Metadata:** Implement dynamic metadata fetching in Next.js layout routes.
* **Image Optimization:** Use the Next.js `<Image>` component to fetch and auto-format gallery images stored in Supabase into compressed WebP formats on-the-fly.

---

## 5. Form & Volunteer Handling Strategy
* **Data Flow:** The Volunteer Application Form sends data directly to a Next.js Server Action. This action validates input (using Zod), protects against spam via **Cloudflare Turnstile**, and writes the record directly to the `volunteers` table in Supabase.
* **Admin Dashboard:** A secure route `/admin` is created, guarded by Next.js middleware checking Supabase session cookies.
* **Processing Workflow:** Admins can view volunteer applications in a tabular dashboard, click to open details, update their status column (e.g., `applied` -> `approved`), and write admin notes.

---

## 6. CMS & Database Schema
The database (PostgreSQL) will contain four core tables:
1. `news_events`: ID, title, slug, content (rich text), type (news/event), event_date, cover_image, created_at.
2. `gallery`: ID, title, image_url, category, created_at.
3. `volunteers`: ID, full_name, email, phone, skills, status (pending/approved/rejected), admin_notes, created_at.
4. `stats`: key (e.g., lives_impacted), value, updated_at.

---

## 7. Security Requirements
* **Row Level Security (RLS):** Enable RLS on all Supabase tables. Only authenticated admin users can write/read volunteer lists and upload media. Public reads are only permitted on `news_events` and `gallery` tables.
* **Session Management:** Secure JWT session tokens stored in HttpOnly cookies to mitigate XSS attacks.
* **Media Sanitization:** Strip EXIF metadata from uploaded images before storing them in Supabase Storage.

---

## 8. Deployment Plan
1. **Supabase Schema Setup:** Run migrations to build the tables, RLS policies, and storage buckets.
2. **Local Development:** Spin up local Next.js environment connected to Supabase development branch.
3. **CI/CD Hookup:** Connect GitHub to Vercel for automated deployments.
4. **Environment Configuration:** Inject Supabase URL, Anon Key, Service Role Key, and Resend credentials into Vercel environment variables.

---

## 9. Cost Estimate

| Service | Tier | Purpose | Cost / Month |
| :--- | :--- | :--- | :--- |
| **Vercel** | Hobby / Free | Frontend & Serverless Hosting | $0.00 |
| **Supabase** | Free Tier | database (500MB), auth, storage (1GB) | $0.00 |
| **Resend** | Free Tier | Email notifications (up to 3k/month) | $0.00 |
| **Domain** | Registrar | `.org` domain registration | ~$1.25 ($15/yr) |
| **Total Cost** | | | **~$15.00 / year** |

---

## 10. Implementation Recommendation
* **CTO Verdict:** **Ready for Production**
* **Recommendation:** The Next.js + Supabase stack is the most robust and secure way to deliver the required volunteer database and content editing tools within the 1-week timeline. It eliminates the need for managing database servers or custom CMS deployments, while maintaining a $0 monthly operational cost.

---

## 11. JBK Brain Awareness & Knowledge Handoff

### Candidate Brain Entry
We propose promoting this technical architecture review to the JBK Brain.

* **Proposed Path:** `Architecture/SJN-LF-Dynamic-Technical-Review.md`
* **Core Architectural Decision:** Relational storage and admin auth handled via Supabase, hosted on Vercel with Next.js middleware session protection.
