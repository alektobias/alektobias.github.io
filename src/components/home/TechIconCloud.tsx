"use client";
import React, { useMemo } from "react";
import { getTechIcon } from "../../lib/techIcons";

interface TechSkill {
  name: string;
  icon: string;
  color: string;
}

interface TechIconCloudProps {
  skills: TechSkill[];
  displayLayer?: "all" | "behind-only" | "front-only";
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
const getPriority = (name: string): "high" | "medium" | "low" | "hidden" => {
  return techPriority[name] || "medium";
};

// Seeded random for consistent positions
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export const TechIconCloud: React.FC<TechIconCloudProps> = ({ skills, displayLayer = "all" }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const iconRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const mousePos = React.useRef({ x: -9999, y: -9999 });
  const rafRef = React.useRef<number>();

  const icons = useMemo(() => {
    // Sort skills by priority: high first, then medium, then low
    const sortedSkills = [...skills].sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2, hidden: 3 };
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

      // REAL 3D Logic: High Priority (Front)
      // STRICT exclusion from center to avoid covering face
      const minRadius = 35;
      const radiusStats = 25;
      const rawRadius = minRadius + seededRandom(seed + 1) * radiusStats;

      let x = 50 + Math.cos(angle) * rawRadius;
      let y = 50 + Math.sin(angle) * rawRadius * 0.75; // Elliptical orbit

      positions.push({
        id: globalIndex,
        skill,
        x,
        y,
        layer: "front",
        priority: "high",
        size: 34 + seededRandom(seed + 2) * 14,
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

      // REAL 3D Logic: Medium Priority (Middle)
      // STRICT exclusion from center
      const minRadius = 40;
      const radiusStats = 25;
      const rawRadius = minRadius + seededRandom(seed + 1) * radiusStats;

      let x = 50 + Math.cos(angle) * rawRadius;
      let y = 50 + Math.sin(angle) * rawRadius * 0.8;

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

      // REAL 3D Logic: Low Priority (Back)
      // RELAXED exclusion - allow them to go behind the image for depth
      const minRadius = 15; // Can get much closer to center
      const radiusStats = 50; // Wide spread
      const rawRadius = minRadius + seededRandom(seed + 1) * radiusStats;

      let x = 50 + Math.cos(angle) * rawRadius;
      let y = 50 + Math.sin(angle) * rawRadius * 0.7;

      positions.push({
        id: globalIndex,
        skill,
        x,
        y,
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


        // Physics Loop
        React.useEffect(() => {
          // Current animated positions (offsets from original)
          const currentOffsets = new Array(sortedIcons.length).fill({ x: 0, y: 0 });

          const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            mousePos.current = {
              x: e.clientX - rect.left,
              y: e.clientY - rect.top,
            };
          };

          const handleMouseLeave = () => {
            mousePos.current = { x: -9999, y: -9999 };
          };

          window.addEventListener("mousemove", handleMouseMove);
          containerRef.current?.addEventListener("mouseleave", handleMouseLeave);

          const animate = () => {
            if (!containerRef.current) return;

            const width = containerRef.current.offsetWidth;
            const height = containerRef.current.offsetHeight;

            sortedIcons.forEach((icon, index) => {
              const ref = iconRefs.current[index];
              if (!ref) return;

              // Calculate original position in pixels
              const originalX = (icon.x / 100) * width;
              const originalY = (icon.y / 100) * height;

              // Vector from mouse to icon
              const dx = originalX - mousePos.current.x;
              const dy = originalY - mousePos.current.y;
              const dist = Math.sqrt(dx * dx + dy * dy);

              // Repulsion physics
              let targetOffsetX = 0;
              let targetOffsetY = 0;

              const repulsionRadius = 250; // Radius of influence
              const maxRepulsion = 80; // Max pixels to push away

              if (dist < repulsionRadius) {
                const force = (repulsionRadius - dist) / repulsionRadius; // 0 to 1
                const power = Math.pow(force, 2); // Non-linear falloff for smoother feel

                // Direction away from mouse
                // If perfectly on top, push randomly
                const angle = dist === 0 ? Math.random() * Math.PI * 2 : Math.atan2(dy, dx);

                targetOffsetX += Math.cos(angle) * maxRepulsion * power;
                targetOffsetY += Math.sin(angle) * maxRepulsion * power;
              }

              // CENTER Repulsion for Front/Middle layers only
              // This keeps the "hole" clean even if mouse pushes things around
              if (icon.layer !== "back") {
                  const cx = width / 2;
                  const cy = height / 2;
                  const dcx = originalX - cx;
                  const dcy = originalY - cy;
                  const distCenter = Math.sqrt(dcx * dcx + dcy * dcy);
                  const safeZone = width * 0.32; // ~32% radius safe zone

                  if (distCenter < safeZone) {
                    const pushFactor = (safeZone - distCenter) / safeZone;
                    const angleC = Math.atan2(dcy, dcx);
                    // Permanent outward push from center
                    targetOffsetX += Math.cos(angleC) * 60 * pushFactor;
                    targetOffsetY += Math.sin(angleC) * 60 * pushFactor;
                  }
              }

              // Smoothly interpolate current offset to target offset (Spring-like lerp)
              const lerpFactor = 0.08;
              currentOffsets[index] = {
                x: currentOffsets[index].x + (targetOffsetX - currentOffsets[index].x) * lerpFactor,
                y: currentOffsets[index].y + (targetOffsetY - currentOffsets[index].y) * lerpFactor,
              };

              // Apply transform
              // We combine the base % position with the pixel offset
              ref.style.transform = `translate(calc(-50% + ${currentOffsets[index].x}px), calc(-50% + ${currentOffsets[index].y}px))`;
            });

            rafRef.current = requestAnimationFrame(animate);
          };

          animate();

          return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
          };
        }, [sortedIcons]);

        return(
  <div
    ref = { containerRef }
    className = "absolute inset-0 overflow-visible pointer-events-none"
            >
          {
            sortedIcons.map((icon, index) => {
              const isBehind = icon.layer === "back";
              const isMiddle = icon.layer === "middle";
              const isFront = icon.layer === "front";
              const iconSrc = getTechIcon(icon.skill.name);

              const shouldRender =
                displayLayer === "all" ||
                (displayLayer === "behind-only" && isBehind) ||
                (displayLayer === "front-only" && !isBehind);

              if (!shouldRender) return null;

              return (
                <div
                  key={icon.id}
                  ref={el => { iconRefs.current[index] = el }}
                  className="absolute will-change-transform"
                  style={{
                    left: `${icon.x}%`,
                    top: `${icon.y}%`,
                    zIndex: isBehind ? 0 : isFront ? 30 : 5,
                    transform: `translate(-50%, -50%)`, // Initial state
                  }}
                >
                  <div
                    className="tech-icon-float"
                    style={{
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
                      <img
                        src={iconSrc}
                        alt={icon.skill.name}
                        width={icon.size}
                        height={icon.size}
                        className="select-none pointer-events-none"
                        style={{
                          width: icon.size,
                          height: icon.size,
                          filter: isBehind
                            ? `drop-shadow(0 0 3px ${icon.skill.color}30)`
                            : `drop-shadow(0 0 ${isFront ? 15 : 8}px ${icon.skill.color}60)`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })
          }

            < style > {`
        @keyframes techIconFloat {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(calc(-1 * var(--float-y))) translateX(calc(0.5 * var(--float-x)));
          }
          50% {
            transform: translateY(0) translateX(var(--float-x));
          }
          75% {
            transform: translateY(var(--float-y)) translateX(calc(0.5 * var(--float-x)));
          }
        }
        
        .tech-icon-float {
          animation: techIconFloat var(--duration, 10s) ease-in-out infinite;
          will-change: transform;
        }
      `}</style >
  </div >
);
};

export default TechIconCloud;
