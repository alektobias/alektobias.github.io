import type { ElementType } from "react";
import { cn } from "@/lib/utils";

interface TechLabelProps {
  name: string;
  className?: string;
  color?: string;
  children?: React.ReactNode;
}

export function TechLabel({ name, children, className, color = "#C084FC" }: TechLabelProps) {
  return (
    <div
      className={cn(
        "group/techlabel relative inline-flex items-center gap-2 overflow-hidden rounded-sm border border-white/5 bg-white/5 px-4 py-1.5 transition-all duration-300",
        "hover:bg-white/10",
        "cursor-default",
        className
      )}
      style={
        {
          "--hover-color": color,
        } as React.CSSProperties
      }
    >
      {/* Dynamic Hover Styles using scoped style tag or style prop injection for hover state isn't easy inline. 
          We can use group-hover with arbitrary values if we had the value in a var, but tailwind arbitrary variants with vars is tricky.
          Alternative: Use style for standard properties and group-hover classes for opacity/transform.
          Actually, let's just use the style for the border/shadow directly if we can, but hover states in inline styles are not possible.
          
          Workaround: Use a 'before' or 'after' pseudo-element that is absolutely positioned and has the color, 
          and animate its opacity on hover.
       */}

      {/* Glow Border Effect */}
      <div
        className="absolute inset-0 rounded-sm border transition-colors duration-300 opacity-0 group-hover/techlabel:opacity-30"
        style={{ borderColor: color }}
      />

      {/* Glow Shadow Effect - using a pseudo element for the shadow to control color */}
      <div
        className="absolute inset-0 rounded-sm opacity-0 transition-opacity duration-300 group-hover/techlabel:opacity-100"
        style={{
          boxShadow: `0 0 15px -3px ${color}40` // 40 is approx 25% opacity hex
        }}
      />

      {/* Shiny Sheen Effect */}
      {/* <div
        className="absolute inset-0 -translate-x-[150%] bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-in-out group-hover/techlabel:translate-x-[150%]"
        aria-hidden="true"
      /> */}

      {/* Icon Container */}
      <div
        className="relative z-10 flex items-center justify-center transition-colors duration-300 text-gray-400"
        style={{
          // We can't easily use group-hover in inline style for 'color'.
          // So we'll use a CSS variable for the color and a class that uses it on hover?
          // Or just use the 'group-hover:text-[color]' approach which works in Tailwind.
          // But the linter complained. Let's try the suggestion: group-hover:text-(--hover-color)
        }}
      >
        <div className="group-hover/techlabel:text-(--hover-color) transition-colors duration-300 ">
          {children}
        </div>
      </div>

      <span className="relative z-10 text-sm font-medium text-gray-300 transition-colors group-hover/techlabel:text-white text-nowrap">
        {name}
      </span>
    </div>
  );
}
