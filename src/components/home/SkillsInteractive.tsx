import React from "react";
import { motion } from "framer-motion";
import { Code2, Sparkles } from "lucide-react";
import { TechLabel } from "@/components/ui/TechLabel";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getTechIcon } from "@/lib/techIcons";
import { cn } from "@/lib/utils";

interface SkillItem {
  name: string;
  icon: string;
  color: string;
}

interface SkillCategory {
  category: string;
  id: string;
  items: SkillItem[];
}

interface SkillsInteractiveProps {
  softSkills: string[];
  hardSkills: SkillCategory[];
  ui?: any;
}

// Which categories belong to the primary ("Core Stack") tab; the rest fall into "Ecosystem".
const CORE_CATEGORY_IDS = ["runtime", "frontend", "backend", "databases", "ai"];

export function SkillsInteractive({ softSkills, hardSkills, ui }: SkillsInteractiveProps) {
  const coreGroups = hardSkills.filter((s) => CORE_CATEGORY_IDS.includes(s.id));
  const ecosystemGroups = hardSkills.filter((s) => !CORE_CATEGORY_IDS.includes(s.id));

  const tabs = [
    { id: "core", label: ui?.skills?.tabs?.core || "Core Stack", groups: coreGroups },
    { id: "ecosystem", label: ui?.skills?.tabs?.ecosystem || "Ecosystem", groups: ecosystemGroups },
  ].filter((t) => t.groups.length > 0);

  const [activeTab, setActiveTab] = React.useState(tabs[0]?.id ?? "core");
  const activeGroups = tabs.find((t) => t.id === activeTab)?.groups ?? [];

  return (
    <section className="w-full min-h-screen bg-background relative overflow-hidden flex flex-col items-center py-16 md:py-24">
      <SectionTitle
        title={ui?.skills?.title || "My Skill Sets"}
        subtitle={ui?.skills?.subtitle || "Refined through experience."}
        align="center"
      />

      {/* Horizontal Divider Line */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 1 }}
        className="w-full max-w-[1400px] h-px bg-linear-to-r from-emerald-500/0 via-white/20 to-teal-500/0 relative z-20"
      />

      {/* Split Content Area */}
      <div className="relative w-full flex-1 flex flex-col lg:flex-row">

        {/* ==================== LEFT COLUMN (Soft Skills) ==================== */}
        <div className="relative w-full lg:w-1/2 flex flex-col border-b lg:border-b-0 lg:border-r border-white/5">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.10),transparent_60%)]" />

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-2xl lg:ml-auto h-full p-8 md:p-12 lg:px-12 xl:px-16 flex flex-col justify-start lg:pt-16"
          >
            <div className="group relative">
              <Sparkles
                className="absolute -bottom-10 -right-20 w-64 h-64 text-emerald-500/10 scale-110 pointer-events-none"
                strokeWidth={0.3}
              />

              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <span className="text-md font-medium text-emerald-400 tracking-wide uppercase">
                  {ui?.skills?.softSkillsTitle || "Soft Skills"}
                </span>
              </div>

              <h3 className="text-4xl md:text-5xl font-extralight text-white/90 mb-8 tracking-tight">
                {ui?.skills?.softSkillsHeading || "The Human Element"}
              </h3>

              <div className="space-y-6 text-white/60 text-base md:text-lg leading-relaxed font-light">
                {softSkills.map((paragraph, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ==================== RIGHT COLUMN (Tech Skills) ==================== */}
        <div className="relative w-full lg:w-1/2 flex flex-col">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_70%_70%,rgba(59,130,246,0.10),transparent_60%)]" />

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-2xl lg:mr-auto h-full p-8 md:p-12 lg:px-12 xl:px-16 flex flex-col justify-start lg:pt-16"
          >
            <div className="group relative">
              <Code2
                className="absolute -top-12 -right-12 w-64 h-64 text-blue-500/2 pointer-events-none"
                strokeWidth={0.3}
              />

              <div className="flex items-center gap-2 mb-2">
                <Code2 className="w-5 h-5 text-blue-400" />
                <span className="text-md font-medium text-blue-400 tracking-wide uppercase">
                  {ui?.skills?.techSkillsTitle || "Technical Arsenal"}
                </span>
              </div>

              <h3 className="text-4xl md:text-5xl font-extralight text-white/90 mb-8 tracking-tight">
                {ui?.skills?.techSkillsHeading || "The Technical Craft"}
              </h3>

              {/* Tabs */}
              <div className="flex gap-8 mb-8 border-b border-white/10">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "relative pb-3 -mb-px text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer",
                      activeTab === tab.id
                        ? "text-white"
                        : "text-white/30 hover:text-white/60",
                    )}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <span className="absolute inset-x-0 -bottom-px h-px bg-blue-400/70" />
                    )}
                  </button>
                ))}
              </div>

              {/* Active tab content */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="space-y-6"
              >
                {activeGroups.map((section) => (
                  <div key={section.id}>
                    <h4 className="text-xs uppercase tracking-tight text-white/30 mb-2 font-semibold ml-1">
                      {ui?.skills?.categories?.[section.id] || section.category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {section.items.map((item) => (
                        <TechLabel
                          key={item.name}
                          name={item.name}
                          color={item.color}
                          iconUrl={getTechIcon(item.name)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 1 }}
        className="w-full max-w-[1400px] h-px bg-linear-to-r from-emerald-500/0 via-white/20 to-blue-500/0 relative z-20"
      />
    </section>
  );
}
