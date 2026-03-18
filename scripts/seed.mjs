// Seed skills and configurations tables with v0 data
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const SEED_SKILLS = [
  {
    name: "Meeting Summarizer",
    slug: "meeting-summarizer",
    description: "Paste your meeting notes and get a clean summary with action items, decisions, and follow-ups.",
    skill_md: "# Meeting Summarizer\nExtract action items, decisions, and follow-ups from raw meeting notes.",
    status: "live",
    invocation_count: 1842,
    is_default: true,
    version: 3,
  },
  {
    name: "Weekly Planner",
    slug: "weekly-planner",
    description: "Tell Pop your priorities and it builds a realistic weekly plan, blocking time and flagging conflicts.",
    skill_md: "# Weekly Planner\nBuild structured weekly plans from priorities and constraints.",
    status: "live",
    invocation_count: 956,
    is_default: true,
    version: 2,
  },
  {
    name: "Email Drafter",
    slug: "email-drafter",
    description: "Describe what you need to say. Pop writes the email in your tone — no fluff, no corporate speak.",
    skill_md: "# Email Drafter\nDraft emails matching the user's communication style.",
    status: "live",
    invocation_count: 2431,
    is_default: true,
    version: 4,
  },
  {
    name: "Decision Helper",
    slug: "decision-helper",
    description: "Stuck between options? Pop walks you through a structured framework to actually decide.",
    skill_md: "# Decision Helper\nStructured decision-making using weighted criteria analysis.",
    status: "live",
    invocation_count: 723,
    is_default: false,
    version: 1,
  },
  {
    name: "Grocery Optimizer",
    slug: "grocery-optimizer",
    description: "Send your meal plan for the week. Pop returns a grouped grocery list organized by store section.",
    skill_md: "# Grocery Optimizer\nGenerate organized grocery lists from meal plans.",
    status: "live",
    invocation_count: 412,
    is_default: false,
    version: 1,
  },
  {
    name: "Explain Like I'm 5",
    slug: "eli5",
    description: "Send any complex topic. Pop breaks it down so simply your kid could understand it.",
    skill_md: "# ELI5\nSimplify complex topics into plain, accessible language.",
    status: "pending",
    invocation_count: 0,
    is_default: false,
    version: 1,
  },
];

const SEED_CONFIGURATIONS = [
  {
    name: "Startup Founder",
    slug: "startup-founder",
    tagline: "Your co-founder who never sleeps",
    story: "Built by a 3x founder who needed an AI that understood the chaos of early-stage startups. Pop configured as Startup Founder knows about runway, hiring, pivots, and the emotional rollercoaster.",
    soul_md: "You are a seasoned startup advisor. Direct, no-BS, focused on execution.",
    agents_md: "Prioritize actionable advice over theory.",
    skill_slugs: ["meeting-summarizer", "weekly-planner", "email-drafter", "decision-helper"],
    life_tags: ["work", "startup", "productivity"],
    tone_tag: "direct",
    is_free: true,
    status: "live",
    install_count: 347,
    active_installs: 189,
  },
  {
    name: "Health Coach",
    slug: "health-coach",
    tagline: "Accountability that actually works",
    story: "Created by a certified nutritionist who wanted clients to have 24/7 support between sessions. Pop tracks meals, suggests alternatives, and keeps you honest without being preachy.",
    soul_md: "You are a supportive but honest health coach. Evidence-based, never judgmental.",
    agents_md: "Focus on sustainable habits over quick fixes.",
    skill_slugs: ["grocery-optimizer", "weekly-planner"],
    life_tags: ["health", "fitness", "nutrition"],
    tone_tag: "warm",
    is_free: true,
    status: "live",
    install_count: 523,
    active_installs: 312,
  },
  {
    name: "Parent's Sidekick",
    slug: "parents-sidekick",
    tagline: "Because parenting doesn't come with a manual",
    story: "A pediatric psychologist and parent of three built this for the moments when you're Googling at 2am. Age-appropriate advice, schedule management, and someone to talk through the hard stuff.",
    soul_md: "You are a calm, experienced parenting advisor. Warm but practical.",
    agents_md: "Always consider child's age and developmental stage.",
    skill_slugs: ["weekly-planner", "decision-helper", "eli5"],
    life_tags: ["parenting", "family", "health"],
    tone_tag: "warm",
    is_free: true,
    status: "live",
    install_count: 891,
    active_installs: 567,
  },
  {
    name: "Freelancer Pro",
    slug: "freelancer-pro",
    tagline: "Run your business like you have a team",
    story: "Built by a freelance designer making $200k/year solo. Pop handles client communication, project scoping, invoice reminders, and the business side so you can focus on the work.",
    soul_md: "You are a business-savvy assistant for independent professionals.",
    agents_md: "Help with scoping, pricing, and client management.",
    skill_slugs: ["email-drafter", "meeting-summarizer", "weekly-planner", "decision-helper"],
    life_tags: ["freelancer", "work", "productivity"],
    tone_tag: "direct",
    is_free: false,
    price_cents: 499,
    status: "live",
    install_count: 234,
    active_installs: 156,
  },
];

// We need a creator_id for configurations. Use a system user UUID.
const SYSTEM_USER_ID = "00000000-0000-0000-0000-000000000001";

async function seed() {
  console.log("Seeding skills...");
  const { data: skillData, error: skillError } = await supabase
    .from("skills")
    .upsert(SEED_SKILLS, { onConflict: "slug" })
    .select();

  if (skillError) {
    console.error("Skills seed error:", skillError.message);
  } else {
    console.log(`  Upserted ${skillData.length} skills`);
  }

  console.log("Seeding configurations...");
  const configsWithCreator = SEED_CONFIGURATIONS.map((c) => ({
    ...c,
    creator_id: SYSTEM_USER_ID,
  }));

  const { data: configData, error: configError } = await supabase
    .from("configurations")
    .upsert(configsWithCreator, { onConflict: "slug" })
    .select();

  if (configError) {
    console.error("Configurations seed error:", configError.message);
  } else {
    console.log(`  Upserted ${configData.length} configurations`);
  }

  console.log("\nDone!");
}

seed();
