"use client";
import React, { useEffect, useState, useMemo } from "react";
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
import { Box, Workflow } from "lucide-react";

// Icon component mapping
const iconMap: Record<string, React.ComponentType<any>> = {
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
  Box,
  Workflow,
};

interface TechSkill {
  name: string;
  icon: string;
  color: string;
}

interface TechIconCloudProps {
  skills: TechSkill[];
}

interface FloatingIcon {
  id: number;
  skill: TechSkill;
  x: number;
  y: number;
  layer: "back" | "middle" | "front";
  size: number;
  delay: number;
  duration: number;
  floatAmplitudeX: number;
  floatAmplitudeY: number;
  priority: "high" | "medium" | "low";
}

// Priority mapping - high priority techs appear larger and in front
const techPriority: Record<string, "high" | "medium" | "low" | "hidden"> = {
  // Core languages & runtime - HIGH
  TypeScript: "high",
  JavaScript: "medium",
  Bun: "high",
  // Core frontend - HIGH
  React: "high",
  "Next.js": "high",
  "React Native": "medium",
  // Core backend - HIGH
  NestJS: "high",
  ElysiaJS: "hidden",
  // Core databases - HIGH
  PostgreSQL: "medium",
  Prisma: "medium",
  Supabase: "high",
  // Core DevOps - HIGH
  Docker: "high",
  AWS: "high",

  // Supporting frontend - MEDIUM
  Expo: "medium",
  "Tailwind CSS": "high",
  "Shadcn/UI": "medium",
  Svelte: "high",
  Vue: "medium",
  // Supporting backend - MEDIUM
  Fastify: "medium",
  // Supporting databases - MEDIUM
  "Drizzle ORM": "medium",
  MongoDB: "medium",
  Redis: "medium",
  // Supporting DevOps - MEDIUM
  GCP: "medium",
  Firebase: "medium",
  Pulumi: "medium",

  // Tools & others - LOW (will appear in back)
  Angular: "low",
  Python: "low",
  Elasticsearch: "low",
  Terraform: "low",
  Git: "low",
  Jira: "low",
  Figma: "low",
  Gemini: "high",
  "Claude Code": "medium",
  "CI/CD Pipelines": "low",
};

// Get priority with fallback to medium
const getPriority = (name: string): "high" | "medium" | "low" => {
  return techPriority[name] || "medium";
};

