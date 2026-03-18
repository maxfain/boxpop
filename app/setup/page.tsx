"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import WhatsAppPreview from "@/components/WhatsAppPreview";
import { generateFirstMessage } from "@/lib/seed-data";
import type { ToneOption, UseOption, LengthOption } from "@/lib/types-v3";

const STEPS = 5;

// Step 1: Meet Pop
function StepMeetPop({ onNext }: { onNext: () => void }) {
  const messages = [
    { from: "user" as const, text: "What should I cook for dinner? I have chicken, rice, and some vegetables.", delay: 500 },
    { from: "pop" as const, text: "Skip the stir fry — everyone defaults to that. Do a one-pan: season the chicken with whatever spice you have that isn't paprika, roast it at 425 with the veg on the same sheet. Rice in the cooker. 25 minutes, one pan to wash.", delay: 1400 },
    { from: "user" as const, text: "Haha I was definitely about to make stir fry", delay: 800 },
    { from: "pop" as const, text: "I know. Everyone does. You're welcome.", delay: 1000 },
  ];

  return (
    <div className="animate-fade-in flex flex-col items-center text-center">
      <h2 className="text-3xl font-bold mb-2">Meet Pop</h2>
      <p className="text-white/50 mb-8 max-w-md">
        Your personal AI that lives in WhatsApp. Direct, opinionated, and
        actually useful.
      </p>
      <WhatsAppPreview messages={messages} className="mb-10" />
      <button
        onClick={onNext}
        className="bg-[#3b82f6] text-white font-medium py-3 px-10 rounded-lg text-sm hover:bg-[#3b82f6]/90 transition-colors"
      >
        Get started
      </button>
    </div>
  );
}

// Step 2: Channel selection
function StepChannel({ onNext }: { onNext: () => void }) {
  return (
    <div className="animate-fade-in flex flex-col items-center text-center">
      <h2 className="text-3xl font-bold mb-2">Where should Pop live?</h2>
      <p className="text-white/50 mb-10 max-w-md">
        Choose the messaging platform Pop will use to chat with you.
      </p>

      <div className="grid gap-4 w-full max-w-sm">
        <button
          onClick={onNext}
          className="relative bg-white/5 border-2 border-[#3b82f6] rounded-xl p-5 text-left hover:bg-white/10 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-white mb-1">WhatsApp</div>
              <div className="text-sm text-white/50">
                The full Pop experience
              </div>
            </div>
            <span className="text-xs bg-[#3b82f6]/20 text-[#3b82f6] px-2 py-0.5 rounded-full font-medium">
              Recommended
            </span>
          </div>
        </button>

        <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-left opacity-50 cursor-not-allowed">
          <div className="font-semibold text-white mb-1">Telegram</div>
          <div className="text-sm text-white/40">Coming soon</div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-left opacity-50 cursor-not-allowed">
          <div className="font-semibold text-white mb-1">Discord</div>
          <div className="text-sm text-white/40">Coming soon</div>
        </div>
      </div>
    </div>
  );
}

