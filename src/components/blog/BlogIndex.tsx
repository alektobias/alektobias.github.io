import React, { useState, useMemo } from 'react';
import BlogSearch from './BlogSearch';
import BlogCard from './BlogCard';

interface BlogPost {
  slug: string;
  data: {
    title: string;
    description: string;
    pubDate: Date;
    tags?: string[];
  };
}

interface Props {
  posts: BlogPost[];
}

const BlogIndex: React.FC<Props> = ({ posts }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    if (!searchQuery) return posts;
    const lowerQuery = searchQuery.toLowerCase();
    return posts.filter((post) =>
      post.data.title.toLowerCase().includes(lowerQuery) ||
      post.data.description.toLowerCase().includes(lowerQuery) ||
      post.data.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }, [posts, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-left mb-16">
        <h1 className="text-4xl md:text-5xl font-bold leading-relaxed mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
          Writing & Documentation
        </h1>
        <p className="text-muted-foreground max-w-2xl  text-lg">
          Technical deep dives into my journey through code, architecture, and design.
        </p>
      </div>

      <BlogSearch onSearch={setSearchQuery} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <BlogCard
            key={post.slug}
            slug={post.slug}
            title={post.data.title}
            description={post.data.description}
            pubDate={post.data.pubDate}
            tags={post.data.tags}
          />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          No articles found matching "{searchQuery}"
        </div>
      )}
    </div>
  );
};

export default BlogIndex;
