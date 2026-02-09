import React from "react";
import { motion } from "framer-motion";
import { Code2, Sparkles } from "lucide-react";
import { TechLabel } from "@/components/ui/TechLabel";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getTechIcon } from "@/lib/techIcons";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.3,
    },
  },
};

const skillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export function SkillsInteractive({ softSkills, hardSkills, ui }: SkillsInteractiveProps) {
  return (
    <section className="w-full min-h-screen bg-black  relative overflow-hidden flex flex-col items-center">

      {/* Header - Always on black background */}
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
      {/* Split Content Area */}
      <div className="relative w-full flex-1 flex flex-col lg:flex-row">

        {/* ==================== LEFT COLUMN (Soft Skills) ==================== */}
        <div className="relative w-full lg:w-1/2 flex flex-col border-b lg:border-b-0 lg:border-r border-white/5">

          {/* BACKGROUND LAYERS (Violet) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none bg-linear-to-br from-emerald-600/20 via-emerald-900/30 to-black">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.3) 0%, transparent 50%),
                              radial-gradient(circle at 80% 80%, rgba(52, 211, 153, 0.2) 0%, transparent 50%),
                              radial-gradient(circle at 40% 20%, rgba(5, 150, 105, 0.2) 0%, transparent 50%)`
            }} />
            {/* Soft curved shapes */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />

            {/* Massive Glowing Orb */}
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-600/15 rounded-full blur-[140px]" />

            {/* Firefly Particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`firefly-${i}`}
                className="absolute w-1 h-1 bg-emerald-400/60 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0, 1.2, 0],
                  y: [0, -20, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* CONTENT (Soft Skills) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-2xl lg:ml-auto h-full p-8 md:p-12 lg:px-12 xl:px-16 flex flex-col justify-center"
          >
            <div className="group relative">
              <Sparkles
                className="absolute -bottom-10 -right-20 w-64 h-64 text-emerald-500/10 transition-all duration-700 scale-110 group-hover:rotate-12 pointer-events-none"
                strokeWidth={0.3}
              />

              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <span className="text-md font-medium text-emerald-400 tracking-wide uppercase">{ui?.skills?.softSkillsTitle || "Soft Skills"}</span>
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

          {/* BACKGROUND LAYERS (Cyan) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none bg-linear-to-bl from-blue-600/20 via-blue-900/30 to-black">
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }} />
            {/* Sharp angular shapes */}
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 blur-[100px]" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
            <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-sky-500/10 blur-[90px] animate-pulse" style={{ animationDuration: '3s', clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }} />

            {/* Massive Glowing Orb */}
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px]" />

            {/* Firefly Particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`firefly-tech-${i}`}
                className="absolute w-1 h-1 bg-blue-400/60 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0, 1.2, 0],
                  y: [0, -20, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* CONTENT (Tech Skills) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-2xl lg:mr-auto h-full p-8 md:p-12 lg:px-12 xl:px-16 flex flex-col justify-center"
          >
            <div className="group relative">
              <Code2
                className="absolute -top-12 -right-12 w-64 h-64 text-blue-500/2 transition-all duration-700 group-hover:-rotate-12 pointer-events-none"
                strokeWidth={0.3}
              />

              <div className="flex items-center gap-2 mb-2">
                <Code2 className="w-5 h-5 text-blue-400" />
                <span className="text-md font-medium text-blue-400 tracking-wide uppercase">{ui?.skills?.techSkillsTitle || "Technical Arsenal"}</span>
              </div>

              <h3 className="text-4xl md:text-5xl font-extralight text-white/90 mb-8 tracking-tight">
                {ui?.skills?.techSkillsHeading || "The Technical Craft"}
              </h3>

              <div className="space-y-6">
                {hardSkills.map((section, categoryIndex) => (
                  <motion.div
                    key={section.category}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + categoryIndex * 0.05, duration: 0.5 }}
                  >
                    <h4 className="text-xs uppercase tracking-tight text-white/30 mb-2 font-semibold ml-1">
                      {ui?.skills?.categories?.[section.id] || section.category}
                    </h4>

                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="flex flex-wrap gap-2"
                    >
                      {section.items.map((item) => {
                        const iconUrl = getTechIcon(item.name);

                        return (
                          <motion.div
                            key={item.name}
                            variants={skillVariants}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <TechLabel
                              name={item.name}
                              color={item.color}
                              iconUrl={iconUrl}
                            />
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
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
