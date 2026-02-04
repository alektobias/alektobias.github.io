import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface Props {
  onSearch: (query: string) => void;
}

const BlogSearch: React.FC<Props> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    onSearch(query);
  }, [query, onSearch]);

  return (
    <div className="relative w-full max-w-xl mb-12 group">
      {/* Glow behind input */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-purple-600/50 rounded-lg opacity-20 group-hover:opacity-60 blur transition duration-500"></div>

      <div className="relative flex items-center bg-secondary/80 backdrop-blur-sm border border-white/10 rounded-lg p-1 focus-within:border-primary/50 transition-colors duration-300">
        <div className="pl-3 text-muted-foreground group-focus-within:text-primary transition-colors">
          <Search size={20} />
        </div>
        <input
          type="text"
          placeholder="Search articles, topics, tech..."
          className="w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/50 px-3 py-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

      </div>
    </div>
  );
};

export default BlogSearch;
