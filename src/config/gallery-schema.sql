-- ═══════════════════════════════════════════════════════
-- HC GALLERY — SUPABASE SCHEMA
-- Run this in the Supabase SQL Editor once
-- ═══════════════════════════════════════════════════════

-- Gallery photos table
CREATE TABLE IF NOT EXISTS gallery_photos (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  photo_url   TEXT NOT NULL,
  thumb_url   TEXT,
  caption_es  TEXT,
  caption_en  TEXT,
  location    TEXT,
  category    TEXT DEFAULT 'community',
  event_date  DATE,
  published   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  created_by  TEXT DEFAULT 'HC Team'
);

-- Reactions table (one row per session per photo per reaction)
CREATE TABLE IF NOT EXISTS gallery_reactions (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  photo_id    UUID REFERENCES gallery_photos(id) ON DELETE CASCADE,
  reaction_id TEXT NOT NULL,
  session_id  TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(photo_id, reaction_id, session_id)
);

-- Flag reactions table (one row per session per photo per country)
CREATE TABLE IF NOT EXISTS gallery_flags (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  photo_id    UUID REFERENCES gallery_photos(id) ON DELETE CASCADE,
  country_id  TEXT NOT NULL,
  session_id  TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(photo_id, country_id, session_id)
);

-- ── INDEXES ──────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_gallery_photos_published
  ON gallery_photos(published, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_gallery_photos_category
  ON gallery_photos(category, published);

CREATE INDEX IF NOT EXISTS idx_gallery_reactions_photo
  ON gallery_reactions(photo_id, reaction_id);

CREATE INDEX IF NOT EXISTS idx_gallery_flags_photo
  ON gallery_flags(photo_id, country_id);

-- ── ROW LEVEL SECURITY ───────────────────────────────────
ALTER TABLE gallery_photos    ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_flags     ENABLE ROW LEVEL SECURITY;

-- Anyone can read published photos
CREATE POLICY "Public read gallery_photos"
  ON gallery_photos FOR SELECT
  USING (published = true);

-- Anyone can read reactions
CREATE POLICY "Public read gallery_reactions"
  ON gallery_reactions FOR SELECT USING (true);

CREATE POLICY "Public read gallery_flags"
  ON gallery_flags FOR SELECT USING (true);

-- Anyone can insert reactions (one per session enforced by UNIQUE)
CREATE POLICY "Public insert gallery_reactions"
  ON gallery_reactions FOR INSERT WITH CHECK (true);

CREATE POLICY "Public insert gallery_flags"
  ON gallery_flags FOR INSERT WITH CHECK (true);

-- Anyone can delete their own reaction (by session_id)
CREATE POLICY "Public delete own gallery_reactions"
  ON gallery_reactions FOR DELETE
  USING (session_id = current_setting('request.headers')::json->>'x-session-id');

CREATE POLICY "Public delete own gallery_flags"
  ON gallery_flags FOR DELETE
  USING (session_id = current_setting('request.headers')::json->>'x-session-id');

-- Admin can insert/update/delete photos (uses service role key)
CREATE POLICY "Admin manage gallery_photos"
  ON gallery_photos FOR ALL
  USING (true) WITH CHECK (true);

-- ── STORAGE BUCKET ───────────────────────────────────────
-- Run this separately in Supabase Storage settings:
-- Create a bucket called "gallery-photos" set to PUBLIC
-- Max file size: 10MB
-- Allowed types: image/jpeg, image/png, image/webp

-- ── SAMPLE DATA (optional, for testing) ─────────────────
INSERT INTO gallery_photos (caption_es, caption_en, location, category, event_date, photo_url)
VALUES
  (
    'Día de salud con Bon Secours en Cherrydale. Más de 120 familias atendidas.',
    'Health day with Bon Secours in Cherrydale. Over 120 families served.',
    'Cherrydale · Greenville, SC',
    'health',
    '2026-02-15',
    '/images/community/health-days/placeholder.jpg'
  ),
  (
    'Graduación de Ruta Empresarial — Clase de Invierno 2026.',
    'Ruta Empresarial Graduation — Winter 2026 Cohort.',
    'Sede Principal · Laurens Rd',
    'workshops',
    '2026-01-20',
    '/images/community/workshops/placeholder.jpg'
  ),
  (
    'Noche de networking en nuestra oficina principal. La comunidad empresarial latina de Upstate SC reunida.',
    'Networking night at our main office. The Upstate SC Latino business community gathered.',
    'Sede Principal · Greenville, SC',
    'networking',
    '2026-03-01',
    '/images/community/events/placeholder.jpg'
  );
