// BoxPop V3 TypeScript Types — Managed OpenClaw Hosting

export type Tier = "free" | "starter" | "pro" | "power";
export type InstanceStatus = "provisioning" | "active" | "suspended" | "error" | "deleted";
export type ChannelType = "whatsapp" | "telegram" | "discord";
export type ChannelStatus = "pending" | "active" | "disconnected" | "error";
export type SkillStatus = "pending" | "approved" | "live" | "retired";
export type ConfigStatus = "draft" | "review" | "live" | "retired";
export type ContributionType = "skill" | "config_improvement" | "bug_report";
export type ContributionStatus = "pending" | "approved" | "rejected" | "live";
export type HealthStatus = "unknown" | "healthy" | "degraded" | "down";

export interface User {
  id: string;
  created_at: string;
  github_id?: number;
  display_name: string;
  avatar_url?: string;
  email?: string;
  tier: Tier;
  stripe_customer_id?: string;
  reputation_score: number;
  skills_contributed: number;
  marketplace_creator: boolean;
}

export interface PopInstance {
  id: string;
  created_at: string;
  user_id: string;
  fly_machine_id?: string;
  fly_volume_id?: string;
  status: InstanceStatus;
  last_active_at?: string;
  tier: Tier;
  model_provider: string;
  model_name: string;
  tone?: string;
  main_use?: string;
  response_length?: string;
  health_status?: HealthStatus;
}

export interface Channel {
  id: string;
  created_at: string;
  user_id: string;
  instance_id: string;
  type: ChannelType;
  status: ChannelStatus;
  external_id?: string;
  connected_at?: string;
  last_message_at?: string;
}

export interface Skill {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  slug: string;
  description: string;
  contributor_id?: string;
  skill_md: string;
  status: SkillStatus;
  invocation_count: number;
  is_default: boolean;
  version: number;
}

export interface Configuration {
  id: string;
  created_at: string;
  creator_id: string;
  name: string;
  slug: string;
  tagline: string;
  story: string;
  soul_md: string;
  agents_md: string;
  skill_slugs: string[];
  life_tags: string[];
  tone_tag?: string;
  is_free: boolean;
  price_cents?: number;
  status: ConfigStatus;
  install_count: number;
  active_installs: number;
}

export interface Contribution {
  id: string;
  created_at: string;
  contributor_id: string;
  instance_id: string;
  type: ContributionType;
  raw_description: string;
  proposed_name?: string;
  proposed_skill_md?: string;
  pop_reasoning?: string;
  status: ContributionStatus;
  skill_id?: string;
}

// Setup flow types
export type ToneOption = "direct" | "warm" | "playful" | "formal";
export type UseOption = "thinking" | "writing" | "planning" | "learning" | "work";
export type LengthOption = "short" | "balanced" | "detailed";

export interface SetupChoices {
  channel: ChannelType;
  tone: ToneOption;
  mainUse: UseOption;
  responseLength: LengthOption;
}
