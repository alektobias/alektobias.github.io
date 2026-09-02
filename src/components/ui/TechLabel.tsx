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
        "group/techlabel relative inline-flex items-center gap-2 overflow-hidden rounded-md border border-white/10 bg-white/[0.03] px-4 py-1.5 transition-colors duration-300",
        "hover:bg-white/10",
        "cursor-default",
        className
      )}
    >
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
