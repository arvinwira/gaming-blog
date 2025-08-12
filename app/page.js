import Link from 'next/link';
import Image from 'next/image';
import { getPosts } from '@/lib/posts'; 
import TrendingCarousel from '@/components/TrendingCarousel';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// This function gets all posts without sorting them by date
function getAllPostsRaw() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map(fileName => {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    return { slug, ...data };
  });
}

export default function BlogHome() {
  // Get an unsorted list for trending and featured sections
  const allPostsRaw = getAllPostsRaw();
  
  // Get a date-sorted list for the recent posts section
  const { posts: allPostsSorted } = getPosts();

  // Filter for trending and featured posts from the unsorted list
  const trendingPosts = allPostsRaw.filter(post => post.trending).slice(0, 3);
  const featuredPosts = allPostsRaw.filter(post => post.featured).slice(0, 3);
  
  // Ensure recent posts don't include anything from the carousel
  const trendingPostSlugs = trendingPosts.map(post => post.slug);
  const recentPosts = allPostsSorted
    .filter(post => !trendingPostSlugs.includes(post.slug))
    .slice(0, 5);

  return (
    <div className="bg-background text-primary">
      {/* Hero Section - Trending Post */}
      <TrendingCarousel slides={trendingPosts} />


      {/* Featured Posts Section */}
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-left mb-10">Featured Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map(post => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="block group bg-card rounded-lg overflow-hidden shadow-secondary hover:scale-105 transition-transform duration-300 border border-border">
              <Image src={post.coverImage} alt={post.title} width={400} height={250} className="w-full h-48 object-cover"/>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:underline">{post.title}</h3>
                <p className="text-muted-foreground text-sm">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

     {/* Recent Posts Section */}
<section className="py-16 bg-background">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-bold text-left mb-10">Recent Posts</h2>
    <div className="space-y-8 max-w-3xl mx-auto">
      {recentPosts.map(post => (
        <Link href={`/blog/${post.slug}`} key={post.slug} className="block group">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 p-4 rounded-lg bg-card shadow-secondary hover:scale-105 transition-transform duration-300 border border-border">
              <div className="flex-shrink-0">
                  <Image src={post.coverImage} alt={post.title} width={150} height={100} className="rounded-md object-cover w-full h-48 sm:w-[150px] sm:h-[100px]"/>
              </div>
              <div className="mt-4 sm:mt-0">
              <span className="text-secondary text-sm font-semibold">
                {post.categories && post.categories.join(' • ')}
              </span>
              <h3 className="text-xl font-bold mt-1 group-hover:underline">{post.title}</h3>
              <p className="text-muted-foreground text-sm mt-2">{post.excerpt}</p>
              </div>
          </div>
        </Link>
      ))}
    </div>
    <div className="text-center mt-12">
      <Link href="/categories" className="px-8 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">
        View All Posts
      </Link>
    </div>
  </div>
</section>
    </div>
  );
}