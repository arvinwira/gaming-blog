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
          <div className="absolute inset-y-0 right-0 flex items-center pr-1.5">
            <button
              type="submit"
              className="mr-1.5 px-5 py-2 bg-primary text-primary-foreground font-semibold rounded-full hover:opacity-95 transition"
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
              className="relative flex flex-col bg-card border border-border rounded-2xl p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-1.5 h-10 rounded-full bg-gradient-to-b from-primary to-primary/70 shrink-0" />
                <div>
                  <Link href={`/categories?category=${encodeURIComponent(mainCategory)}`}
                    scroll={false}
                    >
                    
                    <h3
                      className={`text-lg sm:text-xl font-semibold hover:text-primary transition-colors ${
                        selectedCategory === mainCategory ? 'text-primary' : 'text-foreground'
                      }`}
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
            className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 shadow-sm inline-block
              ${selectedCategory === '#all'
                ? 'bg-primary text-white ring-2 ring-primary/50 scale-105'
                : 'bg-card text-foreground border border-border hover:scale-105 hover:shadow-md'
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
              className="group block bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="relative w-full h-52">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute left-3 bottom-3 flex flex-wrap gap-2">
                  {post.categories.map((cat) => (
                    <span
                      key={cat}
                      className="text-xs font-semibold bg-black/65 text-white px-2 py-0.5 rounded-full backdrop-blur-sm"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary mb-2">
                  {post.title}
                </h3>
                <p className="text-sm mt-4 text-muted-foreground max-h-[8 rem] overflow-hidden">
                  {post.excerpt}
                </p>
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