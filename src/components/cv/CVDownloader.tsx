import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { CVDocument } from './CVDocument';
import { FileText, Download, FileDown } from 'lucide-react';
import type { Profile, ExperienceData, TechSkills, ContactInfo } from '../../types';

interface Props {
  profile: Profile;
  experiences: ExperienceData;
  skills: TechSkills;
  contact: ContactInfo;
  className?: string;
  variant?: 'small' | 'large';
  ui?: any;
}

export const CVDownloader: React.FC<Props> = ({ variant = 'small', className = '', ui, ...props }) => {
  const baseClasses = "group relative cursor-pointer flex items-center justify-center transition-all duration-300 hover:shadow-lg overflow-hidden";

  const variants = {
    small: "p-3 rounded-xl hover:bg-white/10 border border-transparent hover:shadow-green-500/20",
    large: "w-20 h-20 bg-white/5 hover:bg-green-500/10 border border-white/10 hover:border-green-500/30 rounded-2xl hover:shadow-green-500/10"
  };

  return (
    <div className="flex items-center">
      <PDFDownloadLink
        document={<CVDocument {...props} />}
        fileName={ui?.cv?.filename || "alek-tobias-resume.pdf"}
        className={`${baseClasses} ${variants[variant]} ${className}`}
      >
        {/* @ts-ignore - render props are a bit tricky with types sometimes */}
        {({ blob, url, loading, error }) => (
          <>
            <div className="absolute inset-0 bg-linear-to-tr from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {loading ? (
              <Download className={variant === 'small' ? "w-6 h-6 animate-pulse text-gray-400" : "w-8 h-8 animate-pulse text-gray-400"} />
            ) : (
              <FileDown className={`${variant === 'small' ? "w-6 h-6" : "w-8 h-8"} text-gray-400 group-hover:text-green-400 transition-colors`} />
            )}
            <span className="sr-only">{ui?.cv?.download || "Download CV"}</span>
          </>
        )}
      </PDFDownloadLink>
    </div>
  );
};
