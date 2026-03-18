import { createClient } from "@/lib/supabase/server";
import Nav from "@/components/Nav";
import { SEED_SKILLS } from "@/lib/seed-data";

export default async function SkillsPage() {
  const supabase = await createClient();
  const { data: dbSkills } = await supabase
    .from("skills")
    .select("*")
    .order("invocation_count", { ascending: false });

  // Use DB skills if available, otherwise fall back to seed data
  const skills = dbSkills && dbSkills.length > 0 ? dbSkills : SEED_SKILLS;

  return (
    <>
      <Nav />
      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Skills</h1>
            <p className="text-sm text-white/50 mt-1">
              Capabilities that make Pop smarter. Built by the community.
            </p>
          </div>
          <span className="text-sm text-white/30">{skills.length} skills</span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill, i) => (
            <div
              key={skill.slug ?? i}
              className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-white/20 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-white">{skill.name}</h3>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    skill.status === "live"
                      ? "bg-[#3b82f6]/20 text-[#3b82f6]"
                      : "bg-white/10 text-white/40"
                  }`}
                >
                  {skill.status}
                </span>
              </div>

              <p className="text-sm text-white/50 leading-relaxed mb-4">
                {skill.description}
              </p>

              <div className="flex items-center justify-between text-xs text-white/30">
                <span>
                  {skill.invocation_count.toLocaleString()} uses
                </span>
                <span>v{skill.version}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
