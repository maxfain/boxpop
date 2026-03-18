"use client";

import { useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import { SEED_CONFIGURATIONS } from "@/lib/seed-data";

const FILTER_TAGS = [
  "All",
  "Work",
  "Health",
  "Parenting",
  "Freelancer",
  "Learning",
];

export default function MarketplacePage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const configs = SEED_CONFIGURATIONS;

  const filtered =
    activeFilter === "All"
      ? configs
      : configs.filter((c) =>
          c.life_tags.some(
            (t) => t.toLowerCase() === activeFilter.toLowerCase()
          )
        );

  return (
    <>
      <Nav />
      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Marketplace</h1>
          <p className="text-sm text-white/50 mt-1">
            Pre-built configurations that transform Pop for your life.
          </p>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {FILTER_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeFilter === tag
                  ? "bg-[#3b82f6] text-white"
                  : "bg-white/5 text-white/50 hover:bg-white/10"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((config) => (
            <Link
              key={config.slug}
              href={`/marketplace/${config.slug}`}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors block"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-white text-lg">
                    {config.name}
                  </h3>
                  <p className="text-sm text-white/50 mt-1">
                    {config.tagline}
                  </p>
                </div>
                {!config.is_free && config.price_cents && (
                  <span className="text-sm font-medium text-white/60">
                    ${(config.price_cents / 100).toFixed(2)}/mo
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {config.life_tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-white/10 text-white/50 px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 text-xs text-white/30">
                <span>{config.install_count.toLocaleString()} installs</span>
                <span>{config.active_installs.toLocaleString()} active</span>
                {config.is_free && (
                  <span className="text-[#3b82f6]">Free</span>
                )}
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-white/40">
            No configurations found for &ldquo;{activeFilter}&rdquo;
          </div>
        )}
      </main>
    </>
  );
}
