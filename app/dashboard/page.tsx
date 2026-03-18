import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Nav from "@/components/Nav";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: instance } = await supabase
    .from("pop_instances")
    .select("*")
    .eq("user_id", user.id)
    .single();

  const { data: channel } = await supabase
    .from("channels")
    .select("*")
    .eq("user_id", user.id)
    .eq("type", "whatsapp")
    .single();

  const { count: skillCount } = await supabase
    .from("skills")
    .select("*", { count: "exact", head: true })
    .eq("status", "live");

  const status = instance?.status ?? "inactive";
  const isActive = status === "active";
  const channelConnected = channel?.status === "active";

  return (
    <>
      <Nav />
      <main className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Instance status */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-white/50">Pop Status</span>
              <div className="flex items-center gap-2">
                <div
                  className={`h-2.5 w-2.5 rounded-full ${
                    isActive
                      ? "bg-[#3b82f6] animate-pulse-dot"
                      : status === "error"
                      ? "bg-red-500"
                      : "bg-white/30"
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    isActive
                      ? "text-[#3b82f6]"
                      : status === "error"
                      ? "text-red-400"
                      : "text-white/50"
                  }`}
                >
                  {isActive ? "Active" : status === "error" ? "Error" : "Sleeping"}
                </span>
              </div>
            </div>

            {instance ? (
              <div className="space-y-2 text-sm text-white/40">
                <div className="flex justify-between">
                  <span>Model</span>
                  <span className="text-white/60">{instance.model_name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tone</span>
                  <span className="text-white/60 capitalize">{instance.tone ?? "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Main use</span>
                  <span className="text-white/60 capitalize">{instance.main_use ?? "—"}</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-white/40 mb-3">No Pop instance yet</p>
                <Link
                  href="/setup"
                  className="text-sm text-[#3b82f6] hover:text-[#3b82f6]/80 transition-colors"
                >
                  Set up Pop
                </Link>
              </div>
            )}
          </div>

          {/* WhatsApp status */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-white/50">WhatsApp</span>
              <span
                className={`text-sm font-medium ${
                  channelConnected ? "text-[#3b82f6]" : "text-white/40"
                }`}
              >
                {channelConnected ? "Connected" : "Disconnected"}
              </span>
            </div>

            {channelConnected ? (
              <div className="text-sm text-white/40">
                <div className="flex justify-between">
                  <span>Connected since</span>
                  <span className="text-white/60">
                    {channel?.connected_at
                      ? new Date(channel.connected_at).toLocaleDateString()
                      : "—"}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-white/40 mb-3">
                  WhatsApp is not connected
                </p>
                <Link
                  href="/setup"
                  className="text-sm text-[#3b82f6] hover:text-[#3b82f6]/80 transition-colors"
                >
                  Reconnect
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
            <div className="text-2xl font-bold">12</div>
            <div className="text-xs text-white/40 mt-1">Conversations this week</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
            <div className="text-2xl font-bold">{skillCount ?? 0}</div>
            <div className="text-xs text-white/40 mt-1">Skills available</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
            <div className="text-2xl font-bold">0</div>
            <div className="text-xs text-white/40 mt-1">Contributions</div>
          </div>
        </div>

        {/* What's new */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
          <h2 className="text-sm font-medium text-white/50 mb-3">
            What&apos;s new this week
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-[#3b82f6] mt-1.5 shrink-0" />
              <p className="text-sm text-white/70">
                3 new skills added by the community — including Meeting
                Summarizer v3 and Grocery Optimizer
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-[#3b82f6] mt-1.5 shrink-0" />
              <p className="text-sm text-white/70">
                Pop now remembers context across conversations more reliably
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-[#3b82f6] mt-1.5 shrink-0" />
              <p className="text-sm text-white/70">
                New &ldquo;Health Coach&rdquo; configuration available in the marketplace
              </p>
            </div>
          </div>
        </div>

        {/* Quick link */}
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-2 text-sm text-[#3b82f6] hover:text-[#3b82f6]/80 transition-colors"
        >
          Browse the marketplace
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </main>
    </>
  );
}
