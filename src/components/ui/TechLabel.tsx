import { cn } from "@/lib/utils";

interface TechLabelProps {
  name: string;
  className?: string;
  color?: string;
  iconUrl?: string;
  children?: React.ReactNode;
}

export function TechLabel({ name, iconUrl, children, className, color = "#C084FC" }: TechLabelProps) {
  return (
    <div
      className={cn(
        "group/techlabel relative inline-flex items-center gap-2 overflow-hidden rounded-md border border-white/9 bg-linear-120 from-transparent from-15%  via-white/15 via-30% to-transparent to-45% px-4 py-1.5 transition-all duration-300",
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
      {/* Glow Border Effect */}
      {/* <div
        className="absolute inset-0 rounded-sm border transition-colors duration-300 opacity-0 group-hover/techlabel:opacity-30"
        style={{ borderColor: color }}
      /> */}

      {/* Glow Shadow Effect
      <div
        className="absolute inset-0 rounded-sm opacity-0 transition-opacity duration-300 group-hover/techlabel:opacity-100"
        style={{
          boxShadow: `0 0 15px -3px ${color}40`
        }}
      /> */}

      {/* Icon Container */}
      <div
        className="relative z-10 flex items-center justify-center transition-colors duration-300"
      >
        {iconUrl && (
          <img
            src={iconUrl}
            alt=""
            className="w-4 h-4 z-10 object-contain transition-transform duration-300 group-hover/techlabel:scale-110"
            // style={{
            //   filter: "drop-shadow(0 0 .25px rgba(255,255,255,0.25))"
            // }}
          />
        )}
      </div>

      <span className="relative z-10 text-xs font-medium text-gray-300 transition-colors group-hover/techlabel:text-white text-nowrap">
        {name}
      </span>
    </div>
  );
}
