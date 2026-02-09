import React, { Suspense, useState, useCallback } from 'react';
import { FileText, Download, FileDown } from 'lucide-react';
import type { Profile, ExperienceData, TechSkills, ContactInfo } from '../../types';

// Lazy load the PDF logic to avoid bundling @react-pdf/renderer in the main chunk
const CVLogic = React.lazy(() => import('./CVLogic'));

interface Props {
  profile: Profile;
  experiences: ExperienceData;
  skills: TechSkills;
  contact: ContactInfo;
  className?: string;
  variant?: 'small' | 'large';
  ui?: any;
  lang?: string;
}

export const CVDownloader: React.FC<Props> = ({ variant = 'small', className = '', ui, lang, ...props }) => {
  const [isClient, setIsClient] = React.useState(false);
  const [initGeneration, setInitGeneration] = useState(false);
  const [pdfState, setPdfState] = useState<{ url: string | null; loading: boolean; error: any }>({
    url: null,
    loading: true,
    error: null
  });

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const handleStateChange = useCallback((newState: { url: string | null; loading: boolean; error: any }) => {
    setPdfState(newState);
  }, []);

  const handleDownload = (e: React.MouseEvent) => {
    // 1. If not initialized, start generation
    if (!initGeneration) {
      e.preventDefault();
      setInitGeneration(true);
      return;
    }

    // 2. If generating, block download
    if (pdfState.loading || !pdfState.url) {
      e.preventDefault();
      return;
    }

    // 3. If ready (url exists), let usage proceed (default accent)
    // The user might need to click again if the first click just triggered init.
    // To be nice, we could try to auto-click, but for now strict "click to generate" is fine for performance.
    // Actually, if we return early on init, the user sees "Loading..." and then has to click again or we auto-trigger.
    // Let's stick to the secure simple flow: Click -> Load -> Click to Save.
  };

  const baseClasses = "group relative cursor-pointer flex items-center justify-center transition-all duration-300 hover:shadow-lg overflow-hidden";

  const variants = {
    small: "p-3 rounded-xl hover:bg-white/10 border border-transparent hover:shadow-white/5",
    large: "w-20 h-20 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl hover:shadow-white/5"
  };

  if (!isClient) return null;

  if (pdfState.error) {
    console.error('PDF Generation Error:', pdfState.error);
    return (
      <div className={`${baseClasses} ${variants[variant]} ${className} cursor-not-allowed opacity-50`}>
        <FileText className={`${variant === 'small' ? "w-6 h-6" : "w-8 h-8"} text-red-400`} />
      </div>
    );
  }

  // Loading state: 
  // - We started generation AND (logic says loading OR logic hasn't given us a url yet)
  const isLoading = initGeneration && (pdfState.loading || !pdfState.url);

  return (
    <>
      {initGeneration && (
        <Suspense fallback={null}>
          <CVLogic
            {...props}
            lang={lang}
            ui={ui}
            onStateChange={handleStateChange}
          />
        </Suspense>
      )}

      <a
        href={pdfState.url ? pdfState.url : undefined}
        download={ui?.cv?.filename || "alek-tobias-resume.pdf"}
        onClick={handleDownload}
        // Removed mouseEnter/focus/touchStart triggers for pure "click-only" behavior
        className={`${baseClasses} ${variants[variant]} ${className} ${isLoading ? 'cursor-wait opacity-80' : ''}`}
        aria-label={ui?.cv?.download || "Download CV"}
      >
        <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {isLoading ? (
          <Download className={variant === 'small' ? "w-6 h-6 animate-pulse text-gray-400" : "w-8 h-8 animate-pulse text-gray-400"} />
        ) : (
          <FileDown className={`${variant === 'small' ? "w-6 h-6" : "w-8 h-8"} text-gray-400 group-hover:text-white transition-colors`} />
        )}
        <span className="sr-only">{ui?.cv?.download || "Download CV"}</span>
      </a>
    </>
  );
};
