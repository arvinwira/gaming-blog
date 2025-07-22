import { getPosts } from '@/lib/posts'; 
import CategoryFilter from '@/components/CategoryFilter';

function getAllPostsData() {
    const allPosts = getPosts();
    
    const categories = [...new Set(allPosts.flatMap(post => post.categories))];
    
    return { posts: allPosts, categories };
}

export default function CategoriesPage() {
  const { posts, categories } = getAllPostsData();

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

        <CategoryFilter posts={posts} categories={categories} />
      </div>
    </div>
  );
}