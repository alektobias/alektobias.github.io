import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check } from 'lucide-react';
import { FlagUS, FlagES, FlagFR, FlagBR } from '../ui/Flags';

const languages = [
  { code: 'en', label: 'English', Flag: FlagUS },
  { code: 'es', label: 'Español', Flag: FlagES },
  { code: 'fr', label: 'Français', Flag: FlagFR },
  { code: 'pt', label: 'Português', Flag: FlagBR },
];

interface Props {
  currentLang: string;
}

export const LanguagePicker: React.FC<Props> = ({ currentLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOpen = () => setIsOpen(!isOpen);

  // Determine current language object
  const activeLang = languages.find(l => l.code === currentLang) || languages[0];

  const handleSelect = (langCode: string) => {
    setIsOpen(false);
    // Redirect logic
    if (langCode === 'en') {
      window.location.href = '/';
    } else {
      window.location.href = `/${langCode}`;
    }
  };

  return (
    <div className="absolute z-50 top-16 left-1/2 -translate-x-1/2  max-w-7xl w-full mx-auto" ref={containerRef}>
      <button
        onClick={toggleOpen}
        className="flex items-center gap-2 px-3 py-2 transition-all duration-300 group cursor-pointer"
        aria-label="Select Language"
      >
        <activeLang.Flag className="w-5 h-5 rounded-sm object-cover" />
        <span className="text-sm font-medium text-gray-300 group-hover:text-white uppercase hidden sm:block">
          {activeLang.code}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-48 bg-[#0a0a0c] border border-white/10 rounded-xl shadow-xl backdrop-blur-xl overflow-hidden z-50"
          >
            <div className="p-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  data-current={activeLang.code === lang.code}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors cursor-pointer text-gray-400 hover:bg-white/5 hover:text-white  data-current:text-purple-400`}
                >
                  <div className="flex items-center gap-3">
                    <lang.Flag className="w-5 h-5 rounded-sm" />
                    <span>{lang.label}</span>
                  </div>

                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
