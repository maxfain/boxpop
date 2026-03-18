-- BoxPop V3 Schema Migration
-- Product: Managed OpenClaw hosting (Pop — personal AI in WhatsApp)
-- Run against Supabase PostgreSQL

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- Users: extend existing table with new columns
-- ============================================================

ALTER TABLE users ADD COLUMN IF NOT EXISTS tier text NOT NULL DEFAULT 'free' CHECK (tier IN ('free','starter','pro','power'));
ALTER TABLE users ADD COLUMN IF NOT EXISTS stripe_customer_id text;
ALTER TABLE users ADD COLUMN IF NOT EXISTS reputation_score integer NOT NULL DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS skills_contributed integer NOT NULL DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS marketplace_creator boolean NOT NULL DEFAULT false;

-- ============================================================
-- Pop Instances: one per user, represents their hosted AI
-- ============================================================

CREATE TABLE IF NOT EXISTS pop_instances (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at timestamptz NOT NULL DEFAULT now(),
  user_id uuid UNIQUE NOT NULL REFERENCES users(id),
  fly_machine_id text,
  fly_volume_id text,
  status text NOT NULL DEFAULT 'provisioning' CHECK (status IN ('provisioning','active','suspended','error','deleted')),
  last_active_at timestamptz,
  tier text NOT NULL DEFAULT 'free',
  model_provider text NOT NULL DEFAULT 'groq',
  model_name text NOT NULL DEFAULT 'llama-3.3-70b',
  tone text,
  main_use text,
  response_length text,
  health_status text DEFAULT 'unknown'
);

-- ============================================================
-- Channels: messaging platform connections per instance
-- ============================================================

CREATE TABLE IF NOT EXISTS channels (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at timestamptz NOT NULL DEFAULT now(),
  user_id uuid NOT NULL REFERENCES users(id),
  instance_id uuid NOT NULL REFERENCES pop_instances(id),
  type text NOT NULL CHECK (type IN ('whatsapp','telegram','discord')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','active','disconnected','error')),
  external_id text,
  connected_at timestamptz,
  last_message_at timestamptz,
  UNIQUE (user_id, type)
);

-- ============================================================
-- Skills: community-contributed capabilities
-- ============================================================

CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  contributor_id uuid REFERENCES users(id),
  skill_md text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','live','retired')),
  invocation_count integer NOT NULL DEFAULT 0,
  is_default boolean NOT NULL DEFAULT false,
  version integer NOT NULL DEFAULT 1
);

-- ============================================================
-- Configurations: life configs for the marketplace
-- ============================================================

CREATE TABLE IF NOT EXISTS configurations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at timestamptz NOT NULL DEFAULT now(),
  creator_id uuid NOT NULL REFERENCES users(id),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  tagline text NOT NULL,
  story text NOT NULL,
  soul_md text NOT NULL,
  agents_md text NOT NULL,
  skill_slugs text[] NOT NULL DEFAULT '{}',
  life_tags text[] NOT NULL DEFAULT '{}',
  tone_tag text,
  is_free boolean NOT NULL DEFAULT true,
  price_cents integer,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','review','live','retired')),
  install_count integer NOT NULL DEFAULT 0,
  active_installs integer NOT NULL DEFAULT 0
);

-- ============================================================
-- Contributions: from in-conversation gap detection
-- ============================================================

CREATE TABLE IF NOT EXISTS contributions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at timestamptz NOT NULL DEFAULT now(),
  contributor_id uuid NOT NULL REFERENCES users(id),
  instance_id uuid NOT NULL REFERENCES pop_instances(id),
  type text NOT NULL CHECK (type IN ('skill','config_improvement','bug_report')),
  raw_description text NOT NULL,
  proposed_name text,
  proposed_skill_md text,
  pop_reasoning text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected','live')),
  skill_id uuid REFERENCES skills(id)
);

-- ============================================================
-- Indexes
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_pop_instances_user_id ON pop_instances(user_id);
CREATE INDEX IF NOT EXISTS idx_pop_instances_status ON pop_instances(status);
CREATE INDEX IF NOT EXISTS idx_channels_instance_id ON channels(instance_id);
CREATE INDEX IF NOT EXISTS idx_channels_user_id ON channels(user_id);
CREATE INDEX IF NOT EXISTS idx_skills_status ON skills(status);
CREATE INDEX IF NOT EXISTS idx_skills_slug ON skills(slug);
CREATE INDEX IF NOT EXISTS idx_configurations_status ON configurations(status);
CREATE INDEX IF NOT EXISTS idx_configurations_slug ON configurations(slug);
CREATE INDEX IF NOT EXISTS idx_contributions_contributor_id ON contributions(contributor_id);
CREATE INDEX IF NOT EXISTS idx_contributions_instance_id ON contributions(instance_id);
