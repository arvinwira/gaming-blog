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
    <div className="bg-background text-primary pt-24">
      {/* Hero Section - Trending Post */}
      <TrendingCarousel slides={trendingPosts} />


      {/* Featured Posts Section */}
      <section className="py-24 relative">
        <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl text-primary md:text-5xl font-extrabold tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>Featured</h2>
              <p className="text-muted-foreground mt-2 text-lg">Hand-picked by our editors</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map(post => (
              <Link href={`/blog/${post.slug}`} key={post.slug} className="block group">
                <div className="h-full bg-card shadow-md border border-border/40 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/50 flex flex-col">
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image src={post.coverImage} fill alt={post.title} className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex gap-2 mb-3">
                      {post.categories?.slice(0, 2).map(cat => (
                        <span key={cat} className="text-xs font-bold uppercase tracking-wider text-secondary">
                          {cat}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2" style={{ fontFamily: 'var(--font-heading)' }}>{post.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-grow">{post.excerpt}</p>
                    <div className="pt-4 border-t border-border mt-auto flex justify-between items-center text-sm font-medium text-muted-foreground">
                      <span>{post.date}</span>
                      <span className="text-primary group-hover:translate-x-1 transition-transform">Read article →</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="py-24 bg-accent/30 rounded-t-[3rem] mt-12 border-t border-border relative">
        <div className="absolute top-20 left-0 -z-10 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-foreground md:text-5xl font-extrabold tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>Latest Updates</h2>
            <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">Stay up to date with the freshest drops from the gaming world.</p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {recentPosts.map(post => (
              <Link href={`/blog/${post.slug}`} key={post.slug} className="block group">
                <div className="flex flex-col sm:flex-row bg-card shadow-md border border-border/40 p-3 sm:p-5 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50">
                  <div className="w-full sm:w-1/3 relative h-48 sm:h-auto overflow-hidden rounded-2xl flex-shrink-0">
                    <Image src={post.coverImage} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-6 flex flex-col justify-center py-2 flex-grow">
                    <span className="text-secondary text-xs uppercase tracking-wider font-bold mb-2">
                      {post.categories && post.categories.join(' • ')}
                    </span>
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
                    <div className="mt-4 text-sm font-medium text-muted-foreground">
                      {post.date}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-16 pb-12">
            <Link href="/categories" className="inline-flex py-4 px-8 bg-card text-foreground border border-border rounded-full font-bold hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1">
              Browse All Articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}