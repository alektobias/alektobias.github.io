import React from 'react';

interface Props {
  title: string;
  description: string;
  pubDate: Date;
  tags?: string[];
  slug: string;
}

const BlogCard: React.FC<Props> = ({ title, description, pubDate, tags, slug }) => {
  return (
    <a
      href={`/blog/${slug}`}
      className="group relative block p-6 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
    >
      {/* Glassmorphism Background with Neon Border effect on hover */}
      <div className="absolute inset-0 bg-secondary/30 backdrop-blur-md border border-white/5 rounded-xl transition-colors duration-300 group-hover:border-primary/50 group-hover:bg-secondary/40"></div>

      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-emerald-600 rounded-xl opacity-0 group-hover:opacity-20 blur transition duration-500"></div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-3 text-xs font-medium text-muted-foreground">
          <time dateTime={pubDate.toISOString()}>
            {pubDate.toLocaleDateString('en-us', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </time>
          {tags && tags.length > 0 && (
            <>
              <span>•</span>
              <div className="flex gap-2">
                {tags.slice(0, 2).map(tag => (
                  <span key={tag} className="text-primary">{tag}</span>
                ))}
              </div>
            </>
          )}
        </div>

        <h3 className="text-xl font-bold text-foreground mb-2 transition-colors duration-300">
          {title}
        </h3>

        <p className="text-muted-foreground line-clamp-2 mb-4 flex-grow">
          {description}
        </p>

        <div className="flex items-center text-sm text-primary font-medium opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          Read Article <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
        </div>
      </div>
    </a>
  );
};

export default BlogCard;