// Seeded random for consistent positions
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export const TechIconCloud: React.FC<TechIconCloudProps> = ({ skills }) => {
  const icons = useMemo(() => {
    // Sort skills by priority: high first, then medium, then low
    const sortedSkills = [...skills].sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[getPriority(a.name)] - priorityOrder[getPriority(b.name)];
    });

    const positions: FloatingIcon[] = [];

    // Count skills by priority
    const highPrioritySkills = sortedSkills.filter(s => getPriority(s.name) === "high");
    const mediumPrioritySkills = sortedSkills.filter(s => getPriority(s.name) === "medium");
    const lowPrioritySkills = sortedSkills.filter(s => getPriority(s.name) === "low");

    let globalIndex = 0;

    // HIGH priority → FRONT layer - larger, brighter, more visible, inner orbit
    highPrioritySkills.forEach((skill, i) => {
      const seed = globalIndex * 13 + 19;
      const count = highPrioritySkills.length;
      const angle = (i / count) * 2 * Math.PI + seededRandom(seed) * 0.4;
      // Orbital radius: 25-55% from center
      const radius = 25 + seededRandom(seed + 1) * 30;

      let x = 50 + Math.cos(angle) * radius;
      let y = 50 + Math.sin(angle) * radius * 0.65;

      // Ensure icons don't overlap with center image too much
      if (Math.abs(x - 50) < 30 && Math.abs(y - 50) < 25) {
        x += x < 50 ? -15 : 15;
        y += y < 50 ? -10 : 10;
      }

      positions.push({
        id: globalIndex,
        skill,
        x,
        y,
        layer: "front",
        priority: "high",
        size: 34 + seededRandom(seed + 2) * 14, // Large icons for front
        delay: seededRandom(seed + 3) * 3,
        duration: 4 + seededRandom(seed + 4) * 2,
        floatAmplitudeX: 5 + seededRandom(seed + 5) * 6,
        floatAmplitudeY: 7 + seededRandom(seed + 6) * 10,
      });
      globalIndex++;
    });

    // MEDIUM priority → MIDDLE layer, middle orbit
    mediumPrioritySkills.forEach((skill, i) => {
      const seed = globalIndex * 11 + 17;
      const count = mediumPrioritySkills.length;
      const angle = (i / count) * 2 * Math.PI + seededRandom(seed) * 0.5;
      // Orbital radius: 30-55% from center
      const radius = 30 + seededRandom(seed + 1) * 25;

      let x = 50 + Math.cos(angle) * radius;
      let y = 50 + Math.sin(angle) * radius * 0.7;

      // Ensure icons don't overlap with center
      if (Math.abs(x - 50) < 25 && Math.abs(y - 50) < 20) {
        x += x < 50 ? -12 : 12;
      }

      positions.push({
        id: globalIndex,
        skill,
        x,
        y,
        layer: "middle",
        priority: "medium",
        size: 26 + seededRandom(seed + 2) * 10,
        delay: seededRandom(seed + 3) * 4,
        duration: 5 + seededRandom(seed + 4) * 3,
        floatAmplitudeX: 3 + seededRandom(seed + 5) * 5,
        floatAmplitudeY: 5 + seededRandom(seed + 6) * 8,
      });
      globalIndex++;
    });

    // LOW priority → BACK layer - smaller, blurred, outer orbit
    lowPrioritySkills.forEach((skill, i) => {
      const seed = globalIndex * 7 + 13;
      const count = lowPrioritySkills.length;
      const angle = (i / count) * 2 * Math.PI + seededRandom(seed) * 0.6;
      // Orbital radius: 35-55% from center (outermost orbit)
      const radius = 35 + seededRandom(seed + 1) * 20;

      positions.push({
        id: globalIndex,
        skill,
        x: 50 + Math.cos(angle) * radius,
        y: 50 + Math.sin(angle) * radius * 0.65,
        layer: "back",
        priority: "low",
        size: 18 + seededRandom(seed + 2) * 8, // Smaller icons for back
        delay: seededRandom(seed + 3) * 5,
        duration: 6 + seededRandom(seed + 4) * 4,
        floatAmplitudeX: 2 + seededRandom(seed + 5) * 4,
        floatAmplitudeY: 3 + seededRandom(seed + 6) * 5,
      });
      globalIndex++;
    });

    return positions;
  }, [skills]);

  // Sort icons by layer so back ones render first
  const sortedIcons = useMemo(() => {
    const layerOrder = { back: 0, middle: 1, front: 2 };
    return [...icons].sort((a, b) => layerOrder[a.layer] - layerOrder[b.layer]);
  }, [icons]);

  return (
    <div className="absolute inset-0 overflow-visible pointer-events-none">
      {sortedIcons.map((icon) => {
        const IconComponent = iconMap[icon.skill.icon] || Box;
        const isBehind = icon.layer === "back";
        const isMiddle = icon.layer === "middle";
        const isFront = icon.layer === "front";

        return (
          <div
            key={icon.id}
            className="absolute tech-icon-float"
            style={{
              left: `${icon.x}%`,
              top: `${icon.y}%`,
              zIndex: isBehind ? 1 : isFront ? 30 : 5,
              transform: `translate(-50%, -50%)`,
              animationDelay: `${icon.delay}s`,
              animationDuration: `${icon.duration}s`,
              "--float-x": `${icon.floatAmplitudeX}px`,
              "--float-y": `${icon.floatAmplitudeY}px`,
            } as React.CSSProperties}
          >
            <div
              className="relative flex items-center justify-center rounded-2xl backdrop-blur-sm transition-all duration-500"
              style={{
                width: icon.size + 16,
                height: icon.size + 16,
                background: isBehind
                  ? `radial-gradient(circle, ${icon.skill.color}12, transparent 70%)`
                  : isFront
                    ? `radial-gradient(circle, ${icon.skill.color}25, ${icon.skill.color}08 60%, transparent 80%)`
                    : `radial-gradient(circle, ${icon.skill.color}15, transparent 70%)`,
                boxShadow: isBehind
                  ? `0 0 25px ${icon.skill.color}08`
                  : isFront
                    ? `0 0 40px ${icon.skill.color}35, 0 10px 40px rgba(0,0,0,0.4), inset 0 0 20px ${icon.skill.color}10`
                    : `0 0 30px ${icon.skill.color}20`,
                border: `1px solid ${icon.skill.color}${isBehind ? "08" : isFront ? "40" : "20"}`,
                opacity: isBehind ? 0.35 : isMiddle ? 0.6 : 0.85,
                filter: isBehind ? "blur(1.5px)" : "none",
              }}
            >
              <IconComponent
                size={icon.size}
                style={{
                  color: icon.skill.color,
                  filter: isBehind
                    ? `drop-shadow(0 0 3px ${icon.skill.color}30)`
                    : `drop-shadow(0 0 ${isFront ? 15 : 8}px ${icon.skill.color}60)`,
                }}
              />
            </div>
          </div>
        );
      })}

      <style>{`
        @keyframes techIconFloat {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0) translateX(0) rotate(0deg);
          }
          25% {
            transform: translate(-50%, -50%) translateY(calc(-1 * var(--float-y))) translateX(calc(0.5 * var(--float-x))) rotate(2deg);
          }
          50% {
            transform: translate(-50%, -50%) translateY(0) translateX(var(--float-x)) rotate(0deg);
          }
          75% {
            transform: translate(-50%, -50%) translateY(var(--float-y)) translateX(calc(0.5 * var(--float-x))) rotate(-2deg);
          }
        }
        
        .tech-icon-float {
          animation: techIconFloat var(--duration, 5s) ease-in-out infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  );
};

export default TechIconCloud;
