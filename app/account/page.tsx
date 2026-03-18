import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Nav from "@/components/Nav";
import AccountActions from "./account-actions";

export default async function AccountPage() {
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

  const tier = instance?.tier ?? "free";

  return (
    <>
      <Nav />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-8">Account</h1>

        {/* Profile */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
          <h2 className="text-sm font-medium text-white/50 mb-4">Profile</h2>
          <div className="flex items-center gap-4">
            {user.user_metadata?.avatar_url && (
              <img
                src={user.user_metadata.avatar_url}
                alt=""
                className="h-12 w-12 rounded-full"
              />
            )}
            <div>
              <div className="font-medium">
                {user.user_metadata?.full_name ?? user.email}
              </div>
              <div className="text-sm text-white/40">{user.email}</div>
            </div>
          </div>
        </div>

        {/* Tier */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-white/50">Plan</h2>
            <span className="text-xs bg-[#3b82f6]/20 text-[#3b82f6] px-3 py-1 rounded-full font-medium uppercase">
              {tier}
            </span>
          </div>

          {tier === "free" && (
            <div>
              <p className="text-sm text-white/50 mb-4">
                You&apos;re on the free tier. Upgrade for faster models, longer
                memory, and priority support.
              </p>
              <button className="bg-[#3b82f6] text-white font-medium py-2 px-6 rounded-lg text-sm hover:bg-[#3b82f6]/90 transition-colors">
                Upgrade
              </button>
            </div>
          )}
        </div>

        {/* Channel management */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
          <h2 className="text-sm font-medium text-white/50 mb-4">Channels</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-sm font-medium">WhatsApp</div>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  channel?.status === "active"
                    ? "bg-[#3b82f6]/20 text-[#3b82f6]"
                    : "bg-white/10 text-white/40"
                }`}
              >
                {channel?.status ?? "not connected"}
              </span>
            </div>
            {channel?.status !== "active" && (
              <a
                href="/setup"
                className="text-sm text-[#3b82f6] hover:text-[#3b82f6]/80 transition-colors"
              >
                Connect
              </a>
            )}
          </div>
        </div>

        {/* Danger zone */}
        <div className="border border-red-500/20 rounded-xl p-6">
          <h2 className="text-sm font-medium text-red-400/70 mb-4">
            Danger zone
          </h2>
          <AccountActions />
        </div>
      </main>
    </>
  );
}
