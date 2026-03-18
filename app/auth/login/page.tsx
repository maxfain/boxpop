"use client";

import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  async function signInWithGitHub() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-sm">
        <div className="text-3xl font-bold mb-1">
          <span className="text-[#3b82f6]">P</span>op
        </div>
        <p className="text-sm text-white/40 mb-10">The AI that texts you back</p>

        <h1 className="text-xl font-semibold tracking-tight mb-2">Sign in</h1>
        <p className="text-sm text-white/50 mb-8">
          Connect your GitHub account to get started with Pop.
        </p>

        <button
          onClick={signInWithGitHub}
          className="w-full bg-white text-black font-medium py-2.5 px-6 rounded-lg text-sm hover:bg-white/90 transition-colors"
        >
          Continue with GitHub
        </button>

        <p className="mt-6 text-xs text-white/30">
          By signing in you agree to our terms of service.
        </p>
      </div>
    </main>
  );
}
