"use client";

import { useParams, useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import { SEED_CONFIGURATIONS } from "@/lib/seed-data";

export default function ConfigDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const config = SEED_CONFIGURATIONS.find((c) => c.slug === slug);

  if (!config) {
    return (
      <>
        <Nav />
        <main className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-2">Not found</h1>
          <p className="text-white/50 mb-6">
            This configuration doesn&apos;t exist.
          </p>
          <button
            onClick={() => router.push("/marketplace")}
            className="text-sm text-[#3b82f6] hover:text-[#3b82f6]/80 transition-colors"
          >
            Back to marketplace
          </button>
        </main>
      </>
    );
  }

  return (
    <>
      <Nav />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <button
          onClick={() => router.push("/marketplace")}
          className="text-sm text-white/40 hover:text-white/70 transition-colors mb-8 block"
        >
          &larr; Back to marketplace
        </button>

        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">{config.name}</h1>
            <p className="text-lg text-white/50 mt-1">{config.tagline}</p>
          </div>
          <div className="flex items-center gap-3">
            {config.is_free ? (
              <span className="text-sm font-medium text-[#3b82f6]">Free</span>
            ) : (
              <span className="text-sm font-medium text-white/60">
                ${((config.price_cents ?? 0) / 100).toFixed(2)}/mo
              </span>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {config.life_tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-white/10 text-white/50 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
          {config.tone_tag && (
            <span className="text-xs bg-[#3b82f6]/20 text-[#3b82f6] px-3 py-1 rounded-full">
              {config.tone_tag} tone
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-xl font-bold">
              {config.install_count.toLocaleString()}
            </div>
            <div className="text-xs text-white/40 mt-1">Total installs</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-xl font-bold">
              {config.active_installs.toLocaleString()}
            </div>
            <div className="text-xs text-white/40 mt-1">Active</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-xl font-bold">
              {config.skill_slugs.length}
            </div>
            <div className="text-xs text-white/40 mt-1">Skills included</div>
          </div>
        </div>

        {/* Story */}
        <div className="mb-10">
          <h2 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-3">
            The story
          </h2>
          <p className="text-white/70 leading-relaxed">{config.story}</p>
        </div>

        {/* Personality preview */}
        <div className="mb-10">
          <h2 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-3">
            Personality preview
          </h2>
          <div className="bg-[#111b21] rounded-2xl p-4">
            <div className="bg-[#1f2c34] rounded-lg px-3 py-2 text-sm text-white/90 max-w-[85%]">
              {config.tone_tag === "direct"
                ? `I'm Pop, configured as your ${config.name.toLowerCase()}. No fluff — let's get to work. What's the situation?`
                : `Hey! I'm Pop, set up as your ${config.name.toLowerCase()}. I'm here to help — what's going on?`}
            </div>
          </div>
        </div>

        {/* Skills included */}
        <div className="mb-10">
          <h2 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-3">
            Skills included
          </h2>
          <div className="flex flex-wrap gap-2">
            {config.skill_slugs.map((slug) => (
              <span
                key={slug}
                className="text-sm bg-white/5 border border-white/10 text-white/60 px-3 py-1.5 rounded-lg"
              >
                {slug.replace(/-/g, " ")}
              </span>
            ))}
          </div>
        </div>

        {/* Install CTA */}
        <button className="w-full bg-[#3b82f6] text-white font-medium py-3 rounded-lg text-sm hover:bg-[#3b82f6]/90 transition-colors">
          Install for Pop
        </button>
      </main>
    </>
  );
}
