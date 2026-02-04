import React from "react";
import { motion } from "framer-motion";
import { Code2, Sparkles } from "lucide-react";
import { TechLabel } from "@/components/ui/TechLabel";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiExpo,
  SiSvelte,
  SiVuedotjs,
  SiAngular,
  SiTailwindcss,
  SiShadcnui,
  SiBun,
  SiNestjs,
  SiFastify,
  SiPrisma,
  SiDrizzle,
  SiPostgresql,
  SiMongodb,
  SiSupabase,
  SiRedis,
  SiElasticsearch,
  SiAmazonwebservices,
  SiGooglecloud,
  SiFirebase,
  SiDocker,
  SiPulumi,
  SiTerraform,
  SiGit,
  SiJira,
  SiFigma,
  SiGooglegemini,
  SiAnthropic,
} from "react-icons/si";
import {
  Box,
  TestTube2,
  Workflow,
  Database,
  Server,
  Layout,
  Wrench,
  Cloud,
  Terminal,
} from "lucide-react";

// Icon Map
const iconMap: Record<string, any> = {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiExpo,
  SiSvelte,
  SiVuedotjs,
  SiAngular,
  SiTailwindcss,
  SiShadcnui,
  SiBun,
  SiNestjs,
  SiFastify,
  SiPrisma,
  SiDrizzle,
  SiPostgresql,
  SiMongodb,
  SiSupabase,
  SiRedis,
  SiElasticsearch,
  SiAmazonwebservices,
  SiGooglecloud,
  SiFirebase,
  SiDocker,
  SiPulumi,
  SiTerraform,
  SiGit,
  SiJira,
  SiFigma,
  SiGooglegemini,
  SiAnthropic,
  // Generic fallbacks
  Box,
  TestTube2,
  Workflow,
  Database,
  Server,
  Layout,
  Wrench,
  Terminal,
  Cloud,
};

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
        className="w-full max-w-[1400px] h-px bg-linear-to-r from-violet-500/0 via-white/20 to-cyan-500/0 relative z-20"
      />

      {/* Split Content Area */}
      <div className="relative w-full flex-1">

        {/* Background Effects - Restricted to this area */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Left Side */}
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-br from-violet-600/20 via-purple-900/30 to-black border-r border-white/5">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
                              radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.2) 0%, transparent 50%),
                              radial-gradient(circle at 40% 20%, rgba(147, 51, 234, 0.2) 0%, transparent 50%)`
            }} />
            {/* Soft curved shapes */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />

            {/* Firefly Particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`firefly-${i}`}
                className="absolute w-1 h-1 bg-violet-400/60 rounded-full"
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

          {/* Right Side */}
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-bl from-cyan-600/20 via-blue-900/30 to-black border-l border-white/5">
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }} />
            {/* Sharp angular shapes */}
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 blur-[100px]" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
            <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-blue-500/10 blur-[90px] animate-pulse" style={{ animationDuration: '3s', clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }} />

            {/* Firefly Particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`firefly-tech-${i}`}
                className="absolute w-1 h-1 bg-cyan-400/60 rounded-full"
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

          {/* Massive Glowing Orbs for Depth - Restored */}
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-violet-600/15 rounded-full blur-[140px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-600/15 rounded-full blur-[140px]" />
        </div>

        {/* Central Vertical Divider (Static, no balls) */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px hidden lg:block bg-gradient-to-b from-transparent via-white/10 to-transparent pointer-events-none" />

        {/* Content Grid */}
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Soft Skills */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:pr-12 xl:pr-16 pt-12 pb-30"
          >
            <div className="group relative">
              <Sparkles
                className="absolute -bottom-20 -right-20 w-64 h-64 text-violet-500/10 transition-all duration-700 scale-110 group-hover:rotate-12 pointer-events-none"
                strokeWidth={0.3}
              />

              <div className="flex items-center gap-2 mb-2 pt-10">
                <Sparkles className="w-5 h-5 text-violet-400" />
                <span className="text-md font-medium text-violet-400 tracking-wide uppercase">{ui?.skills?.softSkillsTitle || "Soft Skills"}</span>
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

          {/* Technical Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:pl-12 xl:pl-16 pt-12 pb-30"
          >
            <div className="group relative">
              <Code2
                className="absolute -top-12 -right-12 w-64 h-64 text-cyan-500/2 transition-all duration-700 group-hover:-rotate-12 pointer-events-none"
                strokeWidth={0.3}
              />

              <div className="flex items-center gap-2 mb-2 pt-10">
                <Code2 className="w-5 h-5 text-cyan-400" />
                <span className="text-md font-medium text-cyan-400 tracking-wide uppercase">{ui?.skills?.techSkillsTitle || "Technical Arsenal"}</span>
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
                    <h4 className="text-xs uppercase tracking-widest text-white/30 mb-2 font-light ml-1">
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
                        const IconComponent = iconMap[item.icon] || Box;
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
                              className="bg-white/2! border-white/5! hover:bg-white/5! hover:border-cyan-400/20! text-xs py-1.5 px-3"
                            >
                              <IconComponent />
                            </TechLabel>
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
        className="w-full max-w-[1400px] h-px bg-linear-to-r from-violet-500/0 via-white/20 to-cyan-500/0 relative z-20"
      />
    </section>
  );
}