// Step 3: Shape your Pop
function StepPersonality({
  tone,
  setTone,
  mainUse,
  setMainUse,
  responseLength,
  setResponseLength,
  onNext,
}: {
  tone: ToneOption;
  setTone: (t: ToneOption) => void;
  mainUse: UseOption;
  setMainUse: (u: UseOption) => void;
  responseLength: LengthOption;
  setResponseLength: (l: LengthOption) => void;
  onNext: () => void;
}) {
  const tones: ToneOption[] = ["direct", "warm", "playful", "formal"];
  const uses: UseOption[] = ["thinking", "writing", "planning", "learning", "work"];
  const lengths: LengthOption[] = ["short", "balanced", "detailed"];

  return (
    <div className="animate-fade-in flex flex-col items-center text-center">
      <h2 className="text-3xl font-bold mb-2">Shape your Pop</h2>
      <p className="text-white/50 mb-10 max-w-md">
        Customize how Pop communicates. You can change this later.
      </p>

      <div className="w-full max-w-md space-y-8 text-left">
        <div>
          <label className="text-sm text-white/60 font-medium mb-3 block">
            Tone
          </label>
          <div className="flex flex-wrap gap-2">
            {tones.map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  tone === t
                    ? "bg-[#3b82f6] text-white"
                    : "bg-white/5 text-white/60 hover:bg-white/10"
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm text-white/60 font-medium mb-3 block">
            Main use
          </label>
          <div className="flex flex-wrap gap-2">
            {uses.map((u) => (
              <button
                key={u}
                onClick={() => setMainUse(u)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  mainUse === u
                    ? "bg-[#3b82f6] text-white"
                    : "bg-white/5 text-white/60 hover:bg-white/10"
                }`}
              >
                {u.charAt(0).toUpperCase() + u.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm text-white/60 font-medium mb-3 block">
            Response length
          </label>
          <div className="flex flex-wrap gap-2">
            {lengths.map((l) => (
              <button
                key={l}
                onClick={() => setResponseLength(l)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  responseLength === l
                    ? "bg-[#3b82f6] text-white"
                    : "bg-white/5 text-white/60 hover:bg-white/10"
                }`}
              >
                {l.charAt(0).toUpperCase() + l.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="mt-10 bg-[#3b82f6] text-white font-medium py-3 px-10 rounded-lg text-sm hover:bg-[#3b82f6]/90 transition-colors"
      >
        Continue
      </button>
    </div>
  );
}

// Step 4: WhatsApp pairing (mocked)
function StepPairing({ onNext }: { onNext: () => void }) {
  const [phase, setPhase] = useState<"scan" | "connecting" | "done">("scan");
  const [countdown, setCountdown] = useState(120);

  useEffect(() => {
    // Auto-advance after 3 seconds
    const timer = setTimeout(() => setPhase("connecting"), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase === "connecting") {
      const timer = setTimeout(() => {
        setPhase("done");
        // Auto-advance to next step after brief success display
        setTimeout(onNext, 1200);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [phase, onNext]);

  useEffect(() => {
    if (phase !== "scan") return;
    const interval = setInterval(() => {
      setCountdown((c) => (c > 0 ? c - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [phase]);

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  return (
    <div className="animate-fade-in flex flex-col items-center text-center">
      <h2 className="text-3xl font-bold mb-2">Connect WhatsApp</h2>
      <p className="text-white/50 mb-8 max-w-md">
        Scan this QR code with WhatsApp to connect Pop.
      </p>

      {phase === "scan" && (
        <>
          {/* Fake QR code */}
          <div className="w-48 h-48 bg-white rounded-xl p-3 mb-6">
            <div className="w-full h-full bg-[#0a0a0a] rounded-lg grid grid-cols-8 grid-rows-8 gap-0.5 p-2">
              {Array.from({ length: 64 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-sm ${
                    Math.random() > 0.4 ? "bg-white" : "bg-transparent"
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="text-sm text-white/40 mb-2">
            Open WhatsApp → Settings → Linked Devices → Link a Device
          </p>

          <div className="flex items-center gap-2 text-sm text-white/40 mb-4">
            <span>
              Code expires in {minutes}:{seconds.toString().padStart(2, "0")}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-[#3b82f6] transition-all duration-1000 ease-linear"
              style={{ width: `${((120 - countdown) / 120) * 100}%` }}
            />
          </div>

          <button
            onClick={() => setCountdown(120)}
            className="text-sm text-[#3b82f6] hover:text-[#3b82f6]/80 transition-colors"
          >
            Refresh code
          </button>
        </>
      )}

      {phase === "connecting" && (
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-2 border-[#3b82f6] border-t-transparent rounded-full animate-spin" />
          <p className="text-white/60">Connecting to WhatsApp...</p>
        </div>
      )}

      {phase === "done" && (
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-[#3b82f6] flex items-center justify-center">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-white font-medium">Connected</p>
        </div>
      )}
    </div>
  );
}

// Step 5: Success
function StepSuccess({
  tone,
  mainUse,
  responseLength,
}: {
  tone: ToneOption;
  mainUse: UseOption;
  responseLength: LengthOption;
}) {
  const router = useRouter();
  const firstMessage = generateFirstMessage(tone, mainUse, responseLength);

  const tryPrompts = [
    "What should I focus on this week?",
    "Help me write a reply to this email",
    "I need to make a decision about...",
  ];

  return (
    <div className="animate-fade-in flex flex-col items-center text-center">
      <div className="h-16 w-16 rounded-full bg-[#3b82f6] flex items-center justify-center mb-6">
        <span className="text-2xl font-bold text-white">P</span>
      </div>

      <h2 className="text-3xl font-bold mb-2">Pop is live</h2>
      <p className="text-white/50 mb-8">
        Your AI is ready in WhatsApp. Here&apos;s how Pop will greet you:
      </p>

      {/* Personality badge */}
      <div className="flex gap-2 mb-6">
        <span className="text-xs bg-white/10 text-white/60 px-3 py-1 rounded-full">
          {tone}
        </span>
        <span className="text-xs bg-white/10 text-white/60 px-3 py-1 rounded-full">
          {mainUse}
        </span>
        <span className="text-xs bg-white/10 text-white/60 px-3 py-1 rounded-full">
          {responseLength}
        </span>
      </div>

      {/* Pop's first message preview */}
      <div className="w-full max-w-sm bg-[#111b21] rounded-2xl overflow-hidden mb-8">
        <div className="flex items-center gap-3 px-4 py-3 bg-[#1f2c34]">
          <div className="h-8 w-8 rounded-full bg-[#3b82f6] flex items-center justify-center text-white text-sm font-bold">
            P
          </div>
          <div className="text-sm font-medium text-white">Pop</div>
        </div>
        <div className="p-3">
          <div className="self-start bg-[#1f2c34] rounded-lg px-3 py-2 text-sm text-white/90">
            {firstMessage}
          </div>
        </div>
      </div>

      {/* Try these */}
      <div className="w-full max-w-sm mb-10">
        <p className="text-xs text-white/40 uppercase tracking-wider mb-3">
          Try sending Pop one of these
        </p>
        <div className="space-y-2">
          {tryPrompts.map((prompt, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white/60 text-left"
            >
              &ldquo;{prompt}&rdquo;
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => router.push("/dashboard")}
        className="bg-[#3b82f6] text-white font-medium py-3 px-10 rounded-lg text-sm hover:bg-[#3b82f6]/90 transition-colors"
      >
        Go to Dashboard
      </button>
    </div>
  );
}

// Main setup page
export default function SetupPage() {
  const [step, setStep] = useState(1);
  const [tone, setTone] = useState<ToneOption>("direct");
  const [mainUse, setMainUse] = useState<UseOption>("thinking");
  const [responseLength, setResponseLength] = useState<LengthOption>("balanced");
  const [saving, setSaving] = useState(false);

  const next = useCallback(() => setStep((s) => Math.min(s + 1, STEPS)), []);
  const back = () => setStep((s) => Math.max(s - 1, 1));

  // Save to Supabase when reaching success step
  useEffect(() => {
    if (step !== 5 || saving) return;
    setSaving(true);

    async function save() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      // Create pop instance
      const { data: instance } = await supabase
        .from("pop_instances")
        .upsert(
          {
            user_id: user.id,
            status: "active",
            fly_machine_id: `mock-${crypto.randomUUID().slice(0, 8)}`,
            fly_volume_id: `vol-${crypto.randomUUID().slice(0, 8)}`,
            tone,
            main_use: mainUse,
            response_length: responseLength,
          },
          { onConflict: "user_id" }
        )
        .select()
        .single();

      if (instance) {
        // Create WhatsApp channel
        await supabase.from("channels").upsert(
          {
            user_id: user.id,
            instance_id: instance.id,
            type: "whatsapp",
            status: "active",
            connected_at: new Date().toISOString(),
          },
          { onConflict: "user_id,type" }
        );
      }
    }

    save();
  }, [step, saving, tone, mainUse, responseLength]);

  return (
    <main className="min-h-screen flex flex-col">
      {/* Progress pill */}
      <div className="flex items-center justify-between px-6 py-4">
        {step > 1 ? (
          <button
            onClick={back}
            className="text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            Back
          </button>
        ) : (
          <div />
        )}

        <div className="flex gap-1.5">
          {Array.from({ length: STEPS }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i < step
                  ? "w-8 bg-[#3b82f6]"
                  : "w-4 bg-white/10"
              }`}
            />
          ))}
        </div>

        <div className="text-sm text-white/30">
          {step}/{STEPS}
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        {step === 1 && <StepMeetPop onNext={next} />}
        {step === 2 && <StepChannel onNext={next} />}
        {step === 3 && (
          <StepPersonality
            tone={tone}
            setTone={setTone}
            mainUse={mainUse}
            setMainUse={setMainUse}
            responseLength={responseLength}
            setResponseLength={setResponseLength}
            onNext={next}
          />
        )}
        {step === 4 && <StepPairing onNext={next} />}
        {step === 5 && (
          <StepSuccess
            tone={tone}
            mainUse={mainUse}
            responseLength={responseLength}
          />
        )}
      </div>
    </main>
  );
}
