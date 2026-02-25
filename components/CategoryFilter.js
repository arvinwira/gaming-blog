'use client';

import { useState } from 'react';
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
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for an article..."
            className="w-full pl-12 pr-4 py-4 glass border border-border rounded-full text-foreground focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-all shadow-sm"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary text-primary-foreground font-bold rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              Search
            </button>
          </div>
        </div>
      </form>

      {/* Categories Grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Browse Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(categories).map(([mainCategory, subCategories]) => (
            <div
              key={mainCategory}
              className="relative flex flex-col bg-card shadow-md border border-border/40 rounded-3xl p-6 hover:-translate-y-1 hover:shadow-xl hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-1.5 h-10 rounded-full bg-gradient-to-b from-primary to-primary/70 shrink-0" />
                <div>
                  <Link href={`/categories?category=${encodeURIComponent(mainCategory)}`}
                    scroll={false}
                  >

                    <h3
                      className={`text-xl sm:text-2xl font-bold hover:text-primary transition-colors ${selectedCategory === mainCategory ? 'text-primary' : 'text-foreground'
                        }`}
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {mainCategory}
                    </h3>
                  </Link>
                </div>
              </div>

              <div className="mt-4 mb-3 border-t border-border" />

              {/* --- SUBCATEGORY DESIGN IMPROVEMENTS --- */}
              <div className="mt-1 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {subCategories.map((subCategory) => (
                  <Link
                    key={subCategory}
                    href={`/categories?category=${encodeURIComponent(subCategory)}`}
                    scroll={false}
                    className={`flex items-center justify-center text-center px-2 py-2 text-sm min-h-[2.5rem] rounded-lg font-medium transition
                      ${selectedCategory === subCategory
                        ? 'bg-primary text-white shadow-sm'
                        : 'bg-muted/10 text-foreground border border-border hover:bg-primary/10'
                      }`}
                  >
                    {subCategory}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* "All Posts" button */}
        <div className="mt-8 text-center">
          <Link
            href="/categories"
            scroll={false}
            className={`px-8 py-3 rounded-full font-bold transition-all duration-300 shadow-sm inline-block
              ${selectedCategory === '#all'
                ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105'
                : 'glass text-foreground border border-border hover:bg-primary/5 hover:scale-105 hover:shadow-md'
              }`}
          >
            View All Posts
          </Link>
        </div>
      </div>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.slug}
              className="group block bg-card shadow-md rounded-3xl overflow-hidden border border-border/40 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 hover:border-primary/50 transition-all duration-300 flex flex-col h-full"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image src={post.coverImage} fill alt={post.title} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.categories?.slice(0, 2).map(cat => (
                    <span key={cat} className="text-xs font-bold uppercase tracking-wider text-secondary">
                      {cat}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2" style={{ fontFamily: 'var(--font-heading)' }}>{post.title}</h3>
                <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-grow">{post.excerpt}</p>
                <div className="pt-4 border-t border-border mt-auto flex justify-between items-center text-sm font-medium text-muted-foreground">
                  <span>{post.date || 'Unknown Date'}</span>
                  <span className="text-primary group-hover:translate-x-1 transition-transform">Read article →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-foreground">No Results Found</h2>
          <p className="mt-2 text-muted-foreground">Try adjusting your search or category filters.</p>
        </div>
      )}

      {/* Pagination */}
      <div className="mt-8">
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
}