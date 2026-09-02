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
    <div
      className={`pt-28 md:pt-36 mb-14 md:mb-20 flex flex-col ${alignmentClasses[align]} ${className}`}
    >
      <h2 className="flex flex-col leading-tight w-fit">
        <span className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
          {title}
        </span>
        {subtitle && (
          <span className="mt-2 text-lg md:text-xl font-normal text-white/40">
            {subtitle}
          </span>
        )}
      </h2>
    </div>
  );
};
