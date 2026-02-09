import React from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  align = "left",
  className = "",
}) => {
  const alignmentClasses = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  };

  return (
    <div className={`mb-16 flex flex-col ${alignmentClasses[align]} ${className}`}>
      <h2 className="flex flex-col leading-tight w-fit relative group">

        {/* Main Title with Gradient Shadow Effect */}
        <div className="relative">
          {/* Main Text Layer */}
          <span
            className="relative z-10  text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white/90 italic mt-2 transition-colors duration-300"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {title}
          </span>

        </div>
        {/* Subtitle */}
        {subtitle && (
          <span
            className="relative z-10 text-2xl md:text-4xl lg:text-4xl font-light"
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              backgroundImage: "linear-gradient(to bottom right, #ccc 70%, #333)", // purple-500, pink-500, blue-500
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",

            }}
          >
            {subtitle}
          </span>
        )}

      </h2>

      {/* Inline Style for Animation */}
      <style>{`
        @keyframes gradient-move {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </div>
  );
};
