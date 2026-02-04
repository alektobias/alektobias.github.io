import React, { useEffect, useState } from 'react';

interface Heading {
  depth: number;
  slug: string;
  text: string;
}

interface Props {
  headings: Heading[];
}

const TableOfContents: React.FC<Props> = ({ headings }) => {
  const [activeId, setActiveId] = useState<string>('');

  // Highlight active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.slug);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  return (
    <nav className="toc-container sticky top-24 max-h-[calc(100vh-6rem)] overflow-auto p-4 hidden lg:block">
      <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider opacity-80">
        On This Page
      </h4>
      <ul className="flex flex-col space-y-2 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.slug}
            className={`pl-${(heading.depth - 1) * 3} transition-colors duration-200`}
          >
            <a
              href={`#${heading.slug}`}
              className={`block py-1 hover:text-primary transition-colors ${activeId === heading.slug
                  ? 'text-primary font-medium border-l-2 border-primary pl-3 -ml-3'
                  : 'text-muted-foreground'
                }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
