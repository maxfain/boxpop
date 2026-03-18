"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AccountActions() {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-white/70">Sign out</div>
          <div className="text-xs text-white/40">
            Sign out of your account on this device.
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="text-sm text-white/50 border border-white/10 px-4 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
        >
          Sign out
        </button>
      </div>

      <div className="border-t border-white/10 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-red-400/70">
              Delete account
            </div>
            <div className="text-xs text-white/40">
              Permanently delete your account and Pop instance. This cannot be
              undone.
            </div>
          </div>
          {!confirming ? (
            <button
              onClick={() => setConfirming(true)}
              className="text-sm text-red-400/70 border border-red-500/20 px-4 py-1.5 rounded-lg hover:bg-red-500/10 transition-colors"
            >
              Delete
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setConfirming(false)}
                className="text-sm text-white/50 border border-white/10 px-4 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // In V0, just sign out
                  handleSignOut();
                }}
                className="text-sm text-red-400 bg-red-500/20 border border-red-500/30 px-4 py-1.5 rounded-lg hover:bg-red-500/30 transition-colors"
              >
                Confirm delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
