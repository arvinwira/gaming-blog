'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function CategoryFilter({ posts, categories }) {
  const [selectedCategory, setSelectedCategory] = useState('#all');

  const filteredPosts = selectedCategory === '#all'
    ? posts
    : posts.filter(post => post.categories.includes(selectedCategory));

  return (
    <div>
      {/* Category Buttons */}
      <div className="flex justify-center flex-wrap gap-4 mb-12">
        <button
          onClick={() => setSelectedCategory('#all')}
          className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 shadow-sm 
            ${selectedCategory === '#all' 
              ? 'bg-primary text-white ring-2 ring-primary/50 scale-105' 
              : 'bg-secondary text-white hover:scale-105 hover:shadow-md'
            }`}
        >
          All Posts
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 shadow-sm 
              ${selectedCategory === category 
                ? 'bg-primary text-white ring-2 ring-primary/50 scale-105' 
                : 'bg-secondary text-white hover:scale-105 hover:shadow-md'
              }`}
          >
            {category}
          </button>
        ))}
      </div>


      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map(post => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className="block bg-card rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] shadow-secondary transition-transform duration-300 border border-border">
            <Image src={post.coverImage} alt={post.title} width={400} height={250} className="w-full h-48 object-cover"/>
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-3">
                {post.categories.map((cat) => (
                  <span 
                    key={cat} 
                    className="text-xs font-semibold bg-secondary/60 border border-border px-3 py-1 rounded-full backdrop-blur-sm"
                  >
                    {cat}
                  </span>
                ))}
              </div>
              <h3 className="text-xl font-semibold text-foreground">{post.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
