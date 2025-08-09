'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Pagination from './Pagination';
import { useRouter, useSearchParams } from 'next/navigation';

export default function CategoryFilter({ posts, categories, totalPages, currentPage }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const selectedCategory = searchParams.get('category') || '#all';

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    params.set('q', searchTerm);
    params.delete('page');
    router.push(`/categories?${params.toString()}`);
  };

  return (
    <div>
      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-12 max-w-lg mx-auto">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for an article..."
            className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-full text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button
              type="submit"
              className="mr-1.5 px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-full hover:opacity-90 transition-opacity"
            >
              Search
            </button>
          </div>
        </div>
      </form>
      
      {/* Category Buttons */}
      <div className="flex justify-center flex-wrap gap-4 mb-12">
        <Link
          href="/categories"
          className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 shadow-sm 
            ${selectedCategory === '#all' 
              ? 'bg-primary text-white ring-2 ring-primary/50 scale-105' 
              : 'bg-secondary text-white hover:scale-105 hover:shadow-md'
            }`}
        >
          All Posts
        </Link>
        {categories.map(category => (
          <Link
            key={category}
            href={`/categories?category=${category}`}
            className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 shadow-sm 
              ${selectedCategory === category 
                ? 'bg-primary text-white ring-2 ring-primary/50 scale-105' 
                : 'bg-secondary text-white hover:scale-105 hover:shadow-md'
              }`}
          >
            {category}
          </Link>
        ))}
      </div>

      {/* Conditional Rendering for Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
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
                <h3 className="text-xl text-primary font-semibold mb-2">{post.title}</h3>
                <p className="text-muted-foreground text-sm">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        // "No Results Found" Message
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-foreground">No Results Found</h2>
          <p className="mt-2 text-muted-foreground">
            Try adjusting your search or category filters.
          </p>
        </div>
      )}
      
      {/* Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}