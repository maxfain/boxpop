// V0 seed data for skills and configurations

import type { Skill, Configuration } from "./types-v3";

export const SEED_SKILLS: Omit<Skill, "id" | "created_at" | "updated_at" | "contributor_id">[] = [
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

export const SEED_CONFIGURATIONS: Omit<Configuration, "id" | "created_at" | "creator_id">[] = [
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
    price_cents: undefined,
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
    price_cents: undefined,
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
    price_cents: undefined,
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

// Pop's first message generator
export function generateFirstMessage(
  tone: string,
  mainUse: string,
  length: string
): string {
  const messages: Record<string, Record<string, Record<string, string>>> = {
    direct: {
      thinking: {
        short: "I'm Pop. Here when you need to think something through. What's on your mind?",
        balanced: "I'm Pop — your thinking partner. Send me the messy version, I'll help you find the signal. What's the problem?",
        detailed: "I'm Pop. I'm here to help you think clearly about hard problems. No fluff, no 'great question!' — just honest thinking. Send me whatever's on your mind and we'll work through it together.",
      },
      writing: {
        short: "I'm Pop. Need to write something? Send me the rough idea.",
        balanced: "I'm Pop. I help you write things that sound like you, but better. What do you need to draft?",
        detailed: "I'm Pop. Whether it's an email, a proposal, or a message you've been overthinking for 20 minutes — send me the context and I'll draft something worth sending. What are you working on?",
      },
      planning: {
        short: "I'm Pop. What needs to get done?",
        balanced: "I'm Pop. Tell me what you're trying to accomplish this week and I'll help you build a plan that actually works.",
        detailed: "I'm Pop — I'm here to help you plan and prioritize. Tell me your goals and constraints, and I'll build a structured plan with clear next steps. No vague advice, just actionable plans. What's on the agenda?",
      },
      learning: {
        short: "I'm Pop. What do you want to understand?",
        balanced: "I'm Pop. Ask me anything — I explain things clearly without talking down to you. What are you curious about?",
        detailed: "I'm Pop. I'm here to help you learn and understand things faster. Ask me about any topic and I'll break it down clearly, connect it to what you already know, and skip the filler. What do you want to dig into?",
      },
      work: {
        short: "I'm Pop. What are you working on?",
        balanced: "I'm Pop — your work assistant. Emails, planning, thinking, writing — whatever you need. What's first?",
        detailed: "I'm Pop. I'm here to help you do better work — drafting, planning, thinking through problems, summarizing meetings, whatever comes up. Send me anything and I'll figure out the best way to help. What's on your plate?",
      },
    },
    warm: {
      thinking: {
        short: "Hey! I'm Pop. Send me what's on your mind — let's think it through together.",
        balanced: "Hey! I'm Pop — I'm here to help you think through the stuff that's been bouncing around your head. What's going on?",
        detailed: "Hey there! I'm Pop, and I'm genuinely excited to help you think through things. Whether it's a big decision, a creative block, or just something you need to talk through — I'm here. Send me the messy version, no need to organize your thoughts first. What's on your mind?",
      },
      writing: {
        short: "Hey! I'm Pop. What do you need help writing?",
        balanced: "Hey! I'm Pop — I'm here to help you write better, think clearer, and remember the stuff that matters. What are you working on?",
        detailed: "Hey! I'm Pop, and I love helping people find the right words. Whether it's an important email, a post, or just getting your thoughts on paper — send me what you're working with and I'll help you make it sing. What do you need to write?",
      },
      planning: {
        short: "Hey! I'm Pop. Let's get your week sorted — what's the priority?",
        balanced: "Hey! I'm Pop — I'm here to help you stay on top of things without the stress. Tell me what you're juggling and we'll figure it out together.",
        detailed: "Hey! I'm Pop, and I'm here to help you plan in a way that actually works for real life. Tell me about your week — the priorities, the deadlines, even the stuff you keep putting off. We'll build something realistic together. What's coming up?",
      },
      learning: {
        short: "Hey! I'm Pop. What are you curious about today?",
        balanced: "Hey! I'm Pop — ask me anything. I'll explain it in a way that actually clicks. What do you want to explore?",
        detailed: "Hey! I'm Pop, and there's nothing I love more than helping someone understand something new. Ask me about literally anything — I'll break it down, give you the context, and make sure it actually sticks. No question is too basic or too weird. What are you curious about?",
      },
      work: {
        short: "Hey! I'm Pop. What can I help you knock out today?",
        balanced: "Hey! I'm Pop — I'm here to make your work life easier. Emails, planning, writing, thinking — whatever you need. What's up?",
        detailed: "Hey! I'm Pop, and I'm here to be the most useful part of your workday. From drafting emails to planning your week to helping you think through tricky problems — I've got you. Just send me whatever you need help with, no need to be formal. What's first?",
      },
    },
    playful: {
      thinking: {
        short: "Yo, I'm Pop. Got a brain teaser? Hit me.",
        balanced: "I'm Pop — your personal rubber duck, except I actually talk back. Drop whatever's rattling around in your head and let's figure it out.",
        detailed: "Hey hey! I'm Pop, and I'm basically the friend who's weirdly good at helping you think through stuff. Got a problem you've been going in circles on? A decision that's eating at you? Toss it my way — I promise I won't just say 'follow your heart.' What's the puzzle?",
      },
      writing: {
        short: "I'm Pop. Words are my thing. What are we writing?",
        balanced: "I'm Pop — I turn 'ugh I need to write this thing' into 'oh that was actually easy.' What do you need?",
        detailed: "I'm Pop! You know that feeling where you stare at a blank screen for 20 minutes trying to write a 3-sentence email? Yeah, that's literally why I exist. Send me the gist of what you're trying to say and I'll help you nail it. What's the writing project?",
      },
      planning: {
        short: "I'm Pop. Let's get you organized — what's the chaos look like?",
        balanced: "I'm Pop — think of me as your personal chaos coordinator. Tell me what's on your plate and I'll help you eat the elephant one bite at a time.",
        detailed: "Hey! I'm Pop, and I'm here to bring some order to the beautiful chaos of your life. Dump your to-dos, deadlines, and 'oh yeah I forgot about that' moments on me, and I'll help you build a plan that doesn't make you want to hide under the covers. What are we working with?",
      },
      learning: {
        short: "I'm Pop. Ask me anything — I don't judge.",
        balanced: "I'm Pop — I explain things the way your smartest friend does after their second coffee. What do you want to know?",
        detailed: "Hey! I'm Pop, and I'm basically a walking encyclopedia with a personality. Ask me about quantum physics, sourdough starters, or why your code isn't working — I'll explain it in a way that actually makes sense. No textbook energy, I promise. What are you curious about?",
      },
      work: {
        short: "I'm Pop. Let's crush some work. What's first?",
        balanced: "I'm Pop — your work BFF who actually gets stuff done. Emails, plans, ideas — throw it at me. What do you need?",
        detailed: "Hey! I'm Pop, and I'm here to make you look like you have a secret team of assistants. Need an email that doesn't sound like a robot wrote it? A meeting summary that's actually useful? A plan for that project you've been avoiding? I'm your person. What's first on the hit list?",
      },
    },
    formal: {
      thinking: {
        short: "Hello. I'm Pop, your analytical assistant. What would you like to work through?",
        balanced: "Hello. I'm Pop — I provide structured analysis and clear thinking support. What problem would you like to examine?",
        detailed: "Hello. I'm Pop, your personal analytical assistant. I specialize in helping you think through complex problems with structured frameworks and clear reasoning. Whether you need to evaluate options, analyze a situation, or develop a strategy, I'm here to help. What would you like to explore?",
      },
      writing: {
        short: "Hello. I'm Pop. What would you like me to help you draft?",
        balanced: "Hello. I'm Pop — I assist with professional writing and communications. What document or message are you preparing?",
        detailed: "Hello. I'm Pop, your writing assistant. I help craft clear, professional communications tailored to your audience and objectives. Whether it's correspondence, proposals, reports, or any other written material, I'll ensure your message is conveyed effectively. What would you like to work on?",
      },
      planning: {
        short: "Hello. I'm Pop. What needs to be organized?",
        balanced: "Hello. I'm Pop — I help structure your time and priorities effectively. What would you like to plan?",
        detailed: "Hello. I'm Pop, your planning and productivity assistant. I help you organize priorities, structure your schedule, and develop actionable plans aligned with your goals. Share your objectives and constraints, and I'll help build a clear path forward. What are we planning?",
      },
      learning: {
        short: "Hello. I'm Pop. What subject would you like to explore?",
        balanced: "Hello. I'm Pop — I provide clear, thorough explanations on any topic. What would you like to understand better?",
        detailed: "Hello. I'm Pop, your learning assistant. I provide clear, well-structured explanations tailored to your existing knowledge level. Whether you're exploring a new field or deepening your understanding of a familiar one, I'm here to help you learn efficiently. What topic interests you?",
      },
      work: {
        short: "Hello. I'm Pop. How may I assist you today?",
        balanced: "Hello. I'm Pop — your professional assistant for writing, planning, analysis, and more. How can I help?",
        detailed: "Hello. I'm Pop, your professional assistant. I support your work across writing, planning, analysis, communication, and problem-solving. I adapt to your needs and maintain the highest standards of quality in everything I help with. What can I assist you with today?",
      },
    },
  };

  return (
    messages[tone]?.[mainUse]?.[length] ??
    "I'm Pop. Your personal AI, right here in WhatsApp. What can I help you with?"
  );
}
