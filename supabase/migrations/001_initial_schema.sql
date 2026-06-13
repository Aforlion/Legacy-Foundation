-- ============================================================
-- SJN-LF Website — Supabase Database Migration
-- Run this SQL in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- ── 1. VOLUNTEERS ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.volunteers (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name   TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT,
  skills      TEXT,
  message     TEXT,
  status      TEXT NOT NULL DEFAULT 'pending'
              CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 2. NEWS & EVENTS ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.news_events (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT NOT NULL,
  slug         TEXT NOT NULL UNIQUE,
  content      TEXT NOT NULL,  -- rich-text HTML or markdown
  type         TEXT NOT NULL DEFAULT 'news'
               CHECK (type IN ('news', 'event')),
  event_date   DATE,           -- populated only for events
  cover_image  TEXT,           -- Supabase Storage public URL
  published    BOOLEAN NOT NULL DEFAULT FALSE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 3. GALLERY ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.gallery (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  image_url   TEXT NOT NULL,   -- Supabase Storage public URL
  category    TEXT NOT NULL DEFAULT 'general',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 4. SITE STATS (editable by admin) ────────────────────────
CREATE TABLE IF NOT EXISTS public.stats (
  key         TEXT PRIMARY KEY,
  value       TEXT NOT NULL,
  label       TEXT NOT NULL,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed with initial impact stats from the mockup
INSERT INTO public.stats (key, value, label) VALUES
  ('lives_impacted',       '500+',     'Lives Impacted'),
  ('community_projects',   '50+',      'Community Projects'),
  ('volunteers',           '100+',     'Volunteers'),
  ('educational_programs', 'Multiple', 'Educational Support Programs')
ON CONFLICT (key) DO NOTHING;

-- ── 5. ROW LEVEL SECURITY (RLS) ──────────────────────────────
-- Public: read access for published content
ALTER TABLE public.news_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stats       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteers  ENABLE ROW LEVEL SECURITY;

-- Anyone can read published news/events
CREATE POLICY "Public read published news_events"
  ON public.news_events FOR SELECT
  USING (published = TRUE);

-- Anyone can read gallery
CREATE POLICY "Public read gallery"
  ON public.gallery FOR SELECT USING (TRUE);

-- Anyone can read stats
CREATE POLICY "Public read stats"
  ON public.stats FOR SELECT USING (TRUE);

-- Anyone can INSERT a volunteer application (public form)
CREATE POLICY "Public insert volunteers"
  ON public.volunteers FOR INSERT WITH CHECK (TRUE);

-- Only authenticated admins can manage everything
CREATE POLICY "Admin full access news_events"
  ON public.news_events FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access gallery"
  ON public.gallery FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access stats"
  ON public.stats FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access volunteers"
  ON public.volunteers FOR ALL
  USING (auth.role() = 'authenticated');
