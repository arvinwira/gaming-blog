import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import CategoryFilter from '@/components/CategoryFilter';

function getAllPostsData() {
    const postsDirectory = path.join(process.cwd(), 'posts');
    const fileNames = fs.readdirSync(postsDirectory);

    const allPosts = fileNames.map(fileName => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);
        return { slug, ...data };
    });

    const sortedPosts = allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const categories = [...new Set(allPosts.flatMap(post => post.categories))];
    
    return { posts: sortedPosts, categories };
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
            Filter by category to find what you're looking for.
          </p>
        </header>

        <CategoryFilter posts={posts} categories={categories} />
      </div>
    </div>
  );
}