import { getPosts } from '@/lib/posts'; 
import CategoryFilter from '@/components/CategoryFilter';

export default function CategoriesPage({ searchParams }) {
  const query = searchParams?.q || '';
  const currentPage = Number(searchParams?.page) || 1;
  const category = searchParams?.category || null; 

  const { posts, totalPages, categories } = getPosts({ query, currentPage, category });

  return (
    <div className="bg-background min-h-screen text-foreground p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center py-10">
          <h1 className="text-4xl text-primary sm:text-5xl font-extrabold tracking-tight">
            Categories
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Filter by category to find what you are looking for.
          </p>
        </header>

        <CategoryFilter 
          posts={posts} 
          categories={categories} 
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}