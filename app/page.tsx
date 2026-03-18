import Link from "next/link";
import WhatsAppPreview from "@/components/WhatsAppPreview";

const heroMessages = [
  { from: "user" as const, text: "I need to tell my landlord the rent increase isn't legal in my state. Help me draft something firm but not aggressive.", delay: 600 },
  { from: "pop" as const, text: "On it. What state are you in and what's the increase percentage? I'll check the cap and draft the letter.", delay: 1200 },
  { from: "user" as const, text: "California, they want 12%", delay: 800 },
  { from: "pop" as const, text: "California caps at 10% (5% + CPI). Your landlord is over the limit. Here's a draft that cites the statute directly — professional, no threats, just facts.", delay: 1800 },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-1.5 text-lg font-bold">
          <span className="text-[#3b82f6]">P</span>
          <span className="text-white/90">Pop</span>
        </div>
        <Link
          href="/auth/login"
          className="text-sm text-white/50 hover:text-white transition-colors"
        >
          Sign in
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1]">
              The AI that texts
              <br />
              <span className="text-[#3b82f6]">you back.</span>
            </h1>
            <p className="mt-6 text-lg text-white/60 max-w-lg leading-relaxed">
              Your own personal AI in WhatsApp. Remembers everything. Gets
              smarter every week from a community who cares.
            </p>
            <Link
              href="/setup"
              className="mt-8 inline-block bg-[#3b82f6] text-white font-medium py-3 px-8 rounded-lg text-sm hover:bg-[#3b82f6]/90 transition-colors"
            >
              Get started free
            </Link>
          </div>

          <div className="flex justify-center lg:justify-end">
            <WhatsAppPreview messages={heroMessages} />
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-3 gap-12">
          <div>
            <div className="text-2xl mb-3 font-semibold">Lives where you already are</div>
            <p className="text-white/50 leading-relaxed">
              In WhatsApp, not an app you have to open and remember. Pop is
              always one text away — right next to your real conversations.
            </p>
          </div>
          <div>
            <div className="text-2xl mb-3 font-semibold">Remembers your context</div>
            <p className="text-white/50 leading-relaxed">
              Tell Pop once. It never asks again. Your preferences, your
              projects, your people — Pop builds a picture over time.
            </p>
          </div>
          <div>
            <div className="text-2xl mb-3 font-semibold">Gets smarter every week</div>
            <p className="text-white/50 leading-relaxed">
              A community shapes new skills and configurations. You get the
              benefit without lifting a finger.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-sm text-white/30">
          <div className="flex items-center gap-1.5">
            <span className="text-[#3b82f6] font-bold">P</span> BoxPop
          </div>
          <div>Powered by OpenClaw</div>
        </div>
      </footer>
    </main>
  );
}
