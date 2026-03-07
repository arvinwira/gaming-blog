// app/categories/page.js
import { getPosts, HIERARCHICAL_CATEGORIES } from '@/lib/posts';
import CategoryFilter from '@/components/CategoryFilter';

export const metadata = {
  title: 'Browse Categories – Chronic Reload',
  description: 'Explore all gaming and hardware categories. Find your next favorite game or gear on Chronic Reload.',
};

export default function CategoriesPage({ searchParams }) {
  const query = searchParams?.q || '';
  const currentPage = Number(searchParams?.page) || 1;
  const category = searchParams?.category || null;

  const { posts, totalPages } = getPosts({ query, currentPage, category });

  return (
    <div className="bg-background min-h-screen text-foreground p-4 sm:p-6 md:p-8 pt-28">
      <div className="max-w-7xl mx-auto">
        <header className="text-center py-10">
          <h1 className="text-4xl text-primary sm:text-5xl font-extrabold tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            Browse All Content
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Search, filter, and explore our full library of gaming articles and hardware guides.
          </p>
        </header>

        <CategoryFilter
          posts={posts}
          categories={HIERARCHICAL_CATEGORIES}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}